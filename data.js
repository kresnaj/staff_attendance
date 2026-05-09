// SIPEGAS Core Data & State
const STATE = {
  currentRole: null,
  currentPage: 'login',
  user: null,
  darkMode: localStorage.getItem('sipegas-dark') === 'true',
  notifOpen: false,
  sidebarCollapsed: false,
};

const USERS = {
  admin: { name: 'Rina Kartika', role: 'admin', avatar: 'RK', nip: '199201082015032001', jabatan: 'Admin HR', sekolah: 'SMA Nusantara 1' },
  yayasan: { name: 'H. Budi Santoso', role: 'yayasan', avatar: 'BS', nip: '197505151998031002', jabatan: 'Ketua Yayasan', sekolah: 'Yayasan Nusantara' },
  kepsek: { name: 'Dr. Ahmad Fauzi, M.Pd', role: 'kepsek', avatar: 'AF', nip: '198003212005011003', jabatan: 'Kepala Sekolah', sekolah: 'SMA Nusantara 1' },
  pegawai: { name: 'Siti Nurhaliza', role: 'pegawai', avatar: 'SN', nip: '198805142010012003', jabatan: 'Guru Matematika', sekolah: 'SMA Nusantara 1' }
};

const EMPLOYEES = [
  { id: 1, name: 'Siti Nurhaliza', role: 'Guru Matematika', time: '06:55', out: '15:10', status: 'hadir', loc: true, gender: 'P' },
  { id: 2, name: 'Budi Prasetyo', role: 'Guru B. Indonesia', time: '07:42', out: '--:--', status: 'terlambat', loc: true, gender: 'L' },
  { id: 3, name: 'Dewi Lestari', role: 'Guru IPA', time: '--:--', out: '--:--', status: 'sakit', loc: false, gender: 'P' },
  { id: 4, name: 'Agus Hermawan', role: 'Guru B. Inggris', time: '06:58', out: '15:05', status: 'hadir', loc: true, gender: 'L' },
  { id: 5, name: 'Ratna Sari', role: 'Guru Seni', time: '07:15', out: '--:--', status: 'hadir', loc: true, gender: 'P' },
  { id: 6, name: 'Hendra Gunawan', role: 'Guru Olahraga', time: '--:--', out: '--:--', status: 'izin', loc: false, gender: 'L' },
  { id: 7, name: 'Maya Indah', role: 'Guru PKN', time: '07:01', out: '15:15', status: 'hadir', loc: true, gender: 'P' },
  { id: 8, name: 'Fajar Rahman', role: 'Staf TU', time: '07:30', out: '--:--', status: 'terlambat', loc: true, gender: 'L' },
  { id: 9, name: 'Lina Marlina', role: 'Pustakawan', time: '--:--', out: '--:--', status: 'cuti', loc: false, gender: 'P' },
  { id: 10, name: 'Rudi Hartono', role: 'Guru Agama', time: '06:50', out: '15:00', status: 'hadir', loc: true, gender: 'L' },
];

const LEAVE_REQUESTS = [
  { id: 1, empId: 3, name: 'Dewi Lestari', type: 'Sakit', reason: 'Demam tinggi, perlu istirahat', days: 2, hasDoc: true, start: '2026-05-07', end: '2026-05-08', status: 'approved', createdAt: '07 Mei 06:30' },
  { id: 2, empId: 5, name: 'Ratna Sari', type: 'Izin', reason: 'Acara keluarga penting', days: 1, hasDoc: false, start: '2026-05-09', end: '2026-05-09', status: 'pending', createdAt: '08 Mei 14:20' },
  { id: 3, empId: 9, name: 'Lina Marlina', type: 'Cuti', reason: 'Cuti melahirkan', days: 10, hasDoc: true, start: '2026-05-05', end: '2026-05-16', status: 'approved', createdAt: '01 Mei 08:00' },
  { id: 4, empId: 7, name: 'Maya Indah', type: 'Dinas Luar', reason: 'Workshop kurikulum di Dinas Pendidikan', days: 2, hasDoc: true, start: '2026-05-09', end: '2026-05-10', status: 'pending', createdAt: '08 Mei 16:45' },
  { id: 5, empId: 6, name: 'Hendra Gunawan', type: 'Izin', reason: 'Urusan keluarga mendesak', days: 1, hasDoc: false, start: '2026-05-09', end: '2026-05-09', status: 'pending', createdAt: '09 Mei 05:30' },
];

