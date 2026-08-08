/**
 * MallNav — data-embedded.js  (GENERATED — do not edit by hand)
 *
 * Produced by build_embedded.py from data/*.json and assets/svg/*.svg.
 * Used automatically as the offline / file:// fallback when fetch()
 * is unavailable. Edit the source files instead, then re-run:
 *     python3 build_embedded.py
 */
window.MallNavEmbeddedData = {
  "floors": {
    "floors": [
      {
        "id": "1",
        "label": "Lantai 1",
        "shortLabel": "L1",
        "order": 1,
        "svg": "assets/svg/floor1.svg",
        "viewBox": "0 0 1000 700",
        "defaultEntry": "n_lobby"
      },
      {
        "id": "2",
        "label": "Lantai 2",
        "shortLabel": "L2",
        "order": 2,
        "svg": "assets/svg/floor2.svg",
        "viewBox": "0 0 1000 700",
        "defaultEntry": "n_c1f2"
      },
      {
        "id": "3",
        "label": "Lantai 3",
        "shortLabel": "L3",
        "order": 3,
        "svg": "assets/svg/floor3.svg",
        "viewBox": "0 0 1000 700",
        "defaultEntry": "n_c1f3"
      }
    ]
  },
  "tenants": {
    "categories": {
      "fashion": {
        "label": "Fashion",
        "color": "#EC4899",
        "emoji": "👗"
      },
      "fnb": {
        "label": "Makanan & Minuman",
        "color": "#FF7A45",
        "emoji": "🍽"
      },
      "elektronik": {
        "label": "Elektronik",
        "color": "#0EA5E9",
        "emoji": "🔌"
      },
      "hiburan": {
        "label": "Hiburan",
        "color": "#8B5CF6",
        "emoji": "🎬"
      },
      "layanan": {
        "label": "Layanan",
        "color": "#14B8A6",
        "emoji": "🏦"
      },
      "buku": {
        "label": "Buku & Alat Tulis",
        "color": "#F59E0B",
        "emoji": "📚"
      },
      "olahraga": {
        "label": "Olahraga",
        "color": "#22C55E",
        "emoji": "⚽"
      }
    },
    "items": [
      {
        "id": "uniqlo",
        "name": "Uniqlo",
        "category": "fashion",
        "floor": "1",
        "nodeId": "n_uniqlo",
        "x": 250,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.7,
        "description": "Pakaian kasual pria, wanita, dan anak dengan konsep LifeWear."
      },
      {
        "id": "hnm",
        "name": "H&M",
        "category": "fashion",
        "floor": "1",
        "nodeId": "n_hnm",
        "x": 330,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Fashion trendi untuk seluruh keluarga dengan harga terjangkau."
      },
      {
        "id": "starbucks",
        "name": "Starbucks Coffee",
        "category": "fnb",
        "floor": "1",
        "nodeId": "n_starbucks",
        "x": 700,
        "y": 210,
        "hours": "08:00 - 22:00",
        "rating": 4.6,
        "description": "Kedai kopi premium dengan area duduk nyaman untuk bekerja atau bersantai."
      },
      {
        "id": "bankmandiri",
        "name": "Bank Mandiri",
        "category": "layanan",
        "floor": "1",
        "nodeId": "n_bank",
        "x": 700,
        "y": 495,
        "hours": "09:00 - 16:00",
        "rating": 4.2,
        "description": "Kantor cabang layanan perbankan dan setor tunai."
      },
      {
        "id": "gramedia",
        "name": "Gramedia",
        "category": "buku",
        "floor": "2",
        "nodeId": "n_gramedia",
        "x": 250,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.8,
        "description": "Toko buku, alat tulis, dan perlengkapan sekolah terlengkap."
      },
      {
        "id": "electroniccity",
        "name": "Electronic City",
        "category": "elektronik",
        "floor": "2",
        "nodeId": "n_electroniccity",
        "x": 330,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Gadget, elektronik rumah tangga, dan aksesoris terbaru."
      },
      {
        "id": "xxi",
        "name": "XXI Cinema",
        "category": "hiburan",
        "floor": "2",
        "nodeId": "n_cinema",
        "x": 700,
        "y": 210,
        "hours": "10:00 - 23:30",
        "rating": 4.7,
        "description": "Bioskop dengan teknologi layar dan suara terkini."
      },
      {
        "id": "sportstation",
        "name": "Sport Station",
        "category": "olahraga",
        "floor": "2",
        "nodeId": "n_sportstation",
        "x": 700,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Perlengkapan dan sepatu olahraga dari berbagai brand ternama."
      },
      {
        "id": "esteler77",
        "name": "Es Teler 77",
        "category": "fnb",
        "floor": "3",
        "nodeId": "n_esteler",
        "x": 480,
        "y": 165,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Es teler, jus, dan hidangan Indonesia di area food court."
      },
      {
        "id": "hokben",
        "name": "Hokben",
        "category": "fnb",
        "floor": "3",
        "nodeId": "n_hokben",
        "x": 550,
        "y": 130,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Hidangan bento ala Jepang, favorit keluarga."
      },
      {
        "id": "pizzahut",
        "name": "Pizza Hut",
        "category": "fnb",
        "floor": "3",
        "nodeId": "n_pizzahut",
        "x": 620,
        "y": 130,
        "hours": "10:00 - 22:00",
        "rating": 4.3,
        "description": "Pizza, pasta, dan hidangan keluarga dalam suasana santai."
      },
      {
        "id": "jco",
        "name": "J.CO Donuts & Coffee",
        "category": "fnb",
        "floor": "3",
        "nodeId": "n_jco",
        "x": 640,
        "y": 205,
        "hours": "08:00 - 22:00",
        "rating": 4.7,
        "description": "Donat premium dan kopi khas J.CO."
      }
    ]
  },
  "facilities": {
    "categories": {
      "toilet": {
        "label": "Toilet",
        "emoji": "🚻",
        "color": "#4F8EF7",
        "icon": "toilet"
      },
      "musala": {
        "label": "Musala",
        "emoji": "🕌",
        "color": "#D4A017",
        "icon": "musala"
      },
      "atm": {
        "label": "ATM",
        "emoji": "🏧",
        "color": "#8B5CF6",
        "icon": "atm"
      },
      "lift": {
        "label": "Lift",
        "emoji": "🛗",
        "color": "#64748B",
        "icon": "lift"
      },
      "escalator": {
        "label": "Eskalator",
        "emoji": "⬆",
        "color": "#64748B",
        "icon": "escalator"
      },
      "foodcourt": {
        "label": "Food Court",
        "emoji": "🍔",
        "color": "#FF7A45",
        "icon": "foodcourt"
      },
      "entrance": {
        "label": "Pintu Masuk",
        "emoji": "🚪",
        "color": "#0FA958",
        "icon": "entrance"
      }
    },
    "items": [
      {
        "id": "musala1",
        "name": "Musala Lantai 1",
        "category": "musala",
        "floor": "1",
        "nodeId": "n_musala1",
        "x": 400,
        "y": 165,
        "hours": "05:00 - 22:00",
        "rating": 4.8,
        "description": "Musala nyaman dengan area wudhu terpisah pria dan wanita, dilengkapi mukena dan sajadah bersih.",
        "aliases": [
          "musala",
          "mushola",
          "musholla",
          "musola",
          "surau",
          "prayer room"
        ]
      },
      {
        "id": "musala3",
        "name": "Musala Utama Lantai 3",
        "category": "musala",
        "floor": "3",
        "nodeId": "n_musala3",
        "x": 400,
        "y": 165,
        "hours": "05:00 - 22:00",
        "rating": 4.9,
        "description": "Musala utama dengan kapasitas lebih besar, ber-AC, dekat dengan area food court.",
        "aliases": [
          "musala",
          "mushola",
          "musholla",
          "musola",
          "surau",
          "prayer room"
        ]
      },
      {
        "id": "toilet1",
        "name": "Toilet Lantai 1",
        "category": "toilet",
        "floor": "1",
        "nodeId": "n_toilet1",
        "x": 400,
        "y": 545,
        "hours": "10:00 - 22:00",
        "rating": 4.3,
        "description": "Toilet umum pria dan wanita, bersih dan terawat, dilengkapi ruang menyusui.",
        "aliases": [
          "wc",
          "toilet",
          "kamar mandi",
          "restroom",
          "rest room"
        ]
      },
      {
        "id": "toilet2",
        "name": "Toilet Lantai 2",
        "category": "toilet",
        "floor": "2",
        "nodeId": "n_toilet2",
        "x": 400,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.2,
        "description": "Toilet umum pria dan wanita di area tengah lantai 2.",
        "aliases": [
          "wc",
          "toilet",
          "kamar mandi",
          "restroom",
          "rest room"
        ]
      },
      {
        "id": "toilet3",
        "name": "Toilet Lantai 3",
        "category": "toilet",
        "floor": "3",
        "nodeId": "n_toilet3",
        "x": 400,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Toilet umum pria dan wanita, berdekatan dengan food court.",
        "aliases": [
          "wc",
          "toilet",
          "kamar mandi",
          "restroom",
          "rest room"
        ]
      },
      {
        "id": "atm1",
        "name": "ATM Center Lantai 1",
        "category": "atm",
        "floor": "1",
        "nodeId": "n_atm1",
        "x": 300,
        "y": 470,
        "hours": "24 Jam",
        "rating": 4.5,
        "description": "Deretan mesin ATM dari berbagai bank besar, tersedia 24 jam.",
        "aliases": [
          "atm",
          "anjungan tunai mandiri",
          "mesin atm",
          "bank"
        ]
      },
      {
        "id": "lift1",
        "name": "Lift Utama Lantai 1",
        "category": "lift",
        "floor": "1",
        "nodeId": "n_lift1",
        "x": 850,
        "y": 270,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Lift utama menghubungkan seluruh lantai, ramah kursi roda.",
        "aliases": [
          "lift",
          "elevator",
          "elevator lift"
        ]
      },
      {
        "id": "lift2",
        "name": "Lift Lantai 2",
        "category": "lift",
        "floor": "2",
        "nodeId": "n_lift2",
        "x": 850,
        "y": 270,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Lift utama menghubungkan seluruh lantai, ramah kursi roda.",
        "aliases": [
          "lift",
          "elevator",
          "elevator lift"
        ]
      },
      {
        "id": "lift3",
        "name": "Lift Lantai 3",
        "category": "lift",
        "floor": "3",
        "nodeId": "n_lift3",
        "x": 850,
        "y": 270,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Lift utama menghubungkan seluruh lantai, ramah kursi roda.",
        "aliases": [
          "lift",
          "elevator",
          "elevator lift"
        ]
      },
      {
        "id": "esc1",
        "name": "Eskalator Timur Lantai 1",
        "category": "escalator",
        "floor": "1",
        "nodeId": "n_esc1",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Eskalator menuju Lantai 2, berada di sisi timur mall.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
        ]
      },
      {
        "id": "esc2",
        "name": "Eskalator Lantai 2",
        "category": "escalator",
        "floor": "2",
        "nodeId": "n_esc2a",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Eskalator menghubungkan Lantai 1 dan Lantai 3.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
        ]
      },
      {
        "id": "esc3",
        "name": "Eskalator Lantai 3",
        "category": "escalator",
        "floor": "3",
        "nodeId": "n_esc3a",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.3,
        "description": "Eskalator turun menuju Lantai 2, dekat food court.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
        ]
      },
      {
        "id": "foodcourt3",
        "name": "Food Court Lantai 3",
        "category": "foodcourt",
        "floor": "3",
        "nodeId": "n_foodcourt",
        "x": 550,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.7,
        "description": "Area food court dengan lebih dari 20 gerai makanan dan tempat duduk luas.",
        "aliases": [
          "food court",
          "foodcourt",
          "pujasera",
          "kantin",
          "tempat makan"
        ]
      }
    ]
  },
  "navpoints": {
    "floors": {
      "1": {
        "nodes": [
          {
            "id": "n_lobby",
            "x": 80,
            "y": 350
          },
          {
            "id": "n_c1",
            "x": 250,
            "y": 350
          },
          {
            "id": "n_c2",
            "x": 400,
            "y": 350
          },
          {
            "id": "n_c3",
            "x": 550,
            "y": 350
          },
          {
            "id": "n_c4",
            "x": 700,
            "y": 350
          },
          {
            "id": "n_c5",
            "x": 850,
            "y": 350
          },
          {
            "id": "n_lift1",
            "x": 850,
            "y": 300
          },
          {
            "id": "n_esc1",
            "x": 920,
            "y": 350
          },
          {
            "id": "n_j_selatan",
            "x": 550,
            "y": 500
          },
          {
            "id": "n_pintu_selatan",
            "x": 550,
            "y": 650
          },
          {
            "id": "n_j_toilet1",
            "x": 400,
            "y": 470
          },
          {
            "id": "n_toilet1",
            "x": 400,
            "y": 520
          },
          {
            "id": "n_atm1",
            "x": 330,
            "y": 470
          },
          {
            "id": "n_j_musala1",
            "x": 400,
            "y": 230
          },
          {
            "id": "n_musala1",
            "x": 400,
            "y": 180
          },
          {
            "id": "n_j_parkir",
            "x": 850,
            "y": 230
          },
          {
            "id": "n_pintu_parkir",
            "x": 920,
            "y": 180
          },
          {
            "id": "n_uniqlo",
            "x": 250,
            "y": 230
          },
          {
            "id": "n_hnm",
            "x": 330,
            "y": 230
          },
          {
            "id": "n_starbucks",
            "x": 700,
            "y": 230
          },
          {
            "id": "n_bank",
            "x": 700,
            "y": 470
          }
        ],
        "edges": [
          [
            "n_lobby",
            "n_c1",
            170
          ],
          [
            "n_c1",
            "n_c2",
            150
          ],
          [
            "n_c2",
            "n_c3",
            150
          ],
          [
            "n_c3",
            "n_c4",
            150
          ],
          [
            "n_c4",
            "n_c5",
            150
          ],
          [
            "n_c5",
            "n_lift1",
            55
          ],
          [
            "n_c5",
            "n_esc1",
            75
          ],
          [
            "n_c3",
            "n_j_selatan",
            150
          ],
          [
            "n_j_selatan",
            "n_pintu_selatan",
            150
          ],
          [
            "n_c2",
            "n_j_toilet1",
            130
          ],
          [
            "n_j_toilet1",
            "n_toilet1",
            50
          ],
          [
            "n_j_toilet1",
            "n_atm1",
            75
          ],
          [
            "n_c2",
            "n_j_musala1",
            120
          ],
          [
            "n_j_musala1",
            "n_musala1",
            50
          ],
          [
            "n_c5",
            "n_j_parkir",
            130
          ],
          [
            "n_j_parkir",
            "n_pintu_parkir",
            90
          ],
          [
            "n_c1",
            "n_uniqlo",
            120
          ],
          [
            "n_uniqlo",
            "n_hnm",
            90
          ],
          [
            "n_c4",
            "n_starbucks",
            130
          ],
          [
            "n_c4",
            "n_bank",
            130
          ]
        ]
      },
      "2": {
        "nodes": [
          {
            "id": "n_c1f2",
            "x": 250,
            "y": 350
          },
          {
            "id": "n_c2f2",
            "x": 400,
            "y": 350
          },
          {
            "id": "n_c3f2",
            "x": 550,
            "y": 350
          },
          {
            "id": "n_c4f2",
            "x": 700,
            "y": 350
          },
          {
            "id": "n_c5f2",
            "x": 850,
            "y": 350
          },
          {
            "id": "n_lift2",
            "x": 850,
            "y": 300
          },
          {
            "id": "n_esc2a",
            "x": 920,
            "y": 350
          },
          {
            "id": "n_toilet2",
            "x": 400,
            "y": 470
          },
          {
            "id": "n_gramedia",
            "x": 250,
            "y": 230
          },
          {
            "id": "n_electroniccity",
            "x": 330,
            "y": 230
          },
          {
            "id": "n_cinema",
            "x": 700,
            "y": 230
          },
          {
            "id": "n_sportstation",
            "x": 700,
            "y": 470
          }
        ],
        "edges": [
          [
            "n_c1f2",
            "n_c2f2",
            150
          ],
          [
            "n_c2f2",
            "n_c3f2",
            150
          ],
          [
            "n_c3f2",
            "n_c4f2",
            150
          ],
          [
            "n_c4f2",
            "n_c5f2",
            150
          ],
          [
            "n_c5f2",
            "n_lift2",
            55
          ],
          [
            "n_c5f2",
            "n_esc2a",
            75
          ],
          [
            "n_c2f2",
            "n_toilet2",
            130
          ],
          [
            "n_c1f2",
            "n_gramedia",
            120
          ],
          [
            "n_gramedia",
            "n_electroniccity",
            90
          ],
          [
            "n_c4f2",
            "n_cinema",
            130
          ],
          [
            "n_c4f2",
            "n_sportstation",
            130
          ]
        ]
      },
      "3": {
        "nodes": [
          {
            "id": "n_c1f3",
            "x": 250,
            "y": 350
          },
          {
            "id": "n_c2f3",
            "x": 400,
            "y": 350
          },
          {
            "id": "n_c3f3",
            "x": 550,
            "y": 350
          },
          {
            "id": "n_c4f3",
            "x": 700,
            "y": 350
          },
          {
            "id": "n_c5f3",
            "x": 850,
            "y": 350
          },
          {
            "id": "n_lift3",
            "x": 850,
            "y": 300
          },
          {
            "id": "n_esc3a",
            "x": 920,
            "y": 350
          },
          {
            "id": "n_toilet3",
            "x": 400,
            "y": 470
          },
          {
            "id": "n_musala3",
            "x": 400,
            "y": 230
          },
          {
            "id": "n_foodcourt",
            "x": 550,
            "y": 230
          },
          {
            "id": "n_esteler",
            "x": 500,
            "y": 180
          },
          {
            "id": "n_hokben",
            "x": 550,
            "y": 150
          },
          {
            "id": "n_pizzahut",
            "x": 600,
            "y": 150
          },
          {
            "id": "n_jco",
            "x": 620,
            "y": 190
          }
        ],
        "edges": [
          [
            "n_c1f3",
            "n_c2f3",
            150
          ],
          [
            "n_c2f3",
            "n_c3f3",
            150
          ],
          [
            "n_c3f3",
            "n_c4f3",
            150
          ],
          [
            "n_c4f3",
            "n_c5f3",
            150
          ],
          [
            "n_c5f3",
            "n_lift3",
            55
          ],
          [
            "n_c5f3",
            "n_esc3a",
            75
          ],
          [
            "n_c2f3",
            "n_toilet3",
            130
          ],
          [
            "n_c2f3",
            "n_musala3",
            120
          ],
          [
            "n_c3f3",
            "n_foodcourt",
            80
          ],
          [
            "n_foodcourt",
            "n_esteler",
            60
          ],
          [
            "n_foodcourt",
            "n_hokben",
            70
          ],
          [
            "n_foodcourt",
            "n_pizzahut",
            75
          ],
          [
            "n_foodcourt",
            "n_jco",
            65
          ]
        ]
      }
    },
    "verticalLinks": [
      {
        "id": "vl_esc_1_2",
        "type": "escalator",
        "floorA": "1",
        "nodeA": "n_esc1",
        "floorB": "2",
        "nodeB": "n_esc2a",
        "timePenalty": 20,
        "distanceEquivalent": 40
      },
      {
        "id": "vl_lift_1_2",
        "type": "lift",
        "floorA": "1",
        "nodeA": "n_lift1",
        "floorB": "2",
        "nodeB": "n_lift2",
        "timePenalty": 35,
        "distanceEquivalent": 60
      },
      {
        "id": "vl_esc_2_3",
        "type": "escalator",
        "floorA": "2",
        "nodeA": "n_esc2a",
        "floorB": "3",
        "nodeB": "n_esc3a",
        "timePenalty": 20,
        "distanceEquivalent": 40
      },
      {
        "id": "vl_lift_2_3",
        "type": "lift",
        "floorA": "2",
        "nodeA": "n_lift2",
        "floorB": "3",
        "nodeB": "n_lift3",
        "timePenalty": 35,
        "distanceEquivalent": 60
      }
    ]
  },
  "qrpoints": {
    "items": [
      {
        "code": "lobby_utama",
        "label": "Lobby Utama",
        "floor": "1",
        "nodeId": "n_lobby"
      },
      {
        "code": "pintu_selatan",
        "label": "Pintu Selatan",
        "floor": "1",
        "nodeId": "n_pintu_selatan"
      },
      {
        "code": "eskalator_timur",
        "label": "Eskalator Timur Lt.1",
        "floor": "1",
        "nodeId": "n_esc1"
      },
      {
        "code": "area_parkir_b1",
        "label": "Pintu Area Parkir",
        "floor": "1",
        "nodeId": "n_pintu_parkir"
      }
    ]
  },
  "svg": {
    "1": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <!-- Building shell -->\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <!-- Corridor (walkable path) -->\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M80,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M550,350 L550,650\"/>\n    <path d=\"M850,350 L850,300\"/>\n    <path d=\"M850,350 L850,230 L920,180\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470 L400,520\"/>\n    <path d=\"M400,470 L330,470\"/>\n    <path d=\"M400,350 L400,230 L400,180\"/>\n    <path d=\"M250,350 L250,230\"/>\n    <path d=\"M250,230 L330,230\"/>\n    <path d=\"M700,350 L700,230\"/>\n    <path d=\"M700,350 L700,470\"/>\n  </g>\n\n  <!-- Room zones -->\n  <g class=\"room-zones\">\n    <rect x=\"150\" y=\"95\" width=\"130\" height=\"105\" rx=\"14\" class=\"room room-fashion\"/>\n    <text x=\"215\" y=\"150\" class=\"room-label\">UNIQLO</text>\n\n    <rect x=\"290\" y=\"95\" width=\"120\" height=\"105\" rx=\"14\" class=\"room room-fashion\"/>\n    <text x=\"350\" y=\"150\" class=\"room-label\">H&amp;M</text>\n\n    <rect x=\"430\" y=\"85\" width=\"140\" height=\"100\" rx=\"14\" class=\"room room-musala\"/>\n    <text x=\"500\" y=\"140\" class=\"room-label\">MUSALA</text>\n\n    <rect x=\"630\" y=\"95\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-fnb\"/>\n    <text x=\"705\" y=\"150\" class=\"room-label\">STARBUCKS</text>\n\n    <rect x=\"255\" y=\"465\" width=\"230\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"315\" y=\"500\" class=\"room-label\">ATM</text>\n    <text x=\"425\" y=\"530\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"630\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-layanan\"/>\n    <text x=\"705\" y=\"520\" class=\"room-label\">BANK MANDIRI</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <!-- Entrances -->\n  <g class=\"entrances\">\n    <rect x=\"40\" y=\"320\" width=\"24\" height=\"60\" rx=\"6\" class=\"door\"/>\n    <text x=\"90\" y=\"410\" class=\"zone-label\">LOBBY UTAMA</text>\n\n    <rect x=\"518\" y=\"640\" width=\"60\" height=\"24\" rx=\"6\" class=\"door\"/>\n    <text x=\"550\" y=\"672\" class=\"zone-label\" text-anchor=\"middle\">PINTU SELATAN</text>\n\n    <rect x=\"905\" y=\"160\" width=\"24\" height=\"60\" rx=\"6\" class=\"door\"/>\n    <text x=\"900\" y=\"150\" class=\"zone-label\" text-anchor=\"end\">AREA PARKIR</text>\n\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">LANTAI 1 &#183; GROUND FLOOR</text>\n</svg>\n",
    "2": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M120,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M850,350 L850,300\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470\"/>\n    <path d=\"M250,350 L250,230\"/>\n    <path d=\"M250,230 L330,230\"/>\n    <path d=\"M700,350 L700,230\"/>\n    <path d=\"M700,350 L700,470\"/>\n  </g>\n\n  <g class=\"room-zones\">\n    <rect x=\"150\" y=\"95\" width=\"130\" height=\"105\" rx=\"14\" class=\"room room-buku\"/>\n    <text x=\"215\" y=\"150\" class=\"room-label\">GRAMEDIA</text>\n\n    <rect x=\"290\" y=\"95\" width=\"120\" height=\"105\" rx=\"14\" class=\"room room-elektronik\"/>\n    <text x=\"350\" y=\"150\" class=\"room-label\">E-CITY</text>\n\n    <rect x=\"330\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"405\" y=\"520\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"630\" y=\"95\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-hiburan\"/>\n    <text x=\"705\" y=\"140\" class=\"room-label\">XXI</text>\n    <text x=\"705\" y=\"162\" class=\"room-label\">CINEMA</text>\n\n    <rect x=\"630\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-olahraga\"/>\n    <text x=\"705\" y=\"500\" class=\"room-label\">SPORT</text>\n    <text x=\"705\" y=\"522\" class=\"room-label\">STATION</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <g class=\"entrances\">\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">LANTAI 2 &#183; FASHION &amp; ENTERTAINMENT</text>\n</svg>\n",
    "3": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M120,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M850,350 L850,300\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470\"/>\n    <path d=\"M400,350 L400,230\"/>\n    <path d=\"M550,350 L550,230\"/>\n    <path d=\"M550,230 L500,180\"/>\n    <path d=\"M550,230 L620,190\"/>\n    <path d=\"M550,230 L550,150\"/>\n    <path d=\"M550,150 L600,150\"/>\n  </g>\n\n  <g class=\"room-zones\">\n    <rect x=\"330\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"405\" y=\"520\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"330\" y=\"95\" width=\"140\" height=\"105\" rx=\"14\" class=\"room room-musala\"/>\n    <text x=\"400\" y=\"150\" class=\"room-label\">MUSALA</text>\n\n    <rect x=\"430\" y=\"80\" width=\"330\" height=\"185\" rx=\"20\" class=\"room room-foodcourt\"/>\n    <text x=\"595\" y=\"105\" class=\"room-label room-label-lg\">FOOD COURT</text>\n    <text x=\"480\" y=\"200\" class=\"room-label-sm\">ES TELER 77</text>\n    <text x=\"560\" y=\"175\" class=\"room-label-sm\">HOKBEN</text>\n    <text x=\"640\" y=\"175\" class=\"room-label-sm\">PIZZA HUT</text>\n    <text x=\"700\" y=\"210\" class=\"room-label-sm\">J.CO</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <g class=\"entrances\">\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">LANTAI 3 &#183; FOOD COURT</text>\n</svg>\n"
  }
};
