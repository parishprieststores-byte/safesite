/* SafeSite PWA — branding, i18n, checklists, incidents, records, PDF export. */
'use strict';

const LS_RUN = 'safesite_runstate_v1';
const LS_INSPECTIONS = 'safesite_inspections_v1';
const LS_INCIDENTS = 'safesite_incidents_v1';
const LS_BRANDING = 'safesite_branding_v2';

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { toast(t('storageError')); return false; }
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

/* ============================ BRANDING ============================ */
let branding = loadJSON(LS_BRANDING, { name: '', logo: '', color: '', lang: '' });
let lang = branding.lang || ((navigator.language || 'en').slice(0, 2) === 'es' ? 'es' : 'en');

function darken(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * f));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * f));
  const b = Math.max(0, Math.round((n & 255) * f));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function companyName() {
  return branding.name || t('appName');
}

function applyBranding() {
  const root = document.documentElement;
  if (branding.color) {
    root.style.setProperty('--primary', branding.color);
    root.style.setProperty('--primary-dark', darken(branding.color, 0.68));
    let m = $('#meta-theme'); m.setAttribute('content', branding.color);
  }
  $('#brand-name').textContent = companyName();
  document.title = companyName() + ' — ' + t('tagline');
  $('#brand-logo-img').hidden = !branding.logo;
  if (branding.logo) $('#brand-logo-img').src = branding.logo;
  $('#brand-icon').hidden = !!branding.logo;
  $('#splash-title').textContent = companyName();
  $('#splash-sub').textContent = t('tagline');
  if (branding.logo) {
    $('#splash-logo-img').hidden = false;
    $('#splash-logo-img').src = branding.logo;
    $('#splash-logo').hidden = true;
  }
}

/* ============================ I18N ============================ */
let T = window.APP_I18N[lang] || window.APP_I18N.en;
function t(key) { return T[key] || window.APP_I18N.en[key] || key; }
function L(obj) { return (obj && (obj[lang] || obj.en)) || ''; }

