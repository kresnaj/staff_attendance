// SIPEGAS Main App Controller
const app = document.getElementById('app');
document.body.insertAdjacentHTML('beforeend', '<div class="toast-container" id="toasts"></div>');

// Dark mode init
if (STATE.darkMode) document.documentElement.setAttribute('data-theme', 'dark');

function toggleDarkMode() {
  STATE.darkMode = !STATE.darkMode;
  localStorage.setItem('sipegas-dark', STATE.darkMode);
  document.documentElement.setAttribute('data-theme', STATE.darkMode ? 'dark' : '');
}

// Navigation
function navigate(page) {
  STATE.currentPage = page;
  STATE.notifOpen = false;
  render();
  window.scrollTo(0, 0);
}

function selectRole(role) {
  STATE.currentRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function doLogin(e) {
  e.preventDefault();
  const role = STATE.currentRole || 'pegawai';
  STATE.user = USERS[role];
  STATE.currentRole = role;
  const pages = { admin: 'admin-dashboard', yayasan: 'yayasan-dashboard', kepsek: 'kepsek-dashboard', pegawai: 'pegawai-dashboard' };
  navigate(pages[role]);
  showToast('Login berhasil! Selamat datang, ' + STATE.user.name, 'success');
}

function doLogout() {
  STATE.user = null;
  STATE.currentRole = null;
  navigate('login');
  showToast('Berhasil keluar', 'success');
}

function showToast(msg, type) {
  const c = document.getElementById('toasts');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px">${type === 'success' ? 'check_circle' : 'error'}</span>${msg}`;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

function toggleNotif() {
  STATE.notifOpen = !STATE.notifOpen;
  const dd = document.getElementById('notif-dropdown');
  if (dd) dd.classList.toggle('open', STATE.notifOpen);
}

function showSuccessModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal" style="text-align:center">
    <div style="width:80px;height:80px;border-radius:50%;background:var(--success-bg);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
      <span class="material-symbols-outlined icon-filled" style="font-size:48px;color:var(--success)">check_circle</span>
    </div>
    <h2 class="text-h2" style="margin-bottom:8px">Presensi Berhasil!</h2>
    <p class="text-sm" style="color:var(--text-secondary);margin-bottom:24px">Anda telah berhasil melakukan presensi masuk hari ini.</p>
    <div style="background:var(--surface);border-radius:12px;padding:16px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="text-sm" style="color:var(--text-muted)">Waktu</span><span class="text-data" style="font-weight:600">${getTime()}</span></div>
      <div style="display:flex;justify-content:space-between"><span class="text-sm" style="color:var(--text-muted)">Status</span><span class="badge badge-success">Tepat Waktu</span></div>
    </div>
    <button class="btn btn-primary btn-lg w-full" onclick="this.closest('.modal-overlay').remove();navigate('pegawai-dashboard')">Kembali ke Beranda</button>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 300); } });
}

function showErrorModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal" style="text-align:center">
    <div style="width:80px;height:80px;border-radius:50%;background:var(--danger-bg);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
      <span class="material-symbols-outlined icon-filled" style="font-size:48px;color:var(--danger)">cancel</span>
    </div>
    <h2 class="text-h2" style="margin-bottom:8px">Presensi Gagal</h2>
    <p class="text-sm" style="color:var(--text-secondary);margin-bottom:24px">Anda berada di luar radius presensi.</p>
    <button class="btn btn-danger btn-lg w-full" style="margin-bottom:8px" onclick="this.closest('.modal-overlay').remove()">Coba Lagi</button>
    <button class="btn btn-outline btn-lg w-full" onclick="this.closest('.modal-overlay').remove()">Tutup</button>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function showQrModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  let timeLeft = 60;
  overlay.innerHTML = `<div class="modal" style="text-align:center;max-width:500px">
    <h2 class="text-h2" style="margin-bottom:4px">QR Code Presensi</h2>
    <p class="text-sm" style="color:var(--text-secondary);margin-bottom:24px">Tampilkan ke layar agar pegawai dapat scan</p>
    <div style="width:240px;height:240px;margin:0 auto 20px;background:var(--surface);border-radius:16px;display:flex;align-items:center;justify-content:center;border:2px solid var(--border)">
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:2px;width:180px;height:180px">
        ${Array.from({length:64},()=>`<div style="background:${Math.random()>0.4?'var(--text)':'transparent'};border-radius:2px"></div>`).join('')}
      </div>
    </div>
    <div style="margin-bottom:20px"><div style="height:4px;background:var(--surface);border-radius:4px;overflow:hidden"><div id="qr-progress" style="height:100%;width:100%;background:var(--accent);border-radius:4px;transition:width 1s linear"></div></div>
    <p class="text-xs" style="color:var(--text-muted);margin-top:8px">Refresh dalam <span id="qr-timer">${timeLeft}</span> detik</p></div>
    <button class="btn btn-outline w-full" onclick="this.closest('.modal-overlay').remove()">Tutup</button>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  const timer = setInterval(() => {
    timeLeft--;
    const el = document.getElementById('qr-timer');
    const pr = document.getElementById('qr-progress');
    if (el) el.textContent = timeLeft;
    if (pr) pr.style.width = (timeLeft / 60 * 100) + '%';
    if (timeLeft <= 0) { clearInterval(timer); timeLeft = 60; }
  }, 1000);
  overlay.addEventListener('click', e => { if (e.target === overlay) { clearInterval(timer); overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 300); } });
}

function approveLeave(id) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (lr) { lr.status = 'approved'; showToast('Izin ' + lr.name + ' disetujui', 'success'); render(); }
}
function rejectLeave(id) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (lr) { lr.status = 'rejected'; showToast('Izin ' + lr.name + ' ditolak', 'error'); render(); }
}

function saveSettings() {
  SETTINGS.whatsappNumber = document.getElementById('wa-num')?.value || SETTINGS.whatsappNumber;
  SETTINGS.geofenceRadius = parseInt(document.getElementById('geo-radius')?.value) || 150;
  SETTINGS.workStart = document.getElementById('work-start')?.value || '07:00';
  SETTINGS.workEnd = document.getElementById('work-end')?.value || '15:00';
  SETTINGS.tolerance = parseInt(document.getElementById('tolerance')?.value) || 15;
  showToast('Pengaturan berhasil disimpan!', 'success');
}

function toggleDaily() {
  SETTINGS.dailyReport = !SETTINGS.dailyReport;
  const el = document.getElementById('daily-toggle');
  if (el) el.classList.toggle('active', SETTINGS.dailyReport);
  showToast(SETTINGS.dailyReport ? 'Laporan harian diaktifkan' : 'Laporan harian dinonaktifkan', 'success');
}

// Render
function render() {
  const p = STATE.currentPage;
  let html = '';
  switch (p) {
    case 'login': html = renderLogin(); break;
    case 'pegawai-dashboard': html = renderPegawaiDashboard(); break;
    case 'admin-dashboard': html = renderAdminDashboard(); break;
    case 'admin-pengaturan': html = renderAdminPengaturan(); break;
    case 'admin-monitoring': html = renderAdminMonitoring(); break;
    case 'admin-pegawai': html = renderAdminPegawai(); break;
    case 'kepsek-dashboard': html = renderKepsekDashboard(); break;
    case 'kepsek-rekap': html = renderKepsekRekap(); break;
    case 'kepsek-izin': html = renderKepsekIzin(); break;
    case 'yayasan-dashboard': html = renderYayasanDashboard(); break;
    case 'yayasan-sekolah': html = renderYayasanSekolah(); break;
    case 'qr-scan': html = renderQrScan(); break;
    case 'selfie': html = renderSelfie(); break;
    case 'izin': html = renderIzin(); break;
    case 'riwayat': html = renderRiwayat(); break;
    case 'profil': html = renderProfil(); break;
    default: html = renderLogin();
  }
  app.innerHTML = html;
  startTimers();
}

function startTimers() {
  const cd = document.getElementById('countdown');
  if (cd) {
    const update = () => {
      const now = new Date();
      const end = new Date(); end.setHours(16, 0, 0, 0);
      const diff = Math.max(0, end - now);
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      cd.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    };
    update(); setInterval(update, 1000);
  }
  const st = document.getElementById('selfie-time');
  if (st) setInterval(() => { st.textContent = getTime(); }, 1000);
  const lc = document.getElementById('live-clock');
  if (lc) setInterval(() => { lc.textContent = getTime(); }, 1000);
}

// Ripple
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn, .quick-action-btn, .role-btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Close notif on outside click
document.addEventListener('click', e => {
  if (STATE.notifOpen && !e.target.closest('.notif-wrapper')) {
    STATE.notifOpen = false;
    const dd = document.getElementById('notif-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

// Init
STATE.currentRole = 'pegawai';
render();
