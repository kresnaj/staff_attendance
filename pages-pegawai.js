// Login + Pegawai Dashboard + helpers
function renderLogin() {
  return `<div class="login-page">
  <div class="login-container">
    <div class="login-brand">
      <div>
        <h1 style="font-family:Manrope;font-size:36px;font-weight:800;margin-bottom:8px;display:flex;align-items:center;gap:12px">
          <span class="material-symbols-outlined icon-filled" style="font-size:36px">domain</span>SIPEGAS</h1>
        <p style="opacity:0.85;font-size:16px;line-height:1.6">Sistem Informasi Presensi Pegawai Sekolah</p>
      </div>
      <div style="margin-top:32px;padding:24px;background:rgba(255,255,255,0.1);border-radius:16px;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span class="material-symbols-outlined" style="font-size:20px">verified</span>
          <span style="font-weight:600;font-size:14px">Fitur Unggulan</span>
        </div>
        <ul style="list-style:none;font-size:13px;opacity:0.9;display:flex;flex-direction:column;gap:8px">
          <li>✓ Presensi QR Code & Selfie Realtime</li>
          <li>✓ Validasi GPS & Geofencing</li>
          <li>✓ Laporan Otomatis via WhatsApp</li>
          <li>✓ Dashboard Multi-Role</li>
        </ul>
      </div>
      <p style="font-size:12px;opacity:0.5;margin-top:32px">© 2026 SIPEGAS v2.0</p>
    </div>
    <div class="login-form-side">
      <div class="hide-desktop" style="text-align:center;margin-bottom:32px">
        <h1 style="font-family:Manrope;font-size:28px;font-weight:800;color:var(--accent);display:flex;align-items:center;justify-content:center;gap:8px">
          <span class="material-symbols-outlined icon-filled" style="color:var(--accent)">domain</span>SIPEGAS</h1>
      </div>
      <div style="margin-bottom:24px">
        <h2 class="text-h2" style="margin-bottom:4px">Selamat Datang</h2>
        <p class="text-sm" style="color:var(--text-secondary)">Pilih peran Anda untuk melanjutkan</p>
      </div>
      <div class="role-grid">
        <button class="role-btn" onclick="selectRole('admin')">
          <div class="role-icon" style="background:var(--accent-bg);color:var(--accent)"><span class="material-symbols-outlined">manage_accounts</span></div>
          <span class="role-label">Admin / HR</span>
        </button>
        <button class="role-btn" onclick="selectRole('yayasan')">
          <div class="role-icon" style="background:#FEF3C7;color:#D97706"><span class="material-symbols-outlined">account_balance</span></div>
          <span class="role-label">Yayasan</span>
        </button>
        <button class="role-btn" onclick="selectRole('kepsek')">
          <div class="role-icon" style="background:#EDE9FE;color:#7C3AED"><span class="material-symbols-outlined">school</span></div>
          <span class="role-label">Kepala Sekolah</span>
        </button>
        <button class="role-btn selected" onclick="selectRole('pegawai')">
          <div class="role-icon" style="background:var(--success-bg);color:var(--success)"><span class="material-symbols-outlined">badge</span></div>
          <span class="role-label">Pegawai / Guru</span>
        </button>
      </div>
      <form onsubmit="doLogin(event)" style="display:flex;flex-direction:column;gap:16px">
        <div class="input-group">
          <label>Employee ID / Email</label>
          <div style="position:relative">
            <span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:20px">person</span>
            <input class="input input-icon" placeholder="Contoh: EP2346172" value="EP2346172"/>
          </div>
        </div>
        <div class="input-group">
          <label>Password / PIN</label>
          <div style="position:relative">
            <span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:20px">lock</span>
            <input class="input input-icon" type="password" placeholder="••••••••" value="12345678"/>
          </div>
        </div>
        <button class="btn btn-primary btn-lg w-full" type="submit" style="margin-top:8px">
          Login ke SIPEGAS <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>
        </button>
      </form>
    </div>
  </div></div>`;
}

