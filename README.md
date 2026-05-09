# Struktur Sistem Presensi Pegawai Sekolah

## Role Sistem

1. Admin / HR
2. Yayasan
3. Kepala Sekolah
4. Pegawai / Guru

---

# 1. Admin / HR

## Fokus

Pengelolaan sistem dan data operasional.

## Hak Akses

- CRUD Pegawai/Guru
- CRUD Jabatan
- Kelola akun user
- Pengaturan jam kerja
- Pengaturan toleransi keterlambatan
- Validasi absensi manual
- Approval izin/cuti
- Rekap presensi
- Export laporan
- Monitoring seluruh aktivitas sekolah
- Kelola lokasi presensi
- Generate QR Code presensi
- Monitoring selfie presensi

## Dashboard Admin

### Statistik

- Total Pegawai
- Hadir Hari Ini
- Terlambat
- Izin/Sakit
- Tidak Hadir

### Monitoring

- Aktivitas presensi realtime
- Statistik keterlambatan
- Monitoring lokasi presensi
- Monitoring selfie presensi

### Quick Action

- Tambah Pegawai
- Tambah Jabatan
- Kelola Shift
- Generate QR Presensi

## Menu

```
DashboardData PegawaiData JabatanPresensiQR PresensiIzin/CutiLaporanPengaturanProfil
```

---

# 2. Yayasan

## Fokus

Monitoring dan pengawasan sekolah.

## Hak Akses

- Melihat statistik seluruh sekolah
- Monitoring kehadiran pegawai
- Lihat laporan global
- Monitoring performa sekolah
- Export laporan

## Dashboard Yayasan

### Statistik Global

- Total Sekolah
- Total Pegawai
- Persentase Kehadiran
- Statistik Keterlambatan

### Monitoring

- Grafik kehadiran global
- Sekolah paling disiplin
- Sekolah dengan keterlambatan tertinggi

## Menu

```
DashboardMonitoring SekolahLaporan GlobalStatistikProfil
```

---

# 3. Kepala Sekolah

## Fokus

Monitoring operasional sekolah.

## Hak Akses

- Melihat data pegawai sekolah
- Approval izin/cuti
- Monitoring keterlambatan
- Rekap presensi
- Validasi absensi tertentu
- Lihat statistik sekolah
- Menerima laporan presensi harian via WhatsApp
- Monitoring selfie presensi pegawai

## Dashboard Kepala Sekolah

### Statistik

- Pegawai Hadir Hari Ini
- Pegawai Terlambat
- Pegawai Izin/Sakit

### Monitoring

- Aktivitas presensi realtime
- Grafik kehadiran sekolah
- Approval izin pending
- Preview selfie presensi terbaru

### Rekap

- Pegawai paling disiplin
- Persentase kehadiran bulanan

## Menu

```
DashboardData PegawaiPresensiApproval IzinLaporanStatistikProfil
```

---

# 4. Pegawai / Guru

## Fokus

Presensi dan aktivitas pribadi.

## Hak Akses

- Check-in/check-out
- Scan QR Code presensi
- Validasi lokasi presensi
- Selfie wajah saat presensi
- Melihat riwayat presensi
- Filter tanggal presensi
- Ajukan izin/cuti
- Upload bukti izin
- Lihat statistik pribadi
- Edit profil

## Dashboard Pegawai

### Status Hari Ini

- Status hadir
- Jam check-in
- Jam check-out
- Status keterlambatan

### Quick Action

- Check-in
- Check-out
- Scan QR Code
- Selfie Presensi
- Ajukan izin

### Statistik

- Total hadir bulan ini
- Total terlambat
- Persentase kehadiran

### Riwayat

- Riwayat presensi terbaru
- Kalender kehadiran

## Menu

```
DashboardPresensiScan QRSelfie PresensiRiwayat PresensiIzin/CutiProfil
```

---

# Fitur Integrasi API

# 1. Geolocation / Maps API

## Fungsi

Validasi lokasi presensi pegawai.

## Implementasi

- Mengambil latitude & longitude device
- Validasi radius lokasi sekolah
- Menolak presensi di luar area

## Fitur

- Menampilkan maps lokasi user
- Menyimpan koordinat presensi
- Riwayat lokasi presensi

---

# 2. QR Code Presensi

## Fungsi

Check-in/check-out menggunakan QR.

## Implementasi

### Admin

- Generate QR Code harian/dinamis

### Pegawai

- Scan QR menggunakan kamera device

## Keamanan

- QR expired otomatis
- QR berubah berkala
- Validasi lokasi tetap aktif

---

# 3. Selfie Wajah Presensi

## Fungsi

Validasi visual saat check-in/check-out.

## Implementasi

- Kamera otomatis aktif saat presensi
- Pegawai mengambil selfie realtime
- Foto tersimpan bersama data presensi

## Validasi

- Wajib selfie saat check-in
- Timestamp otomatis
- Metadata lokasi tersimpan

## Fitur Tambahan

- Preview selfie presensi
- Riwayat selfie
- Validasi kualitas gambar minimum

## Keamanan

- Tidak boleh upload dari galeri
- Kamera harus realtime

Karena tanpa validasi realtime, manusia akan menemukan cara upload foto lama tahun 2023 sambil tetap tidur di rumah. Evolusi spesies yang sangat konsisten.

---

# 4. WhatsApp Gateway

## Fungsi

Mengirim laporan presensi harian otomatis ke Kepala Sekolah.

## Isi Laporan

- Total hadir
- Total terlambat
- Total izin/sakit
- Pegawai belum presensi

## Trigger

- Otomatis setiap hari
- Manual dari admin

## Teknologi

- Fonnte API
- Wablas
- Meta WhatsApp API

---

# Responsive Design

## Target Device

- Mobile
- Tablet
- Desktop

## Implementasi UI/UX

### Mobile First

- Bottom navigation
- Card layout
- Floating action button untuk presensi
- Kamera fullscreen untuk scan QR & selfie

### Desktop

- Sidebar navigation
- Dashboard statistik lengkap
- Table monitoring realtime

## Teknologi Frontend

- Tailwind CSS
- Responsive Grid/Flex Layout

## Optimasi

- Kamera responsive
- QR scanner mobile optimized
- Touch-friendly button
- Loading ringan

---

# Interaksi Dinamis

## Teknologi

- AJAX / Fetch API

## Fitur Dinamis

- Presensi realtime tanpa reload
- Scan QR realtime
- Selfie realtime
- Dashboard auto-update
- Approval realtime
- Filter laporan tanpa reload

---
