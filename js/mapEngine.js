/**
 * MallNav — mapEngine.js
 * Renders one floor at a time as a *live* SVG (never a static image) inside
 * a layered structure: Base Map → Route → Tenant → Facility → Navigation
 * (start/end pins) → User → Animation, exactly mirroring the layer concept
 * from the product spec. The camera is implemented by animating the outer
 * <svg>'s viewBox rather than CSS transforms, which keeps pointer math
 * simple and lets the browser do the scaling.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;

  function parseViewBox(vbStr) {
    const [x, y, w, h] = vbStr.split(/\s+/).map(Number);
    return { x, y, w, h };
  }

  function createMapEngine(containerEl) {
    const emitter = U.createEmitter();

    const svg = U.svgEl("svg", { viewBox: "0 0 1000 700", preserveAspectRatio: "xMidYMid meet" });
    svg.style.background = "var(--surface)";
    const layers = {};
    ["base", "route", "tenant", "facility", "navigation", "user", "animation"].forEach((name) => {
      layers[name] = U.svgEl("g", { class: "layer-" + name });
      svg.appendChild(layers[name]);
    });
    containerEl.innerHTML = "";
    containerEl.appendChild(svg);

    let baseViewBox = { x: 0, y: 0, w: 1000, h: 700 };
    let camera = { x: 0, y: 0, w: 1000, h: 700 };
    let currentFloorId = null;
    let pinsById = {};
    let followRAF = null;
    let followTarget = null; // {x,y,w}
    let cameraAnim = null; // {raf}

    // ---------------------------------------------------------------- fit
    function containerAspect() {
      const rect = containerEl.getBoundingClientRect();
      return rect.width && rect.height ? rect.width / rect.height : 0.5;
    }

    function computeFitCamera(bbox, paddingRatio) {
      const pad = paddingRatio == null ? 0.18 : paddingRatio;
      const aspect = containerAspect();
      const bw = bbox.w * (1 + pad);
      const bh = bbox.h * (1 + pad);
      let camW, camH;
      if (bw / bh > aspect) {
        camW = bw;
        camH = camW / aspect;
      } else {
        camH = bh;
        camW = camH * aspect;
      }
      return {
        x: bbox.x + bbox.w / 2 - camW / 2,
        y: bbox.y + bbox.h / 2 - camH / 2,
        w: camW,
        h: camH,
      };
    }

    function applyCamera() {
      svg.setAttribute("viewBox", `${camera.x} ${camera.y} ${camera.w} ${camera.h}`);
    }

    function cancelCameraAnim() {
      if (cameraAnim) {
        cancelAnimationFrame(cameraAnim);
        cameraAnim = null;
      }
    }

    function setCameraImmediate(cam) {
      cancelCameraAnim();
      camera = Object.assign({}, cam);
      applyCamera();
    }

    function animateCameraTo(cam, duration) {
      cancelCameraAnim();
      const from = Object.assign({}, camera);
      const to = Object.assign({}, cam);
      const dur = duration == null ? 520 : duration;
      const start = performance.now();
      function step(now) {
        const t = U.clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        camera = {
          x: U.lerp(from.x, to.x, eased),
          y: U.lerp(from.y, to.y, eased),
          w: U.lerp(from.w, to.w, eased),
          h: U.lerp(from.h, to.h, eased),
        };
        applyCamera();
        if (t < 1) cameraAnim = requestAnimationFrame(step);
        else cameraAnim = null;
      }
      cameraAnim = requestAnimationFrame(step);
    }

    function fitToFloor(animate) {
      const bbox = { x: baseViewBox.x + 30, y: baseViewBox.y + 50, w: baseViewBox.w - 60, h: baseViewBox.h - 100 };
      const cam = computeFitCamera(bbox, 0.04);
      if (animate) animateCameraTo(cam, 480);
      else setCameraImmediate(cam);
    }

    function fitToPoint(point, zoomWidth, animate, duration) {
      const bbox = { x: point.x - zoomWidth / 2, y: point.y - zoomWidth / 2, w: zoomWidth, h: zoomWidth };
      const cam = computeFitCamera(bbox, 0.15);
      if (animate) animateCameraTo(cam, duration || 520);
      else setCameraImmediate(cam);
    }

    function fitToBounds(points, paddingRatio, animate, duration) {
      const xs = points.map((p) => p.x),
        ys = points.map((p) => p.y);
      const minX = Math.min(...xs),
        maxX = Math.max(...xs),
        minY = Math.min(...ys),
        maxY = Math.max(...ys);
      const bbox = {
        x: minX,
        y: minY,
        w: Math.max(60, maxX - minX),
        h: Math.max(60, maxY - minY),
      };
      const cam = computeFitCamera(bbox, paddingRatio == null ? 0.35 : paddingRatio);
      if (animate) animateCameraTo(cam, duration || 560);
      else setCameraImmediate(cam);
    }

    // ------------------------------------------------------------ follow
    function startFollow(initialTarget) {
      followTarget = initialTarget;
      if (followRAF) return;
      function loop() {
        if (!followTarget) {
          followRAF = null;
          return;
        }
        const targetCam = computeFitCamera(
          { x: followTarget.x - 1, y: followTarget.y - 1, w: 2, h: 2 },
          0
        );
        // widen to requested zoom width
        const zw = followTarget.w || 260;
        const cam2 = computeFitCamera({ x: followTarget.x - zw / 2, y: followTarget.y - zw / 2, w: zw, h: zw }, 0);
        camera = {
          x: U.lerp(camera.x, cam2.x, 0.12),
          y: U.lerp(camera.y, cam2.y, 0.12),
          w: U.lerp(camera.w, cam2.w, 0.12),
          h: U.lerp(camera.h, cam2.h, 0.12),
        };
        applyCamera();
        followRAF = requestAnimationFrame(loop);
      }
      followRAF = requestAnimationFrame(loop);
    }
    function updateFollow(target) {
      followTarget = target;
    }
    function stopFollow() {
      followTarget = null;
      if (followRAF) {
        cancelAnimationFrame(followRAF);
        followRAF = null;
      }
    }

    // -------------------------------------------------------------- pan/zoom
    const pointers = new Map();
    let pinchStartDist = null;
    let pinchStartCam = null;
    let lastTapTime = 0;
    let dragLast = null;
    let dragMoved = false;

    function screenToViewbox(sx, sy) {
      const rect = svg.getBoundingClientRect();
      const u = camera.x + ((sx - rect.left) / rect.width) * camera.w;
      const v = camera.y + ((sy - rect.top) / rect.height) * camera.h;
      return { x: u, y: v };
    }

    function onPointerDown(e) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      svg.setPointerCapture && svg.setPointerCapture(e.pointerId);
      if (pointers.size === 1) {
        dragLast = { x: e.clientX, y: e.clientY };
        dragMoved = false;
      } else if (pointers.size === 2) {
        const pts = Array.from(pointers.values());
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartCam = Object.assign({}, camera);
      }
    }

    function onPointerMove(e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2 && pinchStartDist) {
        stopFollow();
        cancelCameraAnim();
        const pts = Array.from(pointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const scaleFactor = U.clamp(pinchStartDist / Math.max(dist, 1), 0.25, 4);
        const midScreen = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        const rect = svg.getBoundingClientRect();
        const focal = {
          x: pinchStartCam.x + ((midScreen.x - rect.left) / rect.width) * pinchStartCam.w,
          y: pinchStartCam.y + ((midScreen.y - rect.top) / rect.height) * pinchStartCam.h,
        };
        const newW = U.clamp(pinchStartCam.w * scaleFactor, 120, 1400);
        const newH = newW * (pinchStartCam.h / pinchStartCam.w);
        const relX = (midScreen.x - rect.left) / rect.width;
        const relY = (midScreen.y - rect.top) / rect.height;
        camera = {
          x: focal.x - relX * newW,
          y: focal.y - relY * newH,
          w: newW,
          h: newH,
        };
        applyCamera();
      } else if (pointers.size === 1 && dragLast) {
        stopFollow();
        cancelCameraAnim();
        const dx = e.clientX - dragLast.x;
        const dy = e.clientY - dragLast.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
        dragLast = { x: e.clientX, y: e.clientY };
        const rect = svg.getBoundingClientRect();
        camera.x -= (dx / rect.width) * camera.w;
        camera.y -= (dy / rect.height) * camera.h;
        applyCamera();
      }
    }

    function onPointerUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchStartDist = null;
      if (pointers.size === 0) {
        dragLast = null;
        if (!dragMoved) handleTap(e);
        dragMoved = false;
      }
    }

    function handleTap(e) {
      const now = Date.now();
      const isDoubleTap = now - lastTapTime < 320;
      lastTapTime = now;
      if (isDoubleTap) {
        stopFollow();
        const p = screenToViewbox(e.clientX, e.clientY);
        const zoomIn = camera.w > 300;
        fitToPoint(p, zoomIn ? 220 : 900, true, 380);
        return;
      }
      const pinNode = e.target.closest && e.target.closest(".map-pin");
      if (pinNode) {
        const id = pinNode.getAttribute("data-id");
        if (id && pinsById[id]) emitter.emit("pin-click", pinsById[id]);
      }
    }

    svg.addEventListener("pointerdown", onPointerDown);
    svg.addEventListener("pointermove", onPointerMove);
    svg.addEventListener("pointerup", onPointerUp);
    svg.addEventListener("pointercancel", onPointerUp);
    svg.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        stopFollow();
        cancelCameraAnim();
        const factor = e.deltaY > 0 ? 1.12 : 0.89;
        const rect = svg.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;
        const focal = { x: camera.x + relX * camera.w, y: camera.y + relY * camera.h };
        const newW = U.clamp(camera.w * factor, 120, 1400);
        const newH = newW * (camera.h / camera.w);
        camera = { x: focal.x - relX * newW, y: focal.y - relY * newH, w: newW, h: newH };
        applyCamera();
      },
      { passive: false }
    );

    /** Programmatic zoom (used by the on-screen +/- FAB controls), always
     *  centered on the container's current midpoint. */
    function zoomBy(factor) {
      stopFollow();
      cancelCameraAnim();
      const newW = U.clamp(camera.w * factor, 120, 1400);
      const newH = newW * (camera.h / camera.w);
      const cx = camera.x + camera.w / 2;
      const cy = camera.y + camera.h / 2;
      animateCameraTo({ x: cx - newW / 2, y: cy - newH / 2, w: newW, h: newH }, 200);
    }

    // ---------------------------------------------------------------- pins
    const CAT_ICON_PATHS = {
      toilet: "\uD83D\uDEBB",
      musala: "\uD83D\uDD4C",
      atm: "\uD83C\uDFE7",
      lift: "\uD83D\uDED7",
      escalator: "\u2B06",
      foodcourt: "\uD83C\uDF54",
      entrance: "\uD83D\uDEAA",
    };

    function pinGlyph(place) {
      if (place.type === "facility") return CAT_ICON_PATHS[place.category] || place.emoji || "\uD83D\uDCCD";
      return place.emoji || "\uD83D\uDECD";
    }

    function renderPin(place, layerName) {
      const g = U.svgEl("g", { class: "map-pin pop-in", "data-id": place.id, "data-cat": place.category });
      g.style.transformBox = "fill-box";
      g.style.transformOrigin = "center";
      const halo = U.svgEl("circle", { cx: place.x, cy: place.y, r: 26, class: "map-pin__halo" });
      const circle = U.svgEl("circle", { cx: place.x, cy: place.y, r: 15, class: "map-pin__circle", fill: place.color });
      const glyph = U.svgEl("text", { x: place.x, y: place.y + 1, class: "map-pin__glyph" });
      glyph.textContent = pinGlyph(place);
      const label = U.svgEl("text", { x: place.x, y: place.y + 30, class: "map-pin__label" });
      label.textContent = place.name;
      g.appendChild(halo);
      g.appendChild(circle);
      g.appendChild(glyph);
      g.appendChild(label);
      layers[layerName].appendChild(g);
      pinsById[place.id] = place;
    }

    function renderPins(places) {
      layers.tenant.innerHTML = "";
      layers.facility.innerHTML = "";
      pinsById = {};
      places.forEach((p) => renderPin(p, p.type === "tenant" ? "tenant" : "facility"));
    }

    function setSelectedPin(placeId) {
      U.qsa(".map-pin", svg).forEach((n) => n.classList.toggle("is-selected", n.getAttribute("data-id") === placeId));
    }

    // ----------------------------------------------------------- base svg
    function injectBaseSvg(svgText) {
      layers.base.innerHTML = "";
      const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
      const root = doc.documentElement;
      if (root.getAttribute("viewBox")) baseViewBox = parseViewBox(root.getAttribute("viewBox"));
      Array.from(root.childNodes).forEach((node) => {
        layers.base.appendChild(document.importNode(node, true));
      });
    }

    async function loadFloor(floorId, floorMeta, svgText, places, opts) {
      currentFloorId = floorId;
      injectBaseSvg(svgText);
      renderPins(places.filter((p) => p.floor === floorId));
      clearRoute();
      if (!opts || opts.fit !== false) fitToFloor(!!(opts && opts.animate));
    }

    // -------------------------------------------------------------- route
    function pointsToPath(points) {
      return points.map((p, i) => (i === 0 ? "M" : "L") + p.x + "," + p.y).join(" ");
    }

    function clearRoute() {
      layers.route.innerHTML = "";
      layers.navigation.innerHTML = "";
      layers.user.innerHTML = "";
    }

    function drawRouteLeg(points) {
      layers.route.innerHTML = "";
      const d = pointsToPath(points);
      layers.route.appendChild(U.svgEl("path", { d, class: "route-path-bg" }));
      layers.route.appendChild(U.svgEl("path", { d, class: "route-path" }));
      layers.route.appendChild(U.svgEl("path", { d, class: "route-path-flow" }));
    }

    function drawTraveledOverlay(points) {
      let node = svg.querySelector(".route-path-traveled");
      if (!node) {
        node = U.svgEl("path", { class: "route-path-traveled" });
        layers.route.insertBefore(node, layers.route.children[1] || null);
      }
      node.setAttribute("d", pointsToPath(points));
    }

    function drawStartPin(point) {
      const old = layers.navigation.querySelector(".map-pin-start");
      if (old) old.remove();
      const startG = U.svgEl("g", { class: "map-pin-start pop-in" });
      startG.appendChild(U.svgEl("circle", { cx: point.x, cy: point.y, r: 10 }));
      layers.navigation.appendChild(startG);
    }

    function drawEndPin(point, color) {
      const old = layers.navigation.querySelector(".map-pin-end");
      if (old) old.remove();
      const endG = U.svgEl("g", { class: "map-pin-end pop-in" });
      const pinPath = `M${point.x},${point.y - 26} c-9,0 -16,7 -16,16 c0,12 16,30 16,30 c0,0 16,-18 16,-30 c0,-9 -7,-16 -16,-16 z`;
      endG.appendChild(U.svgEl("path", { d: pinPath, fill: color || "var(--brand-red)" }));
      endG.appendChild(U.svgEl("circle", { cx: point.x, cy: point.y - 10, r: 5.5, fill: "#fff" }));
      layers.navigation.appendChild(endG);
    }

    // --------------------------------------------------------------- user
    function ensureUserDot() {
      if (layers.user.childElementCount) return;
      const g = U.svgEl("g", { class: "user-dot" });
      g.appendChild(U.svgEl("circle", { r: 11, class: "user-dot__ring" }));
      g.appendChild(U.svgEl("path", { class: "user-dot__beam", d: "M0,-26 L9,-2 L-9,-2 Z" }));
      g.appendChild(U.svgEl("circle", { r: 8, class: "user-dot__core" }));
      layers.user.appendChild(g);
    }

    function setUserPosition(point, bearingRad) {
      ensureUserDot();
      const g = layers.user.querySelector(".user-dot");
      const deg = (bearingRad * 180) / Math.PI + 90;
      g.setAttribute("transform", `translate(${point.x},${point.y}) rotate(${deg})`);
    }

    function hideUser() {
      layers.user.innerHTML = "";
    }

    // -------------------------------------------------------------- misc
    function burstAt(point, emoji) {
      const g = U.svgEl("text", {
        x: point.x,
        y: point.y,
        class: "map-pin__glyph pop-in",
        style: "font-size:34px;",
      });
      g.textContent = emoji || "\u2728";
      layers.animation.appendChild(g);
      setTimeout(() => g.remove(), 700);
    }

    return {
      svg,
      layers,
      on: emitter.on,
      loadFloor,
      renderPins,
      setSelectedPin,
      fitToFloor,
      fitToPoint,
      fitToBounds,
      zoomBy,
      startFollow,
      updateFollow,
      stopFollow,
      drawRouteLeg,
      drawTraveledOverlay,
      drawStartPin,
      drawEndPin,
      clearRoute,
      setUserPosition,
      hideUser,
      burstAt,
      getCurrentFloorId: () => currentFloorId,
      getCamera: () => Object.assign({}, camera),
    };
  }

  global.MallNavMapEngine = { create: createMapEngine };
})(window);
