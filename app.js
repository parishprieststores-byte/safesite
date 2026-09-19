/* SafeSite — Workplace Safety & Security PWA. No external dependencies. */
'use strict';

const LS_CHECKLIST_STATE = 'safesite_runstate_v1';
const LS_META = 'safesite_meta_v1';
const LS_INSPECTIONS = 'safesite_inspections_v1';
const LS_INCIDENTS = 'safesite_incidents_v1';

/* ============================================================
   CHECKLIST CONTENT (OSHA / ISO 45001-style scope)
   ============================================================ */
const CHECKLISTS = [
  {
    id: 'hazard',
    icon: '🔍',
    title: 'Hazard Identification Walkthrough',
    desc: 'Spot-and-fix routine hazards across walkways, housekeeping and work areas.',
    items: [
      { q: 'Walkways, stairs and exits clear of obstructions and trip hazards?' },
      { q: 'Floors dry, clean and free of slippery or damaged surfaces?' },
      { q: 'Adequate lighting in all work areas, stairwells and corridors?' },
      { q: 'Stacked materials stable, within height limits and away from edges?' },
      { q: 'Emergency exits unlocked, unobstructed and clearly signed?' },
      { q: 'Warning signs and barriers in place around temporary hazards?' },
      { q: 'Waste removed regularly; bins not overflowing or blocking routes?' },
      { q: 'Ladders and step stools in good condition and used correctly?' },
      { q: 'New or changed tasks assessed for hazards before work started?' }
    ]
  },
  {
    id: 'ppe',
    icon: '🦺',
    title: 'Personal Protective Equipment (PPE)',
    desc: 'Check PPE availability, condition and correct use across the site.',
    items: [
      { q: 'Required PPE identified for each task and clearly communicated?' },
      { q: 'Head protection (hard hats) available, worn and in date where required?' },
      { q: 'Eye/face protection available and worn for grinding, cutting, chemicals?' },
      { q: 'Hearing protection available where noise exceeds 85 dB?' },
      { q: 'Gloves matched to hazard (cut, chemical, heat) and used correctly?' },
      { q: 'Safety footwear worn by everyone in designated areas?' },
      { q: 'High-visibility clothing worn where vehicles/plant operate?' },
      { q: 'Respirators available, fit-tested where required, filters in date?' },
      { q: 'PPE inspected — no damaged, worn-out or missing items?' },
      { q: 'Fall protection harnesses and lanyards inspected and in date?' }
    ]
  },
  {
    id: 'fire',
    icon: '🔥',
    title: 'Fire & Emergency Preparedness',
    desc: 'Fire protection, evacuation routes and emergency response readiness.',
    items: [
      { q: 'Fire extinguishers present, charged, inspected within the last 12 months?' },
      { q: 'Correct extinguisher types for the hazards in each area?' },
      { q: 'Smoke/heat detectors and alarm systems tested and working?' },
      { q: 'Sprinklers, hose reels or standpipes unobstructed and accessible?' },
      { q: 'Evacuation routes and exit doors clear, unlocked and illuminated?' },
      { q: 'Evacuation plans posted and assembly point known to all staff?' },
      { q: 'Fire drill conducted within the required interval?' },
      { q: 'Fire wardens/marshals appointed and trained?' },
      { q: 'Combustible waste and flammables stored away from ignition sources?' },
      { q: 'Emergency contact numbers visibly posted?' }
    ]
  },
  {
    id: 'electrical',
    icon: '⚡',
    title: 'Electrical Safety',
    desc: 'Wiring, appliances, panels and lockout/tagout readiness.',
    items: [
      { q: 'Cables and extension cords in good condition — no fraying or exposed wires?' },
      { q: 'No daisy-chained power strips or overloaded outlets?' },
      { q: 'Electrical panels accessible with 1 m clearance, clearly labelled?' },
      { q: 'Breakers/fuses correctly rated; no improvised fuses?' },
      { q: 'Portable tools and appliances tested/tagged within required interval?' },
      { q: 'GFCI/RCD protection in wet or outdoor areas?' },
      { q: 'Lockout/tagout (LOTO) devices available and procedures followed?' },
      { q: 'No electrical equipment used with wet hands or in wet conditions?' },
      { q: 'Repairs and installations performed only by qualified personnel?' }
    ]
  },
  {
    id: 'machine',
    icon: '⚙️',
    title: 'Machine Guarding & Equipment',
    desc: 'Guards, interlocks and safe operation of machinery and tools.',
    items: [
      { q: 'All machine guards in place and secure — none bypassed or removed?' },
      { q: 'Emergency stops tested and functional on all machines?' },
      { q: 'Interlocks and light curtains working correctly?' },
      { q: 'Machines maintained per schedule; maintenance records up to date?' },
      { q: 'Only trained and authorized operators using the equipment?' },
      { q: 'Loose clothing, jewelry and long hair controlled around rotating machinery?' },
      { q: 'Air hoses and hydraulic lines in good condition, whips restrained?' },
      { q: 'Conveyor nip points and moving parts fully guarded?' },
      { q: 'Equipment shut down and de-energized before cleaning or adjustments?' }
    ]
  },
  {
    id: 'ergonomics',
    icon: '🧍',
    title: 'Ergonomics & Manual Handling',
    desc: 'Workstation setup, lifting practice and repetitive-strain prevention.',
    items: [
      { q: 'Lifting technique trained — lift with legs, load close to body?' },
      { q: 'Mechanical aids (trolleys, hoists, lifts) available and used for heavy loads?' },
      { q: 'Loads within safe weight limits or team-lift rules applied?' },
      { q: 'Workstations adjustable — monitor at eye level, elbows at 90°?' },
      { q: 'Chairs supportive and adjustable for each user?' },
      { q: 'Micro-breaks and task rotation in place for repetitive work?' },
      { q: 'Anti-fatigue matting for prolonged standing positions?' },
      { q: 'Early reports of discomfort/pain encouraged and acted on?' }
    ]
  },
  {
    id: 'chemical',
    icon: '🧪',
    title: 'Chemical Safety & HazCom',
    desc: 'Labeling, SDS access, storage and spill control for hazardous substances.',
    items: [
      { q: 'All chemical containers correctly labeled (product, hazard, pictograms)?' },
      { q: 'Safety Data Sheets (SDS) accessible to all workers for every chemical?' },
      { q: 'Chemicals stored by compatibility — no incompatible materials together?' },
      { q: 'Flammables in rated cabinets; quantities within limits?' },
      { q: 'Ventilation adequate where chemicals are used?' },
      { q: 'Spill kits stocked, accessible and staff trained in their use?' },
      { q: 'Eyewash stations and safety showers accessible, tested and clean?' },
      { q: 'Secondary containment for liquid storage areas?' },
      { q: 'Workers trained on hazards (GHS/HazCom) before handling chemicals?' }
    ]
  },
  {
    id: 'firstaid',
    icon: '⛑️',
    title: 'First Aid Readiness',
    desc: 'First aid supplies, trained responders and medical emergency preparedness.',
    items: [
      { q: 'First aid kits stocked, sealed and contents within expiry dates?' },
      { q: 'First aid kits accessible and clearly marked in every work area?' },
      { q: 'Trained first-aiders on duty for every shift?' },
      { q: 'AED available, accessible, pads/battery within expiry?' },
      { q: 'Emergency numbers and first-aiders\' names visibly posted?' },
      { q: 'Injury/illness log maintained and reviewed?' },
      { q: 'Eyewash/showers tested within the last month?' },
      { q: 'Access for emergency vehicles kept clear?' }
    ]
  },
  {
    id: 'incident',
    icon: '📋',
    title: 'Incident Reporting & Investigation',
    desc: 'Verify the reporting process works — from near miss to corrective action.',
    items: [
      { q: 'Reporting procedure documented and known to all employees?' },
      { q: 'Near misses actively reported and recorded?' },
      { q: 'Incident report forms readily available (paper or digital)?' },
      { q: 'Reports investigated promptly with root-cause analysis?' },
      { q: 'Corrective actions assigned with owners and due dates?' },
      { q: 'Corrective actions tracked to completion?' },
      { q: 'Lessons shared with workforce (toolbox talks, bulletins)?' },
      { q: 'No retaliation or blame culture discouraging reports?' }
    ]
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Workplace Security & Access Control',
    desc: 'Physical security, visitor management and workplace violence prevention.',
    items: [
      { q: 'Perimeter doors, gates and windows secured outside working hours?' },
      { q: 'Access control (badges/keys) working; access revoked for leavers?' },
      { q: 'Visitor sign-in and escort procedure followed?' },
      { q: 'CCTV cameras operational, unobstructed and recording?' },
      { q: 'Alarms (intruder/panic) tested and monitored?' },
      { q: 'Cash/valuables secured; safe usage rules followed?' },
      { q: 'Lone-worker procedure in place with regular check-ins?' },
      { q: 'Parking areas and exterior lighting adequate?' },
      { q: 'Workplace violence policy communicated; warning signs acted on?' },
      { q: 'Staff trained on threat response (avoid / escape / alert / lockdown)?' }
    ]
  },
  {
    id: 'workingatheight',
    icon: '🪜',
    title: 'Working at Height & Ladders',
    desc: 'Fall prevention, ladder condition and scaffolding/roofwork controls.',
    items: [
      { q: 'Collective protection (guardrails, covers) preferred over PPE?' },
      { q: 'Ladders inspected, tagged and rated for the task?' },
      { q: 'Ladders secured, correct angle (1:4) and extend 1 m above landing?' },
      { q: 'Scaffolds erected/inspected by competent persons, tags current?' },
      { q: 'Harnesses worn with adequate anchor points where required?' },
      { q: 'Edge protection and toe boards in place on raised surfaces?' },
      { q: 'Falling-object protection (netting, exclusion zones) in place?' },
      { q: 'Weather conditions assessed before roof or outdoor height work?' }
    ]
  },
  {
    id: 'monthlyaudit',
    icon: '🗓️',
    title: 'Monthly Full-Site Safety Audit',
    desc: 'Comprehensive monthly review across management, documentation and the site.',
    items: [
      { q: 'Safety policy and responsibilities current and communicated?' },
      { q: 'Risk assessments reviewed and updated for all significant tasks?' },
      { q: 'Statutory inspections (equipment, fire, electrical) all in date?' },
      { q: 'Safety training matrix up to date; refresher training scheduled?' },
      { q: 'All previous audit findings closed out?' },
      { q: 'Incident and near-miss statistics reviewed for trends?' },
      { q: 'Contractor safety inductions and permits in order?' },
      { q: 'Emergency drills completed per plan?' },
      { q: 'Worker safety suggestions and consultations reviewed?' },
      { q: 'Walkthrough of all areas completed using core checklists?' },
      { q: 'Health surveillance / wellbeing support in place?' },
      { q: 'Improvement actions from this audit assigned with due dates?' }
    ]
  }
];

