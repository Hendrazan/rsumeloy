# 🚀 Deploy Sementara ke Vercel Sambil Setup Jagoan Hosting

Panduan untuk deploy website RSU Meloy ke Vercel sebagai solusi sementara sambil menunggu setup di Jagoan Hosting selesai.

---

## 🎯 OPSI A: Deploy ke Vercel dengan Subdomain Vercel (TERCEPAT - 5 menit)

Cara ini TIDAK perlu mengubah DNS di Jagoan Hosting sama sekali. Website akan online di subdomain Vercel.

### Langkah 1: Deploy ke Vercel

1. **Buka Vercel:**
   - Kunjungi: https://vercel.com/
   - Login dengan akun GitHub Anda (atau buat akun baru)

2. **Import Project:**
   - Klik **"Add New"** → **"Project"**
   - Pilih **"Import Git Repository"**
   - Pilih repository: **`Hendrazan/rsumeloy`**
   - Klik **"Import"**

3. **Configure Project:**
   
   **Project Name:** `rsumeloy` (atau nama lain yang Anda suka)
   
   **Framework Preset:** Next.js (akan terdeteksi otomatis)
   
   **Root Directory:** `./` (default)
   
   **Build Command:** `npm run build` (default)
   
   **Output Directory:** `.next` (default)

