// QR Scan, Selfie, Izin, Riwayat (with calendar), Profil
function renderQrScan() {
  return `<div class="camera-view active" id="camera-qr" style="background:#1a1a2e">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#1a1a2e,#16213e);opacity:0.9"></div>
    <div class="camera-header">
      <button onclick="navigate('pegawai-dashboard')" style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px)">
        <span class="material-symbols-outlined">close</span></button>
      <div style="display:flex;align-items:center;gap:8px;background:rgba(16,185,129,0.2);backdrop-filter:blur(10px);padding:8px 16px;border-radius:99px;border:1px solid rgba(16,185,129,0.3)">
        <span class="material-symbols-outlined icon-filled" style="color:var(--success);font-size:16px">my_location</span>
        <span class="text-data" style="color:#fff;font-size:12px">Dalam Radius · 4m</span>
      </div>
      <button style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <span class="material-symbols-outlined">flash_on</span></button>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;z-index:10;padding:20px">
      <div class="reticle">
        <div class="reticle-corner tl"></div><div class="reticle-corner tr"></div>
        <div class="reticle-corner bl"></div><div class="reticle-corner br"></div>
        <div class="scan-line" style="position:absolute;left:8px;right:8px;height:2px;background:var(--success);box-shadow:0 0 12px var(--success);border-radius:2px"></div>
      </div>
      <h2 style="color:#fff;font-family:Manrope;font-size:22px;font-weight:700;margin-top:32px;text-align:center">Scan QR Kehadiran</h2>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;margin-top:8px;text-align:center;max-width:280px">Arahkan kamera ke QR Code yang ditampilkan Admin</p>
    </div>
    <div class="camera-footer">
      <button onclick="navigate('selfie')" class="btn btn-accent btn-lg" style="width:100%;max-width:320px;border-radius:16px">
        <span class="material-symbols-outlined">qr_code_scanner</span>Simulasi Scan Berhasil
      </button>
      <button style="margin-top:12px;background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer;font-size:13px;display:flex;align-items:center;gap:6px">
        <span class="material-symbols-outlined" style="font-size:18px">keyboard</span>Input Manual
      </button>
    </div></div>`;
}

function renderSelfie() {
  return `<div class="camera-view active" id="camera-selfie" style="background:#1a1a2e">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#0f172a,#1e293b);opacity:0.85"></div>
    <div class="camera-header">
      <button onclick="navigate('qr-scan')" style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center">
        <span class="material-symbols-outlined">arrow_back</span></button>
      <div style="display:flex;align-items:center;gap:6px;background:rgba(16,185,129,0.2);padding:8px 14px;border-radius:99px;border:1px solid rgba(16,185,129,0.3)">
        <span class="material-symbols-outlined icon-filled" style="color:var(--success);font-size:14px">verified</span>
        <span style="color:#fff;font-size:11px;font-weight:600;letter-spacing:0.05em">QR VALID</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;background:rgba(239,68,68,0.8);padding:4px 10px;border-radius:99px">
        <div style="width:6px;height:6px;border-radius:50%;background:#fff" class="animate-pulse"></div>
        <span style="color:#fff;font-size:10px;font-weight:700;letter-spacing:0.1em">LIVE</span>
      </div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;z-index:10">
      <div class="face-guide"></div>
      <h2 style="color:#fff;font-family:Manrope;font-size:20px;font-weight:700;margin-top:28px">Ambil Foto Wajah</h2>
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:6px;text-align:center">Pastikan wajah terlihat jelas dalam lingkaran</p>
    </div>
    <div style="position:relative;z-index:10;padding:12px 20px;display:flex;justify-content:space-between;align-items:flex-end">
      <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.1)">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span class="material-symbols-outlined" style="color:#fff;font-size:14px">schedule</span><span class="text-data" style="color:#fff;font-size:12px" id="selfie-time">${getTime()}</span></div>
        <div style="display:flex;align-items:center;gap:6px"><span class="material-symbols-outlined" style="color:#fff;font-size:14px">location_on</span><span style="color:rgba(255,255,255,0.8);font-size:12px">${SETTINGS.schoolName}</span></div>
      </div>
    </div>
    <div class="camera-footer" style="padding-bottom:56px">
      <div class="shutter-btn" onclick="showSuccessModal()"><div class="shutter-btn-inner"></div></div>
    </div></div>`;
}