/* ============================================================
   STORAGE HELPERS
   ============================================================ */
function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { toast('⚠️ Could not save — storage is full or blocked'); return false; }
}

/* ============================================================
   STATE
   ============================================================ */
let runState = loadJSON(LS_CHECKLIST_STATE, null); // {id, answers:{}, location, inspector, savedAt}
let inspections = loadJSON(LS_INSPECTIONS, []);
let incidents = loadJSON(LS_INCIDENTS, []);
let recordsTab = 'inspections';

/* ============================================================
   UI HELPERS
   ============================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

/* ============================================================
   TAB NAVIGATION
   ============================================================ */
function switchView(name) {
  $$('.tab').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  $$('.view').forEach((v) => v.classList.toggle('active', v.id === 'view-' + name));
  if (name === 'records') renderRecords();
  window.scrollTo(0, 0);
}
$$('.tab').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.view === 'checklists') showChecklistList();
  switchView(b.dataset.view);
}));

/* ============================================================
   CHECKLIST LIST + RUN
   ============================================================ */
function renderChecklistCards() {
  const wrap = $('#checklist-cards');
  wrap.innerHTML = CHECKLISTS.map((c) => {
    const total = c.items.length;
    const progress = runState && runState.id === c.id
      ? answeredCount(runState) + '/' + total : null;
    const done = inspections.filter((i) => i.checklistId === c.id).length;
    return `<button class="checklist-card" data-id="${c.id}">
      <span class="cc-top"><span class="cc-icon">${c.icon}</span>
      <span class="cc-title">${escapeHtml(c.title)}</span></span>
      <span class="cc-meta">${escapeHtml(c.desc)}</span>
      <span class="cc-meta">${total} items · ${done} saved inspection${done === 1 ? '' : 's'}</span>
      ${progress ? `<span class="cc-badge">In progress: ${progress}</span>` : ''}
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
  const c = CHECKLISTS.find((x) => x.id === id);
  if (!c) return;
  if (!runState || runState.id !== id) {
    runState = { id, answers: {}, location: '', inspector: '', startedAt: Date.now() };
  }
  $('#run-title').textContent = c.icon + ' ' + c.title;
  $('#run-desc').textContent = c.desc;
  $('#run-location').value = runState.location || '';
  $('#run-inspector').value = runState.inspector || '';
  renderRunItems(c);
  updateProgress(c);
  $('#checklist-list-screen').hidden = true;
  $('#checklist-run-screen').hidden = false;
  window.scrollTo(0, 0);
}

function renderRunItems(c) {
  const wrap = $('#run-items');
  wrap.innerHTML = c.items.map((item, i) => {
    const val = runState.answers[i] !== undefined ? runState.answers[i] : null;
    const btn = (s, label) =>
      `<button type="button" class="status-btn${val === s ? ' on' : ''}" data-i="${i}" data-s="${s}">${label}</button>`;
    return `<div class="item-row">
      <div class="item-q">${i + 1}. ${escapeHtml(item.q)}</div>
      <div class="status-row">
        ${btn('yes', '✔ Yes')}${btn('no', '✘ No')}${btn('na', '— N/A')}
      </div>
      ${val === 'no' ? `<div class="item-note">⚠️ Flagged as non-compliant — include in corrective actions.</div>` : ''}
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
  const done = answeredCount(runState);
  const pct = Math.round((done / c.items.length) * 100);
  $('#run-progress').style.width = pct + '%';
  $('#run-progress-text').textContent = pct + '%';
}

function persistRunState() {
  runState.location = $('#run-location').value;
  runState.inspector = $('#run-inspector').value;
  saveJSON(LS_CHECKLIST_STATE, runState);
}
$('#run-location').addEventListener('input', persistRunState);
$('#run-inspector').addEventListener('input', persistRunState);

$('#btn-back-to-list').addEventListener('click', () => {
  showChecklistList();
  switchView('checklists');
});

$('#btn-reset-run').addEventListener('click', () => {
  if (!confirm('Clear all answers for this checklist?')) return;
  runState = { id: runState.id, answers: {}, location: '', inspector: '', startedAt: Date.now() };
  saveJSON(LS_CHECKLIST_STATE, runState);
  openChecklist(runState.id);
  toast('Checklist reset');
});

$('#btn-save-run').addEventListener('click', () => {
  const c = CHECKLISTS.find((x) => x.id === runState.id);
  persistRunState();
  if (answeredCount(runState) < c.items.length) {
    if (!confirm('Some items are unanswered. Save anyway?')) return;
  }
  const rec = {
    type: 'inspection',
    savedAt: new Date().toISOString(),
    checklistId: c.id,
    checklistTitle: c.title,
    location: runState.location,
    inspector: runState.inspector,
    answers: c.items.map((item, i) => ({
      q: item.q,
      a: runState.answers[i] !== undefined ? runState.answers[i] : null
    }))
  };
  inspections.push(rec);
  saveJSON(LS_INSPECTIONS, inspections);
  runState = null;
  saveJSON(LS_CHECKLIST_STATE, null);
  showChecklistList();
  toast('✅ Inspection saved');
});

/* ============================================================
   RECORDS
   ============================================================ */
function statusTag(a) {
  if (a === 'yes') return '<span class="tag ok">Yes</span>';
  if (a === 'no') return '<span class="tag bad">No</span>';
  if (a === 'na') return '<span class="tag warn">N/A</span>';
  return '<span class="tag warn">—</span>';
}

function renderRecords() {
  $('#count-inspections').textContent = inspections.length;
  $('#count-incidents').textContent = incidents.length;

  $$('#records-tabs .pill').forEach((p) =>
    p.classList.toggle('active', p.dataset.records === recordsTab));
  $('#records-inspections').hidden = recordsTab !== 'inspections';
  $('#records-incidents').hidden = recordsTab !== 'incidents';

  const insWrap = $('#records-inspections');
  if (!inspections.length) {
    insWrap.innerHTML = '<p class="muted">No saved inspections yet. Complete a checklist to see it here.</p>';
  } else {
    insWrap.innerHTML = inspections.slice().reverse().map((r, idx) => {
      const realIdx = inspections.length - 1 - idx;
      const yes = r.answers.filter((x) => x.a === 'yes').length;
      const no = r.answers.filter((x) => x.a === 'no').length;
      const na = r.answers.filter((x) => x.a === 'na').length;
      const unans = r.answers.length - yes - no - na;
      return `<div class="record-card">
        <div class="record-head">
          <span class="record-title">🛡️ ${escapeHtml(r.checklistTitle)}</span>
          <button class="ghost-btn small" data-del-insp="${realIdx}">Delete</button>
        </div>
        <div class="record-date">${new Date(r.savedAt).toLocaleString()}</div>
        <div class="record-detail">${r.location ? '📍 ' + escapeHtml(r.location) + '<br>' : ''}${r.inspector ? '👤 ' + escapeHtml(r.inspector) : ''}</div>
        <div class="record-stats">
          <span class="tag ok">✔ ${yes}</span><span class="tag bad">✘ ${no}</span>
          <span class="tag warn">— ${na}</span>${unans ? `<span class="tag warn">unanswered ${unans}</span>` : ''}
        </div>
        <details><summary style="cursor:pointer;font-size:.85rem;color:var(--primary)">View all answers</summary>
          ${r.answers.map((x, i) => `<div class="record-detail">${i + 1}. ${escapeHtml(x.q)} ${statusTag(x.a)}</div>`).join('')}
        </details>
      </div>`;
    }).join('');
    $$('#records-inspections [data-del-insp]').forEach((b) =>
      b.addEventListener('click', () => {
        if (!confirm('Delete this inspection record?')) return;
        inspections.splice(+b.dataset.delInsp, 1);
        saveJSON(LS_INSPECTIONS, inspections);
        renderRecords();
      }));
  }

  const incWrap = $('#records-incidents');
  if (!incidents.length) {
    incWrap.innerHTML = '<p class="muted">No incident reports yet. Use the Incident tab to file one.</p>';
  } else {
    incWrap.innerHTML = incidents.slice().reverse().map((r, idx) => {
      const realIdx = incidents.length - 1 - idx;
      const sev = r.severity.toLowerCase();
      const cls = sev.startsWith('crit') || sev.startsWith('high') ? 'bad' : sev.startsWith('med') ? 'warn' : 'ok';
      return `<div class="record-card">
        <div class="record-head">
          <span class="record-title">🚨 ${escapeHtml(r.type)}</span>
          <button class="ghost-btn small" data-del-inc="${realIdx}">Delete</button>
        </div>
        <div class="record-date">${new Date(r.datetime).toLocaleString()}</div>
        <div class="record-stats"><span class="tag ${cls}">${escapeHtml(r.severity.split('—')[0].trim())}</span>
          ${r.reported ? '<span class="tag ok">Reported to supervisor</span>' : '<span class="tag warn">Not reported</span>'}</div>
        <div class="record-detail">📍 <b>${escapeHtml(r.location)}</b><br>
          ${r.people ? '👥 ' + escapeHtml(r.people) + '<br>' : ''}
          <b>What happened:</b> ${escapeHtml(r.description)}<br>
          ${r.action ? '<b>Action taken:</b> ' + escapeHtml(r.action) : ''}
        </div>
      </div>`;
    }).join('');
    $$('#records-incidents [data-del-inc]').forEach((b) =>
      b.addEventListener('click', () => {
        if (!confirm('Delete this incident report?')) return;
        incidents.splice(+b.dataset.delInc, 1);
        saveJSON(LS_INCIDENTS, incidents);
        renderRecords();
      }));
  }
}

$$('#records-tabs .pill').forEach((p) =>
  p.addEventListener('click', () => { recordsTab = p.dataset.records; renderRecords(); }));

$('#btn-clear-all').addEventListener('click', () => {
  if (!confirm('Delete ALL saved inspections and incident reports from this device? This cannot be undone.')) return;
  inspections = []; incidents = [];
  saveJSON(LS_INSPECTIONS, inspections);
  saveJSON(LS_INCIDENTS, incidents);
  renderRecords();
  toast('All records deleted');
});

/* ============================================================
   EXPORT (CSV / JSON)
   ============================================================ */
function downloadFile(name, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function csvEscape(v) {
  v = String(v === null || v === undefined ? '' : v);
  return '"' + v.replace(/"/g, '""') + '"';
}

$('#btn-export-csv').addEventListener('click', () => {
  if (!inspections.length && !incidents.length) { toast('Nothing to export yet'); return; }
  let csv = 'section,record_date,checklist_or_type,location,inspector_or_people,item,answer_or_field,extra\n';
  inspections.forEach((r) => {
    r.answers.forEach((x, i) => {
      csv += ['inspection', r.savedAt, csvEscape(r.checklistTitle), csvEscape(r.location),
        csvEscape(r.inspector), csvEscape((i + 1) + '. ' + x.q),
        csvEscape(x.a === 'yes' ? 'Yes' : x.a === 'no' ? 'No' : x.a === 'na' ? 'N/A' : 'Unanswered'), ''].join(',') + '\n';
    });
  });
  incidents.forEach((r) => {
    csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location),
      csvEscape(r.people), csvEscape('Description'), csvEscape(r.description), ''].join(',') + '\n';
    if (r.action) csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location),
      csvEscape(r.people), csvEscape('Action taken'), csvEscape(r.action), ''].join(',') + '\n';
    csv += ['incident', r.datetime, csvEscape(r.type), csvEscape(r.location),
      csvEscape(r.people), csvEscape('Severity'), csvEscape(r.severity),
      csvEscape(r.reported ? 'Reported to supervisor' : 'Not reported')].join(',') + '\n';
  });
  downloadFile('safesite-records-' + new Date().toISOString().slice(0, 10) + '.csv',
    'text/csv;charset=utf-8', csv);
  toast('CSV exported');
});

