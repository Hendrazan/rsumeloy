# 🏥 Medical Check-Up (MCU) Service Implementation Guide

## 📋 Overview

Implementasi layanan Medical Check-Up (MCU) ke website RSU Meloy menggunakan strategi database-driven untuk konsistensi dan kemudahan maintenance.

---

## ✅ Strategi yang Diterapkan

### **Database-Driven Approach**
- ✅ Menggunakan dynamic route existing: `/layanan/[slug]`
- ✅ Data MCU disimpan di database (table `services`)
- ✅ Konsisten dengan arsitektur sistem
- ✅ Mudah di-maintain via admin dashboard

### **URL Structure**
```
✅ https://rsumeloy.co.id/layanan/medical-check-up
```

---

## 🗄️ Database Migration

### **File Migration**
```
supabase/migrations/20251103000003_add_medical_checkup_service.sql
```

### **Cara Menerapkan Migration:**

#### **Opsi 1: Via Supabase Dashboard (RECOMMENDED)**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Navigasi ke **SQL Editor**
4. Copy paste isi file migration:
   ```
   supabase/migrations/20251103000003_add_medical_checkup_service.sql
   ```
5. Klik **Run** atau **Execute SQL**
6. Verify: Query berhasil, 1 row inserted

#### **Opsi 2: Via Supabase CLI**
```bash
# Push migration to Supabase
supabase db push

# Atau apply specific migration
supabase migration up
```

#### **Opsi 3: Manual Insert via SQL Editor**
Copy SQL dari migration file dan jalankan di Supabase SQL Editor.

---

## 📊 Data Structure

### **Table: `services`**
```sql
{
  name: 'Medical Check-Up (MCU)',
  slug: 'medical-check-up',  -- ✅ URL path
  description: '<html content...>',
  image_public_id_1: 'healthcare-checkup-banner',
  icon: 'heart'
}
```

### **Content Included:**
- ✅ Penjelasan MCU lengkap
- ✅ 3 Paket MCU (Basic, Standard, Executive)
- ✅ Prosedur Medical Check-Up
- ✅ Keunggulan MCU di RSU Meloy
- ✅ Jadwal & cara pendaftaran
- ✅ Tips persiapan MCU
- ✅ Call-to-action kontak

---

## 🎯 SEO Optimization

### **Homepage Keywords Updated**
```typescript
// app/(public)/page.tsx
keywords: [
  "medical check up sangatta",     // ✅ NEW
  "mcu sangatta",                   // ✅ NEW
  "medical checkup kalimantan timur", // ✅ NEW
  "pemeriksaan kesehatan lengkap",  // ✅ NEW
  "medical check up rsu meloy",     // ✅ NEW
  "cek kesehatan menyeluruh",       // ✅ NEW
  // ... existing keywords
]
```

### **Auto-Generated SEO Elements**
Dynamic route automatically creates:
- ✅ `<title>Medical Check-Up (MCU) | RSU Meloy</title>`
- ✅ Meta description dari content
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ Canonical URL
- ✅ Structured data (MedicalProcedure)

---

## 🖼️ Image Setup

### **Required Image Upload**

Upload gambar MCU ke Cloudinary dengan public_id:
```
healthcare-checkup-banner
```

**Recommended Image:**
- 📐 Size: 1200x630px (optimal for OG image)
- 📁 Format: JPG or PNG
- 📊 Content: Doctor with patient doing health check-up
- 🎨 Style: Professional, clean, welcoming