function renderIzin() {
  const myLeaves = LEAVE_REQUESTS.filter(l => l.empId === 1 || l.empId === 3);
  return `<div class="main-mobile" style="background:var(--surface)">
    <header style="padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border);background:var(--surface-card);position:sticky;top:0;z-index:20">
      <button onclick="navigate('pegawai-dashboard')" style="width:40px;height:40px;border-radius:50%;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text)">
        <span class="material-symbols-outlined">arrow_back</span></button>
      <h1 class="text-h3" style="color:var(--accent)">Pengajuan Izin</h1>
    </header>
    <main style="padding:20px;max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:20px">
      <div><label class="text-caps" style="color:var(--text-muted);display:block;margin-bottom:10px">Tipe Pengajuan</label>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          ${[['medical_services','Sakit',true],['event_busy','Izin',false],['flight_takeoff','Cuti',false]].map(([i,l,sel])=>`
          <label style="cursor:pointer"><input type="radio" name="type" ${sel?'checked':''} style="display:none"/>
            <div class="card" style="padding:16px;text-align:center;transition:var(--transition);${sel?'border-color:var(--accent);background:var(--accent-bg)':''}">
              <span class="material-symbols-outlined icon-filled" style="font-size:28px;color:var(--accent);margin-bottom:6px;display:block">${i}</span>
              <span class="text-sm" style="font-weight:600">${l}</span>
            </div></label>`).join('')}
        </div>
      </div>
      <div class="card" style="padding:16px">
        <label class="text-caps" style="color:var(--text-muted);display:block;margin-bottom:12px">Periode</label>
        <div style="display:flex;gap:16px;align-items:center">
          <div style="flex:1"><label class="text-xs" style="color:var(--text-muted)">Mulai</label><input type="date" class="input" style="margin-top:4px"/></div>
          <span class="material-symbols-outlined" style="color:var(--text-muted);margin-top:16px">arrow_forward</span>
          <div style="flex:1"><label class="text-xs" style="color:var(--text-muted)">Sampai</label><input type="date" class="input" style="margin-top:4px"/></div>
        </div>
      </div>
      <div class="input-group"><label>Keterangan</label>
        <textarea class="input" rows="4" placeholder="Tuliskan alasan..." style="resize:none"></textarea>
      </div>
      <div><label class="text-caps" style="color:var(--text-muted);display:block;margin-bottom:8px">Dokumen Bukti</label>
        <div class="card" style="padding:24px;text-align:center;border-style:dashed;cursor:pointer">
          <div style="width:48px;height:48px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;margin:0 auto 12px"><span class="material-symbols-outlined" style="color:var(--text-muted)">upload_file</span></div>
          <p class="text-sm" style="font-weight:600;color:var(--accent)">Upload File / Foto</p>
          <p class="text-xs" style="color:var(--text-muted);margin-top:4px">Maks. 5MB (JPG, PNG, PDF)</p>
        </div>
      </div>
      <button class="btn btn-accent btn-lg w-full" onclick="showToast('Pengajuan berhasil dikirim!','success');setTimeout(()=>navigate('pegawai-dashboard'),1500)" style="border-radius:14px;margin-top:8px">
        <span class="material-symbols-outlined icon-filled">send</span>Kirim Pengajuan
      </button>

      ${myLeaves.length > 0 ? `<div style="margin-top:12px">
        <h3 class="text-caps" style="color:var(--text-muted);margin-bottom:12px">Riwayat Pengajuan</h3>
        ${myLeaves.map(l => {
          const sc = l.status==='approved'?'success':l.status==='rejected'?'danger':'warning';
          const sl = l.status==='approved'?'Disetujui':l.status==='rejected'?'Ditolak':'Menunggu';
          return `<div class="card" style="padding:14px 16px;margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="badge badge-info">${l.type}</span>
              <span class="badge badge-${sc}">${sl}</span>
            </div>
            <p class="text-sm" style="font-weight:600">${formatDateShort(l.start)} — ${formatDateShort(l.end)}</p>
            <p class="text-xs" style="color:var(--text-muted);margin-top:4px">${l.reason}</p>
          </div>`;
        }).join('')}
      </div>` : ''}
    </main>
  ${renderBottomNav('')}</div>`;
}