const NOTIFICATIONS = [
  { id: 1, icon: 'check_circle', color: 'var(--success)', title: 'Presensi Berhasil', msg: 'Check-in pukul 06:55 tercatat', time: '2 menit lalu', read: false },
  { id: 2, icon: 'event_available', color: 'var(--accent)', title: 'Izin Disetujui', msg: 'Izin sakit 7-8 Mei telah disetujui Kepala Sekolah', time: '1 jam lalu', read: false },
  { id: 3, icon: 'info', color: 'var(--info)', title: 'Pengumuman', msg: 'Rapat guru hari Jumat pukul 14:00', time: '3 jam lalu', read: true },
  { id: 4, icon: 'schedule', color: 'var(--warning)', title: 'Pengingat', msg: 'Jangan lupa presensi pulang sebelum 16:00', time: 'Kemarin', read: true },
];

const SCHOOLS = [
  { id: 1, name: 'SDN 1 Merdeka', city: 'Jakarta', pegawai: 48, attendance: 95, late: 3, absent: 2 },
  { id: 2, name: 'SMP Nusantara', city: 'Bandung', pegawai: 52, attendance: 88, late: 7, absent: 5 },
  { id: 3, name: 'SMA Harapan Bangsa', city: 'Surabaya', pegawai: 45, attendance: 82, late: 10, absent: 8 },
];

const SETTINGS = {
  whatsappNumber: '628123456789',
  dailyReport: true,
  geofenceRadius: 150,
  schoolLat: -6.2088,
  schoolLng: 106.8456,
  workStart: '07:00',
  workEnd: '15:00',
  tolerance: 15,
  schoolName: 'SMA Nusantara 1',
};

const HISTORY = [
  { date: '2026-05-09', day: 'Jumat', time: '06:55', out: '15:10', status: 'hadir' },
  { date: '2026-05-08', day: 'Kamis', time: '07:02', out: '15:05', status: 'hadir' },
  { date: '2026-05-07', day: 'Rabu', time: '07:35', out: '15:20', status: 'terlambat' },
  { date: '2026-05-06', day: 'Selasa', time: '--', out: '--', status: 'izin' },
  { date: '2026-05-05', day: 'Senin', time: '06:48', out: '15:00', status: 'hadir' },
  { date: '2026-05-02', day: 'Jumat', time: '06:50', out: '15:10', status: 'hadir' },
  { date: '2026-05-01', day: 'Kamis', time: '--', out: '--', status: 'sakit' },
  { date: '2026-04-30', day: 'Rabu', time: '07:10', out: '15:15', status: 'hadir' },
  { date: '2026-04-29', day: 'Selasa', time: '06:55', out: '15:00', status: 'hadir' },
  { date: '2026-04-28', day: 'Senin', time: '07:40', out: '15:05', status: 'terlambat' },
];

const MONTHLY_TREND = {
  labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
  data: [92, 89, 94, 91, 93, 88, 90, 95, 92, 91, 93, 94],
};

const WEEKLY_TREND = {
  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
  hadir: [9, 8, 10, 9, 7],
  terlambat: [1, 2, 0, 1, 2],
};

// Helpers
function getDate() {
  return new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function getTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function getTimeShort() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}
function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat Pagi';
  if (h < 15) return 'Selamat Siang';
  if (h < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}
function getSummary() {
  const a = EMPLOYEES;
  return {
    total: a.length,
    hadir: a.filter(x => x.status === 'hadir').length,
    terlambat: a.filter(x => x.status === 'terlambat').length,
    izin: a.filter(x => x.status === 'izin' || x.status === 'sakit' || x.status === 'cuti').length,
    belum: a.filter(x => x.status === 'belum').length,
  };
}
function getPending() {
  return LEAVE_REQUESTS.filter(l => l.status === 'pending');
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
