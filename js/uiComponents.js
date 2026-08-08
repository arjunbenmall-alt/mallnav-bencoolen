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
    escalator: '<path d="M4 20V13l7-7h4M11 20l9-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="7" r="1.6" fill="currentColor"/>',
    lift: '<rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8v5M9.5 10.5 12 8l2.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    flag: '<path d="M6 21V4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M6 4h11l-3 4 3 4H6" fill="currentColor"/>',
    navigation: '<path d="M12 2 4 21l8-4.5L20 21 12 2Z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 7v5.5l4 2.3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    walk: '<circle cx="13" cy="4.5" r="2" fill="currentColor"/><path d="M10 21l1.6-6.4L9 13l1-4 4-1 3 2.5 3 1.5M11.6 14.6 15 16l-1 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    check: '<path d="M5 13l4.5 4.5L19 8" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    door: '<rect x="6" y="3" width="12" height="18" rx="1.5" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="14.5" cy="12" r="1" fill="currentColor"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9.5 16V8h3.2a2.6 2.6 0 1 1 0 5.2H9.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  };

  function icon(name, opts) {
    const size = (opts && opts.size) || 20;
    const svgPath = ICONS[name] || ICONS.star;
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${svgPath}</svg>`;
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

  global.MallNavUI = { icon, createToast, createBottomSheet };
})(window);
