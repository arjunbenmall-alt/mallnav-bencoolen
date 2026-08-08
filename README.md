# MallNav — Indoor Navigation PWA untuk Bencoolen Mall

Navigasi indoor bergaya Google Maps / Apple Maps / Grab / Gojek, khusus untuk
pengunjung mall. Scan QR → cari tujuan → lihat preview → tekan **Mulai
Navigasi** → sampai. Dibangun murni dengan **HTML5, CSS3, Vanilla JS (ES6),
SVG, dan JSON** — tanpa React/Vue/Angular, tanpa backend, tanpa database
online, tanpa library berbayar.

---

## 1. Cara menjalankan

### A. Langsung dari file lokal (paling cepat)
Cukup buka `index.html` dua kali klik di browser (Chrome/Safari/Edge).
Semua data JSON dan denah SVG punya **fallback otomatis** yang sudah
di-*bake* ke `js/data-embedded.js`, jadi aplikasi tetap jalan penuh meski
`fetch()` diblokir CORS oleh browser saat membuka file `file://`.

> Catatan: Service Worker (untuk cache offline) **tidak** bisa aktif di
> `file://` — itu batasan browser, bukan bug. Semua fitur navigasi, peta,
> dan pencarian tetap berfungsi 100% tanpa Service Worker.

### B. Hosting (GitHub Pages atau server statis apa pun)
1. Push seluruh folder ini ke sebuah repo GitHub.
2. Settings → Pages → Deploy from branch → pilih branch & folder root.
3. Buka `https://<username>.github.io/<repo>/`.

Saat di-hosting via `http(s)://`, aplikasi otomatis:
- Mengambil data lewat `fetch()` (bukan fallback embedded).
- Mendaftarkan Service Worker → bisa **Add to Home Screen** dan jalan
  **offline** setelah kunjungan pertama.

### C. Server lokal (opsional, untuk development)
```bash
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

---

## 2. Alur QR Code

QR ditempel di titik-titik fisik mall, mengarah ke:

```
https://.../index.html?from=lobby_utama
https://.../index.html?from=eskalator_timur
https://.../index.html?from=area_parkir_b1
```

Kode `from` dicocokkan ke `data/qrpoints.json`. Jika parameter tidak ada
atau tidak dikenali, aplikasi otomatis menampilkan **bottom sheet pemilihan
titik awal** begitu pengguna menekan "Mulai Navigasi" — sesuai spesifikasi.

Untuk menambah titik QR baru: tambahkan entri di `data/qrpoints.json` yang
menunjuk ke `nodeId` yang sudah ada di `data/navpoints.json`, lalu cetak QR
mengarah ke URL dengan parameter `?from=<code>` tersebut.

---

## 3. Struktur folder

```
mallnav/
├── index.html              Shell 3 layar: Home, Map/Preview, Fullscreen Nav
├── manifest.json            Web App Manifest (PWA)
├── sw.js                     Service Worker (cache-first, hanya aktif di http/https)
├── build_embedded.py         Build script — re-generate js/data-embedded.js
│
├── css/
│   ├── variables.css         Design tokens (warna, tipografi, radius, shadow, dark mode)
│   ├── base.css               Reset + layout dasar app shell
│   ├── components.css         Komponen UI reusable (search, sheet, tombol, kartu)
│   ├── navigation.css         Layar peta & mode navigasi fullscreen
│   └── animations.css         Animasi & transisi bersama
│
├── js/
│   ├── utils.js               DOM helper, fuzzy-search (Levenshtein), event bus
│   ├── storage.js             Wrapper localStorage yang aman (private mode dsb.)
│   ├── data-loader.js         Fetch data JSON, fallback ke data-embedded.js
│   ├── data-embedded.js       GENERATED — jangan edit manual (lihat build_embedded.py)
│   ├── searchEngine.js        Pencarian realtime + toleran typo
│   ├── routeEngine.js         Graph builder + Dijkstra + generator instruksi
│   ├── mapEngine.js           SVG interaktif: layer, pan/pinch-zoom, pin, kamera
│   ├── animationEngine.js     Animator polyline 60fps (jalan kaki simulasi)
│   ├── navigationEngine.js    Orkestrasi preview & playback navigasi
│   ├── uiComponents.js        Icon registry + bottom sheet + toast
│   └── app.js                 Bootstrap & wiring seluruh layar
│
├── data/
│   ├── floors.json            Metadata lantai (id, label, path SVG, viewBox)
│   ├── tenants.json            Data tenant (toko, F&B, dsb.)
│   ├── facilities.json         Data fasilitas (toilet, musala, ATM, lift, eskalator, food court)
│   ├── navpoints.json          Graph jalur jalan kaki per lantai + sambungan eskalator/lift
│   └── qrpoints.json           Pemetaan kode QR → titik awal
│
└── assets/
    ├── svg/floor1.svg …3.svg   Denah dummy tiap lantai (SVG murni, bukan gambar statis)
    └── icons/                  Ikon app (svg + png untuk manifest/apple-touch-icon)