4. **Environment Variables:**
   
   Klik **"Environment Variables"** dan tambahkan:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....
   SUPABASE_SERVICE_ROLE_KEY=eyJ.....

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
   CLOUDINARY_API_KEY=123456789
   CLOUDINARY_API_SECRET=abcdef123456

   # Google Gemini AI
   GEMINI_API_KEY=AIza.....

   # Admin
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=password-kuat-anda

   # Session
   SESSION_SECRET=random-string-32-karakter

   # Base URL (pakai domain Vercel dulu)
   NEXT_PUBLIC_BASE_URL=https://rsumeloy.vercel.app
   ```

5. **Deploy:**
   - Klik **"Deploy"**
   - Tunggu 2-5 menit
   - Website akan online di: **https://rsumeloy.vercel.app**

### ✅ Selesai!

Website Anda sudah online di Vercel dengan subdomain:
- **URL:** https://rsumeloy.vercel.app
- **Status:** Production ready
- **SSL:** Otomatis (HTTPS)

**Keuntungan:**
- ✅ Deploy hanya 5 menit
- ✅ Tidak perlu ubah DNS
- ✅ Website online untuk testing
- ✅ Domain asli (rsumeloy.co.id) tetap mengarah ke hosting lama

---

## 🎯 OPSI B: Alihkan Domain rsumeloy.co.id ke Vercel (SEMENTARA)

Jika Anda ingin domain **www.rsumeloy.co.id** langsung mengarah ke Vercel sementara, ikuti langkah berikut:

### Langkah 1: Deploy ke Vercel (sama seperti Opsi A)

Ikuti **Opsi A** di atas dulu hingga website online di Vercel.

### Langkah 2: Tambahkan Custom Domain di Vercel

1. **Di Dashboard Vercel:**
   - Buka project **rsumeloy**
   - Klik tab **"Settings"**
   - Klik **"Domains"** di sidebar

2. **Tambahkan Domain:**
   - Ketik: `www.rsumeloy.co.id`
   - Klik **"Add"**

3. **Vercel akan memberikan instruksi DNS:**
   
   Vercel akan menampilkan record yang harus ditambahkan:
   
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Langkah 3: Update DNS di Jagoan Hosting

1. **Login ke cPanel Jagoan Hosting:**
   - URL: https://panel.jagoanhosting.com (atau sesuai email)
   - Login dengan kredensial Anda

2. **Masuk ke DNS Zone Editor:**
   - Cari menu **"Zone Editor"** atau **"DNS Zone Editor"**
   - Pilih domain: **rsumeloy.co.id**

3. **Ubah Record `www`:**

   **JIKA SUDAH ADA RECORD `www`:**
   - Cari record dengan Name: `www`
   - **Edit** record tersebut:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `3600` (1 jam)
   - Klik **"Save"**

   **JIKA BELUM ADA RECORD `www`:**
   - Klik **"Add Record"**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `3600`
   - Klik **"Save"**

4. **Redirect Root Domain (Optional):**

   Jika Anda ingin `rsumeloy.co.id` (tanpa www) juga mengarah ke Vercel:
   
   **Tambahkan Record A:**
   - Type: `A`
   - Name: `@` (atau kosongkan)
   - Value: `76.76.21.21` (IP Vercel)
   - TTL: `3600`

### Langkah 4: Verifikasi Domain di Vercel

1. **Kembali ke Dashboard Vercel:**
   - Tab **"Domains"**
   - Klik **"Refresh"** atau tunggu beberapa menit

2. **Status Domain:**
   - Akan berubah menjadi **"Valid Configuration"** jika DNS sudah propagasi
   - SSL akan otomatis di-generate oleh Vercel (tunggu 1-5 menit)

### ✅ Selesai!

Website Anda sekarang online di:
- **https://www.rsumeloy.co.id** → Mengarah ke Vercel
- **https://rsumeloy.vercel.app** → Masih bisa diakses

**Status:**
- ✅ Domain asli sudah online
- ✅ SSL otomatis (HTTPS)
- ✅ Website berjalan di Vercel sementara

---

## 🔄 OPSI C: Setup Subdomain Sementara (RECOMMENDED)

Cara ini paling aman karena website lama tetap online di domain utama.

### Langkah 1: Deploy ke Vercel (sama seperti Opsi A)

Ikuti **Opsi A** hingga website online di Vercel.

### Langkah 2: Buat Subdomain di Vercel

1. **Di Dashboard Vercel:**
   - Buka project **rsumeloy**
   - Tab **"Settings"** → **"Domains"**
   - Tambahkan: `baru.rsumeloy.co.id`

2. **Vercel akan memberikan instruksi DNS:**
   ```
   Type: CNAME
   Name: baru
   Value: cname.vercel-dns.com
   ```

### Langkah 3: Tambahkan Subdomain di Jagoan Hosting

1. **Login ke cPanel Jagoan Hosting**

2. **Masuk ke DNS Zone Editor**

3. **Tambahkan Record CNAME:**
   - Type: `CNAME`
   - Name: `baru`
   - Value: `cname.vercel-dns.com`
   - TTL: `3600`
   - Klik **"Save"**

### ✅ Selesai!

Website baru online di:
- **https://baru.rsumeloy.co.id** → Vercel (website baru)
- **https://www.rsumeloy.co.id** → Jagoan Hosting (website lama tetap online)

**Keuntungan:**
- ✅ Website lama tetap online
- ✅ Website baru bisa ditest di subdomain
- ✅ Tidak ada downtime
- ✅ Bisa switch kapan saja

---

## 📊 Perbandingan 3 Opsi

| Fitur | Opsi A (Subdomain Vercel) | Opsi B (Alihkan Domain) | Opsi C (Subdomain Sendiri) |
|-------|---------------------------|-------------------------|----------------------------|
| **Kecepatan Setup** | ⚡ 5 menit | ⏱️ 15-30 menit | ⏱️ 15-30 menit |
| **Ubah DNS** | ❌ Tidak perlu | ✅ Perlu | ✅ Perlu |
| **Website Lama** | ✅ Tetap online | ❌ Offline | ✅ Tetap online |
| **Domain** | rsumeloy.vercel.app | www.rsumeloy.co.id | baru.rsumeloy.co.id |
| **Downtime** | ❌ Tidak ada | ⚠️ 5-30 menit | ❌ Tidak ada |
| **Cocok untuk** | Testing cepat | Production langsung | Testing & staging |

---

## 🔄 Cara Kembali ke Jagoan Hosting Nanti

Setelah setup di Jagoan Hosting selesai:

### Jika Menggunakan Opsi A (Subdomain Vercel):
- Tidak perlu ubah apa-apa
- Website baru di Jagoan Hosting akan online di www.rsumeloy.co.id
- Vercel tetap bisa diakses di rsumeloy.vercel.app

### Jika Menggunakan Opsi B (Alihkan Domain):
1. **Ubah DNS di Jagoan Hosting:**
   - Record `www`: CNAME → `rsumeloy.co.id` atau A → `IP server Jagoan`
   - Record `@`: A → `IP server Jagoan`
   
2. **Tunggu propagasi DNS (5-30 menit)**

3. **Website akan kembali mengarah ke Jagoan Hosting**

### Jika Menggunakan Opsi C (Subdomain):
1. **Ubah DNS di Jagoan Hosting:**
   - Record `www`: CNAME/A → Server Jagoan Hosting
   
2. **Hapus subdomain `baru` (optional):**
   - Hapus record CNAME untuk `baru`

---

## ⚠️ Catatan Penting

### 1. Environment Variables
Pastikan environment variables di Vercel SAMA dengan yang di Jagoan Hosting nanti.

### 2. Propagasi DNS
Perubahan DNS butuh waktu 5 menit - 48 jam (biasanya 5-30 menit).

### 3. SSL Certificate
Vercel akan otomatis generate SSL certificate untuk domain Anda (gratis).

### 4. Cloudinary & Supabase
Gunakan kredensial yang sama untuk Vercel dan Jagoan Hosting agar data konsisten.

### 5. Testing
Selalu test website di Vercel sebelum mengalihkan domain:
- Cek semua halaman
- Cek gambar loading
- Cek database connection
- Cek admin panel

---

## 🛠️ Troubleshooting

### ❌ Domain tidak bisa ditambahkan di Vercel
**Penyebab:** Domain sudah digunakan project lain atau belum diverifikasi

**Solusi:**
- Pastikan domain tidak terdaftar di project Vercel lain
- Hapus domain dari project lain jika ada

### ❌ DNS tidak propagasi
**Penyebab:** Perubahan DNS butuh waktu

**Solusi:**
- Tunggu 30 menit - 1 jam
- Cek dengan: https://dnschecker.org/
- Clear browser cache: Ctrl + Shift + Del

### ❌ SSL belum aktif
**Penyebab:** Vercel sedang generate certificate

**Solusi:**
- Tunggu 5-10 menit setelah DNS propagasi
- Refresh halaman Vercel dashboard

### ❌ Website tidak bisa akses database
**Penyebab:** Environment variables salah

**Solusi:**
- Cek **Settings** → **Environment Variables** di Vercel
- Pastikan semua variabel sudah benar
- Redeploy: **Deployments** → **...** → **Redeploy**

---

## 📞 Bantuan

- **Vercel Docs:** https://vercel.com/docs
- **Jagoan Hosting Support:** https://www.jagoanhosting.com/support
- **DNS Checker:** https://dnschecker.org/

---

## 🎯 Rekomendasi Saya

**Untuk Anda, saya rekomendasikan OPSI C (Subdomain Sementara):**

✅ **Keuntungan:**
- Website lama tetap online (tidak ada downtime)
- Website baru bisa ditest dengan sempurna
- Domain profesional (baru.rsumeloy.co.id)
- Bisa switch kapan saja tanpa risiko
- Tidak perlu buru-buru setup Jagoan Hosting

**Setup:**
1. Deploy ke Vercel (5 menit)
2. Tambahkan subdomain `baru.rsumeloy.co.id` di Vercel
3. Update DNS di Jagoan Hosting (5 menit)
4. Tunggu propagasi (15-30 menit)
5. Test website di https://baru.rsumeloy.co.id
6. Setelah yakin OK, baru alihkan www.rsumeloy.co.id

---

**Selamat Deploy! 🚀**
