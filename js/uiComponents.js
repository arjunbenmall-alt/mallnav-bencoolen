/**
 * MallNav — uiComponents.js
 * A tiny icon registry (inline SVG, currentColor, zero network requests)
 * plus generic, reusable widgets: draggable bottom sheet and toast.
 * Screen-specific rendering (search results, sheets content, etc.) lives in
 * app.js, which composes these building blocks.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;

  // ---------------------------------------------------------------- icons
  const ICONS = {
    logo: '<path d="M12 2C7.6 2 4 5.4 4 9.6 4 15 12 22 12 22s8-7 8-12.4C20 5.4 16.4 2 12 2Zm0 10.2a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" fill="#fff"/>',
    search: '<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M20 20l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    chevronRight: '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    star: '<path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.7Z" fill="currentColor"/>',
    sun: '<circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v2.4M12 19.6V22M22 12h-2.4M4.4 12H2M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7M19.1 19.1l-1.7-1.7M6.6 6.6 4.9 4.9"/></g>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" fill="currentColor"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
    plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    minus: '<path d="M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    compass: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path class="compass-needle" d="M12 6.5l2.2 5.5-2.2 5.5-2.2-5.5Z" fill="currentColor"/>',
    "arrow-up": '<path d="M12 20V6M6 11l6-6 6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    "arrow-left": '<path d="M20 12H6M11 6l-6 6 6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    "arrow-right": '<path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    escalator: '<path d="M4 19h4l9-9h4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 6.5h3.5V10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    lift: '<rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8v5M9.5 10.5 12 8l2.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    flag: '<path d="M6 21V4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M6 4h11l-3 4 3 4H6" fill="currentColor"/>',
    navigation: '<path d="M12 2 4 21l8-4.5L20 21 12 2Z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 7v5.5l4 2.3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    walk: '<circle cx="13" cy="4.5" r="2" fill="currentColor"/><path d="M10 21l1.6-6.4L9 13l1-4 4-1 3 2.5 3 1.5M11.6 14.6 15 16l-1 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    check: '<path d="M5 13l4.5 4.5L19 8" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    door: '<rect x="6" y="3" width="12" height="18" rx="1.5" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="14.5" cy="12" r="1" fill="currentColor"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9.5 16V8h3.2a2.6 2.6 0 1 1 0 5.2H9.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    "chevron-down": '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    "map-pin": '<path d="M12 21s7-6.6 7-11.6A7 7 0 0 0 5 9.4C5 14.4 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><circle cx="12" cy="9.4" r="2.3" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    sliders: '<g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="7" r="2" fill="var(--surface-elevated)"/><circle cx="16" cy="12" r="2" fill="var(--surface-elevated)"/><circle cx="10" cy="17" r="2" fill="var(--surface-elevated)"/></g>',

    /* ---- Category glyphs (replace emoji everywhere: pins, quick access,
       search results, directory list, preview banners) ---- */
    toilet: '<circle cx="12" cy="6.4" r="2.3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8.2 21v-6.4a3.8 3.8 0 0 1 7.6 0V21" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    musala: '<path d="M5.5 20.5v-6.8a6.5 6.5 0 0 1 13 0v6.8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 20.5v-4.2a2.5 2.5 0 0 1 5 0v4.2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 3.2c.9.9 1.4 1.7 1.4 2.5A1.4 1.4 0 0 1 12 7.1a1.4 1.4 0 0 1-1.4-1.4c0-.8.5-1.6 1.4-2.5Z" fill="currentColor"/>',
    atm: '<rect x="3" y="6" width="18" height="13" rx="2.2" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.8"/><line x1="6" y1="14.5" x2="11" y2="14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    nursery: '<path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><rect x="6.5" y="8" width="11" height="9" rx="3" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="10" cy="12.4" r="0.9" fill="currentColor"/><circle cx="14" cy="12.4" r="0.9" fill="currentColor"/><path d="M10.3 15c.5.5 1 .8 1.7.8s1.2-.3 1.7-.8" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
    infodesk: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="12" y1="11" x2="12" y2="16.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.15" fill="currentColor"/>',
    fashion: '<path d="M12 4.2a1.7 1.7 0 1 1 1.7 1.7" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M12 5.9 4 10.5v1.3h16v-1.3L12 5.9Z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/><path d="M4.6 11.5 3 18.8h18l-1.6-7.3" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
    fnb: '<g stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"><line x1="6.5" y1="3" x2="6.5" y2="10.5"/><line x1="4.5" y1="3" x2="4.5" y2="8.5"/><line x1="8.5" y1="3" x2="8.5" y2="8.5"/><path d="M4.5 8.5a2 2 0 0 0 4 0"/><line x1="6.5" y1="10.5" x2="6.5" y2="21"/><path d="M17 3c-1.8 0-3 1.8-3 4.5S15.2 12 17 12v9"/></g>',
    elektronik: '<rect x="7.5" y="2" width="9" height="20" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="18.2" r="1" fill="currentColor"/>',
    hiburan: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M10 8.3v7.4l6.3-3.7Z" fill="currentColor"/>',
    kecantikan: '<path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9Z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>',
    rumahtangga: '<path d="M4 11 12 4l8 7" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9.5h12V10" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><rect x="10" y="14" width="4" height="5.5" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    supermarket: '<path d="M3.5 4.5h2l1.7 11.2A2 2 0 0 0 9.2 17.4h8.1a2 2 0 0 0 2-1.7l1.2-6.7H6.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20.3" r="1.35" fill="currentColor"/><circle cx="17" cy="20.3" r="1.35" fill="currentColor"/>',
    travel: '<path d="M3 12.5 20 5l-6.4 15-2-7.4L3 12.5Z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round" stroke-linecap="round"/>',
    entrance: '<rect x="6" y="3" width="12" height="18" rx="1.5" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="14.5" cy="12" r="1" fill="currentColor"/>',
    "shopping-bag": '<path d="M6 8h12l1 12.5H5L6 8Z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" stroke-width="1.7" fill="none"/>',
    home: '<path d="M4 11 12 4l8 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9.5h4.5V15h3v4.5H18V10" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    info: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="12" y1="11" x2="12" y2="16.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.15" fill="currentColor"/>',
  };

  function icon(name, opts) {
    const size = (opts && opts.size) || 20;
    const svgPath = ICONS[name] || ICONS.star;
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${svgPath}</svg>`;
  }

  // Category key -> icon name, used everywhere a facility/tenant category
  // needs a visual glyph (quick access, search results, list rows, map
  // pins, preview banners) instead of an emoji.
  const CATEGORY_ICON = {
    toilet: "toilet",
    musala: "musala",
    atm: "atm",
    lift: "lift",
    escalator: "escalator",
    nursery: "nursery",
    infodesk: "infodesk",
    entrance: "entrance",
    fashion: "fashion",
    fnb: "fnb",
    elektronik: "elektronik",
    hiburan: "hiburan",
    kecantikan: "kecantikan",
    rumahtangga: "rumahtangga",
    supermarket: "supermarket",
    travel: "travel",
  };
  function categoryIconName(category) {
    return CATEGORY_ICON[category] || "shopping-bag";
  }
  function categoryIcon(category, opts) {
    return icon(categoryIconName(category), opts);
  }
  /** Raw inner-SVG markup for a named icon (no wrapping <svg>), used by
   *  mapEngine to inject the same glyph directly into the map's own SVG
   *  document (can't nest <svg> elements the same way inline HTML does). */
  function getIconMarkup(name) {
    return ICONS[name] || ICONS.star;
  }

  // -------------------------------------------------------------- toast
  function createToast(hostEl) {
    const node = U.el("div", { class: "toast" });
    hostEl.appendChild(node);
    let timer = null;
    return {
      show(message, ms) {
        node.textContent = message;
        node.classList.add("is-open");
        clearTimeout(timer);
        timer = setTimeout(() => node.classList.remove("is-open"), ms || 2200);
      },
    };
  }

  // ---------------------------------------------------------- bottom sheet
  /**
   * Generic draggable bottom sheet. `sheetEl` must already have the
   * `.sheet` structure (`.sheet__handle-wrap` + `.sheet__scroll`).
   */
  function createBottomSheet(sheetEl, scrimEl, opts) {
    const onClose = (opts && opts.onClose) || function () {};
    let startY = 0;
    let currentY = 0;
    let dragging = false;
    let openHeight = 0;

    function open() {
      sheetEl.style.transform = "";
      sheetEl.classList.add("is-open");
      scrimEl.classList.add("is-open");
    }
    function close() {
      sheetEl.classList.remove("is-open");
      scrimEl.classList.remove("is-open");
      sheetEl.style.transform = "";
      onClose();
    }
    function isOpen() {
      return sheetEl.classList.contains("is-open");
    }

    const handle = sheetEl.querySelector(".sheet__handle-wrap");
    function onDown(e) {
      dragging = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      openHeight = sheetEl.getBoundingClientRect().height;
      sheetEl.style.transition = "none";
    }
    function onMove(e) {
      if (!dragging) return;
      currentY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
      if (currentY < 0) currentY = 0;
      sheetEl.style.transform = `translateY(${currentY}px)`;
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      sheetEl.style.transition = "";
      if (currentY > openHeight * 0.28) {
        close();
      } else {
        sheetEl.style.transform = "";
      }
      currentY = 0;
    }

    handle.addEventListener("touchstart", onDown, { passive: true });
    handle.addEventListener("touchmove", onMove, { passive: true });
    handle.addEventListener("touchend", onUp);
    handle.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    scrimEl.addEventListener("click", close);

    return { open, close, isOpen };
  }

  global.MallNavUI = { icon, categoryIcon, categoryIconName, getIconMarkup, createToast, createBottomSheet };
})(window);