function renderPegawaiDashboard() {
  const u = STATE.user;
  return `<div class="main-mobile">
  <div class="mobile-header">
    <div style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="avatar" style="width:48px;height:48px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;border-color:rgba(255,255,255,0.3)">${u.avatar}</div>
        <div><h2 style="font-size:18px;font-weight:700">${getGreeting()}, ${u.name.split(' ')[0]}!</h2><p style="font-size:13px;opacity:0.8">${getDate()}</p></div>
      </div>
      <button class="btn-icon" onclick="showToast('Notifikasi akan segera hadir','success')" style="background:rgba(255,255,255,0.15);color:#fff;border:none;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative">
        <span class="material-symbols-outlined">notifications</span>
        <span style="position:absolute;top:8px;right:8px;width:8px;height:8px;background:var(--danger);border-radius:50%;border:2px solid rgba(10,37,64,0.8)"></span>
      </button>
    </div>
  </div>
  <div class="status-card-floating card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <span class="text-caps" style="color:var(--text-muted)">Status Hari Ini</span>
      <span class="badge badge-success">Sudah Check-in</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1px 1fr;gap:16px;align-items:center">
      <div style="text-align:center">
        <p class="text-hero" style="color:var(--accent)">07:15</p>
        <p class="text-xs" style="color:var(--text-muted);margin-top:4px">Jam Masuk</p>
      </div>
      <div style="width:1px;height:40px;background:var(--border)"></div>
      <div style="text-align:center">
        <p class="text-hero" style="color:var(--text-muted)">--:--</p>
        <p class="text-xs" style="color:var(--text-muted);margin-top:4px">Jam Pulang</p>
      </div>
    </div>
    <div style="margin-top:16px;padding:10px 16px;background:var(--warning-bg);border-radius:8px;display:flex;align-items:center;gap:8px">
      <span class="material-symbols-outlined" style="color:var(--warning);font-size:18px">schedule</span>
      <span class="text-xs" style="color:#92400E;font-weight:500">Sisa waktu kerja: <b id="countdown">--:--:--</b></span>
    </div>
  </div>
  <div class="quick-action-grid">
    <button class="quick-action-btn" onclick="navigate('qr-scan')" style="background:var(--accent);color:#fff;box-shadow:0 4px 15px rgba(0,102,255,0.3)">
      <span class="material-symbols-outlined" style="font-size:32px">qr_code_scanner</span>Scan QR
    </button>
    <button class="quick-action-btn card" onclick="navigate('izin')" style="color:var(--text)">
      <span class="material-symbols-outlined" style="font-size:32px;color:var(--accent)">event_busy</span>Izin / Sakit
    </button>
  </div>
  <div style="padding:0 20px;margin-bottom:24px">
    <h3 class="text-caps" style="color:var(--text-muted);margin-bottom:16px">Statistik Bulan Ini</h3>
    <div style="display:flex;justify-content:space-around">
      ${renderProgressCircle(92, 'Hadir', 'var(--success)')}
      ${renderProgressCircle(5, 'Izin', 'var(--warning)')}
      ${renderProgressCircle(3, 'Telat', 'var(--danger)')}
    </div>
  </div>
  <div style="padding:0 20px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 class="text-caps" style="color:var(--text-muted)">Riwayat Terakhir</h3>
      <a href="#" onclick="navigate('riwayat');return false" style="font-size:12px;color:var(--accent);text-decoration:none;font-weight:600">Lihat Semua</a>
    </div>
    ${HISTORY.slice(0,3).map(h => {
      const sc = h.status==='hadir'?'success':h.status==='terlambat'?'warning':'info';
      const sl = h.status==='hadir'?'Hadir':h.status==='terlambat'?'Terlambat':h.status==='izin'?'Izin':'Sakit';
      return `<div class="card" style="padding:14px 16px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
        <div><p class="text-sm" style="font-weight:600">${h.day}</p><p class="text-xs" style="color:var(--text-muted)">${h.time!=='--'?'Check-in: '+h.time:'Tidak masuk'}</p></div>
        <span class="badge badge-${sc}">${sl}</span></div>`;
    }).join('')}
  </div>
  ${renderBottomNav('beranda')}</div>`;
}

function renderProgressCircle(pct, label, color) {
  return `<div style="text-align:center"><div class="progress-circle"><svg viewBox="0 0 36 36">
    <path class="track" d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"/>
    <path class="fill" d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831" stroke="${color}" stroke-dasharray="${pct}, 100"/>
  </svg><div class="value" style="color:${color}">${pct}%</div></div><p class="text-xs" style="color:var(--text-muted);margin-top:6px">${label}</p></div>`;
}

function renderBottomNav(active) {
  const items = [
    ['beranda','home','Beranda','pegawai-dashboard'],
    ['presensi','qr_code_scanner','Presensi','qr-scan'],
    ['riwayat','history','Riwayat','riwayat'],
    ['profil','person','Profil','profil']
  ];
  return `<nav class="bottom-nav hide-desktop">${items.map(([id,icon,label,page]) =>
    `<a href="#" class="${active===id?'active':''}" onclick="navigate('${page}');return false">
      <span class="material-symbols-outlined ${active===id?'icon-filled':''}">${icon}</span><span>${label}</span></a>`
  ).join('')}</nav>`;
}
