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
        "label": "Ground Floor",
        "shortLabel": "GF",
        "order": 1,
        "svg": "assets/svg/floor1.svg",
        "viewBox": "0 0 1000 700",
        "defaultEntry": "n_lobby"
      },
      {
        "id": "2",
        "label": "1st Floor",
        "shortLabel": "1F",
        "order": 2,
        "svg": "assets/svg/floor2.svg",
        "viewBox": "0 0 1000 700",
        "defaultEntry": "n_c1f2"
      },
      {
        "id": "3",
        "label": "2nd Floor",
        "shortLabel": "2F",
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
        "label": "Fashion & Accessories",
        "color": "#EC4899",
        "emoji": "👗"
      },
      "fnb": {
        "label": "Food & Beverage",
        "color": "#FF7A45",
        "emoji": "🍽"
      },
      "elektronik": {
        "label": "Gadget & Electronic",
        "color": "#0EA5E9",
        "emoji": "🔌"
      },
      "hiburan": {
        "label": "Kids & Entertainment",
        "color": "#8B5CF6",
        "emoji": "🎬"
      },
      "kecantikan": {
        "label": "Beauty & Health",
        "color": "#F43F5E",
        "emoji": "💄"
      },
      "rumahtangga": {
        "label": "Home Appliance",
        "color": "#B45309",
        "emoji": "🛋"
      },
      "supermarket": {
        "label": "Supermarket & Department Store",
        "color": "#0D9488",
        "emoji": "🛒"
      },
      "travel": {
        "label": "Travel & Lifestyle",
        "color": "#6366F1",
        "emoji": "✈"
      }
    },
    "items": [
      {
        "id": "kimfashion",
        "name": "Kim Fashion",
        "category": "fashion",
        "floor": "1",
        "nodeId": "n_uniqlo",
        "x": 250,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Fashion pria dan wanita dengan pilihan model terkini. Ground Floor Blok B No.19."
      },
      {
        "id": "moc",
        "name": "MOC",
        "category": "fashion",
        "floor": "1",
        "nodeId": "n_hnm",
        "x": 330,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Brand fashion kasual untuk tampilan sehari-hari yang stylish."
      },
      {
        "id": "samsung",
        "name": "Samsung",
        "category": "elektronik",
        "floor": "1",
        "nodeId": "n_starbucks",
        "x": 700,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.7,
        "description": "Smartphone, gadget, dan elektronik resmi Samsung. Ground Floor Blok B No.9 & 10."
      },
      {
        "id": "erafone",
        "name": "Erafone",
        "category": "elektronik",
        "floor": "1",
        "nodeId": "n_erafone",
        "x": 180,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Gerai ponsel dan aksesoris multi-brand. Ground Floor Blok C No.15 & 16."
      },
      {
        "id": "omegatour",
        "name": "Omega Tour & Travel",
        "category": "travel",
        "floor": "1",
        "nodeId": "n_bank",
        "x": 700,
        "y": 495,
        "hours": "09:00 - 17:00",
        "rating": 4.3,
        "description": "Layanan tiket perjalanan, tur, dan paket wisata. Ground Floor Blok A No.1."
      },
      {
        "id": "ramen1",
        "name": "Ramen 1 Indonesia",
        "category": "fnb",
        "floor": "1",
        "nodeId": "n_ramen1",
        "x": 620,
        "y": 645,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Ramen otentik ala Jepang di Area Bencoolen Hot Spot, Blok B No.5 & 6.",
        "aliases": [
          "kuliner",
          "makanan",
          "food",
          "resto",
          "restoran",
          "ramen"
        ]
      },
      {
        "id": "matahari",
        "name": "Matahari",
        "category": "supermarket",
        "floor": "2",
        "nodeId": "n_gramedia",
        "x": 250,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Department store fashion dan kebutuhan keluarga terlengkap di 1st Floor."
      },
      {
        "id": "ourselfstudio",
        "name": "Our Self Studio",
        "category": "hiburan",
        "floor": "2",
        "nodeId": "n_electroniccity",
        "x": 330,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.7,
        "description": "Studio self-photo kekinian di area Bencoolen Hot Spot, 1st Floor."
      },
      {
        "id": "mrdiy",
        "name": "MR DIY",
        "category": "rumahtangga",
        "floor": "2",
        "nodeId": "n_cinema",
        "x": 700,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Perlengkapan rumah tangga, dekorasi, dan kebutuhan harian serba ada."
      },
      {
        "id": "azko",
        "name": "AZ.KO",
        "category": "rumahtangga",
        "floor": "3",
        "nodeId": "n_azko",
        "x": 550,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.5,
        "description": "Perabotan rumah tangga lengkap dan modern di 2nd Floor."
      },
      {
        "id": "informa",
        "name": "INFORMA",
        "category": "rumahtangga",
        "floor": "3",
        "nodeId": "n_informa",
        "x": 700,
        "y": 210,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Furnitur dan perlengkapan rumah modern, dari ruang tamu sampai kamar tidur."
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
        "label": "Mushola",
        "emoji": "🕌",
        "color": "#D4A017",
        "icon": "musala"
      },
      "atm": {
        "label": "ATM Centre",
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
      "nursery": {
        "label": "Nursery Room",
        "emoji": "👶",
        "color": "#F472B6",
        "icon": "entrance"
      },
      "infodesk": {
        "label": "Info Desk",
        "emoji": "ℹ️",
        "color": "#0D9488",
        "icon": "entrance"
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
        "name": "Mushola Ground Floor",
        "category": "musala",
        "floor": "1",
        "nodeId": "n_musala1",
        "x": 400,
        "y": 165,
        "hours": "05:00 - 22:00",
        "rating": 4.8,
        "description": "Mushola bersih dan nyaman, dilengkapi tempat wudhu terpisah untuk pria dan wanita.",
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
        "name": "Mushola 2nd Floor",
        "category": "musala",
        "floor": "3",
        "nodeId": "n_musala3",
        "x": 400,
        "y": 165,
        "hours": "05:00 - 22:00",
        "rating": 4.7,
        "description": "Mushola dengan tempat wudhu terpisah pria dan wanita di 2nd Floor.",
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
        "name": "Toilet Ground Floor",
        "category": "toilet",
        "floor": "1",
        "nodeId": "n_toilet1",
        "x": 400,
        "y": 545,
        "hours": "10:00 - 22:00",
        "rating": 4.3,
        "description": "Toilet umum pria dan wanita, bersih dan terawat.",
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
        "name": "Toilet 1st Floor",
        "category": "toilet",
        "floor": "2",
        "nodeId": "n_toilet2",
        "x": 400,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.2,
        "description": "Toilet umum pria dan wanita di area tengah 1st Floor.",
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
        "name": "Toilet 2nd Floor",
        "category": "toilet",
        "floor": "3",
        "nodeId": "n_toilet3",
        "x": 400,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Toilet umum pria dan wanita di 2nd Floor.",
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
        "name": "ATM Centre",
        "category": "atm",
        "floor": "1",
        "nodeId": "n_atm1",
        "x": 300,
        "y": 470,
        "hours": "24 Jam",
        "rating": 4.5,
        "description": "Transaksi lebih mudah dan cepat di ATM Centre Bencoolen Mall.",
        "aliases": [
          "atm",
          "anjungan tunai mandiri",
          "mesin atm",
          "bank"
        ]
      },
      {
        "id": "nursery1",
        "name": "Nursery Room",
        "category": "nursery",
        "floor": "1",
        "nodeId": "n_j_toilet1",
        "x": 460,
        "y": 495,
        "hours": "10:00 - 22:00",
        "rating": 4.7,
        "description": "Ruang khusus ibu dan bayi untuk menyusui dan mengganti popok dengan aman dan nyaman.",
        "aliases": [
          "nursery",
          "ruang laktasi",
          "ruang menyusui",
          "baby room"
        ]
      },
      {
        "id": "infodesk1",
        "name": "Info Desk",
        "category": "infodesk",
        "floor": "1",
        "nodeId": "n_lobby",
        "x": 130,
        "y": 400,
        "hours": "10:00 - 22:00",
        "rating": 4.6,
        "description": "Pusat informasi untuk bantuan, petunjuk lokasi, dan info fasilitas & layanan.",
        "aliases": [
          "info desk",
          "customer service",
          "informasi",
          "resepsionis"
        ]
      },
      {
        "id": "lift1",
        "name": "Lift Ground Floor",
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
        "name": "Lift 1st Floor",
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
        "name": "Lift 2nd Floor",
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
        "name": "Eskalator Ground Floor",
        "category": "escalator",
        "floor": "1",
        "nodeId": "n_esc1",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Eskalator menuju 1st Floor, berada di sisi timur mall.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
        ]
      },
      {
        "id": "esc2",
        "name": "Eskalator 1st Floor",
        "category": "escalator",
        "floor": "2",
        "nodeId": "n_esc2a",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.4,
        "description": "Eskalator menghubungkan Ground Floor dan 2nd Floor.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
        ]
      },
      {
        "id": "esc3",
        "name": "Eskalator 2nd Floor",
        "category": "escalator",
        "floor": "3",
        "nodeId": "n_esc3a",
        "x": 950,
        "y": 350,
        "hours": "10:00 - 22:00",
        "rating": 4.3,
        "description": "Eskalator turun menuju 1st Floor.",
        "aliases": [
          "eskalator",
          "escalator",
          "tangga jalan"
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
          },
          {
            "id": "n_erafone",
            "x": 180,
            "y": 470
          },
          {
            "id": "n_ramen1",
            "x": 620,
            "y": 620
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
          ],
          [
            "n_c1",
            "n_erafone",
            140
          ],
          [
            "n_j_selatan",
            "n_ramen1",
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
            "id": "n_azko",
            "x": 550,
            "y": 230
          },
          {
            "id": "n_informa",
            "x": 700,
            "y": 230
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
            "n_azko",
            120
          ],
          [
            "n_c4f3",
            "n_informa",
            130
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
    "1": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <!-- Building shell -->\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <!-- Corridor (walkable path) -->\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M80,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M550,350 L550,650\"/>\n    <path d=\"M850,350 L850,300\"/>\n    <path d=\"M850,350 L850,230 L920,180\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470 L400,520\"/>\n    <path d=\"M400,470 L330,470\"/>\n    <path d=\"M400,350 L400,230 L400,180\"/>\n    <path d=\"M250,350 L250,230\"/>\n    <path d=\"M250,230 L330,230\"/>\n    <path d=\"M700,350 L700,230\"/>\n    <path d=\"M700,350 L700,470\"/>\n    <path d=\"M250,350 L180,350 L180,470\"/>\n    <path d=\"M550,650 L620,650\"/>\n  </g>\n\n  <!-- Room zones -->\n  <g class=\"room-zones\">\n    <rect x=\"150\" y=\"95\" width=\"130\" height=\"105\" rx=\"14\" class=\"room room-fashion\"/>\n    <text x=\"215\" y=\"150\" class=\"room-label\">KIM FASHION</text>\n\n    <rect x=\"290\" y=\"95\" width=\"120\" height=\"105\" rx=\"14\" class=\"room room-fashion\"/>\n    <text x=\"350\" y=\"150\" class=\"room-label\">MOC</text>\n\n    <rect x=\"430\" y=\"85\" width=\"140\" height=\"100\" rx=\"14\" class=\"room room-musala\"/>\n    <text x=\"500\" y=\"140\" class=\"room-label\">MUSHOLA</text>\n\n    <rect x=\"630\" y=\"95\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-elektronik\"/>\n    <text x=\"705\" y=\"150\" class=\"room-label\">SAMSUNG</text>\n\n    <rect x=\"255\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"330\" y=\"500\" class=\"room-label\">ATM</text>\n    <text x=\"330\" y=\"530\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"120\" y=\"465\" width=\"120\" height=\"105\" rx=\"14\" class=\"room room-elektronik\"/>\n    <text x=\"180\" y=\"520\" class=\"room-label\">ERAFONE</text>\n\n    <rect x=\"630\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-travel\"/>\n    <text x=\"705\" y=\"500\" class=\"room-label\">OMEGA</text>\n    <text x=\"705\" y=\"522\" class=\"room-label\">TOUR &amp; TRAVEL</text>\n\n    <rect x=\"555\" y=\"595\" width=\"130\" height=\"90\" rx=\"14\" class=\"room room-fnb\"/>\n    <text x=\"620\" y=\"645\" class=\"room-label\">RAMEN 1</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <!-- Entrances -->\n  <g class=\"entrances\">\n    <rect x=\"40\" y=\"320\" width=\"24\" height=\"60\" rx=\"6\" class=\"door\"/>\n    <text x=\"90\" y=\"410\" class=\"zone-label\">LOBBY UTAMA</text>\n\n    <rect x=\"518\" y=\"640\" width=\"60\" height=\"24\" rx=\"6\" class=\"door\"/>\n    <text x=\"550\" y=\"672\" class=\"zone-label\" text-anchor=\"middle\">PINTU SELATAN</text>\n\n    <rect x=\"905\" y=\"160\" width=\"24\" height=\"60\" rx=\"6\" class=\"door\"/>\n    <text x=\"900\" y=\"150\" class=\"zone-label\" text-anchor=\"end\">AREA PARKIR</text>\n\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">GROUND FLOOR &#183; BENCOOLEN MALL</text>\n</svg>\n",
    "2": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M120,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M850,350 L850,300\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470\"/>\n    <path d=\"M250,350 L250,230\"/>\n    <path d=\"M250,230 L330,230\"/>\n    <path d=\"M700,350 L700,230\"/>\n  </g>\n\n  <g class=\"room-zones\">\n    <rect x=\"140\" y=\"90\" width=\"150\" height=\"110\" rx=\"14\" class=\"room room-supermarket\"/>\n    <text x=\"215\" y=\"150\" class=\"room-label\">MATAHARI</text>\n\n    <rect x=\"300\" y=\"90\" width=\"110\" height=\"110\" rx=\"14\" class=\"room room-hiburan\"/>\n    <text x=\"355\" y=\"140\" class=\"room-label\">OUR SELF</text>\n    <text x=\"355\" y=\"162\" class=\"room-label\">STUDIO</text>\n\n    <rect x=\"330\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"405\" y=\"520\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"630\" y=\"95\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-rumahtangga\"/>\n    <text x=\"705\" y=\"150\" class=\"room-label\">MR DIY</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <g class=\"entrances\">\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">1ST FLOOR &#183; BENCOOLEN MALL</text>\n</svg>\n",
    "3": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 700\">\n  <rect x=\"40\" y=\"70\" width=\"920\" height=\"580\" rx=\"28\" fill=\"var(--map-bg)\" stroke=\"var(--map-wall)\" stroke-width=\"3\"/>\n\n  <g fill=\"none\" stroke=\"var(--map-corridor)\" stroke-width=\"46\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M120,350 L250,350 L400,350 L550,350 L700,350 L850,350 L920,350\"/>\n    <path d=\"M850,350 L850,300\"/>\n  </g>\n  <g fill=\"none\" stroke=\"var(--map-corridor-spur)\" stroke-width=\"26\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M400,350 L400,470\"/>\n    <path d=\"M400,350 L400,230\"/>\n    <path d=\"M550,350 L550,230\"/>\n    <path d=\"M700,350 L700,230\"/>\n  </g>\n\n  <g class=\"room-zones\">\n    <rect x=\"330\" y=\"465\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-service\"/>\n    <text x=\"405\" y=\"520\" class=\"room-label\">TOILET</text>\n\n    <rect x=\"330\" y=\"95\" width=\"140\" height=\"105\" rx=\"14\" class=\"room room-musala\"/>\n    <text x=\"400\" y=\"150\" class=\"room-label\">MUSHOLA</text>\n\n    <rect x=\"480\" y=\"95\" width=\"140\" height=\"105\" rx=\"14\" class=\"room room-rumahtangga\"/>\n    <text x=\"550\" y=\"150\" class=\"room-label\">AZ.KO</text>\n\n    <rect x=\"630\" y=\"95\" width=\"150\" height=\"105\" rx=\"14\" class=\"room room-rumahtangga\"/>\n    <text x=\"705\" y=\"150\" class=\"room-label\">INFORMA</text>\n\n    <rect x=\"795\" y=\"250\" width=\"90\" height=\"90\" rx=\"14\" class=\"room room-utility\"/>\n    <text x=\"840\" y=\"300\" class=\"room-label\">LIFT</text>\n  </g>\n\n  <g class=\"entrances\">\n    <text x=\"945\" y=\"335\" class=\"zone-label\" text-anchor=\"middle\">ESKALATOR</text>\n  </g>\n\n  <text x=\"70\" y=\"105\" class=\"floor-tag\">2ND FLOOR &#183; BENCOOLEN MALL</text>\n</svg>\n"
  }
};
