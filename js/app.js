/**
 * MallNav — app.js
 * Bootstraps the app: loads data, wires the Home / Map-Preview /
 * Fullscreen-Navigation screens to the engines, and owns the small bits of
 * shared UI state (selected place, chosen origin, current theme).
 */
(function () {
  "use strict";

  const U = window.MallNavUtils;
  const UI = window.MallNavUI;
  const Storage = window.MallNavStorage;

  const $ = (id) => document.getElementById(id);

  const QUICK_ACTIONS = [
    { category: "toilet", label: "Toilet" },
    { category: "musala", label: "Mushola" },
    { category: "atm", label: "ATM" },
    { category: "lift", label: "Lift" },
    { category: "escalator", label: "Eskalator" },
    { category: "fnb", label: "Kuliner" },
    { category: "__all_tenant__", label: "Semua Tenant", icon: "shopping-bag" },
  ];

  const state = {
    theme: Storage.get("theme", null),
    data: null,
    floorsById: {},
    homeFloor: "1",
    mapFloor: "1",
    selectedPlace: null,
    qrOrigin: null,
    chosenOrigin: null,
    activeScreen: "home",
  };

  let mapEngineMap, mapEngineNav, navPreview, navPlay, toast, previewSheet, originSheet, infoSheet;

  // ----------------------------------------------------------------- theme
  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
    const meta = $("metaThemeColor");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1220" : "#2952e3");
  }
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    state.theme = next;
    Storage.set("theme", next);
    applyTheme(next);
  }
  function initTheme() {
    let theme = state.theme;
    if (!theme) {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(theme);
  }

  // ---------------------------------------------------------------- screens
  function showScreen(name) {
    state.activeScreen = name;
    ["home", "map", "nav"].forEach((n) => {
      const el = $("screen-" + n);
      el.classList.toggle("is-active", n === name);
    });
    const active = $("screen-" + name);
    active.classList.remove("screen-fade-enter");
    void active.offsetWidth;
    active.classList.add("screen-fade-enter");
    syncBottomNav(name);
  }

  // ------------------------------------------------------------ bottom nav
  function syncBottomNav(screenName) {
    const bar = $("bottomNav");
    if (!bar) return;
    // Visible on Home and Map (browsing/preview); hidden only during the
    // focused fullscreen turn-by-turn mode, which already owns a busy
    // bottom area (progress bar, ETA, end button).
    bar.classList.toggle("is-hidden", screenName === "nav");
    U.qsa(".bottom-nav__item", bar).forEach((btn) => {
      const tabForScreen = screenName === "map" ? "navTabMap" : screenName === "home" ? "navTabHome" : null;
      btn.classList.toggle("is-active", btn.id === tabForScreen);
    });
  }

  async function openMapBrowse() {
    showScreen("map");
    $("routeSummary").style.display = "none";
    previewSheet.close();
    $("mapLoadingVeil").classList.remove("is-hidden");
    const floorId = state.mapFloor || "1";
    renderFloorPills($("mapFloorPills"), floorId, selectMapFloor, "map-floor-pill");
    await loadFloorInto(mapEngineMap, floorId, { fit: false });
    mapEngineMap.fitToFloor(true);
    mapEngineMap.setSelectedPin(null);
    $("mapLoadingVeil").classList.add("is-hidden");
  }

  function openInfoSheet() {
    const content = $("infoSheetContent");
    content.innerHTML = "";
    content.appendChild(
      U.el("div", { class: "sheet__header" }, [
        U.el("div", { class: "sheet__avatar swatch-infodesk", html: UI.icon("info", { size: 24 }) }),
        U.el("div", { class: "sheet__header-text" }, [U.el("div", { class: "sheet__cat" }, ["Tentang"])]),
      ])
    );
    content.appendChild(U.el("div", { class: "sheet__title-row" }, [U.el("div", { class: "sheet__title" }, ["MallNav"])]));
    content.appendChild(
      U.el("div", { class: "sheet__desc" }, [
        "Navigasi indoor Bencoolen Mall — cari tenant atau fasilitas, lihat rute, dan sampai dalam hitungan detik.",
      ])
    );
    const metaRow = U.el("div", { class: "sheet__meta-row no-scrollbar" }, [
      metaChip("Jam Operasional", "10:00 - 22:00"),
      metaChip("Total Tenant", "200+"),
      metaChip("Lantai", "3 Lantai"),
    ]);
    content.appendChild(metaRow);
    content.appendChild(U.el("div", { class: "section-heading", style: "padding:18px 0 8px;" }, [U.el("div", { class: "section-heading__title", style: "font-size:15px;" }, ["Fasilitas Tersedia"])]));
    const facilityCats = Object.keys(state.data.facilityCategories || {});
    const facList = U.el("div", { class: "directory-list", style: "margin:0;" }, []);
    facilityCats.forEach((cat) => {
      const meta = state.data.facilityCategories[cat];
      facList.appendChild(
        U.el("div", { class: "directory-item" }, [
          U.el("div", { class: "search-result__icon swatch-" + cat, html: UI.categoryIcon(cat, { size: 18 }) }),
          U.el("div", { class: "search-result__body" }, [U.el("div", { class: "search-result__name" }, [meta.label])]),
        ])
      );
    });
    content.appendChild(facList);
    content.appendChild(U.el("div", { class: "sheet__actions" }, [U.el("button", { class: "btn btn-secondary", style: "width:100%;", onClick: () => infoSheet.close() }, ["Tutup"])]));
    infoSheet.open();
  }

  function wireBottomNav() {
    $("navTabHome").querySelector(".bottom-nav__icon").innerHTML = UI.icon("home", { size: 22 });
    $("navTabSearch").querySelector(".bottom-nav__icon").innerHTML = UI.icon("search", { size: 22 });
    $("navTabMap").querySelector(".bottom-nav__icon").innerHTML = UI.icon("layers", { size: 22 });
    $("navTabInfo").querySelector(".bottom-nav__icon").innerHTML = UI.icon("info", { size: 22 });

    $("navTabHome").addEventListener("click", () => showScreen("home"));
    $("navTabSearch").addEventListener("click", () => {
      showScreen("home");
      setTimeout(() => $("searchInput").focus(), 260);
    });
    $("navTabMap").addEventListener("click", () => openMapBrowse());
    $("navTabInfo").addEventListener("click", () => openInfoSheet());
  }

  // ----------------------------------------------------------- floor pills
  function renderFloorPills(container, activeFloor, onSelect, pillClass) {
    container.innerHTML = "";
    state.data.floors.forEach((f) => {
      const btn = U.el(
        "button",
        {
          class: (pillClass || "floor-pill") + (f.id === activeFloor ? " is-active" : ""),
          onClick: () => onSelect(f.id),
        },
        [f.shortLabel]
      );
      container.appendChild(btn);
    });
  }

  // ------------------------------------------------------------- directory
  function placeIconMarkup(place, size) {
    return UI.categoryIcon(place.category, { size: size || 18 });
  }

  function floorLabelOf(floorId) {
    const f = state.floorsById[floorId];
    return f ? f.label : "Lantai " + floorId;
  }
  function floorShortLabelOf(floorId) {
    const f = state.floorsById[floorId];
    return f ? f.shortLabel : floorId;
  }

  function renderDirectoryList(floorId) {
    const list = $("homeDirectoryList");
    list.innerHTML = "";
    const items = state.data.places
      .filter((p) => p.floor === floorId)
      .sort((a, b) => a.name.localeCompare(b.name));
    items.forEach((place) => {
      const row = U.el(
        "button",
        { class: "directory-item", style: "width:100%;", onClick: () => openPreview(place) },
        [
          U.el("div", { class: "search-result__icon swatch-" + place.category, html: placeIconMarkup(place) }),
          U.el("div", { class: "search-result__body" }, [
            U.el("div", { class: "search-result__name" }, [place.name]),
            U.el("div", { class: "search-result__meta" }, [place.categoryLabel + " \u00B7 " + floorShortLabelOf(place.floor)]),
          ]),
          U.el("span", { class: "directory-item__nav", html: UI.icon("navigation", { size: 14 }) }),
        ]
      );
      list.appendChild(row);
    });
  }

  // -------------------------------------------------------------- popular
  const POPULAR_IDS = ["matahari", "samsung", "informa", "kimfashion", "ramen1", "azko"];
  function renderPopular() {
    const row = $("popularRow");
    if (!row) return;
    row.innerHTML = "";
    const byId = {};
    state.data.places.forEach((p) => (byId[p.id] = p));
    const items = POPULAR_IDS.map((id) => byId[id]).filter(Boolean);
    items.forEach((place) => {
      const card = U.el(
        "button",
        { class: "popular-card", onClick: () => openPreview(place) },
        [
          U.el("div", { class: "popular-card__icon swatch-" + place.category, html: placeIconMarkup(place, 18) }),
          U.el("div", { class: "popular-card__name" }, [place.name]),
          U.el("div", { class: "popular-card__meta" }, [floorShortLabelOf(place.floor)]),
        ]
      );
      row.appendChild(card);
    });
  }

  // ------------------------------------------------------------ quick acts
  function renderQuickActions() {
    const grid = $("quickActions");
    grid.innerHTML = "";
    QUICK_ACTIONS.forEach((qa) => {
      const iconMarkup = qa.icon ? UI.icon(qa.icon, { size: 19 }) : UI.categoryIcon(qa.category, { size: 19 });
      const btn = U.el(
        "button",
        {
          class: "quick-action",
          onClick: () => {
            btn.classList.remove("is-tapped");
            void btn.offsetWidth;
            btn.classList.add("is-tapped");
            handleQuickAction(qa);
          },
        },
        [
          U.el("div", { class: "quick-action__icon", html: iconMarkup }),
          U.el("div", { class: "quick-action__label" }, [qa.label]),
        ]
      );
      U.attachRipple(btn);
      grid.appendChild(btn);
    });
  }

  function handleQuickAction(qa) {
    let results;
    if (qa.category === "__all_tenant__") {
      results = state.data.places.filter((p) => p.type === "tenant").sort((a, b) => a.name.localeCompare(b.name));
    } else {
      results = state.data.places.filter((p) => p.category === qa.category).sort((a, b) => a.floor.localeCompare(b.floor));
    }
    renderSearchResults(results, qa.label);
    $("searchResults").classList.add("is-open");
    $("searchInput").focus();
  }

  // -------------------------------------------------------------- search
  function renderSearchResults(places, emptyContextLabel) {
    const box = $("searchResults");
    box.innerHTML = "";
    if (!places.length) {
      box.appendChild(
        U.el("div", { class: "search-empty" }, [
          "Tidak ditemukan" + (emptyContextLabel ? ' untuk "' + emptyContextLabel + '"' : "") + ". Coba kata kunci lain.",
        ])
      );
      return;
    }
    places.forEach((place, i) => {
      const row = U.el(
        "button",
        {
          class: "search-result pop-in",
          style: "animation-delay:" + Math.min(i * 25, 150) + "ms",
          onClick: () => {
            $("searchInput").value = "";
            $("btnClearSearch").style.display = "none";
            box.classList.remove("is-open");
            openPreview(place);
          },
        },
        [
          U.el("div", { class: "search-result__icon swatch-" + place.category, html: placeIconMarkup(place) }),
          U.el("div", { class: "search-result__body" }, [
            U.el("div", { class: "search-result__name" }, [place.name]),
            U.el("div", { class: "search-result__meta" }, [place.categoryLabel + " \u00B7 " + floorLabelOf(place.floor)]),
          ]),
          U.el("span", { class: "search-result__go", html: UI.icon("chevronRight", { size: 18 }) }),
        ]
      );
      box.appendChild(row);
    });
  }

  const SUGGEST_CATEGORIES = [
    { category: "toilet", label: "Toilet" },
    { category: "musala", label: "Mushola" },
    { category: "atm", label: "ATM" },
  ];

  function renderSearchSuggestions() {
    const box = $("searchResults");
    box.innerHTML = "";
    const wrap = U.el("div", { class: "search-suggest" }, []);
    wrap.appendChild(U.el("div", { class: "search-suggest__label" }, ["Pencarian Populer"]));
    const chips = U.el("div", { class: "search-suggest__chips" }, []);
    SUGGEST_CATEGORIES.forEach((sc) => {
      chips.appendChild(
        U.el(
          "button",
          { class: "search-suggest__chip", html: UI.categoryIcon(sc.category, { size: 15 }) + " " + sc.label, onClick: () => handleQuickAction(sc) }
        )
      );
    });
    wrap.appendChild(chips);
    wrap.appendChild(U.el("div", { class: "search-suggest__label" }, ["Tenant"]));
    box.appendChild(wrap);

    const byId = {};
    state.data.places.forEach((p) => (byId[p.id] = p));
    const items = POPULAR_IDS.map((id) => byId[id]).filter(Boolean).slice(0, 5);
    items.forEach((place) => {
      box.appendChild(
        U.el(
          "button",
          {
            class: "search-result",
            onClick: () => {
              $("searchInput").value = "";
              $("btnClearSearch").style.display = "none";
              box.classList.remove("is-open");
              openPreview(place);
            },
          },
          [
            U.el("div", { class: "search-result__icon swatch-" + place.category, html: placeIconMarkup(place) }),
            U.el("div", { class: "search-result__body" }, [
              U.el("div", { class: "search-result__name" }, [place.name]),
              U.el("div", { class: "search-result__meta" }, [place.categoryLabel + " \u00B7 " + floorLabelOf(place.floor)]),
            ]),
            U.el("span", { class: "search-result__go", html: UI.icon("chevronRight", { size: 18 }) }),
          ]
        )
      );
    });
    box.classList.add("is-open");
  }

  function wireSearch() {
    const input = $("searchInput");
    const clearBtn = $("btnClearSearch");
    const box = $("searchResults");
    const run = U.debounce(() => {
      const q = input.value.trim();
      clearBtn.style.display = q ? "flex" : "none";
      if (!q) {
        renderSearchSuggestions();
        return;
      }
      const results = window.MallNavSearch.search(q, state.data.places, 8);
      renderSearchResults(results, q);
      box.classList.add("is-open");
    }, 90);
    input.addEventListener("input", run);
    input.addEventListener("focus", () => {
      if (input.value.trim()) box.classList.add("is-open");
      else renderSearchSuggestions();
    });
    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      renderSearchSuggestions();
      input.focus();
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap") && !e.target.closest(".quick-actions")) {
        box.classList.remove("is-open");
      }
    });
  }

  // --------------------------------------------------------- map loading
  async function loadFloorInto(engine, floorId, opts) {
    const meta = state.floorsById[floorId];
    const svgText = state.data.svgByFloor[floorId];
    await engine.loadFloor(floorId, meta, svgText, state.data.places, opts);
  }

  // ------------------------------------------------------------- preview
  function metaChip(label, value) {
    return U.el("div", { class: "sheet__meta-chip" }, [
      U.el("div", { class: "sheet__meta-chip-label" }, [label]),
      U.el("div", { class: "sheet__meta-chip-value" }, [value]),
    ]);
  }

  function quickEstimateFor(place) {
    const origin = state.qrOrigin || state.chosenOrigin;
    if (!origin) return null;
    const route = window.MallNavRoute.computeRoute(state.data.navpoints, state.floorsById, origin, { floor: place.floor, nodeId: place.nodeId }, place.name);
    if (!route) return null;
    return { distance: U.formatDistance(route.totalDistance), duration: U.formatDuration(route.etaSeconds) };
  }

  async function openPreview(place) {
    state.selectedPlace = place;
    showScreen("map");
    $("routeSummary").style.display = "none";
    $("mapLoadingVeil").classList.remove("is-hidden");
    state.mapFloor = place.floor;
    renderFloorPills($("mapFloorPills"), state.mapFloor, selectMapFloor, "map-floor-pill");
    await loadFloorInto(mapEngineMap, place.floor, { fit: false });
    mapEngineMap.fitToPoint(place, 240, true, 500);
    mapEngineMap.setSelectedPin(place.id);
    $("mapLoadingVeil").classList.add("is-hidden");

    const est = quickEstimateFor(place);
    const content = $("previewSheetContent");
    content.innerHTML = "";
    content.appendChild(
      U.el("div", { class: "sheet__header" }, [
        U.el("div", { class: "sheet__avatar swatch-" + place.category, html: placeIconMarkup(place, 24) }),
        U.el("div", { class: "sheet__header-text" }, [U.el("div", { class: "sheet__cat" }, [place.categoryLabel])]),
        U.el("div", { class: "sheet__rating", html: UI.icon("star", { size: 14 }) + " " + place.rating.toFixed(1) }),
      ])
    );
    content.appendChild(
      U.el("div", { class: "sheet__title-row" }, [U.el("div", { class: "sheet__title" }, [place.name])])
    );
    const metaRow = U.el("div", { class: "sheet__meta-row no-scrollbar" }, [
      metaChip("Lantai", floorShortLabelOf(place.floor)),
      metaChip("Jam Buka", place.hours),
      metaChip("Estimasi Jalan", est ? est.distance : "\u2014"),
      metaChip("Estimasi Waktu", est ? est.duration : "\u2014"),
    ]);
    content.appendChild(metaRow);
    content.appendChild(U.el("div", { class: "sheet__desc" }, [place.description || ""]));
    content.appendChild(
      U.el("div", { class: "sheet__actions" }, [
        U.el("button", { class: "btn btn-secondary", onClick: () => previewSheet.close() }, ["Tutup"]),
        U.el(
          "button",
          {
            class: "btn btn-primary",
            html: UI.icon("navigation", { size: 18 }) + " Mulai Navigasi",
            onClick: () => handleStartFlow(place),
          },
          []
        ),
      ])
    );
    previewSheet.open();
  }

  async function selectMapFloor(floorId) {
    if (floorId === state.mapFloor) return;
    state.mapFloor = floorId;
    renderFloorPills($("mapFloorPills"), state.mapFloor, selectMapFloor, "map-floor-pill");
    mapEngineMap.clearRoute();
    $("routeSummary").style.display = "none";
    await loadFloorInto(mapEngineMap, floorId, { fit: true, animate: true });
  }

  // ------------------------------------------------------------- origin
  function originIconFor(code) {
    if (code.indexOf("parkir") >= 0) return "parking";
    if (code.indexOf("escalator") >= 0 || code.indexOf("eskalator") >= 0) return "escalator";
    return "door";
  }

  function openOriginPicker(place) {
    const list = $("originOptionsList");
    list.innerHTML = "";
    state.data.qrpoints.forEach((qp) => {
      const btn = U.el(
        "button",
        {
          class: "origin-option",
          onClick: () => {
            state.chosenOrigin = { floor: qp.floor, nodeId: qp.nodeId, label: qp.label };
            originSheet.close();
            proceedToRoutePreview(state.chosenOrigin, place);
          },
        },
        [
          U.el("div", { class: "origin-option__icon", html: UI.icon(originIconFor(qp.code), { size: 18 }) }),
          U.el("div", {}, [
            U.el("div", { class: "origin-option__label" }, [qp.label]),
            U.el("div", { class: "origin-option__sub" }, [floorLabelOf(qp.floor)]),
          ]),
        ]
      );
      list.appendChild(btn);
    });
    originSheet.open();
  }

  function handleStartFlow(place) {
    previewSheet.close();
    const origin = state.qrOrigin || state.chosenOrigin;
    if (origin) {
      proceedToRoutePreview(origin, place);
    } else {
      openOriginPicker(place);
    }
  }

  // --------------------------------------------------------------- route
  async function proceedToRoutePreview(origin, place) {
    if (state.mapFloor !== origin.floor) {
      state.mapFloor = origin.floor;
      renderFloorPills($("mapFloorPills"), state.mapFloor, selectMapFloor, "map-floor-pill");
      await loadFloorInto(mapEngineMap, origin.floor, { fit: false });
    }
    const result = navPreview.preview(origin, place);
    if (!result) {
      toast.show("Rute tidak ditemukan untuk tujuan ini.");
      return;
    }
    const card = $("routeSummary");
    card.innerHTML = "";
    card.appendChild(
      U.el("div", { class: "route-summary__row" }, [
        U.el("div", { class: "route-summary__icon", html: UI.icon("navigation", { size: 20 }) }),
        U.el("div", { class: "route-summary__info" }, [
          U.el("div", { class: "route-summary__dest" }, [place.name]),
          U.el("div", { class: "route-summary__stats" }, [
            U.el("b", {}, [result.distanceText]),
            document.createTextNode(" \u00B7 "),
            U.el("b", {}, [result.etaText]),
            document.createTextNode(" \u00B7 dari " + origin.label),
          ]),
        ]),
      ])
    );
    if (result.floorsCrossed > 0) {
      card.appendChild(
        U.el("div", { class: "route-summary__floors", html: UI.icon("layers", { size: 13 }) + " Melewati " + result.floorsCrossed + " transisi lantai (" + result.startFloorLabel + " \u2192 " + result.endFloorLabel + ")" })
      );
    }
    card.appendChild(
      U.el(
        "button",
        {
          class: "btn btn-primary",
          html: UI.icon("navigation", { size: 18 }) + " Mulai Navigasi",
          onClick: () => startFullNavigation(origin, place),
        },
        []
      )
    );
    card.style.display = "block";
  }

  // --------------------------------------------------------- full nav mode
  function setFloorTransitionOpen(open, payload) {
    const el = $("floorTransition");
    if (open) {
      $("floorTransitionIcon").innerHTML = UI.icon(payload.kind === "Lift" ? "lift" : "escalator", { size: 26 });
      $("floorTransitionTitle").textContent = (payload.kind === "Lift" ? "Naik Lift" : "Naik Eskalator");
      $("floorTransitionSub").textContent = "Menuju " + payload.toFloor;
    }
    el.classList.toggle("is-open", open);
  }

  function wireNavEvents() {
    navPlay.on("instruction", (d) => {
      $("navInstructionIcon").innerHTML = UI.icon(d.icon, { size: 26 });
      $("navInstructionMain").textContent = d.title;
      $("navInstructionSub").textContent = d.sub || "";
    });
    navPlay.on("progress", (d) => {
      $("navProgressFill").style.width = d.percent + "%";
      $("navEta").textContent = d.etaRemainingText;
      $("navDist").textContent = d.distanceRemainingText + " tersisa";
    });
    navPlay.on("floor-transition-start", (payload) => setFloorTransitionOpen(true, payload));
    navPlay.on("floor-transition-end", () => setFloorTransitionOpen(false, {}));
    navPlay.on("arrived", ({ place, point }) => {
      $("arrivalIcon").innerHTML = UI.icon("flag", { size: 30 });
      $("arrivalTitle").textContent = "Anda telah tiba!";
      $("arrivalSub").textContent = "di " + place.name;
      $("arrivalCard").classList.add("is-open");
      mapEngineNav.burstAt(point || { x: 500, y: 350 });
    });
  }

  async function startFullNavigation(origin, place) {
    showScreen("nav");
    $("arrivalCard").classList.remove("is-open");
    $("navProgressFill").style.width = "0%";
    await loadFloorInto(mapEngineNav, origin.floor, { fit: false });
    const result = navPlay.preview(origin, place);
    if (!result) {
      toast.show("Rute tidak ditemukan.");
      showScreen("map");
      return;
    }
    navPlay.start();
  }

  function exitNavigation(goHome) {
    navPlay.exit();
    $("arrivalCard").classList.remove("is-open");
    setFloorTransitionOpen(false, {});
    showScreen(goHome ? "home" : "map");
  }

  // ------------------------------------------------------------- wiring
  function wireStaticButtons() {
    $("btnTheme").innerHTML = `<span class="icon-sun">${UI.icon("sun", { size: 20 })}</span><span class="icon-moon">${UI.icon("moon", { size: 20 })}</span>`;
    $("btnThemeMap").innerHTML = `<span class="icon-sun">${UI.icon("sun", { size: 20 })}</span><span class="icon-moon">${UI.icon("moon", { size: 20 })}</span>`;
    $("btnTheme").addEventListener("click", toggleTheme);
    $("btnThemeMap").addEventListener("click", toggleTheme);

    $("homeSearchIcon").innerHTML = UI.icon("search", { size: 20 });
    $("btnClearSearch").innerHTML = UI.icon("close", { size: 14 });
    $("mapSearchIcon").innerHTML = UI.icon("search", { size: 18 });

    $("btnMapBack").innerHTML = UI.icon("arrow-left", { size: 20 });
    $("btnMapBack").addEventListener("click", () => showScreen("home"));
    $("btnMapSearch").addEventListener("click", () => {
      showScreen("home");
      setTimeout(() => $("searchInput").focus(), 260);
    });

    $("btnZoomIn").innerHTML = UI.icon("plus", { size: 20 });
    $("btnZoomOut").innerHTML = UI.icon("minus", { size: 20 });
    $("btnRecenterMap").innerHTML = UI.icon("compass", { size: 20 });
    $("btnZoomIn").addEventListener("click", () => mapEngineMap.zoomBy(0.8));
    $("btnZoomOut").addEventListener("click", () => mapEngineMap.zoomBy(1.25));
    $("btnRecenterMap").addEventListener("click", () => mapEngineMap.fitToFloor(true));

    $("btnNavZoomIn").innerHTML = UI.icon("plus", { size: 20 });
    $("btnNavZoomOut").innerHTML = UI.icon("minus", { size: 20 });
    $("btnNavRecenter").innerHTML = UI.icon("compass", { size: 20 });
    $("btnNavZoomIn").addEventListener("click", () => mapEngineNav.zoomBy(0.8));
    $("btnNavZoomOut").addEventListener("click", () => mapEngineNav.zoomBy(1.25));
    $("btnNavRecenter").addEventListener("click", () => navPlay.recenter());

    $("btnEndNav").addEventListener("click", () => {
      exitNavigation(false);
      toast.show("Navigasi diakhiri");
    });
    $("btnArrivalDone").addEventListener("click", () => {
      exitNavigation(true);
      toast.show("Selamat, Anda telah sampai di tujuan.");
    });
  }

  // ------------------------------------------------------------ QR parsing
  function resolveQrOrigin() {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    if (!from) return null;
    const match = state.data.qrpoints.find((qp) => qp.code === from);
    if (!match) return null;
    return { floor: match.floor, nodeId: match.nodeId, label: match.label };
  }

  // ---------------------------------------------------------- service worker
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return; // SW requires http(s)
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        /* offline install is a bonus, never block the app on it */
      });
    });
  }

  function selectHomeFloor(fid) {
    state.homeFloor = fid;
    renderFloorPills($("homeFloorPills"), state.homeFloor, selectHomeFloor, "floor-pill");
    renderDirectoryList(fid);
  }

  // -------------------------------------------------------------------- init
  async function init() {
    initTheme();
    showScreen("home");
    toast = UI.createToast(document.body);
    previewSheet = UI.createBottomSheet($("previewSheet"), $("previewScrim"), {});
    originSheet = UI.createBottomSheet($("originSheet"), $("originScrim"), {});
    infoSheet = UI.createBottomSheet($("infoSheet"), $("infoScrim"), {});
    wireBottomNav();
    wireStaticButtons();

    state.data = await window.MallNavData.load();
    state.data.floors.forEach((f) => (state.floorsById[f.id] = f));

    mapEngineMap = window.MallNavMapEngine.create($("mapCanvas"));
    mapEngineNav = window.MallNavMapEngine.create($("navCanvas"));
    mapEngineMap.on("pin-click", (place) => openPreview(place));

    const ctx = {
      floorsById: state.floorsById,
      navpoints: state.data.navpoints,
      places: state.data.places,
    };
    navPreview = window.MallNavNavigation.create(mapEngineMap);
    navPreview.setContext(Object.assign({}, ctx, { onLoadFloor: (fid) => loadFloorInto(mapEngineMap, fid, { fit: false }) }));
    navPlay = window.MallNavNavigation.create(mapEngineNav);
    navPlay.setContext(Object.assign({}, ctx, { onLoadFloor: (fid) => loadFloorInto(mapEngineNav, fid, { fit: false }) }));
    wireNavEvents();

    renderQuickActions();
    renderPopular();
    $("popularSeeAllIcon").innerHTML = UI.icon("chevronRight", { size: 14 });
    $("btnPopularSeeAll").addEventListener("click", () => handleQuickAction({ category: "__all_tenant__", label: "Semua Tenant" }));
    renderFloorPills($("homeFloorPills"), state.homeFloor, selectHomeFloor, "floor-pill");
    renderDirectoryList(state.homeFloor);
    wireSearch();

    state.qrOrigin = resolveQrOrigin();
    if (state.qrOrigin) {
      setTimeout(() => toast.show("Titik awal: " + state.qrOrigin.label), 900);
    }

    registerServiceWorker();

    // Splash: brief, premium — never a bottleneck for the <10s scan-to-nav goal.
    const splash = $("splash");
    const minSplash = 550;
    setTimeout(() => splash.classList.add("is-hidden"), minSplash);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
