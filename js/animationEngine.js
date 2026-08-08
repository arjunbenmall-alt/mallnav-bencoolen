/**
 * MallNav — animationEngine.js
 * Pure, reusable "walk along this polyline" driver. It knows nothing about
 * floors, maps, or UI — navigationEngine feeds it one leg (a same-floor
 * list of points) at a time and reacts to onFrame/onDone. Kept separate so
 * the smooth-dot-plus-camera-follow behaviour is easy to reason about and
 * test in isolation.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;
  const DEFAULT_SPEED = 130; // viewBox units / second — tuned for a lively but readable demo walk

  function cumulativeLengths(points) {
    const cum = [0];
    for (let i = 1; i < points.length; i++) {
      cum.push(cum[i - 1] + U.dist(points[i - 1], points[i]));
    }
    return cum;
  }

  function pointAt(points, cum, distance) {
    if (points.length === 1) return { point: points[0], bearing: 0 };
    const total = cum[cum.length - 1];
    const d = U.clamp(distance, 0, total);
    let idx = 0;
    while (idx < cum.length - 2 && cum[idx + 1] < d) idx++;
    const segLen = cum[idx + 1] - cum[idx] || 1;
    const t = (d - cum[idx]) / segLen;
    const a = points[idx],
      b = points[idx + 1];
    return {
      point: { x: U.lerp(a.x, b.x, t), y: U.lerp(a.y, b.y, t) },
      bearing: U.bearing(a, b),
    };
  }

  /**
   * @param {Array<{x:number,y:number}>} points
   * @param {object} opts { speed, onFrame(point,bearing,fraction,distanceDone,totalDistance), onDone }
   * @returns {object} controller { cancel, pause, resume, isPaused }
   */
  function animatePolyline(points, opts) {
    const speed = (opts && opts.speed) || DEFAULT_SPEED;
    const onFrame = (opts && opts.onFrame) || function () {};
    const onDone = (opts && opts.onDone) || function () {};

    const cum = cumulativeLengths(points);
    const total = cum[cum.length - 1];

    let raf = null;
    let cancelled = false;
    let paused = false;
    let accumulatedMs = 0;
    let resumeAt = null;

    if (total <= 0.001 || points.length < 2) {
      // Zero-length leg (e.g. arrival node identical to entry node) — resolve immediately.
      const only = points[0];
      requestAnimationFrame(() => {
        if (cancelled) return;
        onFrame(only, 0, 1, 0, 0);
        onDone();
      });
      return { cancel: () => (cancelled = true), pause: () => {}, resume: () => {}, isPaused: () => false };
    }

    function frame(now) {
      if (cancelled) return;
      if (paused) return;
      if (resumeAt === null) resumeAt = now;
      const elapsedMs = accumulatedMs + (now - resumeAt);
      const distanceDone = (elapsedMs / 1000) * speed;

      if (distanceDone >= total) {
        const { bearing } = pointAt(points, cum, total - 0.01);
        onFrame(points[points.length - 1], bearing, 1, total, total);
        onDone();
        return;
      }

      const { point, bearing } = pointAt(points, cum, distanceDone);
      onFrame(point, bearing, distanceDone / total, distanceDone, total);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return {
      cancel() {
        cancelled = true;
        if (raf) cancelAnimationFrame(raf);
      },
      pause() {
        if (paused || cancelled) return;
        paused = true;
        if (resumeAt !== null) accumulatedMs += performance.now() - resumeAt;
        if (raf) cancelAnimationFrame(raf);
      },
      resume() {
        if (!paused || cancelled) return;
        paused = false;
        resumeAt = null;
        raf = requestAnimationFrame(frame);
      },
      isPaused: () => paused,
    };
  }

  global.MallNavAnimation = { animatePolyline, DEFAULT_SPEED };
})(window);
