-- Migration: Add Medical Check-Up (MCU) service
-- Created: 2025-11-03

-- First, delete existing MCU service if exists (to allow fresh insert or update)
DELETE FROM services WHERE name = 'Medical Check-Up (MCU)';

-- Insert Medical Check-Up service
INSERT INTO services (
  name,
  description,
  image_public_id_1
) VALUES (
  'Medical Check-Up (MCU)',
  '<div class="space-y-6">
    <h2 class="text-2xl font-bold text-primary">Medical Check-Up (MCU) di RSU Meloy Sangatta</h2>
    
    <p class="text-lg">
      Pemeriksaan kesehatan menyeluruh (Medical Check-Up) adalah langkah proaktif untuk mendeteksi dini 
      berbagai penyakit dan menjaga kesehatan Anda secara optimal. RSU Meloy menyediakan layanan MCU 
      dengan peralatan modern dan tim medis profesional.
    </p>

    <h3 class="text-xl font-semibold text-primary mt-6">Mengapa MCU Penting?</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Deteksi Dini Penyakit:</strong> Menemukan masalah kesehatan sebelum menjadi serius</li>
      <li><strong>Pencegahan:</strong> Mencegah komplikasi penyakit dengan tindakan preventif</li>
      <li><strong>Monitor Kesehatan:</strong> Memantau kondisi kesehatan secara berkala</li>
      <li><strong>Gaya Hidup Sehat:</strong> Mendapatkan rekomendasi pola hidup yang lebih sehat</li>
      <li><strong>Hemat Biaya:</strong> Mencegah biaya pengobatan yang lebih besar di kemudian hari</li>
    </ul>

    <h3 class="text-xl font-semibold text-primary mt-6">Paket Medical Check-Up RSU Meloy</h3>
    
    <div class="space-y-4 mt-4">
      <div class="bg-secondary/30 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">📋 Paket MCU Basic</h4>
        <p class="mb-2">Cocok untuk pemeriksaan kesehatan rutin tahunan</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Pemeriksaan Fisik Lengkap oleh Dokter Umum</li>
          <li>Pemeriksaan Tekanan Darah</li>
          <li>Pemeriksaan Tinggi & Berat Badan (BMI)</li>
          <li>Pemeriksaan Mata & Penglihatan</li>
          <li>Tes Urine Lengkap</li>
          <li>Tes Darah Rutin (Hb, Leukosit, Trombosit)</li>
          <li>Tes Gula Darah Puasa</li>
          <li>Tes Kolesterol Total</li>
          <li>Konsultasi Hasil dengan Dokter</li>
        </ul>
      </div>

      <div class="bg-secondary/30 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">📋 Paket MCU Standard</h4>
        <p class="mb-2">Pemeriksaan lebih lengkap dengan skrining organ vital</p>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>Semua pemeriksaan Paket Basic</strong></li>
          <li>Pemeriksaan EKG (Jantung)</li>
          <li>Rontgen Thorax (Paru-paru)</li>
          <li>USG Abdomen (Perut)</li>
          <li>Tes Fungsi Hati (SGOT, SGPT)</li>
          <li>Tes Fungsi Ginjal (Ureum, Kreatinin)</li>
          <li>Tes Asam Urat</li>
          <li>Tes Kolesterol Lengkap (LDL, HDL, Trigliserida)</li>
          <li>Tes HbA1c (Gula Darah 3 Bulan)</li>
          <li>Konsultasi dengan Dokter Spesialis Penyakit Dalam</li>
        </ul>
      </div>

      <div class="bg-secondary/30 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">📋 Paket MCU Executive</h4>
        <p class="mb-2">Pemeriksaan komprehensif untuk skrining kesehatan menyeluruh</p>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>Semua pemeriksaan Paket Standard</strong></li>
          <li>Treadmill Test (Tes Jantung)</li>
          <li>Echocardiography (Echo Jantung)</li>
          <li>Rontgen Thorax 2 Posisi</li>
          <li>USG Abdomen Upper & Lower</li>
          <li>Marker Tumor (CEA, AFP)</li>
          <li>Tes Hepatitis B & C</li>
          <li>Tes Fungsi Tiroid (TSH, T3, T4)</li>
          <li>Tes Darah Lengkap + Diferensial</li>
          <li>Konsultasi Multi Spesialis (Penyakit Dalam & Jantung)</li>
          <li>Laporan Hasil Lengkap + Rekomendasi Kesehatan</li>
        </ul>
      </div>
    </div>

    <h3 class="text-xl font-semibold text-primary mt-6">Prosedur Medical Check-Up</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Pendaftaran:</strong> Hubungi kami via WhatsApp (0549) 24222 atau APAM untuk jadwal MCU</li>
      <li><strong>Persiapan:</strong> Puasa 8-12 jam sebelum pemeriksaan (untuk tes darah)</li>
      <li><strong>Pemeriksaan:</strong> Datang sesuai jadwal, proses MCU sekitar 2-3 jam</li>
      <li><strong>Hasil:</strong> Hasil pemeriksaan akan siap dalam 3-5 hari kerja</li>
      <li><strong>Konsultasi:</strong> Jadwalkan konsultasi untuk penjelasan hasil MCU</li>
    </ol>

    <h3 class="text-xl font-semibold text-primary mt-6">Siapa yang Perlu MCU?</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li>👤 <strong>Usia 30+ tahun:</strong> Pemeriksaan rutin minimal 1 tahun sekali</li>
      <li>💼 <strong>Pekerja Kantoran:</strong> Deteksi dini penyakit akibat gaya hidup</li>
      <li>👨‍👩‍👧 <strong>Riwayat Penyakit Keluarga:</strong> Skrining penyakit keturunan</li>
      <li>🏃 <strong>Gaya Hidup Tidak Sehat:</strong> Merokok, jarang olahraga, stress</li>
      <li>⚕️ <strong>Penyakit Kronis:</strong> Monitor kondisi diabetes, hipertensi, dll</li>
      <li>🏢 <strong>Karyawan Perusahaan:</strong> MCU tahunan/berkala</li>
    </ul>

    <h3 class="text-xl font-semibold text-primary mt-6">Keunggulan MCU di RSU Meloy</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div class="flex items-start space-x-3">
        <span class="text-2xl">✅</span>
        <div>
          <strong>Peralatan Modern</strong>
          <p class="text-sm">Teknologi medis terkini untuk hasil akurat</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <span class="text-2xl">👨‍⚕️</span>
        <div>
          <strong>Tim Medis Profesional</strong>
          <p class="text-sm">Dokter spesialis berpengalaman</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <span class="text-2xl">⏱️</span>
        <div>
          <strong>Proses Cepat</strong>
          <p class="text-sm">Pemeriksaan efisien tanpa antrian lama</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <span class="text-2xl">📊</span>
        <div>
          <strong>Laporan Lengkap</strong>
          <p class="text-sm">Hasil detail dengan interpretasi medis</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <span class="text-2xl">💰</span>
        <div>
          <strong>Harga Terjangkau</strong>
          <p class="text-sm">Paket MCU dengan harga kompetitif</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <span class="text-2xl">🤝</span>
        <div>
          <strong>Kerjasama Perusahaan</strong>
          <p class="text-sm">Paket khusus untuk MCU karyawan</p>
        </div>
      </div>
    </div>

    <h3 class="text-xl font-semibold text-primary mt-6">Jadwal & Pendaftaran</h3>
    <div class="bg-primary/10 p-4 rounded-lg mt-4">
      <p class="mb-3"><strong>Jadwal MCU:</strong></p>
      <ul class="list-disc pl-6 space-y-1 mb-4">
        <li>Senin - Sabtu: 07:00 - 10:00 WITA</li>
        <li>Pendaftaran minimal H-2 sebelumnya</li>
        <li>MCU Perusahaan (Group): Jadwal fleksibel by appointment</li>
      </ul>

      <p class="mb-3"><strong>Cara Pendaftaran:</strong></p>
      <ul class="list-disc pl-6 space-y-1">
        <li>📱 <strong>WhatsApp:</strong> (0549) 24222</li>
        <li>🌐 <strong>Online:</strong> <a href="https://apam.rsumeloy.co.id" class="text-primary hover:underline">apam.rsumeloy.co.id</a></li>
        <li>📞 <strong>Telepon:</strong> (0549) 24222</li>
        <li>🏥 <strong>Langsung:</strong> Loket Pendaftaran RSU Meloy</li>
      </ul>
    </div>

    <h3 class="text-xl font-semibold text-primary mt-6">Tips Persiapan MCU</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li>✅ Puasa 8-12 jam sebelum pemeriksaan (boleh minum air putih)</li>
      <li>✅ Istirahat cukup malam sebelumnya</li>
      <li>✅ Hindari alkohol & merokok 24 jam sebelumnya</li>
      <li>✅ Bawa hasil MCU terdahulu (jika ada) untuk perbandingan</li>
      <li>✅ Pakai pakaian yang nyaman dan mudah dilepas</li>
      <li>✅ Bawa KTP dan kartu asuransi/BPJS (jika ada)</li>
      <li>✅ Informasikan obat yang sedang dikonsumsi ke dokter</li>
    </ul>

    <div class="bg-destructive/10 border-l-4 border-destructive p-4 rounded mt-6">
      <p class="font-semibold mb-2">⚠️ Penting:</p>
      <ul class="list-disc pl-6 space-y-1">
        <li>Hasil MCU bersifat rahasia dan hanya diberikan kepada pasien/yang bersangkutan</li>
        <li>MCU tidak menggantikan konsultasi medis untuk keluhan spesifik</li>
        <li>Untuk kondisi darurat, segera ke UGD atau hubungi 118</li>
      </ul>
    </div>

    <div class="bg-primary/10 p-6 rounded-lg mt-6 text-center">
      <h4 class="text-xl font-bold mb-3">Investasi Terbaik adalah Kesehatan Anda</h4>
      <p class="mb-4">Jangan tunggu sakit, lakukan Medical Check-Up sekarang!</p>
      <p class="text-lg font-semibold">📞 Hubungi: (0549) 24222</p>
      <p class="text-sm text-muted-foreground mt-2">Tim kami siap membantu Anda</p>
    </div>
  </div>',
  'healthcare-checkup-banner'
);
