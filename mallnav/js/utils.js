/**
 * MallNav — utils.js
 * Framework-free helpers shared across engines. Loaded as a classic script
 * (no ES modules) so the app can be opened directly from disk (file://)
 * without hitting module CORS restrictions, while remaining fully
 * compatible with static hosting (GitHub Pages).
 */
(function (global) {
  "use strict";

  const Utils = {};

  // ---- DOM shorthands ----
  Utils.qs = (sel, root) => (root || document).querySelector(sel);
  Utils.qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  Utils.el = (tag, attrs, children) => {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  // ---- NS SVG helper ----
  Utils.SVG_NS = "http://www.w3.org/2000/svg";
  Utils.svgEl = (tag, attrs) => {
    const node = document.createElementNS(Utils.SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") node.setAttribute("class", attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    return node;
  };

  // ---- Math / geometry ----
  Utils.clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  Utils.lerp = (a, b, t) => a + (b - a) * t;
  Utils.dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  Utils.bearing = (a, b) => Math.atan2(b.y - a.y, b.x - a.x); // radians, screen space (y-down)

  /** Normalize an angle difference to [-PI, PI] */
  Utils.angleDiff = (a, b) => {
    let d = b - a;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    return d;
  };

  // ---- Timing ----
  Utils.debounce = (fn, ms) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };
  Utils.raf = (fn) => window.requestAnimationFrame(fn);

  // ---- Formatting ----
  /** distance in meters -> "120 m" or "1.2 km" */
  Utils.formatDistance = (m) => {
    if (m >= 1000) return (m / 1000).toFixed(1).replace(".0", "") + " km";
    return Math.round(m) + " m";
  };
  /** seconds -> "2 menit" / "45 detik" */
  Utils.formatDuration = (sec) => {
    if (sec >= 60) {
      const min = Math.round(sec / 60);
      return min + (min === 1 ? " menit" : " menit");
    }
    return Math.max(5, Math.round(sec / 5) * 5) + " detik";
  };

  // ---- String normalization & fuzzy matching (typo-tolerant search) ----
  const DIACRITICS_RE = /[\u0300-\u036f]/g;
  Utils.normalize = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(DIACRITICS_RE, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

  /** Classic Levenshtein edit distance, iterative DP, O(n*m). */
  Utils.levenshtein = (a, b) => {
    a = a || "";
    b = b || "";
    const m = a.length,
      n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let prev = new Array(n + 1);
    let curr = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      [prev, curr] = [curr, prev];
    }
    return prev[n];
  };

  /** Similarity score 0..1 (1 = identical) using normalized edit distance. */
  Utils.similarity = (a, b) => {
    const maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return 1;
    return 1 - Utils.levenshtein(a, b) / maxLen;
  };

  // ---- Misc ----
  Utils.uid = (prefix) => (prefix || "id") + "_" + Math.random().toString(36).slice(2, 9);
  Utils.vibrate = (pattern) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        /* no-op */
      }
    }
  };

  /** Minimal pub/sub event bus used to decouple engines from UI. */
  Utils.createEmitter = () => {
    const listeners = {};
    return {
      on(evt, fn) {
        (listeners[evt] = listeners[evt] || []).push(fn);
        return () => this.off(evt, fn);
      },
      off(evt, fn) {
        if (!listeners[evt]) return;
        listeners[evt] = listeners[evt].filter((f) => f !== fn);
      },
      emit(evt, payload) {
        (listeners[evt] || []).slice().forEach((fn) => fn(payload));
      },
    };
  };

  /** Simple ripple tap feedback for any element with position:relative + overflow:hidden desired. */
  Utils.attachRipple = (node) => {
    node.addEventListener(
      "pointerdown",
      (e) => {
        const rect = node.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
        const prevPosition = getComputedStyle(node).position;
        if (prevPosition === "static") node.style.position = "relative";
        node.style.overflow = node.style.overflow || "hidden";
        node.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      },
      { passive: true }
    );
  };

  global.MallNavUtils = Utils;
})(window);
