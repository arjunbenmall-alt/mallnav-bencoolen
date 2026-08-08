/**
 * MallNav — routeEngine.js
 * Graph = per-floor walkway nodes/edges (data/navpoints.json) plus
 * "vertical links" (escalators/lifts) stitching floors together. Dijkstra
 * finds the cheapest path; a second pass turns that raw node list into
 * human turn-by-turn instructions ("Jalan lurus 20 meter", "Belok kiri",
 * "Naik Eskalator ke Lantai 2", "Sampai tujuan").
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;
  const WALK_SPEED_MPS = 1.2; // relaxed mall-walking pace
  const STRAIGHT_THRESHOLD = 0.34; // ~20deg — below this, path still reads as "straight"
  // Nav-graph edge weights are authored as SVG viewBox-unit distances (easy
  // to eyeball against the floor plan). DISPLAY_SCALE_M converts those into
  // plausible real-world meters (~1 unit ≈ 12cm) for anything shown to the
  // user (distance text, ETA). Internal path-finding and progress-fraction
  // math stays in raw units, where it's cheaper and the scale cancels out.
  const DISPLAY_SCALE_M = 0.12;

  function key(floor, nodeId) {
    return floor + "::" + nodeId;
  }

  /** Builds an adjacency list from navpoints + verticalLinks. */
  function buildGraph(navpoints) {
    const nodes = {}; // key -> {floor,nodeId,x,y}
    const adj = {}; // key -> [{to,weight,type,meta}]

    Object.keys(navpoints.floors).forEach((floorId) => {
      const floorDoc = navpoints.floors[floorId];
      floorDoc.nodes.forEach((n) => {
        const k = key(floorId, n.id);
        nodes[k] = { key: k, floor: floorId, nodeId: n.id, x: n.x, y: n.y };
        adj[k] = adj[k] || [];
      });
      floorDoc.edges.forEach(([a, b, w]) => {
        const ka = key(floorId, a),
          kb = key(floorId, b);
        adj[ka].push({ to: kb, weight: w, type: "walk" });
        adj[kb].push({ to: ka, weight: w, type: "walk" });
      });
    });

    (navpoints.verticalLinks || []).forEach((vl) => {
      const ka = key(vl.floorA, vl.nodeA),
        kb = key(vl.floorB, vl.nodeB);
      if (!adj[ka] || !adj[kb]) return;
      const meta = { vlId: vl.id, vType: vl.type, timePenalty: vl.timePenalty };
      adj[ka].push({ to: kb, weight: vl.distanceEquivalent, type: "vertical", meta });
      adj[kb].push({ to: ka, weight: vl.distanceEquivalent, type: "vertical", meta });
    });

    return { nodes, adj };
  }

  /** Plain-array Dijkstra — graphs here are small (tens of nodes), no need for a heap. */
  function dijkstra(graph, startKey, endKey) {
    const { nodes, adj } = graph;
    const dist = {},
      prevNode = {},
      prevEdge = {},
      visited = {};
    Object.keys(nodes).forEach((k) => (dist[k] = Infinity));
    dist[startKey] = 0;

    while (true) {
      let u = null,
        best = Infinity;
      Object.keys(dist).forEach((k) => {
        if (!visited[k] && dist[k] < best) {
          best = dist[k];
          u = k;
        }
      });
      if (u === null) break;
      if (u === endKey) break;
      visited[u] = true;
      (adj[u] || []).forEach((edge) => {
        const alt = dist[u] + edge.weight;
        if (alt < dist[edge.to]) {
          dist[edge.to] = alt;
          prevNode[edge.to] = u;
          prevEdge[edge.to] = edge;
        }
      });
    }

    if (dist[endKey] === undefined || dist[endKey] === Infinity) return null;

    const pathKeys = [];
    const edges = [];
    let cur = endKey;
    while (cur !== startKey) {
      pathKeys.unshift(cur);
      edges.unshift(prevEdge[cur]);
      cur = prevNode[cur];
      if (cur === undefined) return null;
    }
    pathKeys.unshift(startKey);

    return {
      totalDistance: dist[endKey],
      nodes: pathKeys.map((k) => nodes[k]),
      edges, // edges[i] connects nodes[i] -> nodes[i+1]
    };
  }

  /** Splits the raw node path into per-floor polylines ("legs"), recording
   *  the vertical-link metadata that joins each pair of legs. */
  function splitIntoLegs(rawPath) {
    const legs = [];
    const transitions = [];
    let currentLeg = [rawPath.nodes[0]];

    for (let i = 0; i < rawPath.edges.length; i++) {
      const edge = rawPath.edges[i];
      const nextNode = rawPath.nodes[i + 1];
      if (edge.type === "vertical") {
        legs.push(currentLeg);
        transitions.push({ afterLegIndex: legs.length - 1, meta: edge.meta, toFloor: nextNode.floor });
        currentLeg = [nextNode];
      } else {
        currentLeg.push(nextNode);
      }
    }
    legs.push(currentLeg);
    return { legs, transitions };
  }

  function legDistance(leg) {
    let d = 0;
    for (let i = 1; i < leg.length; i++) d += U.dist(leg[i - 1], leg[i]);
    return d;
  }

  /** Turn-by-turn instructions for a single floor's polyline. */
  function stepsForLeg(leg, isFirstLeg, isLastLegOverall, destinationName) {
    const steps = [];
    if (leg.length < 2) return steps;

    let segStart = 0; // index into leg where the current "straight" segment began
    let bearing = U.bearing(leg[0], leg[1]);

    for (let i = 1; i < leg.length - 1; i++) {
      const nextBearing = U.bearing(leg[i], leg[i + 1]);
      const diff = U.angleDiff(bearing, nextBearing);
      if (Math.abs(diff) > STRAIGHT_THRESHOLD) {
        const segPoints = leg.slice(segStart, i + 1);
        steps.push({
          type: isFirstLeg && steps.length === 0 ? "start" : "straight",
          distance: legDistance(segPoints),
          point: leg[i],
        });
        steps.push({
          type: diff > 0 ? "turn-right" : "turn-left",
          distance: 0,
          point: leg[i],
        });
        segStart = i;
      }
      bearing = nextBearing;
    }

    const tailPoints = leg.slice(segStart);
    if (tailPoints.length > 1) {
      steps.push({
        type: isFirstLeg && steps.length === 0 ? "start" : "straight",
        distance: legDistance(tailPoints),
        point: leg[leg.length - 1],
      });
    }

    if (isLastLegOverall) {
      steps.push({ type: "arrive", distance: 0, point: leg[leg.length - 1], destinationName });
    }
    return steps;
  }

  function verticalStep(meta, fromFloorLabel, toFloorLabel, goingUp) {
    const kind = meta.vType === "lift" ? "lift" : "escalator";
    return {
      type: (kind === "lift" ? "lift-" : "escalator-") + (goingUp ? "up" : "down"),
      distance: 0,
      timePenalty: meta.timePenalty,
      fromFloorLabel,
      toFloorLabel,
    };
  }

  /**
   * @param {object} navpoints  raw navpoints.json content
   * @param {object} floorsById map of floor id -> floor meta (for order/labels)
   * @param {{floor:string,nodeId:string}} origin
   * @param {{floor:string,nodeId:string}} destination
   * @param {string} destinationName
   */
  function computeRoute(navpoints, floorsById, origin, destination, destinationName) {
    const graph = buildGraph(navpoints);
    const startKey = key(origin.floor, origin.nodeId);
    const endKey = key(destination.floor, destination.nodeId);
    if (!graph.nodes[startKey] || !graph.nodes[endKey]) return null;

    const raw = dijkstra(graph, startKey, endKey);
    if (!raw) return null;

    const { legs, transitions } = splitIntoLegs(raw);

    let instructions = [];
    const legLengths = legs.map(legDistance);
    legs.forEach((leg, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === legs.length - 1;
      const legSteps = stepsForLeg(leg, isFirst, isLast, destinationName);

      // Tag each step with which leg it belongs to and how far into that
      // leg's polyline it occurs, so navigationEngine can announce the
      // upcoming maneuver with a live "N meter lagi" countdown as the user
      // (or the simulated dot) walks the leg.
      let running = 0;
      legSteps.forEach((step) => {
        if (step.type === "start" || step.type === "straight") running += step.distance;
        step.legIndex = idx;
        step.legCumDistance = running;
      });
      instructions = instructions.concat(legSteps);

      const transition = transitions.find((t) => t.afterLegIndex === idx);
      if (transition) {
        const fromFloor = floorsById[leg[0].floor];
        const toFloor = floorsById[transition.toFloor];
        const goingUp = toFloor.order > fromFloor.order;
        const vStep = verticalStep(transition.meta, fromFloor.label, toFloor.label, goingUp);
        vStep.legIndex = idx;
        vStep.legCumDistance = legLengths[idx];
        instructions.push(vStep);
      }
    });

    const totalWalkDistance = legLengths.reduce((sum, d) => sum + d, 0);
    const totalTimePenalty = transitions.reduce((sum, t) => sum + (t.meta.timePenalty || 0), 0);
    const totalWalkDistanceMeters = totalWalkDistance * DISPLAY_SCALE_M;
    const etaSeconds = totalWalkDistanceMeters / WALK_SPEED_MPS + totalTimePenalty;
    const floorsCrossed = transitions.length;

    return {
      legs, // array of arrays of {floor,nodeId,x,y} — raw SVG units
      legLengths, // raw SVG-unit length per leg (for progress-fraction math)
      transitions, // [{afterLegIndex, meta, toFloor}]
      instructions, // distance/legCumDistance fields are raw SVG units too
      totalDistanceRaw: totalWalkDistance,
      totalDistance: Math.round(totalWalkDistanceMeters), // meters, for display
      etaSeconds: Math.round(etaSeconds),
      floorsCrossed,
      startFloor: origin.floor,
      endFloor: destination.floor,
    };
  }

  global.MallNavRoute = { computeRoute, buildGraph, dijkstra, WALK_SPEED_MPS, DISPLAY_SCALE_M };
})(window);
