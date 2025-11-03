# 🔒 Security Protection - Spam & Phishing URLs

## 📋 Ringkasan

URL `/dansa?id=cak-jitu-login` yang Anda temukan adalah **upaya spam/phishing** yang mencoba memanfaatkan domain Anda. Sistem sekarang sudah dilindungi dengan:

### ✅ Proteksi yang Ditambahkan:

1. **Middleware Protection** - Deteksi dan blokir URL mencurigakan
2. **Database Logging** - Track semua upaya akses mencurigakan
3. **Custom 404 Page** - Halaman tidak ditemukan yang user-friendly
4. **Admin Dashboard** - Monitor security logs

---

## 🛡️ Cara Kerja Proteksi

### 1. Pattern Detection

Middleware akan mendeteksi pattern mencurigakan di URL:

```typescript
const suspiciousPatterns = [
  /\b(login|slot|judi|togel|poker|casino|bet|gambling|cuan|gacor|maxwin)\b/i,
  /\b(dansa|porno|xxx|sex|adult)\b/i,
  /\b(obat|viagra|cialis|pharmacy)\b/i,
  /\b(fake|scam|phishing)\b/i,
];
```

### 2. Automatic Blocking

Jika URL match dengan pattern:
- ❌ Return 404 Not Found
- 📝 Log ke database
- 🚨 Console warning dengan IP address

### 3. Data yang Dilog

Setiap upaya akses mencurigakan akan menyimpan:
- Timestamp
- Full URL path
- IP Address
- User Agent
- Referer
- Pattern yang match

---

## 📊 Monitoring Security Logs

### Akses Admin Dashboard

1. Login ke admin: `https://rsumeloy.co.id/admin/login`
2. Buka Security Logs: `https://rsumeloy.co.id/admin/security`

### Yang Bisa Dilihat:

- **Total Attempts** - Jumlah total upaya akses mencurigakan
- **Last 24 Hours** - Aktivitas dalam 24 jam terakhir
- **Unique IPs** - Berapa banyak IP berbeda yang mencoba
- **Detail Logs** - Tabel lengkap dengan timestamp, URL, IP, pattern
- **User Agent Analysis** - Browser/bot yang digunakan

---

## 🗄️ Database Setup

### Migration Required

Jalankan migration di Supabase SQL Editor:

```bash
# File: supabase/migrations/20251103000002_create_suspicious_urls.sql
```

Atau via Supabase CLI:

```bash
supabase db push
```

### Table Structure

```sql
suspicious_urls:
- id (uuid)
- timestamp (timestamptz)
- path (text)
- query_params (text)
- full_url (text)
- ip_address (text)
- user_agent (text)
- referer (text)
- pattern_matched (text)
```

### Auto-Cleanup

Records older than 30 days akan otomatis dihapus:

```sql
SELECT delete_old_suspicious_urls();
```

---

## 🔍 Contoh Kasus

### URL yang Terdeteksi:

```
❌ /dansa?id=cak-jitu-login
❌ /slot-gacor
❌ /poker-online
❌ /judi-togel
❌ /xxx-video
```

### Response:

```
HTTP 404 Not Found
```

### Log Entry:

```json
{
  "timestamp": "2025-11-03T10:30:00Z",
  "full_url": "/dansa?id=cak-jitu-login",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "referer": "https://spam-site.com",
  "pattern_matched": "/\\b(dansa|porno|xxx|sex|adult)\\b/i"
}
```

---

## 🚀 Deployment Checklist

### 1. Push ke GitHub ✅
```bash
git push origin master
```

### 2. Vercel Deployment ⏳
- Auto-deploy akan dimulai
- Tunggu 2-3 menit

### 3. Run Migration di Supabase 🔄

Di Supabase Dashboard → SQL Editor:

```sql
-- Copy paste isi file:
-- supabase/migrations/20251103000002_create_suspicious_urls.sql
```

Atau gunakan Supabase CLI:

```bash
supabase migration up
```

### 4. Test Protection ✅

Test URL mencurigakan:
```
https://rsumeloy.co.id/dansa?test
https://rsumeloy.co.id/slot-test
```

Seharusnya dapat:
- ✅ 404 Not Found page
- ✅ Log entry di `/admin/security`

---

## 📈 Monitoring Tips

### 1. Check Regularly

Cek security logs setiap minggu via:
```
https://rsumeloy.co.id/admin/security
```

### 2. Watch for Patterns

Perhatikan:
- ✅ IP addresses yang berulang
- ✅ Spike dalam 24 jam terakhir
- ✅ User agents yang mencurigakan (bots)
- ✅ Referer dari situs spam

### 3. Update Patterns

Jika menemukan pattern baru, tambahkan ke `middleware.ts`:

```typescript
const suspiciousPatterns = [
  // ... existing patterns
  /\b(new-spam-keyword)\b/i,
];
```

---

## 🔐 Best Practices

### DO ✅

- Monitor security logs regularly
- Update suspicious patterns as needed
- Review unique IPs for repeated attempts
- Keep migration up to date

### DON'T ❌

- Jangan ignore warning logs
- Jangan hapus logging functionality
- Jangan expose security dashboard ke public
- Jangan hardcode sensitive data

---

## 📞 Troubleshooting

### "Table suspicious_urls doesn't exist"

**Solution:** Run migration di Supabase:
```sql
-- Copy paste 20251103000002_create_suspicious_urls.sql
```

### "No logs showing in admin dashboard"

**Solution:** 
1. Check migration sudah di-apply
2. Test dengan URL mencurigakan
3. Check Supabase RLS policies

### "Too many false positives"

**Solution:** Refine pattern di `middleware.ts`:
```typescript
// Buat pattern lebih spesifik
/\b(dansa|porno)\b/i
```

---

## 🎯 Summary

| Feature | Status |
|---------|--------|
| Pattern Detection | ✅ Active |
| URL Blocking | ✅ Active |
| Database Logging | ✅ Ready (need migration) |
| Admin Dashboard | ✅ Ready |
| Custom 404 Page | ✅ Active |
| Auto-cleanup | ✅ Ready |

### Next Steps:

1. ⏳ **Wait for Vercel deployment** (2-3 min)
2. 🗄️ **Run migration** di Supabase
3. 🔍 **Test protection** dengan URL mencurigakan
4. 📊 **Monitor logs** di `/admin/security`

---

**Created:** November 3, 2025  
**Commit:** 5665237  
**Status:** 🟢 Production Ready (after migration)
