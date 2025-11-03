# Update Fitur Lowongan (Vacancies) - Dashboard Admin

## 📋 Perubahan yang Dilakukan

### 1. **Rich Text Editor untuk Deskripsi**
Sekarang deskripsi lowongan menggunakan **Rich Text Editor** seperti layanan, yang memungkinkan:
- ✅ **Formatting text**: Bold, Italic, Underline
- ✅ **Heading**: H1, H2, H3
- ✅ **Paragraf** terstruktur dengan spacing yang baik
- ✅ **List**: Bullet points dan numbering
- ✅ **Link** untuk informasi tambahan

### 2. **Upload Gambar Lowongan**
Fitur baru untuk menambahkan gambar pada lowongan pekerjaan:
- ✅ Field baru: **"Gambar Lowongan (Opsional)"**
- ✅ Gambar ditampilkan di card lowongan
- ✅ Meningkatkan visual appeal dan informativeness

### 3. **Tipe Pekerjaan (Dropdown)**
Sekarang menggunakan dropdown dengan pilihan standar:
- Full-time
- Part-time
- Kontrak
- Magang

---

## 🚀 Cara Menggunakan (Admin Dashboard)

### Menambah/Edit Lowongan:

1. **Login ke Admin Dashboard**
   - Buka `/admin`
   - Masuk dengan credentials admin

2. **Pilih "Lowongan" dari sidebar**

3. **Klik "Tambah Baru" atau Edit lowongan yang ada**

4. **Isi Form dengan Rich Text Editor**:

   **Posisi**: (text)
   ```
   Perawat IGD
   ```

   **Deskripsi Lengkap**: (rich text editor)
   ```html
   <h2>Deskripsi Pekerjaan</h2>
   <p>RSU Meloy membuka lowongan untuk posisi <strong>Perawat IGD</strong> dengan pengalaman minimal 2 tahun.</p>
   
   <h3>Tanggung Jawab:</h3>
   <ul>
     <li>Melakukan triage pasien</li>
     <li>Memberikan pertolongan pertama</li>
     <li>Koordinasi dengan dokter jaga</li>
   </ul>
   
   <h3>Kualifikasi:</h3>
   <ul>
     <li>D3/S1 Keperawatan</li>
     <li>STR aktif</li>
     <li>Pengalaman min. 2 tahun di IGD</li>
     <li>Mampu bekerja shift</li>
   </ul>
   
   <h3>Benefit:</h3>
   <ul>
     <li>Gaji kompetitif</li>
     <li>BPJS Kesehatan & Ketenagakerjaan</li>
     <li>Tunjangan shift</li>
     <li>Pelatihan berkala</li>
   </ul>
   ```

   **Tipe Pekerjaan**: (dropdown)
   ```
   Full-time
   ```

   **Lokasi**: (text)
   ```
   RSU Meloy, Sangatta
   ```

   **Gambar Lowongan** (opsional): (text)
   ```
   rsu-meloy/lowongan/perawat-igd
   ```
   💡 *Upload gambar terlebih dahulu ke Cloudinary, lalu copy Public ID-nya*

   **Batas Akhir**: (date picker)
   ```
   2025-12-31
   ```

5. **Klik "Simpan"**

---

## 📸 Cara Upload Gambar ke Cloudinary

1. **Login ke Cloudinary Dashboard**
   - https://cloudinary.com/console

2. **Upload gambar**:
   - Drag & drop atau pilih file
   - Recommended size: 1200x630px (landscape)
   - Format: JPG/PNG

3. **Copy Public ID**:
   - Klik gambar yang sudah diupload
   - Copy bagian "Public ID" (contoh: `rsu-meloy/lowongan/perawat-igd`)
   - Paste ke field "Gambar Lowongan"

---

## 🎨 Tampilan di Website

### Card Lowongan (List View):
```
┌─────────────────────────────────┐
│  [GAMBAR LOWONGAN - 600x400]   │
├─────────────────────────────────┤
│  Perawat IGD                    │
│  💼 Full-time  📍 RSU Meloy     │
├─────────────────────────────────┤
│  RSU Meloy membuka lowongan...  │
│  (preview 150 karakter)         │
├─────────────────────────────────┤
│  📅 Batas: 31 Des 2025          │
│                  [Kirim Lamaran]│
└─────────────────────────────────┘
```

### Tanpa Gambar:
```
┌─────────────────────────────────┐
│  Perawat IGD                    │
│  💼 Full-time  📍 RSU Meloy     │
├─────────────────────────────────┤
│  RSU Meloy membuka lowongan...  │
├─────────────────────────────────┤
│  📅 Batas: 31 Des 2025          │
│                  [Kirim Lamaran]│
└─────────────────────────────────┘
```

---

## 🗄️ Database Migration

File migration sudah dibuat: `supabase/migrations/20251103000001_update_vacancies_table.sql`

### Untuk Apply Migration:

#### Via Supabase CLI (Recommended):
```bash
supabase db push
```

#### Via SQL Editor (Manual):
1. Buka Supabase Dashboard
2. Pilih project RSU Meloy
3. Buka SQL Editor
4. Copy isi file migration
5. Run SQL

### Migration Details:
- ✅ Menambah kolom `image_public_id` (TEXT, nullable)
- ✅ Mengubah `description` menjadi TEXT untuk rich HTML
- ✅ Menambah index untuk `deadline` dan `created_at`

---

## ✅ Checklist Deployment

- [x] Update `collectionConfig.ts` - Rich text + image field
- [x] Update `types.ts` - Add `image_public_id` to Vacancy interface
- [x] Update `VacanciesList.tsx` - Display image & rich text preview
- [x] Create migration file
- [ ] **Apply migration ke Supabase**
- [ ] **Test di admin dashboard**
- [ ] **Test tampilan di website**

---

## 🎯 Testing

### 1. Test Admin Dashboard:
- ✅ Buat lowongan baru dengan rich text
- ✅ Upload gambar ke Cloudinary
- ✅ Paste Public ID
- ✅ Preview formatting
- ✅ Save dan verify

### 2. Test Website Display:
- ✅ Buka `/tentang/lowongan`
- ✅ Verify gambar tampil dengan benar
- ✅ Verify text preview terpotong dengan baik
- ✅ Verify "Kirim Lamaran" button works

### 3. Test Responsiveness:
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

---

## 📝 Notes

1. **Rich Text Editor** menggunakan component yang sama dengan Layanan dan Info, sudah teruji dan aman (dengan sanitization).

2. **Gambar adalah opsional** - lowongan tetap bisa dibuat tanpa gambar.

3. **Preview deskripsi** di card akan menampilkan plain text (HTML tags dihapus) dengan maksimal 150 karakter.

4. **Security**: Semua HTML content di-sanitize menggunakan `sanitizeHtml()` untuk mencegah XSS.

5. **SEO**: Rich text content lebih baik untuk SEO karena search engine bisa membaca struktur heading dan paragraf.

---

## 🐛 Troubleshooting

**Q: Gambar tidak muncul?**
- Verify Public ID benar (tidak ada leading/trailing slash)
- Check gambar sudah diupload ke Cloudinary
- Verify Cloudinary config di `.env`

**Q: Formatting tidak tampil di preview?**
- Preview memang plain text, buka detail lowongan untuk lihat formatting lengkap

**Q: Migration error?**
- Pastikan koneksi ke Supabase aktif
- Check apakah kolom sudah ada (IF NOT EXISTS akan skip jika sudah ada)

---

**Status**: ✅ Ready untuk deployment
**Last Updated**: November 3, 2025
**Migration File**: `20251103000001_update_vacancies_table.sql`