function applyI18n() {
  T = window.APP_I18N[lang] || window.APP_I18N.en;
  document.documentElement.lang = lang;
  $('#l-checklists-title').textContent = t('checklistsTitle');
  $('#l-checklists-intro').textContent = t('checklistsIntro');
  $('#btn-back-to-list').textContent = t('backToList');
  $('#l-site-label').childNodes[0].textContent = t('siteLocation') + ' ';
  $('#run-location').placeholder = t('sitePh');
  $('#l-inspector-label').childNodes[0].textContent = t('inspector') + ' ';
  $('#run-inspector').placeholder = t('inspectorPh');
  $('#btn-reset-run').textContent = t('reset');
  $('#btn-save-run').textContent = t('saveInspection');
  $('#l-incident-title').textContent = t('incidentTitle');
  $('#l-incident-intro').textContent = t('incidentIntro');
  $('#l-datetime').childNodes[0].textContent = t('dateTime') + ' ';
  $('#l-type').childNodes[0].textContent = t('type') + ' ';
  $('#l-severity').childNodes[0].textContent = t('severity') + ' ';
  $('#l-location').childNodes[0].textContent = t('location') + ' ';
  $('#inc-location').placeholder = t('locationPh');
  $('#l-people').childNodes[0].textContent = t('people') + ' ';
  $('#inc-people').placeholder = t('peoplePh');
  $('#l-what').childNodes[0].textContent = t('whatHappened') + ' ';
  $('#inc-desc').placeholder = t('whatHappenedPh');
  $('#l-action').childNodes[0].textContent = t('actionTaken') + ' ';
  $('#inc-action').placeholder = t('actionPh');
  $('#l-reported').textContent = t('reportedCheckbox');
  $('#l-save-report').textContent = t('saveReport');
  $('#l-records-title').textContent = t('recordsTitle');
  $('#btn-export-csv').textContent = t('exportCsv');
  $('#btn-export-json').textContent = t('exportJson');
  $('#btn-print-pdf').textContent = t('printPdf');
  $('#btn-clear-all').textContent = t('deleteAll');
  $('#l-tab-insp').textContent = t('tabInsp');
  $('#l-tab-inc').textContent = t('tabInc');
  $('#l-guide-title').textContent = t('guideTitle');
  $('#l-settings-title').textContent = t('settingsTitle');
  $('#l-settings-intro').textContent = t('settingsIntro');
  $('#l-company').childNodes[0].textContent = t('companyName') + ' ';
  $('#set-company').placeholder = t('companyNamePh');
  $('#l-logo').textContent = t('companyLogo');
  $('#btn-remove-logo').textContent = t('removeLogo');
  $('#l-logo-hint').textContent = t('logoHint');
  $('#l-theme').childNodes[0].textContent = t('themeColor') + ' ';
  $('#l-language').childNodes[0].textContent = t('language') + ' ';
  $('#btn-save-branding').textContent = t('saveBranding');
  $('#btn-reset-branding').textContent = t('resetBranding');
  $('#storage-note').textContent = t('storageNote');
  $('#btn-install').textContent = t('installBtn');
  $('#offline-badge').textContent = t('offlineBadge');

  // incident selects
  const typeSel = $('#inc-type');
  const curType = typeSel.selectedIndex;
  typeSel.innerHTML = window.INCIDENT_OPTIONS.types.map((o) =>
    `<option>${escapeHtml(L(o))}</option>`).join('');
  if (curType >= 0) typeSel.selectedIndex = curType;
  const sevSel = $('#inc-severity');
  const curSev = sevSel.selectedIndex;
  sevSel.innerHTML = window.INCIDENT_OPTIONS.severities.map((o) =>
    `<option>${escapeHtml(L(o))}</option>`).join('');
  if (curSev >= 0) sevSel.selectedIndex = curSev;

  // guide accordion
  $('#guide-accordion').innerHTML = window.GUIDE.map((g) =>
    `<div class="acc-item"><button class="acc-head">${g.icon} ${escapeHtml(L(g.title))}</button>
     <div class="acc-body">${L(g.body)}</div></div>`).join('');
  $$('.acc-head').forEach((h) => h.addEventListener('click', () => {
    const item = h.parentElement;
    const wasOpen = item.classList.contains('open');
    $$('.acc-item').forEach((i) => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }));
}

/* ============================ TABS ============================ */
function switchView(name) {
  $$('.tab').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  $$('.view').forEach((v) => v.classList.toggle('active', v.id === 'view-' + name));
  if (name === 'records') renderRecords();
  if (name === 'checklists') showChecklistList();
  if (name === 'settings') renderSettings();
  window.scrollTo(0, 0);
}
$$('.tab').forEach((b) => b.addEventListener('click', () => switchView(b.dataset.view)));

/* ============================ CHECKLISTS ============================ */
let runState = loadJSON(LS_RUN, null);
let inspections = loadJSON(LS_INSPECTIONS, []);
let incidents = loadJSON(LS_INCIDENTS, []);
let recordsTab = 'inspections';

function renderChecklistCards() {
  $('#checklist-cards').innerHTML = window.CHECKLISTS.map((c) => {
    const total = c.items.length;
    const progress = runState && runState.id === c.id
      ? answeredCount(runState) + '/' + total : null;
    const done = inspections.filter((i) => i.checklistId === c.id).length;
    return `<button class="checklist-card" data-id="${c.id}">
      <span class="cc-top"><span class="cc-icon">${c.icon}</span>
      <span class="cc-title">${escapeHtml(L(c.title))}</span></span>
      <span class="cc-meta">${escapeHtml(L(c.desc))}</span>
      <span class="cc-meta">${total} ${t('itemsWord')} · ${done} ${t('savedInspections')}</span>
      ${progress ? `<span class="cc-badge">${t('inProgress')}: ${progress}</span>` : ''}
    </button>`;
  }).join('');
  $$('.checklist-card').forEach((b) =>
    b.addEventListener('click', () => openChecklist(b.dataset.id)));
}

function answeredCount(state) {
  return Object.values(state.answers).filter((v) => v !== null).length;
}

function showChecklistList() {
  $('#checklist-list-screen').hidden = false;
  $('#checklist-run-screen').hidden = true;
  renderChecklistCards();
}

function openChecklist(id) {
  const c = window.CHECKLISTS.find((x) => x.id === id);
  if (!c) return;
  if (!runState || runState.id !== id) {
    runState = { id, answers: {}, location: '', inspector: '', startedAt: Date.now() };
  }
  $('#run-title').textContent = c.icon + ' ' + L(c.title);
  $('#run-desc').textContent = L(c.desc);
  $('#run-location').value = runState.location || '';
  $('#run-inspector').value = runState.inspector || '';
  renderRunItems(c);
  updateProgress(c);
  $('#checklist-list-screen').hidden = true;
  $('#checklist-run-screen').hidden = false;
  window.scrollTo(0, 0);
}

function renderRunItems(c) {
  $('#run-items').innerHTML = c.items.map((item, i) => {
    const val = runState.answers[i] !== undefined ? runState.answers[i] : null;
    const btn = (s, label) =>
      `<button type="button" class="status-btn${val === s ? ' on' : ''}" data-i="${i}" data-s="${s}">${label}</button>`;
    return `<div class="item-row">
      <div class="item-q">${i + 1}. ${escapeHtml(L(item.q))}</div>
      <div class="status-row">
        ${btn('yes', t('yes'))}${btn('no', t('no'))}${btn('na', t('na'))}
      </div>
      ${val === 'no' ? `<div class="item-note">${t('flaggedNote')}</div>` : ''}
    </div>`;
  }).join('');
  $$('.status-btn').forEach((b) => b.addEventListener('click', () => {
    const i = +b.dataset.i, s = b.dataset.s;
    runState.answers[i] = (runState.answers[i] === s) ? null : s;
    persistRunState();
    renderRunItems(c);
    updateProgress(c);
  }));
}

function updateProgress(c) {
  const pct = Math.round((answeredCount(runState) / c.items.length) * 100);
  $('#run-progress').style.width = pct + '%';
  $('#run-progress-text').textContent = pct + '%';
}

function persistRunState() {
  runState.location = $('#run-location').value;
  runState.inspector = $('#run-inspector').value;
  saveJSON(LS_RUN, runState);
}
$('#run-location').addEventListener('input', persistRunState);
$('#run-inspector').addEventListener('input', persistRunState);

$('#btn-back-to-list').addEventListener('click', () => {
  showChecklistList();
});

$('#btn-reset-run').addEventListener('click', () => {
  if (!confirm(t('resetConfirm'))) return;
  runState = { id: runState.id, answers: {}, location: '', inspector: '', startedAt: Date.now() };
  saveJSON(LS_RUN, runState);
  openChecklist(runState.id);
  toast(t('checklistReset'));
});

$('#btn-save-run').addEventListener('click', () => {
  const c = window.CHECKLISTS.find((x) => x.id === runState.id);
  persistRunState();
  if (answeredCount(runState) < c.items.length) {
    if (!confirm(t('partialConfirm'))) return;
  }
  inspections.push({
    type: 'inspection', savedAt: new Date().toISOString(),
    checklistId: c.id, checklistTitle: L(c.title),
    location: runState.location, inspector: runState.inspector,
    answers: c.items.map((item, i) => ({
      q: L(item.q),
      a: runState.answers[i] !== undefined ? runState.answers[i] : null
    }))
  });
  saveJSON(LS_INSPECTIONS, inspections);
  runState = null;
  saveJSON(LS_RUN, null);
  showChecklistList();
  toast(t('inspectionSaved'));
});

/* ============================ RECORDS ============================ */
function statusTag(a) {
  if (a === 'yes') return `<span class="tag ok">${t('yesShort')}</span>`;
  if (a === 'no') return `<span class="tag bad">${t('noShort')}</span>`;
  if (a === 'na') return `<span class="tag warn">${t('naShort')}</span>`;
  return `<span class="tag warn">—</span>`;
}

function renderRecords() {
  $('#count-inspections').textContent = inspections.length;
  $('#count-incidents').textContent = incidents.length;
  $$('#records-tabs .pill').forEach((p) =>
    p.classList.toggle('active', p.dataset.records === recordsTab));
  $('#records-inspections').hidden = recordsTab !== 'inspections';
  $('#records-incidents').hidden = recordsTab !== 'incidents';

  const insWrap = $('#records-inspections');
  insWrap.innerHTML = !inspections.length
    ? `<p class="muted">${t('noInspections')}</p>`
    : inspections.slice().reverse().map((r, idx) => {
        const realIdx = inspections.length - 1 - idx;
        const yes = r.answers.filter((x) => x.a === 'yes').length;
        const no = r.answers.filter((x) => x.a === 'no').length;
        const na = r.answers.filter((x) => x.a === 'na').length;
        const unans = r.answers.length - yes - no - na;
        return `<div class="record-card">
          <div class="record-head">
            <span class="record-title">🛡️ ${escapeHtml(r.checklistTitle)}</span>
            <span><button class="ghost-btn small" data-print-one="${realIdx}">🖨</button>
            <button class="ghost-btn small" data-del-insp="${realIdx}">${t('delete')}</button></span>
          </div>
          <div class="record-date">${new Date(r.savedAt).toLocaleString()}</div>
          <div class="record-detail">${r.location ? '📍 ' + escapeHtml(r.location) + '<br>' : ''}${r.inspector ? '👤 ' + escapeHtml(r.inspector) : ''}</div>
          <div class="record-stats">
            <span class="tag ok">✔ ${yes}</span><span class="tag bad">✘ ${no}</span>
            <span class="tag warn">— ${na}</span>${unans ? `<span class="tag warn">${t('unanswered')} ${unans}</span>` : ''}
          </div>
          <details><summary>${t('viewAllAnswers')}</summary>
            ${r.answers.map((x, i) => `<div class="record-detail">${i + 1}. ${escapeHtml(x.q)} ${statusTag(x.a)}</div>`).join('')}
          </details>
        </div>`;
      }).join('');
  $$('#records-inspections [data-del-insp]').forEach((b) =>
    b.addEventListener('click', () => {
      if (!confirm(t('delInspConfirm'))) return;
      inspections.splice(+b.dataset.delInsp, 1);
      saveJSON(LS_INSPECTIONS, inspections);
      renderRecords();
    }));
  $$('#records-inspections [data-print-one]').forEach((b) =>
    b.addEventListener('click', () => printInspectionPDF(inspections[+b.dataset.printOne])));

  const incWrap = $('#records-incidents');
  incWrap.innerHTML = !incidents.length
    ? `<p class="muted">${t('noIncidents')}</p>`
    : incidents.slice().reverse().map((r, idx) => {
        const realIdx = incidents.length - 1 - idx;
        const sev = (r.severity || '').toLowerCase();
        const cls = sev.startsWith('crit') || sev.startsWith('high') || sev.startsWith('ala') || sev.startsWith('crí') ? 'bad' : sev.startsWith('med') ? 'warn' : 'ok';
        return `<div class="record-card">
          <div class="record-head">
            <span class="record-title">🚨 ${escapeHtml(r.type)}</span>
            <button class="ghost-btn small" data-del-inc="${realIdx}">${t('delete')}</button>
          </div>
          <div class="record-date">${new Date(r.datetime).toLocaleString()}</div>
          <div class="record-stats"><span class="tag ${cls}">${escapeHtml((r.severity || '').split('—')[0].trim())}</span>
            ${r.reported ? `<span class="tag ok">${t('reportedSup')}</span>` : `<span class="tag warn">${t('notReported')}</span>`}</div>
          <div class="record-detail">📍 <b>${escapeHtml(r.location)}</b><br>
            ${r.people ? '👥 ' + escapeHtml(r.people) + '<br>' : ''}
            <b>${t('whatHappenedLbl')}</b> ${escapeHtml(r.description)}<br>
            ${r.action ? `<b>${t('actionTakenLbl')}</b> ${escapeHtml(r.action)}` : ''}
          </div>
        </div>`;
      }).join('');
  $$('#records-incidents [data-del-inc]').forEach((b) =>
    b.addEventListener('click', () => {
      if (!confirm(t('delIncConfirm'))) return;
      incidents.splice(+b.dataset.delInc, 1);
      saveJSON(LS_INCIDENTS, incidents);
      renderRecords();
    }));
}

$$('#records-tabs .pill').forEach((p) =>
  p.addEventListener('click', () => { recordsTab = p.dataset.records; renderRecords(); }));

$('#btn-clear-all').addEventListener('click', () => {
  if (!confirm(t('deleteAllConfirm'))) return;
  inspections = []; incidents = [];
  saveJSON(LS_INSPECTIONS, inspections);
  saveJSON(LS_INCIDENTS, incidents);
  renderRecords();
  toast(t('allDeleted'));
});

/* ============================ EXPORT ============================ */
function downloadFile(name, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
const csvEscape = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';

$('#btn-export-csv').addEventListener('click', () => {
  if (!inspections.length && !incidents.length) { toast(t('nothingToExport')); return; }
  let csv = 'section,record_date,checklist_or_type,location,inspector_or_people,item,answer_or_field,extra\n';
  inspections.forEach((r) => r.answers.forEach((x, i) => {
    csv += ['inspection', r.savedAt, csvEscape(r.checklistTitle), csvEscape(r.location),
      csvEscape(r.inspector), csvEscape((i + 1) + '. ' + x.q),
      csvEscape(x.a === 'yes' ? 'Yes' : x.a === 'no' ? 'No' : x.a === 'na' ? 'N/A' : 'Unanswered'), ''].join(',') + '\n';
  }));
  incidents.forEach((r) => {
    csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location), csvEscape(r.people),
      csvEscape('Description'), csvEscape(r.description), ''].join(',') + '\n';
    if (r.action) csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location), csvEscape(r.people),
      csvEscape('Action taken'), csvEscape(r.action), ''].join(',') + '\n';
    csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location), csvEscape(r.people),
      csvEscape('Severity'), csvEscape(r.severity), csvEscape(r.reported ? 'Reported' : 'Not reported')].join(',') + '\n';
  });
  downloadFile(companyName().replace(/\s+/g, '-').toLowerCase() + '-safesite-' + new Date().toISOString().slice(0, 10) + '.csv',
    'text/csv;charset=utf-8', csv);
  toast(t('csvExported'));
});

