/**
 * MallNav — searchEngine.js
 * Realtime search that tolerates typos ("musola", "musholla", "musolla" all
 * resolve to "Musala"). Strategy, cheapest first:
 *   1. Exact / prefix / substring match on name, category label, or alias.
 *   2. Levenshtein-based similarity against the same fields (and their
 *      individual words) as a fuzzy fallback, so misspellings not covered
 *      by the alias list still surface a result.
 */
(function (global) {
  "use strict";

  const U = global.MallNavUtils;

  function scoreCandidate(candidate, query) {
    if (!candidate) return 0;
    if (candidate === query) return 1.0;
    if (candidate.startsWith(query)) return 0.93;
    if (candidate.includes(query)) return 0.82;

    let best = 0;
    const wholeSim = U.similarity(candidate, query);
    if (wholeSim > 0.5) best = Math.max(best, wholeSim * 0.78);

    candidate.split(/\s+/).forEach((tok) => {
      if (!tok) return;
      if (tok.startsWith(query) && query.length >= 3) best = Math.max(best, 0.72);
      const tokSim = U.similarity(tok, query);
      if (tokSim > 0.55) best = Math.max(best, tokSim * 0.8);
    });

    return best;
  }

  function scorePlace(place, query) {
    const candidates = [U.normalize(place.name), U.normalize(place.categoryLabel)].concat(
      (place.aliases || []).map(U.normalize)
    );
    let best = 0;
    candidates.forEach((c) => {
      best = Math.max(best, scoreCandidate(c, query));
    });
    return best;
  }

  /**
   * @param {string} query raw user input
   * @param {Array} places unified tenant+facility list from data-loader
   * @param {number} limit max results
   */
  function search(query, places, limit) {
    const q = U.normalize(query);
    if (!q) return [];
    const scored = [];
    for (let i = 0; i < places.length; i++) {
      const s = scorePlace(places[i], q);
      if (s >= 0.42) scored.push({ place: places[i], score: s });
    }
    scored.sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name));
    return scored.slice(0, limit || 8).map((r) => r.place);
  }

  global.MallNavSearch = { search };
})(window);
