---
name: SIPEGAS Design System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
  presence-success: '#10B981'
  presence-warning: '#F59E0B'
  presence-danger: '#EF4444'
  presence-info: '#6366F1'
  surface-muted: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-padding-mobile: 16px
  container-padding-desktop: 32px
  gutter: 16px
  touch-target-min: 48px
---

# Struktur Final Sistem Presensi Pegawai Sekolah

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

- React
- Tailwind CSS
- Responsive Grid/Flex Layout

## Optimasi

- Kamera responsive
- QR scanner mobile optimized
- Touch-friendly button
- Loading ringan

Karena realita lapangan:  
pegawai akan presensi memakai HP murah dengan sinyal setengah putus sambil berdiri di parkiran sekolah.

Kalau aplikasi berat:  
yang hadir bukan data presensi, tapi keluhan.

---

# Interaksi Dinamis

## Teknologi

- AJAX / Fetch API
- React / Vue / Livewire

## Fitur Dinamis

- Presensi realtime tanpa reload
- Scan QR realtime
- Selfie realtime
- Dashboard auto-update
- Approval realtime
- Filter laporan tanpa reload

---

# Hierarki Sistem

```
Admin/HR   ↓Yayasan   ↓Kepala Sekolah   ↓Pegawai/Guru
```

Atau:

```
Admin Sistem├── Yayasan│    └── Kepala Sekolah│          └── Pegawai/Guru
```