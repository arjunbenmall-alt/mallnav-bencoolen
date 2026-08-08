/**
 * MallNav — data-loader.js
 * Single entry point for every piece of static data the app needs.
 * Tries fetch() first (works when hosted on GitHub Pages or any http(s)
 * server); if that fails — most notably when the file was opened directly
 * from disk — it transparently falls back to js/data-embedded.js, which is
 * generated from the very same source files by build_embedded.py.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;

  async function fetchJson(path) {
    const res = await fetch(path, { cache: "force-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status + " for " + path);
    return res.json();
  }

  async function fetchText(path) {
    const res = await fetch(path, { cache: "force-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status + " for " + path);
    return res.text();
  }

  function embedded() {
    if (!global.MallNavEmbeddedData) {
      throw new Error(
        "No embedded fallback found. js/data-embedded.js failed to load."
      );
    }
    return global.MallNavEmbeddedData;
  }

  /** Builds the unified "places" array (tenants + facilities) the search
   *  engine and map engine both consume, tagging each with its category
   *  metadata (color/emoji/label) so downstream code never has to look it
   *  up separately. */
  function buildPlaces(tenantsDoc, facilitiesDoc) {
    const places = [];

    Object.keys(tenantsDoc.categories || {}).forEach(() => {}); // no-op, keeps shape explicit
    (tenantsDoc.items || []).forEach((item) => {
      const cat = tenantsDoc.categories[item.category] || {};
      places.push(
        Object.assign({}, item, {
          type: "tenant",
          categoryLabel: cat.label || item.category,
          color: cat.color || "#2952E3",
          emoji: cat.emoji || "🛍",
          aliases: item.aliases || [],
        })
      );
    });

    (facilitiesDoc.items || []).forEach((item) => {
      const cat = facilitiesDoc.categories[item.category] || {};
      places.push(
        Object.assign({}, item, {
          type: "facility",
          categoryLabel: cat.label || item.category,
          color: cat.color || "#64748B",
          emoji: cat.emoji || "📍",
          aliases: item.aliases || [],
        })
      );
    });

    return places;
  }

  async function load() {
    let floors, tenants, facilities, navpoints, qrpoints, svgByFloor;
    let usedFallback = false;

    try {
      [floors, tenants, facilities, navpoints, qrpoints] = await Promise.all([
        fetchJson("data/floors.json"),
        fetchJson("data/tenants.json"),
        fetchJson("data/facilities.json"),
        fetchJson("data/navpoints.json"),
        fetchJson("data/qrpoints.json"),
      ]);
      svgByFloor = {};
      await Promise.all(
        floors.floors.map(async (f) => {
          svgByFloor[f.id] = await fetchText(f.svg);
        })
      );
    } catch (err) {
      // Local file:// (or any network hiccup) — use the baked-in copy.
      usedFallback = true;
      const data = embedded();
      floors = data.floors;
      tenants = data.tenants;
      facilities = data.facilities;
      navpoints = data.navpoints;
      qrpoints = data.qrpoints;
      svgByFloor = data.svg;
    }

    const places = buildPlaces(tenants, facilities);

    return {
      usedFallback,
      floors: floors.floors,
      places,
      facilityCategories: facilities.categories,
      tenantCategories: tenants.categories,
      navpoints,
      qrpoints: qrpoints.items,
      svgByFloor,
    };
  }

  global.MallNavData = { load };
})(window);
