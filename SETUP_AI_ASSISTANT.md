# Setup AI Assistant - Google Gemini

## Status Saat Ini
❌ AI Assistant menampilkan pesan "sedang dalam pemeliharaan" karena API key belum dikonfigurasi.

## Cara Mengaktifkan

### 1. Dapatkan API Key Gemini (GRATIS)

1. **Kunjungi**: https://aistudio.google.com/app/apikey
2. **Login** dengan akun Google Anda
3. **Klik "Create API Key"** atau "Get API Key"
4. **Pilih project** atau buat project baru
5. **Copy** API key yang dihasilkan (format: AIza...)

### 2. Tambahkan ke File `.env`

Buka file `.env` dan ganti baris berikut:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Dengan API key Anda yang sebenarnya:

```bash
GEMINI_API_KEY=AIzaSyD...your_actual_key_here
```

### 3. Restart Development Server

Setelah menambahkan API key:

```bash
# Stop server (Ctrl+C di terminal)
# Kemudian jalankan lagi:
npm run dev
```

### 4. Test AI Assistant

1. Buka website di browser: http://localhost:3000
2. Klik tombol AI dengan icon robot di pojok kanan bawah
3. Coba tanyakan sesuatu, misalnya: "Jadwal dokter hari ini"
4. AI Assistant seharusnya sudah merespons dengan baik!

## Fitur AI Assistant

✅ **Informasi Jadwal Dokter** - Real-time dari database
✅ **Info Layanan & Fasilitas** - Semua layanan RSU Meloy  
✅ **Pendaftaran Pasien** - Arahkan ke WhatsApp atau APAM
✅ **Lokasi & Kontak** - Alamat, telepon, jam operasional
✅ **Clickable Links** - AI memberikan link yang bisa diklik
✅ **Multilingual** - Bahasa Indonesia & English
✅ **24/7 Availability** - Selama API key valid

## Troubleshooting

### Masalah: Masih muncul "sedang dalam pemeliharaan"

**Solusi**:
1. Pastikan API key sudah di-paste dengan benar di `.env`
2. Restart development server (Ctrl+C lalu `npm run dev`)
3. Clear browser cache atau buka di incognito mode
4. Check console browser (F12) untuk error

### Masalah: "API key invalid"

**Solusi**:
1. Pastikan API key dimulai dengan "AIza"
2. Tidak ada spasi di awal/akhir API key
3. API key belum expired atau restricted
4. Check di Google AI Studio apakah API key masih aktif

### Masalah: Respons lambat

**Solusi**:
- Normal untuk respons AI membutuhkan 2-5 detik
- Gemini API free tier memiliki rate limit
- Jika terlalu sering digunakan, tunggu beberapa saat

## API Key Limits (Free Tier)

- ✅ **60 requests per minute**
- ✅ **1,500 requests per day**
- ✅ Cukup untuk website dengan traffic normal

## Security Notes

⚠️ **PENTING**:
- Jangan commit file `.env` ke GitHub
- File `.env` sudah ada di `.gitignore`
- API key hanya untuk server-side (tidak di browser)
- Untuk production, simpan di Vercel Environment Variables

## Untuk Production (Vercel)

1. Buka project di Vercel Dashboard
2. Go to Settings → Environment Variables
3. Tambahkan:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your API key
   - **Environment**: Production, Preview, Development
4. Redeploy website

## Support

Jika ada masalah, check:
- https://ai.google.dev/gemini-api/docs
- https://aistudio.google.com/
