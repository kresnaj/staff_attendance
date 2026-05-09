// Kepsek & Yayasan dashboards + sub-pages
function renderKepsekDashboard() {
  const s = getSummary();
  const pending = getPending();
  const recent = EMPLOYEES.filter(e => e.time !== '--:--');
  return `${renderSidebar('kepsek','kepsek-dashboard')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="margin-bottom:32px"><h1 class="text-h1">${getGreeting()}, ${STATE.user.name.split(' ')[0]}!</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">${getDate()}</p></div>
    <div class="grid grid-4" style="margin-bottom:24px">
      ${renderStatCard('Total Hadir',s.hadir,'check_circle','var(--success-bg)','var(--success)',Math.round(s.hadir/s.total*100)+'%')}
      ${renderStatCard('Terlambat',s.terlambat,'schedule','var(--warning-bg)','var(--warning)','')}
      ${renderStatCard('Izin/Sakit',s.izin,'medical_services','var(--danger-bg)','var(--danger)','')}
      ${renderStatCard('Pending Izin',pending.length,'task_alt','rgba(99,102,241,0.1)','var(--info)','')}
    </div>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:24px;margin-bottom:24px">
      <div class="card" style="padding:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 class="text-h3">Perlu Persetujuan</h3>
          ${pending.length>0?`<span class="badge badge-danger">${pending.length} Pending</span>`:''}
        </div>
        ${pending.length > 0 ? pending.map(lr => `<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:44px;height:44px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:var(--accent)">${getInitials(lr.name)}</div>
            <div><p style="font-weight:600;font-size:14px">${lr.name}</p>
              <p class="text-xs" style="color:var(--text-muted)">${lr.type} — ${lr.reason}</p>
              <div style="display:flex;gap:8px;margin-top:4px">
                <span class="badge badge-info">${lr.days} hari</span>
                ${lr.hasDoc?'<span class="badge badge-accent">Lampiran</span>':''}
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-success btn-sm" onclick="approveLeave(${lr.id})"><span class="material-symbols-outlined" style="font-size:18px">check</span></button>
            <button class="btn btn-danger btn-sm" onclick="rejectLeave(${lr.id})"><span class="material-symbols-outlined" style="font-size:18px">close</span></button>
          </div>
        </div>`).join('') : '<div style="text-align:center;padding:32px;color:var(--text-muted)"><span class="material-symbols-outlined" style="font-size:48px;opacity:0.3;display:block;margin-bottom:12px">task_alt</span><p style="font-weight:600">Semua Beres!</p><p class="text-xs" style="margin-top:4px">Tidak ada pengajuan yang menunggu</p></div>'}
      </div>
      <div class="card" style="padding:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 class="text-h3">Presensi Live</h3>
          <span style="display:flex;align-items:center;gap:6px">
            <span style="position:relative;display:flex"><span style="width:8px;height:8px;background:var(--danger);border-radius:50%;position:absolute" class="animate-ping"></span><span style="width:8px;height:8px;background:var(--danger);border-radius:50%;position:relative"></span></span>
            <span class="text-xs" style="color:var(--danger);font-weight:700">LIVE</span>
          </span>
        </div>
        <div class="timeline">
          ${recent.map(e => `<div class="timeline-item">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--accent)">${getInitials(e.name)}</div>
                <div><p style="font-size:13px;font-weight:600">${e.name}</p><p class="text-xs" style="color:var(--text-muted)">${e.role}</p></div>
              </div>
              <span class="text-data" style="font-size:12px;color:var(--text-muted)">${e.time}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div></div>`;
}

function renderKepsekRekap() {
  return `${renderSidebar('kepsek','kepsek-rekap')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px">
      <div><h1 class="text-h1">Rekap Kehadiran</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Data kehadiran seluruh pegawai bulan ini</p></div>
      <button class="btn btn-outline btn-sm" onclick="showToast('Data berhasil diekspor','success')"><span class="material-symbols-outlined" style="font-size:18px">download</span>Export Excel</button>
    </div>
    <div class="grid grid-4" style="margin-bottom:24px">
      ${renderStatCard('Hari Kerja','22','calendar_today','var(--accent-bg)','var(--accent)','')}
      ${renderStatCard('Avg Kehadiran','92%','trending_up','var(--success-bg)','var(--success)','+3%')}
      ${renderStatCard('Avg Keterlambatan','4%','schedule','var(--warning-bg)','var(--warning)','')}
      ${renderStatCard('Total Izin','8','event_busy','var(--danger-bg)','var(--danger)','')}
    </div>
    ${renderCheckInTable()}
  </div></div>`;
}

function renderKepsekIzin() {
  const all = LEAVE_REQUESTS;
  return `${renderSidebar('kepsek','kepsek-izin')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="margin-bottom:32px"><h1 class="text-h1">Approval Izin & Cuti</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Kelola pengajuan izin pegawai</p></div>
    <div class="card" style="overflow:hidden">
      <div class="table-wrap"><table>
        <thead><tr><th>Nama</th><th>Tipe</th><th>Tanggal</th><th>Alasan</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>${all.map(lr => {
          const sc = lr.status==='approved'?'success':lr.status==='rejected'?'danger':'warning';
          const sl = lr.status==='approved'?'Disetujui':lr.status==='rejected'?'Ditolak':'Menunggu';
          return `<tr>
            <td><div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:50%;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--accent)">${getInitials(lr.name)}</div>
              <span style="font-weight:600">${lr.name}</span></div></td>
            <td><span class="badge badge-info">${lr.type}</span></td>
            <td class="text-xs">${formatDateShort(lr.start)} — ${formatDateShort(lr.end)}</td>
            <td class="text-xs" style="max-width:200px;color:var(--text-secondary)">${lr.reason}</td>
            <td><span class="badge badge-${sc}">${sl}</span></td>
            <td>${lr.status==='pending'?`<div style="display:flex;gap:6px"><button class="btn btn-success btn-sm" onclick="approveLeave(${lr.id})"><span class="material-symbols-outlined" style="font-size:16px">check</span></button><button class="btn btn-danger btn-sm" onclick="rejectLeave(${lr.id})"><span class="material-symbols-outlined" style="font-size:16px">close</span></button></div>`:'<span class="text-xs" style="color:var(--text-muted)">—</span>'}</td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>
  </div></div>`;
}

function renderYayasanDashboard() {
  const avgAtt = Math.round(SCHOOLS.reduce((s,c) => s+c.attendance, 0) / SCHOOLS.length);
  return `${renderSidebar('yayasan','yayasan-dashboard')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="margin-bottom:32px"><h1 class="text-h1">Dashboard Yayasan</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Ringkasan performa seluruh sekolah</p></div>
    <div class="grid grid-4" style="margin-bottom:24px">
      ${renderStatCard('Total Sekolah',SCHOOLS.length,'domain','var(--accent-bg)','var(--accent)','')}
      ${renderStatCard('Total Pegawai',SCHOOLS.reduce((s,c)=>s+c.pegawai,0),'groups','rgba(99,102,241,0.1)','var(--info)','')}
      ${renderStatCard('Rata-rata Kehadiran',avgAtt+'%','trending_up','var(--success-bg)','var(--success)','+2.1%')}
      ${renderStatCard('Keterlambatan',Math.round(SCHOOLS.reduce((s,c)=>s+c.late,0)/SCHOOLS.length)+'%','warning','var(--warning-bg)','var(--warning)','')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">
      <div class="card" style="padding:24px">
        <h3 class="text-h3" style="margin-bottom:20px">Perbandingan Disiplin Sekolah</h3>
        <div style="display:flex;flex-direction:column;gap:16px">
          ${SCHOOLS.map(sc => {
            const c = sc.attendance >= 90 ? 'var(--success)' : sc.attendance >= 80 ? 'var(--accent)' : 'var(--warning)';
            return `<div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span class="text-sm" style="font-weight:600">${sc.name}</span><span class="text-sm" style="font-weight:700;color:${c}">${sc.attendance}%</span></div>
            <div style="height:12px;background:var(--surface-dim);border-radius:6px;overflow:hidden"><div style="height:100%;width:${sc.attendance}%;background:${c};border-radius:6px;transition:width 1s ease"></div></div></div>`;
          }).join('')}
        </div>
      </div>
      <div class="card" style="padding:24px">
        <h3 class="text-h3" style="margin-bottom:20px">Tren Kehadiran Bulanan</h3>
        <div style="height:200px;display:flex;align-items:flex-end;gap:6px;padding-bottom:24px">
          ${MONTHLY_TREND.data.map((h,i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
            <span class="text-xs" style="color:var(--text-muted);font-size:10px">${h}%</span>
            <div style="width:100%;height:${h*1.5}px;background:${i===MONTHLY_TREND.data.length-1?'var(--accent)':'var(--accent-bg)'};border-radius:4px 4px 0 0"></div>
          </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between">${MONTHLY_TREND.labels.map(m=>`<span style="font-size:9px;color:var(--text-muted)">${m}</span>`).join('')}</div>
      </div>
    </div>
    <div class="card" style="padding:24px;background:linear-gradient(135deg,var(--accent),#004db3);color:#fff;position:relative;overflow:hidden">
      <div style="position:absolute;top:-20px;right:-20px;width:100px;height:100px;background:rgba(255,255,255,0.1);border-radius:50%;filter:blur(30px)"></div>
      <div style="position:relative;z-index:1">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span class="material-symbols-outlined">auto_awesome</span><h3 style="font-size:16px;font-weight:600">Insight</h3></div>
        <p style="font-size:14px;opacity:0.9;line-height:1.6">Kehadiran keseluruhan meningkat 2.1% dibanding bulan lalu. ${SCHOOLS[0].name} menunjukkan performa terbaik dengan konsistensi kehadiran di atas ${SCHOOLS[0].attendance}%. Perlu perhatian khusus untuk ${SCHOOLS[SCHOOLS.length-1].name} yang memiliki tren keterlambatan meningkat.</p>
      </div>
    </div>
  </div></div>`;
}

function renderYayasanSekolah() {
  return `${renderSidebar('yayasan','yayasan-sekolah')}
  <div class="main-desktop">${renderTopbar()}
  <div class="main-content">
    <div style="margin-bottom:32px"><h1 class="text-h1">Kelola Sekolah</h1><p class="text-sm" style="color:var(--text-secondary);margin-top:4px">Daftar sekolah di bawah naungan yayasan</p></div>
    <div class="grid grid-3">
      ${SCHOOLS.map(sc => {
        const perf = sc.attendance >= 90 ? 'Sangat Baik' : sc.attendance >= 80 ? 'Baik' : 'Perlu Perhatian';
        const pc = sc.attendance >= 90 ? 'success' : sc.attendance >= 80 ? 'accent' : 'warning';
        return `<div class="card" style="padding:24px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
            <div style="width:48px;height:48px;border-radius:12px;background:var(--accent-bg);display:flex;align-items:center;justify-content:center">
              <span class="material-symbols-outlined icon-filled" style="color:var(--accent)">school</span>
            </div>
            <div><h3 style="font-size:16px;font-weight:700">${sc.name}</h3><p class="text-xs" style="color:var(--text-muted)">${sc.city}</p></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div style="padding:12px;background:var(--surface);border-radius:10px;text-align:center">
              <p style="font-family:Manrope;font-size:24px;font-weight:700;color:var(--accent)">${sc.pegawai}</p>
              <p class="text-xs" style="color:var(--text-muted)">Pegawai</p>
            </div>
            <div style="padding:12px;background:var(--surface);border-radius:10px;text-align:center">
              <p style="font-family:Manrope;font-size:24px;font-weight:700;color:var(--success)">${sc.attendance}%</p>
              <p class="text-xs" style="color:var(--text-muted)">Kehadiran</p>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="badge badge-${pc}">${perf}</span>
            <span class="text-xs" style="color:var(--text-muted)">Terlambat: ${sc.late}%</span>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div></div>`;
}