$('#btn-export-json').addEventListener('click', () => {
  if (!inspections.length && !incidents.length) { toast(t('nothingToExport')); return; }
  downloadFile(companyName().replace(/\s+/g, '-').toLowerCase() + '-safesite-' + new Date().toISOString().slice(0, 10) + '.json',
    'application/json', JSON.stringify({ exportedAt: new Date().toISOString(), inspections, incidents }, null, 2));
  toast(t('jsonExported'));
});

/* ============================ PDF (print) ============================ */
function printInspectionPDF(rec) {
  const logo = branding.logo ? `<img src="${branding.logo}" style="height:52px;vertical-align:middle">` : '';
  const color = branding.color || '#0d47a1';
  const rows = rec.answers.map((x, i) =>
    `<tr><td style="width:26px">${i + 1}</td><td>${escapeHtml(x.q)}</td>
     <td style="width:70px;text-align:center;font-weight:700">${x.a === 'yes' ? '✔ ' + t('yesShort') : x.a === 'no' ? '✘ ' + t('noShort') : x.a === 'na' ? t('naShort') : '—'}</td></tr>`).join('');
  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><style>
    body{font-family:Arial,Helvetica,sans-serif;color:#1c2733;font-size:12px;margin:24px}
    .hd{border-bottom:3px solid ${color};padding-bottom:10px;margin-bottom:14px}
    .hd h1{font-size:20px;color:${color};margin:0}
    .meta{margin:10px 0 16px;line-height:1.7}
    table{width:100%;border-collapse:collapse}
    td{border:1px solid #c9d3de;padding:7px 8px;vertical-align:top}
    .sign{margin-top:34px;display:flex;gap:40px}
    .sign div{flex:1;border-top:1px solid #333;padding-top:5px;font-size:11px}
    .no{color:#c62828}
  </style></head><body>
    <div class="hd">${logo} <h1>${escapeHtml(companyName())} — ${t('reportTitle')}</h1></div>
    <div class="meta">
      <b>${escapeHtml(rec.checklistTitle)}</b><br>
      📍 ${escapeHtml(rec.location || t('noLocation'))} &nbsp;·&nbsp; 👤 ${escapeHtml(rec.inspector || '—')}<br>
      ${t('reportGenerated')}: ${new Date(rec.savedAt).toLocaleString()}
    </div>
    <table>${rows}</table>
    <div class="sign"><div>${t('signature')}</div><div>${t('approvedBy')}</div></div>
    <p style="margin-top:22px;font-size:10px;color:#666">${t('printHint')}</p>
  </body></html>`;
  const f = $('#print-frame');
  f.srcdoc = html;
  f.onload = () => { f.contentWindow.focus(); f.contentWindow.print(); f.onload = null; };
}

$('#btn-print-pdf').addEventListener('click', () => {
  if (recordsTab === 'incidents') {
    if (!incidents.length) { toast(t('nothingToExport')); return; }
    const rows = incidents.map((r, i) =>
      `<tr><td style="width:26px">${i + 1}</td>
       <td>${new Date(r.datetime).toLocaleString()}<br><b>${escapeHtml(r.type)}</b> — ${escapeHtml(r.severity || '')}<br>
       📍 ${escapeHtml(r.location)}${r.people ? ' · 👥 ' + escapeHtml(r.people) : ''}<br>
       ${escapeHtml(r.description)}${r.action ? '<br><i>' + t('actionTakenLbl') + '</i> ' + escapeHtml(r.action) : ''}
       ${r.reported ? '<br>✔ ' + t('reportedSup') : '<br class="no">⚠ ' + t('notReported')}</td></tr>`).join('');
    const color = branding.color || '#0d47a1';
    const logo = branding.logo ? `<img src="${branding.logo}" style="height:52px;vertical-align:middle">` : '';
    const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><style>
      body{font-family:Arial,sans-serif;font-size:12px;margin:24px;color:#1c2733}
      h1{color:${color};font-size:20px;border-bottom:3px solid ${color};padding-bottom:8px}
      table{width:100%;border-collapse:collapse} td{border:1px solid #c9d3de;padding:8px;vertical-align:top}
    </style></head><body>${logo}<h1>${escapeHtml(companyName())} — ${t('tabInc')}</h1><table>${rows}</table>
    <p style="font-size:10px;color:#666;margin-top:16px">${t('reportGenerated')}: ${new Date().toLocaleString()}</p></body></html>`;
    const f = $('#print-frame');
    f.srcdoc = html;
    f.onload = () => { f.contentWindow.focus(); f.contentWindow.print(); f.onload = null; };
  } else {
    if (!inspections.length) { toast(t('nothingToExport')); return; }
    if (inspections.length === 1) { printInspectionPDF(inspections[0]); return; }
    // print each inspection in sequence (one print dialog per record)
    inspections.forEach((r, i) => {
      setTimeout(() => printInspectionPDF(r), i * 800);
    });
  }
});

/* ============================ INCIDENT FORM ============================ */
function nowLocalInput() {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
$('#inc-datetime').value = nowLocalInput();

$('#incident-form').addEventListener('submit', (e) => {
  e.preventDefault();
  incidents.push({
    type: $('#inc-type').value, severity: $('#inc-severity').value,
    location: $('#inc-location').value.trim(), people: $('#inc-people').value.trim(),
    description: $('#inc-desc').value.trim(), action: $('#inc-action').value.trim(),
    reported: $('#inc-reported').checked,
    datetime: $('#inc-datetime').value, savedAt: new Date().toISOString()
  });
  saveJSON(LS_INCIDENTS, incidents);
  e.target.reset();
  $('#inc-datetime').value = nowLocalInput();
  toast(t('incidentSaved'));
});

/* ============================ SETTINGS ============================ */
function renderSettings() {
  $('#set-company').value = branding.name || '';
  $('#set-color').value = branding.color || '#0d47a1';
  $('#set-lang').value = lang;
  const prev = $('#logo-preview');
  prev.hidden = !branding.logo;
  if (branding.logo) prev.src = branding.logo;
  $('#btn-remove-logo').hidden = !branding.logo;
}
$('#set-logo').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      // downscale to max 256px and re-encode to keep localStorage small
      const c = document.createElement('canvas');
      const scale = Math.min(1, 256 / Math.max(img.width, img.height));
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      branding.logo = c.toDataURL('image/png');
      $('#logo-preview').src = branding.logo;
      $('#logo-preview').hidden = false;
      $('#btn-remove-logo').hidden = false;
      applyBranding();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});
$('#btn-remove-logo').addEventListener('click', () => {
  branding.logo = '';
  $('#logo-preview').hidden = true;
  $('#btn-remove-logo').hidden = true;
  applyBranding();
});
$('#btn-save-branding').addEventListener('click', () => {
  branding.name = $('#set-company').value.trim();
  branding.color = $('#set-color').value;
  branding.lang = $('#set-lang').value;
  lang = branding.lang;
  saveJSON(LS_BRANDING, branding);
  applyI18n();
  applyBranding();
  renderChecklistCards();
  toast(t('brandingSaved'));
});
$('#btn-reset-branding').addEventListener('click', () => {
  branding = { name: '', logo: '', color: '', lang: 'en' };
  lang = 'en';
  saveJSON(LS_BRANDING, branding);
  applyI18n();
  applyBranding();
  renderSettings();
  renderChecklistCards();
  toast(t('brandingSaved'));
});

/* ============================ ONLINE / INSTALL ============================ */
function updateOnlineBadge() { $('#offline-badge').hidden = navigator.onLine; }
window.addEventListener('online', updateOnlineBadge);
window.addEventListener('offline', updateOnlineBadge);
updateOnlineBadge();

let deferredPrompt = null;
function showInstallButton() { $('#btn-install').hidden = false; }
window.addEventListener('beforeinstallprompt', (e) => {
  // Save the event for our button, do NOT preventDefault here — Chrome shows
  // the native banner automatically when the user does NOT have a deferred
  // prompt. Capturing is enough for us to also offer a manual install button.
  deferredPrompt = e;
  showInstallButton();
});
// Fallback: show the install button on browsers that support install if the
// beforeinstallprompt event has not fired within 3 s (Chrome sometimes delays
// it until user interaction). This gives a manual install path even on Linux
// Chrome where the banner can be disabled.
if (!window.matchMedia('(display-mode: standalone)').matches &&
    /Android|Chrome|Chromium|Edg/i.test(navigator.userAgent)) {
  setTimeout(showInstallButton, 3000);
}
$('#btn-install').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') { $('#btn-install').hidden = true; toast(t('installing')); }
    deferredPrompt = null;
  } else {
    alert(t('printHint') + '\n\nChrome: ⋮ menu → "Add to Home screen" / "Install app"\nSafari iOS: Share → "Add to Home Screen"');
  }
});
window.addEventListener('appinstalled', () => { $('#btn-install').hidden = true; toast(t('installed')); });

/* ============================ SW + INIT ============================ */
/* Register the SW with an explicit relative scope so it works whether the
   app is hosted at the domain root OR under a subpath like GitHub Pages
   /<repo>/. Without {scope:'./'} the default scope is the SW's directory,
   which may exclude the rest of the site on subpath deployments. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch((err) => {
      console.warn('SW registration failed:', err);
      // Surface the most common deploy mistake in the header for easy debugging.
      toast('⚠ Service worker offline cache disabled');
    });
  });
  // Diagnostic helper visible in DevTools console — paste in DevTools if
  // install prompt is missing to see Chrome's installability reasons.
  window.__safesiteDebug = function () {
    return navigator.serviceWorker.getRegistration().then((r) => ({
      scope: location.pathname,
      registeredSW: !!r,
      swScope: r ? r.scope : null,
      manifest: document.querySelector('link[rel="manifest"]')?.href,
      display: 'standalone',
      ua: navigator.userAgent
    }));
  };
}

applyI18n();
applyBranding();
renderChecklistCards();
window.addEventListener('load', () => setTimeout(() => $('#splash').classList.add('hide'), 450));
setTimeout(() => $('#splash').classList.add('hide'), 1600);