$('#btn-export-json').addEventListener('click', () => {
  if (!inspections.length && !incidents.length) { toast('Nothing to export yet'); return; }
  const data = { exportedAt: new Date().toISOString(), inspections, incidents };
  downloadFile('safesite-records-' + new Date().toISOString().slice(0, 10) + '.json',
    'application/json', JSON.stringify(data, null, 2));
  toast('JSON exported');
});

/* ============================================================
   INCIDENT FORM
   ============================================================ */
$('#inc-datetime').value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString().slice(0, 16);

$('#incident-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const rec = {
    type: 'incident',
    datetime: $('#inc-datetime').value,
    typeLabel: $('#inc-type').value,
    severity: $('#inc-severity').value,
    location: $('#inc-location').value.trim(),
    people: $('#inc-people').value.trim(),
    description: $('#inc-desc').value.trim(),
    action: $('#inc-action').value.trim(),
    reported: $('#inc-reported').checked,
    savedAt: new Date().toISOString()
  };
  incidents.push({
    type: rec.typeLabel, severity: rec.severity, location: rec.location,
    people: rec.people, description: rec.description, action: rec.action,
    reported: rec.reported, datetime: rec.datetime, savedAt: rec.savedAt
  });
  saveJSON(LS_INCIDENTS, incidents);
  e.target.reset();
  $('#inc-datetime').value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().slice(0, 16);
  toast('🚨 Incident report saved — see Records to export');
});

/* ============================================================
   GUIDE ACCORDION
   ============================================================ */
$$('.acc-head').forEach((h) => h.addEventListener('click', () => {
  const item = h.parentElement;
  const wasOpen = item.classList.contains('open');
  $$('.acc-item').forEach((i) => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}));

/* ============================================================
   ONLINE / OFFLINE + INSTALL
   ============================================================ */
function updateOnlineBadge() {
  $('#offline-badge').hidden = navigator.onLine;
}
window.addEventListener('online', updateOnlineBadge);
window.addEventListener('offline', updateOnlineBadge);
updateOnlineBadge();

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $('#btn-install').hidden = false;
});
$('#btn-install').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  if (choice.outcome === 'accepted') { $('#btn-install').hidden = true; toast('Installing SafeSite…'); }
  deferredPrompt = null;
});
window.addEventListener('appinstalled', () => { $('#btn-install').hidden = true; });

/* ============================================================
   SERVICE WORKER REGISTRATION + INIT
   ============================================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

renderChecklistCards();
window.addEventListener('load', () => {
  setTimeout(() => $('#splash').classList.add('hide'), 500);
});
setTimeout(() => $('#splash').classList.add('hide'), 1800); // safety fallback