function renderRiwayat() {
  const today = new Date().getDate();
  const days = Array.from({length:30}, (_,i) => {
    const statuses = ['hadir','hadir','hadir','hadir','terlambat','hadir','izin'];
    const s = statuses[i % 7];
    return { day: i+1, status: i+1 > today ? 'future' : (i+1 === today ? 'today' : s) };
  });
  return `<div class="main-mobile" style="background:var(--surface)">
    <header style="padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border);background:var(--surface-card);position:sticky;top:0;z-index:20">
      <button onclick="navigate('pegawai-dashboard')" style="width:40px;height:40px;border-radius:50%;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text)"><span class="material-symbols-outlined">arrow_back</span></button>
      <h1 class="text-h3" style="color:var(--accent)">Riwayat Presensi</h1>
    </header>
    <main style="padding:20px">
      <div class="card" style="padding:20px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <h3 class="text-caps" style="color:var(--text-muted)">Mei ${new Date().getFullYear()}</h3>
          <div style="display:flex;gap:8px">
            <button class="btn btn-ghost btn-sm" style="padding:4px 8px"><span class="material-symbols-outlined" style="font-size:18px">chevron_left</span></button>
            <button class="btn btn-ghost btn-sm" style="padding:4px 8px"><span class="material-symbols-outlined" style="font-size:18px">chevron_right</span></button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center">
          ${['S','S','R','K','J','S','M'].map(d=>`<span class="text-xs" style="color:var(--text-muted);font-weight:600;padding:4px">${d}</span>`).join('')}
          ${days.map(d => {
            let c, bg;
            if (d.status === 'future') { c = 'var(--text-muted)'; bg = 'transparent'; }
            else if (d.status === 'today' || d.status === 'hadir') { c = 'var(--success)'; bg = 'var(--success-bg)'; }
            else if (d.status === 'terlambat') { c = 'var(--warning)'; bg = 'var(--warning-bg)'; }
            else if (d.status === 'izin') { c = 'var(--info)'; bg = 'rgba(99,102,241,0.1)'; }
            else { c = 'var(--danger)'; bg = 'var(--danger-bg)'; }
            return `<div class="cal-day ${d.day===today?'today':''}" style="background:${d.status==='future'?'var(--surface)':bg};color:${c}">${d.day}</div>`;
          }).join('')}
        </div>
        <div style="display:flex;gap:16px;margin-top:16px;justify-content:center">
          ${[['Hadir','var(--success)'],['Telat','var(--warning)'],['Izin','var(--info)']].map(([l,c])=>`<span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text-muted)"><span style="width:8px;height:8px;border-radius:50%;background:${c}"></span>${l}</span>`).join('')}
        </div>
      </div>
      <h3 class="text-caps" style="color:var(--text-muted);margin-bottom:12px">Detail Riwayat</h3>
      ${HISTORY.map(h => {
        const sc = h.status==='hadir'?'success':h.status==='terlambat'?'warning':h.status==='izin'?'info':'danger';
        const sl = h.status==='hadir'?'Hadir':h.status==='terlambat'?'Terlambat':h.status==='izin'?'Izin':'Sakit';
        return `<div class="card" style="padding:14px 16px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <p class="text-sm" style="font-weight:600">${h.day}, ${formatDateShort(h.date)}</p>
            <p class="text-xs" style="color:var(--text-muted)">${h.time!=='--'?'Masuk: '+h.time+' — Pulang: '+h.out:'Tidak masuk'}</p>
          </div>
          <span class="badge badge-${sc}">${sl}</span>
        </div>`;
      }).join('')}
    </main>
  ${renderBottomNav('riwayat')}</div>`;
}

function renderProfil() {
  const u = STATE.user;
  return `<div class="main-mobile" style="background:var(--surface)">
    <div style="background:linear-gradient(135deg,#0A2540,#1a3a5c);padding:40px 20px;text-align:center;color:#fff">
      <div style="width:80px;height:80px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;margin:0 auto 12px;border:3px solid rgba(255,255,255,0.3)">${u.avatar}</div>
      <h2 style="font-size:20px;font-weight:700">${u.name}</h2>
      <p style="opacity:0.7;font-size:14px;margin-top:4px">${u.jabatan}</p>
      <p style="opacity:0.5;font-size:12px;margin-top:4px">NIP: ${u.nip}</p>
    </div>
    <main style="padding:20px;margin-top:-20px;position:relative;z-index:1">
      <div class="card" style="padding:20px;margin-bottom:16px">
        <h3 class="text-caps" style="color:var(--text-muted);margin-bottom:16px">Informasi</h3>
        ${[['Jabatan',u.jabatan],['Sekolah',u.sekolah],['Status','PNS — Aktif'],['Bergabung','Januari 2015']].map(([l,v])=>`
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
          <span class="text-sm" style="color:var(--text-muted)">${l}</span><span class="text-sm" style="font-weight:600">${v}</span>
        </div>`).join('')}
      </div>
      <div class="card" style="padding:20px;margin-bottom:16px">
        <h3 class="text-caps" style="color:var(--text-muted);margin-bottom:12px">Statistik Bulan Ini</h3>
        <div style="display:flex;justify-content:space-around;text-align:center">
          ${renderProgressCircle(92,'Hadir','var(--success)')}
          ${renderProgressCircle(5,'Izin','var(--warning)')}
          ${renderProgressCircle(3,'Telat','var(--danger)')}
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;margin-bottom:8px;background:var(--surface-card);border:1px solid var(--border);border-radius:12px">
        <div style="display:flex;align-items:center;gap:12px">
          <span class="material-symbols-outlined" style="color:var(--text-muted)">dark_mode</span>
          <span class="text-sm" style="font-weight:600">Mode Gelap</span>
        </div>
        <button class="dark-toggle" onclick="toggleDarkMode()"></button>
      </div>
      ${[['Edit Profil','person',''],['Ganti Password','lock','']].map(([l,i,c])=>`
      <button class="card w-full" style="padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;border:1px solid var(--border);background:var(--surface-card);cursor:pointer;border-radius:12px;color:var(--text)">
        <span class="material-symbols-outlined" style="color:var(--text-muted)">${i}</span>
        <span class="text-sm" style="font-weight:600">${l}</span>
      </button>`).join('')}
      <button class="card w-full" style="padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;border:1px solid var(--border);background:var(--surface-card);cursor:pointer;border-radius:12px" onclick="doLogout()">
        <span class="material-symbols-outlined" style="color:var(--danger)">logout</span>
        <span class="text-sm" style="font-weight:600;color:var(--danger)">Keluar</span>
      </button>
    </main>
  ${renderBottomNav('profil')}</div>`;
}
