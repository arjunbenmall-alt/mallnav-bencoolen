/**
 * MallNav — storage.js
 * Wraps localStorage defensively (private-browsing / disabled storage should
 * never crash the app) and namespaces every key under "mallnav:".
 */
(function (global) {
  "use strict";

  const NS = "mallnav:";
  let memoryFallback = {}; // used if localStorage throws (e.g. Safari private mode)
  let hasLocalStorage = true;
  try {
    const testKey = NS + "__test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorage = false;
  }

  const Storage = {
    get(key, fallback) {
      try {
        if (hasLocalStorage) {
          const raw = window.localStorage.getItem(NS + key);
          return raw === null ? fallback : JSON.parse(raw);
        }
        return key in memoryFallback ? memoryFallback[key] : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        if (hasLocalStorage) {
          window.localStorage.setItem(NS + key, JSON.stringify(value));
        } else {
          memoryFallback[key] = value;
        }
      } catch (e) {
        memoryFallback[key] = value;
      }
    },
    remove(key) {
      try {
        if (hasLocalStorage) window.localStorage.removeItem(NS + key);
        else delete memoryFallback[key];
      } catch (e) {
        /* no-op */
      }
    },
  };

  global.MallNavStorage = Storage;
})(window);
