// Desktop pages: Admin Dashboard, Pengaturan, Monitoring, Pegawai
function renderSidebar(role, active) {
  const menus = {
    admin: [
      ['Dashboard','dashboard','admin-dashboard'],
      ['Monitoring','photo_library','admin-monitoring'],
      ['Data Pegawai','groups','admin-pegawai'],
      ['Pengaturan','settings','admin-pengaturan'],
    ],
    kepsek: [
      ['Dashboard','dashboard','kepsek-dashboard'],
      ['Rekap Kehadiran','analytics','kepsek-rekap'],
      ['Approval Izin','task_alt','kepsek-izin'],
    ],
    yayasan: [
      ['Dashboard','dashboard','yayasan-dashboard'],
      ['Kelola Sekolah','domain','yayasan-sekolah'],
    ]
  };
  return `<aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">S</div>
      <div><h2 style="font-family:Manrope;font-size:20px;font-weight:800;color:var(--accent)">SIPEGAS</h2>
      <p class="text-xs" style="color:var(--text-muted)">${role==='admin'?'Admin System':role==='kepsek'?'Kepala Sekolah':'Yayasan'}</p></div>
    </div>
    <nav>${(menus[role]||[]).map(([label,icon,page]) =>
      `<a href="#" class="${active===page?'active':''}" onclick="navigate('${page}');return false"><span class="material-symbols-outlined ${active===page?'icon-filled':''}">${icon}</span>${label}</a>`
    ).join('')}</nav>
    <div class="sidebar-footer">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <span class="text-xs" style="color:var(--text-muted)">Mode Gelap</span>
        <button class="dark-toggle" onclick="toggleDarkMode()"></button>
      </div>
      <a href="#" onclick="doLogout();return false" style="display:flex;align-items:center;gap:8px;color:var(--danger);text-decoration:none;font-size:14px;padding:8px 0">
        <span class="material-symbols-outlined">logout</span>Keluar</a>
    </div></aside>`;
}

