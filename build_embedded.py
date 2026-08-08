#!/usr/bin/env python3
"""
Regenerates js/data-embedded.js from the source-of-truth files in data/ and
assets/svg/. Run this whenever tenant data, nav points, or floor SVGs change:

    python3 build_embedded.py

Why this exists
----------------
MallNav must run two ways: (1) opened directly as a local file, and
(2) hosted on GitHub Pages / any static server. Browsers block fetch() of
JSON/SVG files from file:// origins (CORS), so data-loader.js and
mapEngine.js first try fetch() and, if that fails, fall back to the exact
same data pre-baked as JS objects/strings here. Both code paths read
identical content because this script generates the fallback directly from
the JSON/SVG source files — there is only one place to edit data.
"""
import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT, "data")
SVG_DIR = os.path.join(ROOT, "assets", "svg")
OUT_FILE = os.path.join(ROOT, "js", "data-embedded.js")


def load_json(name):
    with open(os.path.join(DATA_DIR, name), "r", encoding="utf-8") as f:
        return json.load(f)


def load_svg(name):
    with open(os.path.join(SVG_DIR, name), "r", encoding="utf-8") as f:
        return f.read()


def main():
    payload = {
        "floors": load_json("floors.json"),
        "tenants": load_json("tenants.json"),
        "facilities": load_json("facilities.json"),
        "navpoints": load_json("navpoints.json"),
        "qrpoints": load_json("qrpoints.json"),
        "svg": {
            "1": load_svg("floor1.svg"),
            "2": load_svg("floor2.svg"),
            "3": load_svg("floor3.svg"),
        },
    }

    header = (
        "/**\n"
        " * MallNav — data-embedded.js  (GENERATED — do not edit by hand)\n"
        " *\n"
        " * Produced by build_embedded.py from data/*.json and assets/svg/*.svg.\n"
        " * Used automatically as the offline / file:// fallback when fetch()\n"
        " * is unavailable. Edit the source files instead, then re-run:\n"
        " *     python3 build_embedded.py\n"
        " */\n"
    )
    body = "window.MallNavEmbeddedData = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"

    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(header + body)

    print(f"Wrote {OUT_FILE} ({os.path.getsize(OUT_FILE)} bytes)")


if __name__ == "__main__":
    main()
