# 🎬 NamiraHub - Drama Streaming Website

Platform streaming drama Indonesia modern dengan desain premium, dukungan resolusi hingga 4K Ultra HD, dan fitur auto-play next episode.

![NamiraHub Preview](https://via.placeholder.com/800x400?text=NamiraHub+Preview)

## ✨ Fitur Utama

- 📺 **Streaming 4K Ultra HD** - Pilihan kualitas dari 240p hingga 4K (2160p)
- 🎯 **Auto Quality Selection** - Otomatis memilih kualitas tertinggi yang tersedia
- 📱 **Full Responsive** - Tampilan optimal di desktop, tablet, dan mobile
- ▶️ **Auto Next Episode** - Otomatis lanjut ke episode berikutnya dengan countdown
- 🔍 **Smart Search** - Cari drama favorit dengan realtime suggestions
- ⌨️ **Keyboard Shortcuts** - Kontrol penuh dengan shortcut keyboard
- 🖼️ **Picture-in-Picture** - Tonton sambil browsing tab lain
- � **Premium Dark Mode** - Desain modern ala Netflix/Disney+
- 🎨 **Featured Hero Banner** - Tampilan banner dinamis dengan auto-rotate
- 📂 **Horizontal Carousel** - Navigasi drama dengan smooth scrolling

## 🎥 Resolusi Video Tersedia

| Resolusi | Badge | Deskripsi |
|----------|-------|-----------|
| **2160p** | 4K | Ultra HD (3840×2160) |
| **1440p** | 2K | Quad HD (2560×1440) |
| **1080p** | FHD | Full HD (1920×1080) |
| **720p** | HD | High Definition |
| **540p** | - | Enhanced SD |
| **480p** | - | Standard SD |
| **360p** | - | Low Quality |
| **240p** | - | Minimum Quality |

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `K` | Play/Pause |
| `F` | Toggle Fullscreen |
| `M` | Mute/Unmute |
| `←` | Mundur 10 detik |
| `→` | Maju 10 detik |
| `↑` | Volume naik |
| `↓` | Volume turun |
| `N` | Episode selanjutnya |
| `P` | Episode sebelumnya |
| `Esc` | Keluar fullscreen/player |

## 🚀 Deployment ke Vercel

### Cara 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd NamiraDracin
vercel
```

### Cara 2: Via GitHub

1. Push repository ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Deploy otomatis!

### Cara 3: Drag & Drop

1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag folder project ke area upload
3. Selesai!

## 📁 Struktur Project

```
NamiraDracin/
├── index.html      # Halaman utama dengan UI premium
├── styles.css      # Styling (dark theme, 4K badges)
├── app.js          # Logic aplikasi + demo mode
├── vercel.json     # Konfigurasi Vercel
└── README.md       # Dokumentasi
```

## 🔌 Demo Mode

Website ini memiliki **Demo Mode** untuk development lokal:

- Aktif otomatis saat diakses via `file://` atau `localhost`
- Menampilkan data demo tanpa memerlukan API
- Menggunakan sample video Big Buck Bunny
- Semua fitur UI tetap berfungsi penuh

## 🔗 API Endpoints

Website ini menggunakan API dari `https://dramahubv1.vercel.app`:

| Endpoint | Deskripsi |
|----------|-----------|
| `/api/home` | Daftar drama (recommended & discovery) |
| `/api/home?offset=N` | Pagination |
| `/api/search?q=QUERY` | Pencarian drama |
| `/api/info?series_id=ID` | Detail series & episodes |
| `/api/stream?video_id=ID` | URL streaming video (multi-quality) |

## 🎨 Customization

### Mengubah Warna Brand

Edit variabel CSS di `styles.css`:

```css
:root {
    --brand-primary: #7c3aed;    /* Warna utama (purple) */
    --brand-secondary: #a855f7;  /* Warna sekunder */
    --brand-gradient: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
    --bg-primary: #0a0a0f;       /* Background utama */
}
```

### Quality Priority Order

Ubah urutan prioritas kualitas di `app.js`:

```javascript
const QUALITY_ORDER = ['2160p', '1440p', '1080p', '720p', '540p', '480p', '360p', '240p'];
```

## 📝 License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

## 🤝 Contributing

Pull requests are welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu.

---

Made with ❤️ by NamiraHub Team | © 2026 All Rights Reserved