function renderTopbar() {
  const u = STATE.user;
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  return `<header class="topbar">
    <div class="topbar-search hide-mobile">
      <span class="material-symbols-outlined">search</span>
      <input placeholder="Cari pegawai, presensi..."/>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <span class="text-data hide-mobile" id="live-clock" style="color:var(--text-muted)">${getTime()}</span>
      <div class="notif-wrapper" style="position:relative">
        <button class="btn-icon btn-ghost" style="position:relative;border:none;cursor:pointer" onclick="toggleNotif()">
          <span class="material-symbols-outlined">notifications</span>
          ${unread > 0 ? `<span style="position:absolute;top:6px;right:6px;width:8px;height:8px;background:var(--danger);border-radius:50%"></span>` : ''}
        </button>
        <div class="notif-dropdown" id="notif-dropdown">
          <div style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
            <h3 style="font-size:15px;font-weight:700">Notifikasi</h3>
            <span class="badge badge-accent">${unread} baru</span>
          </div>
          ${NOTIFICATIONS.map(n => `<div class="notif-item ${n.read?'':'unread'}">
            <span class="material-symbols-outlined icon-filled" style="color:${n.color};font-size:20px;margin-top:2px">${n.icon}</span>
            <div style="flex:1;min-width:0">
              <p style="font-size:13px;font-weight:600">${n.title}</p>
              <p class="text-xs" style="color:var(--text-muted);margin-top:2px">${n.msg}</p>
              <p class="text-xs" style="color:var(--text-muted);margin-top:4px">${n.time}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="width:1px;height:32px;background:var(--border)" class="hide-mobile"></div>
      <div style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:4px 12px 4px 4px;border-radius:99px;border:1px solid transparent;transition:var(--transition)" onmouseover="this.style.borderColor='var(--border)'" onmouseout="this.style.borderColor='transparent'">
        <div style="width:36px;height:36px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;font-size:13px">${u.avatar}</div>
        <div class="hide-mobile"><p style="font-size:13px;font-weight:600">${u.name}</p><p style="font-size:11px;color:var(--text-muted)">${u.jabatan}</p></div>
      </div>
    </div></header>`;
}

function renderStatCard(label, value, icon, bgColor, color, sub) {
  return `<div class="card stat-card animate-in">
    <div class="stat-icon" style="background:${bgColor}"><span class="material-symbols-outlined icon-filled" style="color:${color}">${icon}</span></div>
    <p class="stat-label">${label}</p>
    <div style="display:flex;align-items:baseline;gap:8px">
      <span class="stat-value">${value}</span>
      ${sub ? `<span class="text-xs" style="color:${color};font-weight:600">${sub}</span>` : ''}
    </div></div>`;
}

function renderAdminDashboard() {
  const s = getSummary();
  return `${renderSidebar('admin','admin-dashboard')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px">
      <div><h1 class="text-h1">Dashboard Overview</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">${getDate()}</p></div>
      <div style="display:flex;gap:12px">
        <button class="btn btn-outline btn-sm"><span class="material-symbols-outlined" style="font-size:18px">download</span>Export</button>
        <button class="btn btn-primary btn-sm" onclick="showQrModal()"><span class="material-symbols-outlined" style="font-size:18px">qr_code</span>Generate QR</button>
      </div>
    </div>
    <div class="grid grid-4" style="margin-bottom:24px">
      ${renderStatCard('Total Pegawai',s.total,'groups','var(--accent-bg)','var(--accent)','')}
      ${renderStatCard('Hadir Hari Ini',s.hadir,'check_circle','var(--success-bg)','var(--success)',Math.round(s.hadir/s.total*100)+'%')}
      ${renderStatCard('Terlambat',s.terlambat,'schedule','var(--warning-bg)','var(--warning)','')}
      ${renderStatCard('Izin / Sakit',s.izin,'event_busy','var(--danger-bg)','var(--danger)','')}
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-bottom:24px">
      <div class="card" style="padding:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <div><h3 class="text-h3">Tren Kehadiran</h3><p class="text-xs" style="color:var(--text-muted)">Minggu ini</p></div>
        </div>
        <div style="height:200px;background:linear-gradient(to top,var(--accent-bg),transparent);border-radius:12px;position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:0 12px;gap:8px">
          ${WEEKLY_TREND.hadir.map((h,i) => `<div style="flex:1;background:${i===2?'var(--accent)':'rgba(96,165,250,0.3)'};height:${h*10}%;border-radius:6px 6px 0 0;transition:height 0.5s"></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-around;margin-top:8px">${WEEKLY_TREND.labels.map(d=>`<span class="text-xs" style="color:var(--text-muted)">${d}</span>`).join('')}</div>
      </div>
      <div class="card" style="overflow:hidden;display:flex;flex-direction:column">
        <div style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <div><h3 style="font-size:15px;font-weight:600">Live Geofence</h3><p class="text-xs" style="color:var(--text-muted)">Radius: ${SETTINGS.geofenceRadius}m</p></div>
          <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;background:var(--success);border-radius:50%" class="animate-pulse"></span><span class="text-xs" style="color:var(--success)">LIVE</span></span>
        </div>
        <div style="flex:1;background:var(--surface-dim);position:relative;min-height:200px;display:flex;align-items:center;justify-content:center">
          <div style="width:120px;height:120px;border-radius:50%;border:2px dashed var(--accent);background:rgba(96,165,250,0.08);display:flex;align-items:center;justify-content:center">
            <div style="width:12px;height:12px;background:var(--accent);border-radius:50%;box-shadow:0 0 10px var(--accent)"></div>
          </div>
          <span style="position:absolute;bottom:8px;left:8px;font-size:10px;color:var(--text-muted);background:var(--surface-card);padding:2px 8px;border-radius:4px">${SETTINGS.schoolName}</span>
        </div>
      </div>
    </div>
    ${renderCheckInTable()}
  </div></div>`;
}

function renderCheckInTable() {
  return `<div class="card" style="overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div><h3 class="text-h3">Check-in Terbaru</h3><p class="text-xs" style="color:var(--text-muted)">Monitoring presensi realtime</p></div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline btn-sm">Filter</button>
        <button class="btn btn-outline btn-sm" onclick="showToast('Data berhasil diekspor','success')">Export</button>
      </div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Pegawai</th><th>Jam Masuk</th><th>Jam Pulang</th><th>Status</th><th>Lokasi</th></tr></thead>
      <tbody>${EMPLOYEES.map(e => {
        const sc = e.status==='hadir'?'success':e.status==='terlambat'?'warning':'danger';
        const sl = e.status==='hadir'?'Hadir':e.status==='terlambat'?'Terlambat':e.status==='sakit'?'Sakit':e.status==='izin'?'Izin':e.status==='cuti'?'Cuti':'—';
        return `<tr>
          <td><div style="display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--${sc}-bg);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:var(--${sc})">${getInitials(e.name)}</div>
            <div><p style="font-weight:600">${e.name}</p><p class="text-xs" style="color:var(--text-muted)">${e.role}</p></div>
          </div></td>
          <td><span class="text-data" style="color:${e.status==='terlambat'?'var(--warning)':'inherit'}">${e.time}</span></td>
          <td><span class="text-data">${e.out}</span></td>
          <td><span class="badge badge-${sc}">${sl}</span></td>
          <td>${e.loc?'<span style="display:flex;align-items:center;gap:4px;color:var(--success);font-size:12px"><span class="material-symbols-outlined" style="font-size:16px">location_on</span>Dalam Radius</span>':'<span class="text-xs" style="color:var(--text-muted)">—</span>'}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div></div>`;
}

function renderAdminPengaturan() {
  const s = SETTINGS;
  return `${renderSidebar('admin','admin-pengaturan')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="margin-bottom:32px"><h1 class="text-h1">Pengaturan</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Konfigurasi sistem presensi</p></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:20px">
      <div class="card settings-card">
        <div class="setting-header">
          <div class="setting-icon" style="background:#25D36615;color:#25D366"><span class="material-symbols-outlined">chat</span></div>
          <div><h3 style="font-size:15px;font-weight:700">WhatsApp Gateway</h3><p class="text-xs" style="color:var(--text-muted)">Kirim laporan otomatis via WhatsApp</p></div>
        </div>
        <div class="input-group" style="margin-bottom:16px"><label>No. WhatsApp Kepsek</label><input class="input" id="wa-num" value="${s.whatsappNumber}" placeholder="628xxxxxxxxxx"/></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--surface);border-radius:10px">
          <div><p style="font-size:13px;font-weight:600">Laporan Harian Otomatis</p><p class="text-xs" style="color:var(--text-muted)">Kirim rekap setiap 16:00</p></div>
          <button class="toggle-switch ${s.dailyReport?'active':''}" id="daily-toggle" onclick="toggleDaily()"></button>
        </div>
      </div>
      <div class="card settings-card">
        <div class="setting-header">
          <div class="setting-icon" style="background:var(--accent-bg);color:var(--accent)"><span class="material-symbols-outlined">location_on</span></div>
          <div><h3 style="font-size:15px;font-weight:700">Geofencing</h3><p class="text-xs" style="color:var(--text-muted)">Atur batas area presensi</p></div>
        </div>
        <div class="input-group" style="margin-bottom:12px"><label>Radius (meter)</label><input class="input" type="number" id="geo-radius" value="${s.geofenceRadius}" min="50" max="500"/></div>
        <div style="display:flex;gap:12px">
          <div class="input-group" style="flex:1"><label>Latitude</label><input class="input" value="${s.schoolLat}" readonly style="background:var(--surface)"/></div>
          <div class="input-group" style="flex:1"><label>Longitude</label><input class="input" value="${s.schoolLng}" readonly style="background:var(--surface)"/></div>
        </div>
      </div>
      <div class="card settings-card">
        <div class="setting-header">
          <div class="setting-icon" style="background:var(--warning-bg);color:var(--warning)"><span class="material-symbols-outlined">schedule</span></div>
          <div><h3 style="font-size:15px;font-weight:700">Jam Kerja</h3><p class="text-xs" style="color:var(--text-muted)">Atur waktu masuk dan pulang</p></div>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:12px">
          <div class="input-group" style="flex:1"><label>Jam Masuk</label><input class="input" type="time" id="work-start" value="${s.workStart}"/></div>
          <div class="input-group" style="flex:1"><label>Jam Pulang</label><input class="input" type="time" id="work-end" value="${s.workEnd}"/></div>
        </div>
        <div class="input-group"><label>Toleransi Keterlambatan (menit)</label><input class="input" type="number" id="tolerance" value="${s.tolerance}" min="0" max="60"/></div>
      </div>
      <div class="card" style="padding:24px;background:linear-gradient(135deg,var(--accent),#004db3);color:#fff;display:flex;align-items:center;justify-content:space-between">
        <div><p style="font-weight:700;font-size:16px">Simpan Perubahan</p><p style="font-size:12px;opacity:0.7">Pastikan konfigurasi sudah benar</p></div>
        <button class="btn" style="background:rgba(255,255,255,0.2);color:#fff;border:1px solid rgba(255,255,255,0.3)" onclick="saveSettings()"><span class="material-symbols-outlined" style="font-size:18px">save</span>Simpan</button>
      </div>
    </div>
  </div></div>`;
}

function renderAdminMonitoring() {
  const att = EMPLOYEES.filter(e => e.time !== '--:--');
  return `${renderSidebar('admin','admin-monitoring')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px">
      <div><h1 class="text-h1">Monitoring Selfie</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Verifikasi visual foto presensi hari ini</p></div>
      <div style="display:flex;gap:8px">
        <span class="badge badge-success" style="padding:8px 16px;font-size:13px">${att.length} Selfie</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
      ${att.map(a => `<div class="card" style="padding:12px;text-align:center">
        <div style="width:100%;aspect-ratio:3/4;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;position:relative;overflow:hidden">
          <span class="material-symbols-outlined" style="font-size:48px;color:rgba(255,255,255,0.15)">face</span>
          <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.6);padding:2px 8px;border-radius:4px;font-size:10px;color:#fff;font-weight:600">${a.time}</div>
          ${a.loc?'<div style="position:absolute;bottom:6px;left:6px;display:flex;align-items:center;gap:4px;background:rgba(16,185,129,0.8);padding:2px 8px;border-radius:4px;font-size:9px;color:#fff"><span class="material-symbols-outlined" style="font-size:12px">location_on</span>OK</div>':''}
        </div>
        <p style="font-size:13px;font-weight:600;margin-bottom:4px">${a.name}</p>
        <span class="badge badge-${a.status==='hadir'?'success':'warning'}">${a.status==='hadir'?'Hadir':'Terlambat'}</span>
      </div>`).join('')}
    </div>
  </div></div>`;
}

function renderAdminPegawai() {
  return `${renderSidebar('admin','admin-pegawai')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px">
      <div><h1 class="text-h1">Data Pegawai</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Kelola data seluruh pegawai</p></div>
      <button class="btn btn-primary btn-sm"><span class="material-symbols-outlined" style="font-size:18px">person_add</span>Tambah</button>
    </div>
    <div class="card" style="overflow:hidden">
      <div class="table-wrap"><table>
        <thead><tr><th>Nama</th><th>NIP</th><th>Jabatan</th><th>Gender</th><th>Status</th></tr></thead>
        <tbody>${EMPLOYEES.map(e => `<tr>
          <td><div style="display:flex;align-items:center;gap:12px">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--accent)">${getInitials(e.name)}</div>
            <span style="font-weight:600">${e.name}</span></div></td>
          <td class="text-data" style="color:var(--text-muted)">${'19' + String(80+e.id).padStart(2,'0') + '0514201001200' + e.id}</td>
          <td>${e.role}</td>
          <td>${e.gender==='L'?'Laki-laki':'Perempuan'}</td>
          <td><span class="badge badge-${e.status==='cuti'?'warning':'success'}">${e.status==='cuti'?'Cuti':'Aktif'}</span></td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>
  </div></div>`;
}
