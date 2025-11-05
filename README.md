# 🏥 RSU Meloy Sangatta - Official Website

<div align="center">

**Website Rumah Sakit Umum Meloy Sangatta, Kalimantan Timur**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![SEO Score](https://img.shields.io/badge/SEO%20Score-92%2F100-brightgreen)](./ANALISIS_SEO_SCORE.md)
[![Production Ready](https://img.shields.io/badge/Production-Ready-success)](./production/)

[Website Live](https://rsumeloy.co.id) • [Dokumentasi](./PANDUAN_UPLOAD_WINSCP.md) • [SEO Analysis](./ANALISIS_SEO_SCORE.md)

</div>

---

## 📋 Daftar Isi

- [Tentang](#-tentang)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Deployment Production](#-deployment-production)
- [Dokumentasi Lengkap](#-dokumentasi-lengkap)
- [SEO & Performance](#-seo--performance)

---

## 🏥 Tentang

Website resmi **RSU Meloy Sangatta** - Rumah Sakit modern di Sangatta, Kalimantan Timur yang menyediakan layanan kesehatan berkualitas dengan teknologi terkini.

**Alamat:** Jl. Teluk Lingga No.1, Sangatta Utara, Kutai Timur, Kalimantan Timur 75387  
**Kontak:** 0542-21100 / 0542-21150  
**WhatsApp:** +62 812-5232-1909

---

## ✨ Fitur Utama

- 🏥 **Informasi Layanan Lengkap** - Hemodialisa, IGD, MCU, Ambulance, dll
- 👨‍⚕️ **Jadwal Dokter Realtime** - Update jadwal praktek dokter spesialis
- 🏢 **Fasilitas Modern** - Info ruang rawat inap, apotek, laboratorium
- 🤖 **AI Health Assistant** - Chatbot powered by Google Gemini AI
- 📱 **Responsive Design** - Mobile-first, optimized untuk semua device
- 🔒 **Admin Dashboard** - Manajemen konten, dokter, layanan, artikel
- 🌐 **Multi-bahasa** - Indonesia & English (in progress)
- 📊 **SEO Optimized** - Score 92/100, structured data, sitemap
- ⚡ **Performance** - Cloudinary CDN, image optimization, fast loading

---

## 🛠️ Tech Stack

**Framework & Libraries:**
- [Next.js 14.2.33](https://nextjs.org/) - React framework dengan SSR & SSG
- [React 18](https://react.dev/) - UI library
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS

**Backend & Database:**
- [Supabase](https://supabase.com/) - PostgreSQL database + Auth
- [Google Gemini AI](https://ai.google.dev/) - AI chatbot assistant

**Infrastructure:**
- [Cloudinary](https://cloudinary.com/) - Image CDN & optimization
- [Vercel/JagoanHosting](https://jagoanhosting.com/) - Hosting
- [Node.js 18+](https://nodejs.org/) - Runtime environment

**SEO & Analytics:**
- Schema.org structured data (Hospital, Physician, Article)
- Dynamic sitemap & robots.txt
- Open Graph & Twitter Cards
- Google Analytics ready

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x atau 20.x
- npm atau yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan data Supabase & Cloudinary Anda

# Run development server
npm run dev
```

Website akan berjalan di: **http://localhost:3000**

### Environment Variables

Buat file `.env.local` dengan isi:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# Google Gemini AI (opsional)
GEMINI_API_KEY=your_gemini_api_key

# Session Secret
SESSION_SECRET=your_random_32_character_secret

# Environment
NODE_ENV=development
```

---

## 🚀 Deployment Production

### Option 1: Upload via FTP/WinSCP (Recommended untuk JagoanHosting)

#### 📦 Persiapan Folder Production

```bash
# 1. Build aplikasi
npm run build

# 2. Buat folder production (otomatis)
prepare-production.bat

# Atau manual:
npm run build
```

Hasil: Folder `production/` siap upload (**26-30 MB** only!)

#### 📤 Upload ke JagoanHosting

**Step-by-step lengkap:** Lihat [PANDUAN_UPLOAD_WINSCP.md](./PANDUAN_UPLOAD_WINSCP.md)

**Quick steps:**
1. Edit `.env.local` di folder `production/`
2. Download WinSCP (https://winscp.net)
3. Koneksi FTP ke JagoanHosting
4. Upload semua file dari `production/` ke `/public_html/`
5. Setup Node.js App di cPanel
6. Done! ✅

**Estimasi waktu:** 30-40 menit

**Checklist:** Gunakan [CHECKLIST_UPLOAD.md](./CHECKLIST_UPLOAD.md)

---

### Option 2: Deploy ke Vercel (Alternatif)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 📚 Dokumentasi Lengkap

### 🎯 Panduan Deployment

| Dokumen | Deskripsi | Link |
|---------|-----------|------|
| **PANDUAN_UPLOAD_WINSCP.md** | Tutorial lengkap upload via WinSCP ke JagoanHosting | [Buka](./PANDUAN_UPLOAD_WINSCP.md) |
| **CHECKLIST_UPLOAD.md** | Checklist step-by-step deployment | [Buka](./CHECKLIST_UPLOAD.md) |
| **RINGKASAN_FOLDER_PRODUKSI.md** | Ringkasan folder production & cara pakai | [Buka](./RINGKASAN_FOLDER_PRODUKSI.md) |
| **PANDUAN_UPLOAD_FTP_PRODUKSI.md** | Penjelasan teknis standalone mode | [Buka](./PANDUAN_UPLOAD_FTP_PRODUKSI.md) |

### 📊 Analisis & Dokumentasi

| Dokumen | Deskripsi | Link |
|---------|-----------|------|
| **ANALISIS_SEO_SCORE.md** | Analisis SEO detail (Score: 92/100) | [Buka](./ANALISIS_SEO_SCORE.md) |
| **ANALISIS_POTENSI_ERROR.md** | Analisis error & troubleshooting | [Buka](./ANALISIS_POTENSI_ERROR.md) |

---

## 📊 SEO & Performance

### SEO Score: 92/100 (A+ Excellent)

**Breakdown:**
- ✅ **Structured Data:** 100/100 (Perfect!)
- ✅ **On-Page SEO:** 98/100
- ✅ **Technical SEO:** 95/100
- ✅ **URL Structure:** 95/100
- ✅ **Security:** 95/100
- ⚠️ **Mobile SEO:** 90/100
- ⚠️ **Performance:** 85/100

**Competitive Advantage:**
- RSU Meloy: **92/100**
- RS Kompetitor A: 65/100 (+27 points)
- RS Kompetitor B: 70/100 (+22 points)
- RS Kompetitor C: 75/100 (+17 points)

Detail lengkap: [ANALISIS_SEO_SCORE.md](./ANALISIS_SEO_SCORE.md)

### Performance Metrics

- ⚡ **First Load JS:** 87.6 KB (shared)
- 📦 **Total Bundle:** 169 KB (homepage)
- 🖼️ **Images:** Optimized via Cloudinary CDN
- 🚀 **Static Pages:** 40 pre-rendered pages
- 📱 **Mobile Score:** 90/100
- 💻 **Desktop Score:** 95/100

---

## 🗂️ Struktur Folder

```
rsumeloy/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── (admin)/           # Admin dashboard
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── features/         # Feature components
│   ├── layout/           # Layout components
│   ├── pages/            # Page-specific components
│   └── ui/               # UI components
├── lib/                   # Utilities & configs
│   ├── supabase/         # Supabase client
│   ├── database.ts       # Database functions
│   ├── api.ts            # API helpers
│   └── utils.ts          # Utilities
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── data/                  # Static data
├── public/                # Static assets
├── production/            # 📦 Production build (26MB)
└── [Config files]         # next.config, tailwind, etc.
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Production preparation
prepare-production.bat   # Create production folder (Windows)
```

---

## 🌟 Fitur Unggulan

### 🤖 AI Health Assistant
- Powered by **Google Gemini AI**
- Real-time chat support
- Context-aware responses
- Hospital info integration

### 👨‍⚕️ Jadwal Dokter Dinamis
- Realtime dari database Supabase
- Filter by spesialisasi & hari
- Info lengkap: foto, bio, jadwal praktek

### 🏥 Admin Dashboard
- CRUD lengkap: Dokter, Layanan, Fasilitas, Artikel
- Rich text editor untuk artikel
- Image upload via Cloudinary
- Protected routes dengan session

### 📱 Responsive & Mobile-First
- Optimized untuk semua device
- PWA ready (manifest.json)
- Fast loading & smooth navigation

---

## 🐛 Troubleshooting

### Build Error: "Cannot find module"
```bash
npm install
npm run build
```

### Database Connection Error
Cek environment variables `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Gambar Tidak Muncul
Cek `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` di `.env.local`

Dokumentasi lengkap: [ANALISIS_POTENSI_ERROR.md](./ANALISIS_POTENSI_ERROR.md)

---

## 📄 License

Copyright © 2024 RSU Meloy Sangatta. All rights reserved.

---

## 👥 Team

**Developer:** [Your Name]  
**Client:** RSU Meloy Sangatta  
**Hosting:** JagoanHosting  
**Database:** Supabase  
**CDN:** Cloudinary

---

## 📞 Support & Contact

**RSU Meloy Sangatta:**
- 🌐 Website: https://rsumeloy.co.id
- 📧 Email: info@rsumeloy.co.id
- 📱 WhatsApp: +62 812-5232-1909
- 📞 Telepon: 0542-21100 / 0542-21150

**JagoanHosting Support:**
- 🌐 Website: https://jagoanhosting.com
- 💬 Live Chat
- 📧 Email: support@jagoanhosting.com

---

## 🚀 Status Deployment

- ✅ **Development:** Ready
- ✅ **Build:** Success
- ✅ **Production Folder:** Ready (26.59 MB)
- ✅ **Documentation:** Complete
- ⏳ **Live Deployment:** Ready to upload

**Last Build:** 5 November 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✨

---

<div align="center">

**Made with ❤️ for RSU Meloy Sangatta**

[🏥 Visit Website](https://rsumeloy.co.id) • [📚 Documentation](./PANDUAN_UPLOAD_WINSCP.md) • [📊 SEO Report](./ANALISIS_SEO_SCORE.md)

</div>