```

---

## 4. Cara mengganti untuk mall lain (reusable by design)

Untuk memakai ulang MallNav di mall lain, cukup ganti **3 hal** — tidak ada
kode yang perlu disentuh:

1. **Denah** — ganti `assets/svg/floor*.svg` dengan denah mall baru (tetap
   pakai `viewBox="0 0 1000 700"` atau sesuaikan `data/floors.json`).
2. **Data tenant/fasilitas** — edit `data/tenants.json` dan
   `data/facilities.json`. Setiap item butuh `nodeId` yang ada di
   `data/navpoints.json` (titik terdekat di graph jalan kaki) dan `x`/`y`
   untuk posisi pin di denah.
3. **Logo & nama** — ganti teks "MallNav" / "Bencoolen Mall" di
   `index.html`, `manifest.json`, dan warna brand di `css/variables.css`
   (`--brand-blue`, `--brand-green`, dst).

Setelah mengubah file apa pun di `data/` atau `assets/svg/`, jalankan ulang:

```bash
python3 build_embedded.py
```

Ini men-sinkronkan fallback offline (`js/data-embedded.js`) dengan sumber
data terbaru — **satu-satunya tempat edit data adalah file JSON/SVG asli**,
tidak pernah `data-embedded.js` langsung.

### Menambah/mengubah graph navigasi
`data/navpoints.json` berisi node & edge per lantai (`floors`) plus
`verticalLinks` (sambungan eskalator/lift antar lantai). Tambahkan node baru,
sambungkan dengan edge `[fromId, toId, jarakDalamUnitSVG]`, lalu arahkan
`nodeId` tenant/fasilitas baru ke node terdekat.

---

## 5. Catatan arsitektur

- **Layer peta**: Base Map → Route → Tenant → Facility → Navigation →
  User → Animation, semuanya `<g>` di dalam satu `<svg>` — sesuai konsep
  layer pada spesifikasi, bukan gambar statis.
- **Kamera** diimplementasi lewat perubahan `viewBox` (bukan CSS
  transform), sehingga pan/pinch-zoom/double-tap dan *camera-follow* saat
  navigasi punya matematika koordinat yang sederhana dan presisi.
- **Rute & instruksi**: Dijkstra di atas graph gabungan seluruh lantai;
  transisi lantai lewat "vertical link" (eskalator/lift) dengan
  penalti waktu tersendiri. Instruksi belok kiri/kanan dihasilkan otomatis
  dari perubahan sudut (*bearing*) antar titik jalur.
- **Jarak & estimasi waktu** ditampilkan dalam meter/menit yang realistis
  (skala 1 unit SVG ≈ 12 cm, bisa diubah lewat `DISPLAY_SCALE_M` di
  `js/routeEngine.js` agar sesuai ukuran mall sungguhan).
- **Pencarian** memakai kombinasi pencocokan awalan/substring dan jarak
  Levenshtein pada nama, kategori, dan daftar alias — sehingga "musola",
  "musholla", "musolla" semua menemukan "Mushola" tanpa daftar typo manual
  yang panjang.
- **Tanpa framework**: setiap file `js/*.js` adalah script klasik (bukan
  ES module) yang menambahkan namespace ke `window.MallNav*`, supaya
  aplikasi tetap jalan dibuka langsung dari `file://` tanpa error CORS
  modul.

## 6. Admin

Belum dibuat sesuai cakupan awal — proyek ini fokus penuh pada pengalaman
pengunjung. Semua data diedit langsung lewat file JSON di `data/`.