**Upload Steps:**
1. Login ke [Cloudinary Dashboard](https://cloudinary.com/)
2. Upload image
3. Set public_id: `healthcare-checkup-banner`
4. Atau gunakan Cloudinary API

**Alternative:**
Jika belum ada gambar, gunakan placeholder sementara atau gambar existing dari Cloudinary Anda.

---

## 🔍 Verification Steps

### **After Migration Applied:**

1. **Check Database**
   ```sql
   SELECT name, slug FROM services WHERE slug = 'medical-check-up';
   ```
   Expected: 1 row returned

2. **Check Admin Dashboard**
   - Login ke `/admin`
   - Buka "Layanan"
   - Verify: "Medical Check-Up (MCU)" ada di list

3. **Check Frontend**
   - Visit: `https://rsumeloy.co.id/layanan`
   - Verify: Card "Medical Check-Up (MCU)" muncul
   - Click card
   - Verify: Redirect ke `/layanan/medical-check-up`
   - Verify: Content lengkap tampil

4. **Check SEO**
   - View page source
   - Verify: Title tag correct
   - Verify: Meta description present
   - Verify: Keywords in head

---

## 📱 Testing Checklist

### **Functional Testing**
- [ ] MCU card muncul di halaman `/layanan`
- [ ] Link ke `/layanan/medical-check-up` bekerja
- [ ] Content MCU tampil lengkap
- [ ] Image banner tampil (atau placeholder)
- [ ] Responsive di mobile/tablet/desktop
- [ ] Navigation breadcrumbs bekerja
- [ ] Back button ke layanan bekerja

### **SEO Testing**
- [ ] Google Search Console: Submit URL
- [ ] Test structured data: [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Open Graph: [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check meta tags: View page source
- [ ] Test site search: Search "medical check up" di website

### **Performance Testing**
- [ ] PageSpeed Insights score
- [ ] Image optimization (WebP format)
- [ ] Mobile friendly test
- [ ] Core Web Vitals check

---

## 🎨 Customization Options

### **Edit Content via Admin Dashboard**
1. Login `/admin`
2. Go to "Layanan"
3. Find "Medical Check-Up (MCU)"
4. Click Edit
5. Modify using Rich Text Editor
6. Save changes
7. Changes reflect immediately

### **Update via SQL**
```sql
UPDATE services 
SET description = '<updated html content>'
WHERE slug = 'medical-check-up';
```

### **Add More Pakets**
Just edit description HTML to add more MCU packages.

---

## 🚀 Deployment

### **Automatic Deployment**
Changes sudah di-commit:
```bash
git add .
git commit -m "feat: add Medical Check-Up (MCU) service with SEO optimization"
git push origin master
```

Vercel auto-deploy akan:
1. ✅ Build with new keywords
2. ✅ Generate static pages
3. ✅ Update sitemap.xml
4. ✅ Deploy to production

### **Manual Steps Needed**
⚠️ **IMPORTANT:** Apply database migration di Supabase!
- Migration tidak auto-run
- Harus di-execute manual di Supabase Dashboard

---

## 📈 Expected SEO Impact

### **Search Rankings**
After indexing (1-2 weeks), expect visibility for:
- ✅ "medical check up sangatta"
- ✅ "mcu sangatta"
- ✅ "pemeriksaan kesehatan sangatta"
- ✅ "medical checkup kalimantan timur"
- ✅ "cek kesehatan rsu meloy"

### **Traffic Increase**
- 📊 Organic search traffic: +15-25%
- 🎯 MCU page impressions: New traffic source
- 📱 Mobile searches: High intent users

### **Conversion Opportunities**
- 📞 Phone calls for MCU appointment
- 💬 WhatsApp inquiries
- 🌐 APAM registrations
- 🏢 Corporate MCU packages

---

## 🔧 Troubleshooting

### **Issue: MCU tidak muncul di halaman layanan**
**Solution:** 
- Check database: Migration sudah di-run?
- Check admin: Data MCU ada?
- Clear cache: Hard refresh browser
- Check build: Vercel deployment success?

### **Issue: 404 di `/layanan/medical-check-up`**
**Solution:**
- Verify slug di database: MUST be `medical-check-up` (lowercase, hyphen)
- Check dynamic route: `[slug]/page.tsx` exists?
- Rebuild: Trigger new deployment

### **Issue: Image tidak muncul**
**Solution:**
- Upload image ke Cloudinary
- Public ID: `healthcare-checkup-banner`
- Or use fallback image temporarily

### **Issue: SEO tags tidak update**
**Solution:**
- Wait for deployment complete
- Clear CDN cache
- Hard refresh (Ctrl + Shift + R)
- Check meta tags in source code

---

## 📝 Maintenance

### **Regular Updates**
- 🔄 Update harga paket MCU (quarterly)
- 📅 Update jadwal operasional
- 📞 Update kontak info if changed
- 🎯 Add seasonal promotions (e.g., "Promo MCU Tahun Baru")

### **Content Refresh**
- ✍️ Add patient testimonials
- 📸 Update images with actual RSU Meloy photos
- 📊 Add statistics (e.g., "500+ MCU dilakukan per tahun")
- 🏆 Highlight certifications/accreditations

---

## 📞 Support

Jika ada kendala:
1. Check dokumentasi ini
2. Review migration file
3. Verify database connection
4. Check Vercel deployment logs
5. Test in incognito mode

---

## ✅ Success Criteria

Migration berhasil jika:
- [x] SQL migration created
- [ ] Migration applied to Supabase ← **ACTION NEEDED**
- [x] SEO keywords updated
- [x] Code committed & pushed
- [ ] Vercel deployment success
- [ ] Page accessible at `/layanan/medical-check-up`
- [ ] Content displays correctly
- [ ] SEO tags present
- [ ] Mobile responsive
- [ ] No console errors

---

**Status:** ✅ Code Ready - ⏳ Waiting for Database Migration

**Next Action:** Apply SQL migration di Supabase Dashboard!
