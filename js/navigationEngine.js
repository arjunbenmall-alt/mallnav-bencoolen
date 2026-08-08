/**
 * MallNav — navigationEngine.js
 * The conductor: takes a computed route (routeEngine) and plays it back leg
 * by leg through animationEngine + mapEngine, switching floors at
 * escalators/lifts and emitting everything the UI needs (uiComponents.js)
 * to render the instruction card, progress bar, ETA and arrival state.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;
  const Route = global.MallNavRoute;

  const INSTRUCTION_META = {
    start: { title: "Mulai berjalan", icon: "arrow-up" },
    straight: { title: "Jalan lurus", icon: "arrow-up" },
    "turn-left": { title: "Belok kiri", icon: "arrow-left" },
    "turn-right": { title: "Belok kanan", icon: "arrow-right" },
    "escalator-up": { title: "Naik Eskalator", icon: "escalator" },
    "escalator-down": { title: "Turun Eskalator", icon: "escalator" },
    "lift-up": { title: "Naik Lift", icon: "lift" },
    "lift-down": { title: "Turun Lift", icon: "lift" },
    arrive: { title: "Sampai di tujuan", icon: "flag" },
  };

  function instructionDisplay(step, destinationName) {
    const meta = INSTRUCTION_META[step.type] || INSTRUCTION_META.straight;
    if (step.type === "arrive") {
      return { title: "Sampai di " + destinationName, icon: meta.icon, sub: "Anda telah tiba" };
    }
    if (step.type.indexOf("escalator") === 0 || step.type.indexOf("lift") === 0) {
      return { title: meta.title + " ke " + step.toFloorLabel, icon: meta.icon, sub: null };
    }
    return { title: meta.title, icon: meta.icon, sub: null };
  }

  function createNavigationEngine(mapEngine) {
    const emitter = U.createEmitter();
    const Anim = global.MallNavAnimation;

    let ctx = null; // {floorsById, navpoints, places}
    let route = null;
    let origin = null;
    let destination = null;
    let currentLegIndex = 0;
    let controller = null;
    let followEnabled = true;
    let state = "idle"; // idle | previewing | navigating | arrived

    function setContext(c) {
      ctx = c;
    }

    function floorLabel(id) {
      return (ctx.floorsById[id] || {}).label || "Lantai " + id;
    }

    /** Computes the route and draws a first-leg preview (used by the
     *  Route Preview bottom sheet, before "Mulai Navigasi" is tapped). */
    function preview(originPoint, destinationPlace) {
      route = Route.computeRoute(ctx.navpoints, ctx.floorsById, originPoint, destinationPlace, destinationPlace.name);
      if (!route) return null;
      origin = originPoint;
      destination = destinationPlace;
      currentLegIndex = 0;
      state = "previewing";

      const firstLeg = route.legs[0];
      mapEngine.drawRouteLeg(firstLeg);
      mapEngine.drawStartPin(firstLeg[0]);
      if (route.legs.length === 1) {
        mapEngine.drawEndPin(firstLeg[firstLeg.length - 1], destinationPlace.color);
      }
      mapEngine.fitToBounds(firstLeg, 0.55, true, 500);

      return {
        route,
        distanceText: U.formatDistance(route.totalDistance),
        etaText: U.formatDuration(route.etaSeconds),
        floorsCrossed: route.floorsCrossed,
        startFloorLabel: floorLabel(route.startFloor),
        endFloorLabel: floorLabel(route.endFloor),
      };
    }

    function currentInstructionsForLeg(idx) {
      return route.instructions.filter((s) => s.legIndex === idx);
    }

    function emitProgress(distanceIntoLeg) {
      const legLenSoFar = route.legLengths.slice(0, currentLegIndex).reduce((a, b) => a + b, 0);
      const doneDistanceRaw = legLenSoFar + Math.min(distanceIntoLeg, route.legLengths[currentLegIndex] || 0);
      const fraction = route.totalDistanceRaw > 0 ? U.clamp(doneDistanceRaw / route.totalDistanceRaw, 0, 1) : 1;
      const remainingMeters = Math.max(0, route.totalDistance * (1 - fraction));
      const remainingSeconds = Math.max(0, route.etaSeconds * (1 - fraction));
      emitter.emit("progress", {
        percent: Math.round(fraction * 100),
        distanceRemainingText: U.formatDistance(remainingMeters),
        etaRemainingText: U.formatDuration(remainingSeconds),
      });
    }

    function emitInstructionForLegProgress(idx, distanceIntoLeg) {
      const steps = currentInstructionsForLeg(idx);
      if (!steps.length) return;
      let active = steps[0];
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].legCumDistance <= distanceIntoLeg + 0.5) active = steps[i + 1] || steps[i];
      }
      const display = instructionDisplay(active, destination.name);
      const remainingRaw = Math.max(0, active.legCumDistance - distanceIntoLeg);
      const remainingMeters = remainingRaw * Route.DISPLAY_SCALE_M;
      const sub =
        display.sub ||
        (active.type === "arrive" || active.type.indexOf("escalator") === 0 || active.type.indexOf("lift") === 0
          ? remainingMeters > 1
            ? "dalam " + U.formatDistance(remainingMeters)
            : ""
          : U.formatDistance(remainingMeters));
      emitter.emit("instruction", { title: display.title, icon: display.icon, sub });
    }

    function playLeg(idx) {
      currentLegIndex = idx;
      if (idx >= route.legs.length) return finishArrival();

      const leg = route.legs[idx];
      const floorId = leg[0].floor;

      mapEngine.drawRouteLeg(leg);
      if (idx === 0) mapEngine.drawStartPin(leg[0]);
      if (idx === route.legs.length - 1) mapEngine.drawEndPin(leg[leg.length - 1], destination.color);

      emitter.emit("leg-start", { floorId, floorLabel: floorLabel(floorId), legIndex: idx });
      emitInstructionForLegProgress(idx, 0);
      emitProgress(0);

      if (followEnabled) mapEngine.startFollow({ x: leg[0].x, y: leg[0].y, w: 260 });

      controller = Anim.animatePolyline(leg, {
        speed: Anim.DEFAULT_SPEED,
        onFrame: (point, bearing, fraction, distanceDone) => {
          mapEngine.setUserPosition(point, bearing);
          if (followEnabled) mapEngine.updateFollow({ x: point.x, y: point.y, w: 260 });
          mapEngine.drawTraveledOverlay(leg.slice(0, 1).concat([point]));
          emitInstructionForLegProgress(idx, distanceDone);
          emitProgress(distanceDone);
        },
        onDone: () => {
          const transition = route.transitions.find((t) => t.afterLegIndex === idx);
          if (transition) {
            handleTransition(transition, idx);
          } else {
            playLeg(idx + 1);
          }
        },
      });
    }

    function handleTransition(transition, completedLegIndex) {
      const fromFloor = floorLabel(route.legs[completedLegIndex][0].floor);
      const toFloor = floorLabel(transition.toFloor);
      const kind = transition.meta.vType === "lift" ? "Lift" : "Eskalator";
      emitter.emit("floor-transition-start", { fromFloor, toFloor, kind });
      mapEngine.stopFollow();

      setTimeout(async () => {
        await ctx.onLoadFloor(transition.toFloor);
        const nextLeg = route.legs[completedLegIndex + 1];
        mapEngine.setUserPosition(nextLeg[0], 0);
        emitter.emit("floor-transition-end", { toFloor });
        playLeg(completedLegIndex + 1);
      }, 1450);
    }

    function finishArrival() {
      state = "arrived";
      mapEngine.stopFollow();
      const last = route.legs[route.legs.length - 1];
      const arrivalPoint = last[last.length - 1];
      mapEngine.fitToPoint(arrivalPoint, 220, true, 500);
      U.vibrate([40, 40, 40]);
      emitter.emit("arrived", { place: destination, point: arrivalPoint });
    }

    function start() {
      if (!route) return;
      state = "navigating";
      playLeg(0);
    }

    function pause() {
      if (controller) controller.pause();
    }
    function resume() {
      if (controller) controller.resume();
    }
    function setFollow(enabled) {
      followEnabled = enabled;
      if (!enabled) mapEngine.stopFollow();
    }
    function recenter() {
      followEnabled = true;
      const leg = route.legs[currentLegIndex];
      mapEngine.startFollow({ x: leg[0].x, y: leg[0].y, w: 260 });
    }

    function exit() {
      if (controller) controller.cancel();
      mapEngine.stopFollow();
      state = "idle";
      route = null;
    }

    return {
      on: emitter.on,
      setContext,
      preview,
      start,
      pause,
      resume,
      recenter,
      setFollow,
      exit,
      getState: () => state,
      getRoute: () => route,
    };
  }

  global.MallNavNavigation = { create: createNavigationEngine };
})(window);
