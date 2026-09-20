/* =====================================================================
   SafeSite — JHA · JSA · Permits module
   Plugs into the "📝 JHA & Permits" tab of index.html.
   Everything (styles, forms, records) lives inside its own isolated
   container, so it cannot disturb the rest of the app.
   Records are stored on this device in localStorage (safesite.forms.v1).
   ===================================================================== */
(function () {
'use strict';
var host = document.getElementById('forms-root');
if (!host || host.shadowRoot) return;

var DOC_CSS = `.rl{font-size:14px;margin-top:8px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rl.sum{margin-top:12px;font-weight:600}
.rb{display:inline-block;padding:3px 9px;border-radius:999px;font-weight:700;font-size:13px}
.rb0{background:#eceff4;color:#607d8b}
.r-low{background:#e8f5e9;color:#1b5e20}
.r-med{background:#fff8e1;color:#7a5b00}
.r-high{background:#fff3e0;color:#bf360c}
.r-ext{background:#ffebee;color:#b71c1c}
.gas-ok{color:var(--ok);font-weight:700}
.gas-bad{color:var(--bad);font-weight:700}
.st{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12.5px;font-weight:700;white-space:nowrap}
.st.draft{background:#eceff4;color:#455a64}
.st.active{background:#e8f5e9;color:#1b5e20}
.st.approved,.st.completed{background:#e3f0ff;color:#0d47a1}
.st.closed{background:#e0e7ea;color:#37474f}
.st.expired,.st.cancelled{background:#ffebee;color:#b71c1c}
.doc .dh{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;border-bottom:3px solid var(--blue);padding-bottom:10px;margin-bottom:12px}
.doc .co{font-size:13px;color:var(--mut)}
.doc h2{margin:2px 0;font-size:22px;color:var(--blue)}
.dsec{margin:14px 0}
.dsec h4{margin:0 0 6px;background:#eaf1fd;color:var(--blue);padding:6px 10px;border-radius:8px;font-size:14px}
.dg{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px 16px}
.dl{padding:5px 0;border-bottom:1px solid #eef1f6;break-inside:avoid}
.dl dt{font-size:12px;color:var(--mut);margin:0}
.dl dd{margin:0;font-size:15px;white-space:pre-wrap;word-break:break-word}
.dl.full{grid-column:1/-1}
.tw{overflow-x:auto}
table.t{border-collapse:collapse;width:100%;font-size:13.5px;margin:4px 0}
table.t th,table.t td{border:1px solid #d5dbe8;padding:5px 7px;text-align:left;vertical-align:top}
table.t th{background:#f1f5fb}
table.t td.c{text-align:center;white-space:nowrap;font-weight:700}
.a-y{color:var(--ok)}.a-n{color:var(--bad)}.a-a{color:#607d8b}
.dsig{display:inline-block;margin:4px 14px 4px 0;text-align:center}
.dsig img{height:60px;display:block;border-bottom:1px solid #999}
.dsig small{color:var(--mut);font-size:12px}
.foot{margin-top:18px;font-size:12px;color:var(--mut);border-top:1px solid var(--line);padding-top:8px}
.doc img.logo{height:34px;vertical-align:middle;margin-right:6px;border-radius:4px}
@media print{.dl.tw{break-inside:auto}table.t tr{break-inside:avoid}.dsec h4{break-after:avoid}.dsec h4,.st,.rb{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`;
var APP_CSS = `:host{display:block;--brand:#0d47a1;--blue:var(--brand);--orange:#ff6d00;--card:#fff;--line:#dfe4ee;--txt:#111827;--mut:#5b6577;--ok:#2e7d32;--warn:#ef6c00;--bad:#c62828;font-family:inherit;color:var(--txt);line-height:1.4}
*{box-sizing:border-box}
.pf{padding-bottom:24px;font-size:16px}
.sub{display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap}
.sub button{font:inherit;font-weight:600;font-size:14px;padding:8px 14px;border-radius:999px;border:1px solid #c9d1e0;background:#fff;color:var(--txt);cursor:pointer}
.sub button.on{background:var(--brand);border-color:var(--brand);color:#fff}
h2.sec{font-size:15px;color:var(--mut);margin:20px 4px 10px;font-weight:700}
.card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:14px;margin-bottom:14px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.card h3{margin:0 0 10px;font-size:17px;color:var(--blue)}
.note{font-size:13.5px;color:var(--mut);margin:4px 0 10px}
.disc{margin-top:22px;text-align:center}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.tile{display:flex;align-items:flex-start;gap:14px;text-align:left;background:#fff;border:1px solid var(--line);border-radius:24px;padding:16px;font:inherit;color:inherit;cursor:pointer;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.tile:active{transform:scale(.99)}
.tile .ti{font-size:34px;line-height:1.1}
.tile .tx{display:flex;flex-direction:column;gap:3px;min-width:0}
.tile b{font-size:17px}
.tile small{color:var(--mut);font-size:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.f{display:flex;flex-direction:column;gap:4px;min-width:0}
.f.full{grid-column:1/-1}
.fl{font-size:13.5px;font-weight:600;color:#33405a}
input[type=text],input[type=number],input[type=date],input[type=time],input[type=datetime-local],select,textarea{width:100%;font:inherit;font-size:16px;padding:10px 11px;border:1px solid #c9d1e0;border-radius:10px;background:#fff;color:var(--txt)}
textarea{resize:vertical}
input:focus,select:focus,textarea:focus{outline:2px solid #90b4f5;border-color:var(--blue)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip input{position:absolute;opacity:0;pointer-events:none}
.chip span{display:inline-block;padding:7px 12px;border:1px solid #c9d1e0;border-radius:999px;background:#fff;font-size:14px;cursor:pointer}
.chip input:checked+span{background:var(--blue);border-color:var(--blue);color:#fff}
.yn{padding:10px 0;border-top:1px solid #eef1f6}
.yn:first-of-type{border-top:0}
.yn-t{font-size:15px;margin-bottom:7px}
.seg{display:flex;gap:6px}
.seg label{flex:1}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg span{display:block;text-align:center;padding:9px 0;border:1px solid #c9d1e0;border-radius:10px;background:#fff;font-weight:600;font-size:14px;cursor:pointer}
.seg .sy input:checked+span{background:var(--ok);border-color:var(--ok);color:#fff}
.seg .sa input:checked+span{background:#607d8b;border-color:#607d8b;color:#fff}
.seg .sn input:checked+span{background:var(--bad);border-color:var(--bad);color:#fff}
.rowc{border:1px solid var(--line);background:#fafbfe;border-radius:12px;padding:12px;margin:8px 0}
.rowh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.x{border:0;background:#fde7e7;color:var(--bad);border-radius:8px;width:32px;height:32px;font-size:15px;cursor:pointer}
.btn{font:inherit;font-weight:600;padding:11px 16px;border-radius:12px;border:1px solid var(--blue);background:var(--blue);color:#fff;cursor:pointer}
.btn.ghost{background:#fff;color:var(--blue)}
.btn.ok{background:var(--ok);border-color:var(--ok)}
.btn.bad{background:#fff;color:var(--bad);border-color:var(--bad)}
.btn.sm{padding:6px 12px;font-size:14px}
.btn:active{opacity:.85}
.bar{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}
.bar .btn{flex:1 1 150px}
.sigbtn{width:100%;background:#fff;color:var(--blue);border:2px dashed #90b4f5;padding:16px}
.sigbox{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border:1px solid var(--line);border-radius:12px;padding:8px;background:#fff}
.sigbox img{height:64px;max-width:200px;object-fit:contain}
.sigm{font-size:12px;color:var(--mut);flex:1}
.dochead{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}
.dochead h2{margin:0;font-size:21px;color:var(--blue)}
.dochead small{color:var(--mut)}
.item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;font:inherit;color:inherit;background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:10px;cursor:pointer}
.item .ii{font-size:26px}
.item .im{flex:1;min-width:0;display:flex;flex-direction:column}
.item .im small{color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.filters button{font:inherit;font-size:14px;font-weight:600;padding:7px 13px;border-radius:999px;border:1px solid #c9d1e0;background:#fff;cursor:pointer}
.filters button.on{background:var(--blue);border-color:var(--blue);color:#fff}
.empty{text-align:center;color:var(--mut);padding:30px 10px}
#modal{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.5);display:none;align-items:flex-end;justify-content:center}
#modal.on{display:flex}
.sheet{background:#fff;width:100%;max-width:560px;border-radius:20px 20px 0 0;padding:18px;max-height:92vh;overflow:auto;padding-bottom:calc(18px + env(safe-area-inset-bottom,0px))}
@media(min-width:600px){#modal{align-items:center}.sheet{border-radius:20px}}
.sheet h3{margin:0 0 8px;color:var(--blue)}
.sheet ul{padding-left:20px;margin:8px 0}
.sheet .f{margin:10px 0}
.chk{display:flex;gap:10px;align-items:flex-start;padding:6px 0;font-size:15px}
.chk input{width:20px;height:20px;margin-top:2px}
canvas.pad{width:100%;height:170px;border:2px dashed #90b4f5;border-radius:12px;background:#fbfcff;touch-action:none;display:block}
.btns{display:flex;gap:10px;margin-top:12px}
.btns .btn{flex:1}
#toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:#111827;color:#fff;padding:10px 16px;border-radius:999px;font-size:14px;z-index:100001;opacity:0;pointer-events:none;transition:opacity .2s;max-width:90vw;text-align:center}
#toast.on{opacity:1}`;
var PRINT_BASE = `:host{display:block;--blue:var(--brand,#0d47a1);--mut:#5b6577;--line:#dfe4ee;--ok:#2e7d32;--bad:#c62828;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;font-size:14px;line-height:1.4}*{box-sizing:border-box}`;

var root = host.attachShadow({ mode: 'open' });
root.innerHTML = '<style>' + APP_CSS + DOC_CSS + '</style>' +
  '<div class="pf">' +
    '<div class="sub"><button type="button" data-act="nav" data-r="new">➕ New</button><button type="button" data-act="nav" data-r="saved">📁 Saved</button><button type="button" data-act="nav" data-r="settings">⚙️ Options</button></div>' +
    '<div id="main"></div>' +
  '</div><div id="modal"></div><div id="toast"></div>';


/* =====================================================================
   Small helpers
   ===================================================================== */
var $ = function (s, r) { return (r || root).querySelector(s); };
var esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};
var pad = function (n) { return String(n).padStart(2, '0'); };
var localISO = function (d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
};
var todayISO = function () { return localISO(new Date()).slice(0, 10); };
var fmtDT = function (s) {
  if (!s) return '';
  var d = new Date(s);
  return isNaN(d) ? String(s) : d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
};
var fmtD = function (s) {
  if (!s) return '';
  var p = String(s).split('-');
  if (p.length !== 3) return String(s);
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  return isNaN(d) ? String(s) : d.toLocaleDateString([], { dateStyle: 'medium' });
};
var uid = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
var safeImg = function (s) { return (typeof s === 'string' && /^data:image\/png;base64,[A-Za-z0-9+\/=]+$/.test(s)) ? s : ''; };
var toastT = null;
function toast(msg) {
  var t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(function () { t.classList.remove('on'); }, 2600);
}

/* =====================================================================
   Storage
   ===================================================================== */
var LS_REC = 'safesite.forms.v1', LS_SET = 'safesite.forms.settings.v1';
function lsGet(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('⚠ Could not save — storage is full or blocked'); return false; } }
var store = lsGet(LS_REC, []);
if (!Array.isArray(store)) store = [];
var settings = Object.assign({ company: '', name: '' }, lsGet(LS_SET, {}));
var pending = {};      // new forms not yet saved (nothing typed yet)
var cur = null;        // record being edited
var saveTimer = null;
function flush() { clearTimeout(saveTimer); lsSet(LS_REC, store); }
function getRec(id) { return store.find(function (r) { return r.id === id; }) || pending[id] || null; }
function touch(rec) {
  rec.updated = Date.now();
  if (store.indexOf(rec) < 0) {
    while (store.some(function (r) { return r.no === rec.no; })) rec.no = bumpNo(rec.no);
    store.unshift(rec);
    delete pending[rec.id];
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 250);
}
window.addEventListener('pagehide', flush);
document.addEventListener('visibilitychange', function () { if (document.hidden) flush(); });

/* =====================================================================
   Schema helpers
   ===================================================================== */
function mk(t) { return function (k, l, o) { return Object.assign({ t: t, k: k, l: l }, o || {}); }; }
var T = mk('text'), TA = mk('textarea'), N = mk('number'), D = mk('date'), DT = mk('datetime'), TM = mk('time');
function SEL(k, l, opts, o) { return Object.assign({ t: 'select', k: k, l: l, opts: opts }, o || {}); }
function CH(k, l, opts, o) { return Object.assign({ t: 'checks', k: k, l: l, opts: opts }, o || {}); }
function YN(k, l, items, o) { return Object.assign({ t: 'yna', k: k, l: l, items: items }, o || {}); }
function ROWS(k, l, cols, o) { return Object.assign({ t: 'rows', k: k, l: l, cols: cols, min: 1 }, o || {}); }
function SIG(k, l, o) { return Object.assign({ t: 'sign', k: k, l: l }, o || {}); }

var SEV = [[1, '1 – First aid'], [2, '2 – Medical treatment'], [3, '3 – Lost time'], [4, '4 – Major injury'], [5, '5 – Fatality']];
var LIK = [[1, '1 – Rare'], [2, '2 – Unlikely'], [3, '3 – Possible'], [4, '4 – Likely'], [5, '5 – Almost certain']];
var PPE = ['Hard hat', 'Safety glasses', 'Face shield', 'Hearing protection', 'Gloves', 'Safety boots', 'Hi-vis vest', 'Coveralls', 'Respirator / mask', 'Fall-arrest harness', 'Chemical-resistant suit', 'Welding helmet / shield'];
var HAZ = ['Falls from height', 'Struck by / falling objects', 'Caught in / between', 'Electrical shock', 'Slips, trips & falls', 'Fire / explosion', 'Chemical exposure', 'Noise', 'Manual handling', 'Heat / cold stress', 'Vehicles / traffic', 'Confined space', 'Overhead power lines', 'Dust / fumes', 'Sharp edges / cuts', 'Weather', 'Others working nearby'];

/* =====================================================================
   Permit definitions
   ===================================================================== */
var PCOMMON = [{
  title: 'Permit details', fields: [
    T('site', 'Site / location', { req: 1 }),
    T('loc', 'Exact work location / equipment', { req: 1 }),
    TA('desc', 'Description of work', { req: 1 }),
    T('company', 'Contractor / company', { def: 'company' }),
    T('reqby', 'Requested by (name)', { req: 1, def: 'name' }),
    T('phone', 'Contact phone'),
    N('workers', 'Number of workers', { min: 1 }),
    T('ref', 'Related JHA / JSA ref.'),
    DT('vfrom', 'Valid from', { req: 1, def: 'now' }),
    DT('vto', 'Valid until', { req: 1, def: '+8h' }),
    T('muster', 'Emergency contact / muster point')
  ]
}];
var PAPPROVE = [{
  title: 'Approvals', note: 'The requester and the authorised issuer must both sign before work starts.',
  fields: [
    SIG('req_sign', 'Requester signature', { req: 1 }),
    T('issby', 'Issued / authorised by (name)', { req: 1 }),
    SIG('iss_sign', 'Issuer signature', { req: 1 })
  ]
}];
var CLOSE_BASE = ['Work completed or stopped safely', 'Area cleaned and left in a safe condition', 'All personnel, tools and materials accounted for', 'Barriers / signs removed or handed over'];

var PERMITS = {
  general: {
    code: 'GW', icon: '🛠️', name: 'General Work Permit', sub: 'Cold work, routine maintenance & repairs',
    intro: 'Use for routine work that does not need a specialist permit. If the job involves fire, confined spaces, heights, digging, energy isolation, lifting or chemicals, use that permit instead (or as well).',
    close: [],
    sections: [{
      title: 'Pre-work checks', fields: [YN('chk', 'All items must be Yes or N/A', [
        'Scope of work explained to everyone involved',
        'JHA / JSA completed and reviewed with the crew',
        'Area barricaded and warning signs posted',
        'Tools and equipment inspected and fit for use',
        'Required PPE identified and available',
        'Housekeeping and waste plan in place',
        'Emergency procedures and muster point explained',
        'Neighbouring operations informed',
        'Energy isolation completed where needed (see LOTO permit)',
        'Weather and site conditions suitable'
      ])]
    }]
  },
  hot: {
    code: 'HW', icon: '🔥', name: 'Hot Work Permit', sub: 'Welding, cutting, grinding, brazing, torch-applied work',
    intro: 'Hot work = anything that can create sparks, flames or heat. Based on common practice (e.g. NFPA 51B / OSHA 1910.252). Follow your site rules and local law.',
    close: ['Post-work fire watch completed', 'Work area and areas below / behind checked for smouldering or hot spots'],
    sections: [
      {
        title: 'Hot work details', fields: [
          SEL('hw_type', 'Type of hot work', ['Welding', 'Cutting', 'Grinding', 'Brazing / soldering', 'Torch-applied roofing', 'Other'], { req: 1 }),
          T('firewatch', 'Fire watch (name)', { req: 1 }),
          N('fw_min', 'Fire watch after work (minutes)', { def: '60' }),
          T('ext', 'Fire extinguisher type & location', { req: 1 })
        ]
      },
      {
        title: 'Pre-work checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'No safe cold-work alternative is possible',
          'Combustibles removed or protected within 11 m (35 ft) of the work',
          'Floor and wall openings covered; sparks cannot travel to other areas',
          'Flammable gas / vapour test done where needed (area is safe)',
          'Fire extinguisher / hose ready at the work location',
          'Fire watch assigned, trained and in position',
          'Sprinklers and detectors in service (or isolation authorised)',
          'Welding screens / fire blankets in place',
          'Gas cylinders secured upright; flashback arrestors fitted',
          'Ventilation / fume extraction adequate',
          'Areas above, below and behind the work checked',
          'Welder and helpers wearing correct PPE and eye protection',
          'Fire watch will stay at least 60 minutes after work stops (or as required on site)'
        ])]
      }
    ]
  },
  confined: {
    code: 'CS', icon: '🕳️', name: 'Confined Space Entry Permit', sub: 'Tanks, vessels, pits, manholes, ducts, silos',
    intro: 'A confined space has limited entry/exit, is not designed for continuous occupancy and may hold hazardous air or engulfment risks. Gas limits below are typical values — use the limits set by your site or regulator.',
    close: ['All entrants out and counted', 'Space closed off / secured; isolations restored as planned'],
    sections: [
      {
        title: 'Space details', fields: [
          T('space', 'Space name / ID', { req: 1 }),
          TA('purpose', 'Purpose of entry', { req: 1 }),
          CH('hazards', 'Known hazards', ['Low oxygen', 'Toxic gas (H₂S, CO…)', 'Flammable atmosphere', 'Engulfment', 'Entrapment / narrow access', 'Heat / cold', 'Noise', 'Slippery surfaces', 'Moving parts / energy', 'Residues / sludge'])
        ]
      },
      {
        title: 'Atmospheric testing', note: 'Test before entry and keep monitoring while people are inside. The latest test must be within limits (O₂ 19.5–23.5 %, LEL ≤ 10 %, H₂S ≤ 10 ppm, CO ≤ 35 ppm).',
        fields: [
          T('instr', 'Gas monitor / last calibration date', { req: 1 }),
          ROWS('gas', 'Test readings', [
            TM('time', 'Time', { req: 1 }), N('o2', 'O₂ (%)', { step: '0.1', req: 1 }), N('lel', 'Flammable (% LEL)', { step: '0.1', req: 1 }),
            N('h2s', 'H₂S (ppm)', { step: '0.1', req: 1 }), N('co', 'CO (ppm)', { step: '0.1', req: 1 }), T('by', 'Tested by')
          ], { gas: true, fresh: true, req: 1, rowName: 'Test', addLabel: 'Add another test' })
        ]
      },
      {
        title: 'People & rescue', fields: [
          T('attendant', 'Attendant (stays outside)', { req: 1 }),
          T('entsup', 'Entry supervisor', { req: 1 }),
          TA('rescue', 'Rescue service, contact number & method', { req: 1 }),
          ROWS('entrants', 'Entry log (who goes in)', [T('name', 'Entrant name'), TM('tin', 'Time in'), TM('tout', 'Time out')], { fresh: true, rowName: 'Entrant', addLabel: 'Add entrant' })
        ]
      },
      {
        title: 'Pre-entry checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'Space isolated (lockout, blanks / blinds, disconnected lines)',
          'Cleaned, purged and ventilated as required',
          'Atmosphere tested before entry and monitored continuously',
          'Attendant in place outside; never leaves post',
          'Communication method agreed between attendant and entrants',
          'Rescue plan and equipment ready (retrieval line / tripod)',
          'All entrants trained, fit and named on the entry log',
          'Suitable lighting (low-voltage / intrinsically safe as needed)',
          'Respirator / breathing apparatus and PPE provided if needed',
          'Access and exit clear of obstructions',
          'Nearby work that could affect the space has been stopped or controlled',
          'Permit displayed at the entry point'
        ])]
      }
    ]
  },
  height: {
    code: 'WH', icon: '🪜', name: 'Work at Height Permit', sub: 'Roofs, scaffolds, ladders, MEWPs, edges & openings',
    intro: 'Required whenever there is a risk of a fall. Prefer collective protection (guardrails, platforms) over personal fall arrest where possible.',
    close: ['Fall protection and access equipment removed or handed back safely'],
    sections: [
      {
        title: 'Work at height details', fields: [
          T('height', 'Working height (with unit)', { req: 1 }),
          SEL('access', 'Access method', ['Ladder', 'Scaffold', 'MEWP / scissor lift', 'Rope access', 'Roof / open edge', 'Suspended platform', 'Other'], { req: 1 }),
          SEL('fallprot', 'Main fall protection', ['Guardrails / edge protection', 'Full-body harness + lanyard', 'Self-retracting lifeline', 'Work-restraint system', 'Safety nets / airbags', 'Other'], { req: 1 }),
          T('anchor', 'Anchor point / structure and rating', { req: 1 }),
          TA('rescue', 'Rescue plan (how a fallen worker will be rescued quickly)', { req: 1 }),
          CH('cond', 'Conditions on site', ['High wind', 'Rain / ice', 'Fragile roof / skylights', 'Overhead power lines', 'Public / workers below', 'Floor openings', 'Poor lighting'])
        ]
      },
      {
        title: 'Pre-work checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'Workers trained, competent and medically fit for height work',
          'Harnesses, lanyards and connectors inspected (in date)',
          'Anchor points rated for fall arrest (e.g. 5,000 lb / 22 kN per worker, or engineered)',
          'Scaffold inspected and tagged by a competent person',
          'Ladder inspected, on firm ground, secured, 3 points of contact',
          'Edges, holes and openings protected (guardrails / covers)',
          'Area below barricaded; warning signs posted',
          'Tools and materials tied off or protected against dropping',
          'Weather checked (wind, rain, ice, lightning)',
          'Rescue equipment and trained people available',
          'Overhead power lines identified; safe distance kept'
        ])]
      }
    ]
  },
  excavation: {
    code: 'EX', icon: '⛏️', name: 'Excavation & Trenching Permit', sub: 'Digging, trenches, pits, groundwork',
    intro: 'Cave-ins and buried services are the main killers. Based on common practice (e.g. OSHA 1926 Subpart P). A competent person must inspect before every shift.',
    close: ['Excavation backfilled, or covered / fenced off securely'],
    sections: [
      {
        title: 'Excavation details', fields: [
          T('depth', 'Depth (with unit)', { req: 1 }),
          T('size', 'Length × width (with unit)'),
          SEL('soil', 'Soil classification', ['Stable rock', 'Type A', 'Type B', 'Type C', 'Not yet classified'], { req: 1 }),
          SEL('protect', 'Protective system', ['Sloping / benching', 'Shoring', 'Trench box / shield', 'None (shallow & stable — competent person approves)'], { req: 1 }),
          T('comp', 'Competent person (name)', { req: 1 }),
          T('locate', 'Utility locate ticket no. / date', { req: 1 }),
          CH('hazards', 'Hazards present', ['Underground utilities', 'Water / flooding', 'Vehicle traffic nearby', 'Heavy equipment', 'Hazardous atmosphere', 'Adjacent structures', 'Spoil pile', 'Contaminated soil'])
        ]
      },
      {
        title: 'Pre-work checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'Underground utilities located, marked and confirmed',
          'Competent person inspected before work and after rain / changes',
          'Protective system in place where depth is 1.5 m (5 ft) or more',
          'Ladder / ramp within 7.6 m (25 ft) of every worker in the trench',
          'Spoil and materials kept at least 0.6 m (2 ft) from the edge',
          'Barricades and warning signs around the excavation',
          'Atmosphere tested where deeper than 1.2 m (4 ft) and hazardous air is possible',
          'Water controlled; no one works in accumulating water',
          'Equipment and traffic kept away from the edge; spotter assigned',
          'Adjacent structures and services supported or protected'
        ])]
      }
    ]
  },
  loto: {
    code: 'LO', icon: '🔒', name: 'Electrical Isolation / LOTO Permit', sub: 'Lockout-tagout & work on electrical equipment',
    intro: 'Every energy source must be isolated, locked, tagged and proven dead before work starts. Live (energised) work needs separate written authorisation.',
    close: ['All locks and tags removed by the people who applied them', 'Equipment checked and safe to re-energise', 'Affected people told before power / energy is restored'],
    sections: [
      {
        title: 'Isolation details', fields: [
          T('equip', 'Equipment / circuit to be isolated', { req: 1 }),
          T('volt', 'Voltage / energy level'),
          SEL('live', 'Type of work', ['De-energised (isolated) work', 'Live (energised) work – separately authorised'], { req: 1 }),
          CH('energy', 'Energy sources present', ['Electrical', 'Mechanical', 'Hydraulic', 'Pneumatic', 'Thermal', 'Chemical', 'Gravity / stored energy', 'Steam / pressure']),
          ROWS('points', 'Isolation points', [
            T('point', 'Isolation point / device', { req: 1 }), T('lock', 'Lock no.'), T('tag', 'Tag no.'), T('by', 'Isolated by'),
            SEL('ver', 'Zero energy verified?', ['Yes', 'No'])
          ], { req: 1, rowName: 'Point', addLabel: 'Add isolation point' })
        ]
      },
      {
        title: 'Isolation checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'Authorised employees identified; affected people notified',
          'Equipment shut down using the normal stop procedure',
          'All energy sources identified',
          'Isolation devices operated, locked and tagged (personal locks)',
          'Stored energy released or blocked (capacitors, springs, pressure, gravity)',
          'Zero energy proven (test-before-touch with a rated tester / try-start)',
          'Each worker applies their own lock (or group lockout box used)',
          'Only qualified persons will work on electrical equipment',
          'Arc-flash boundary and PPE determined',
          'Live work justified and separately authorised (N/A if de-energised)'
        ])]
      }
    ]
  },
  lifting: {
    code: 'LF', icon: '🏗️', name: 'Lifting Operations Permit', sub: 'Cranes, hoists, forklifts, rigging',
    intro: 'For crane and hoist lifts. Critical lifts (near capacity, tandem lifts, over people or live plant) need an engineered lift plan.',
    close: ['Lifting equipment secured and parked; exclusion zone removed'],
    sections: [
      {
        title: 'Lift details', fields: [
          SEL('ltype', 'Type of lift', ['Standard lift', 'Critical lift', 'Tandem lift', 'Lift near live plant / people'], { req: 1 }),
          T('equip', 'Crane / hoist / equipment ID', { req: 1 }),
          T('load', 'Load description', { req: 1 }),
          T('weight', 'Load weight (with unit)', { req: 1 }),
          T('cap', 'Rated capacity at working radius', { req: 1 }),
          T('operator', 'Operator', { req: 1 }),
          T('rigger', 'Rigger / slinger', { req: 1 }),
          T('signaller', 'Signaller'),
          T('wind', 'Maximum wind speed allowed')
        ]
      },
      {
        title: 'Pre-lift checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'Lift plan prepared (engineered plan for critical lifts)',
          'Operator qualified for this equipment',
          'Riggers and signaller trained and competent',
          'Load weight known and within rated capacity at the radius',
          'Equipment pre-use inspected; certification in date',
          'Slings, shackles and hooks inspected and correctly rated',
          'Ground firm and level; outriggers fully extended on pads',
          'Overhead power lines identified; safe distance kept',
          'Exclusion zone barricaded; nobody under the load',
          'Communication (radio / hand signals) agreed',
          'Wind and weather within limits',
          'Tag lines used to control the load'
        ])]
      }
    ]
  },
  linebreak: {
    code: 'LB', icon: '🧪', name: 'Line Breaking / Chemical Permit', sub: 'Opening pipes, vessels & handling hazardous substances',
    intro: 'Use before opening any pipe, hose, vessel or equipment that has held a hazardous substance, or when handling hazardous chemicals as part of the job.',
    close: ['Line / equipment reassembled, leak-tested and returned to service or blanked', 'Waste and spills disposed of correctly'],
    sections: [
      {
        title: 'Line / substance details', fields: [
          T('line', 'Line / vessel / equipment ID', { req: 1 }),
          T('subst', 'Substance (name & SDS reference)', { req: 1 }),
          SEL('hclass', 'Main hazard', ['Flammable', 'Toxic', 'Corrosive', 'Pressurised', 'Hot / cold', 'Reactive', 'Other'], { req: 1 }),
          T('pt', 'Pressure / temperature'),
          T('drain', 'Drain / flush / vent method', { req: 1 })
        ]
      },
      {
        title: 'Pre-work checks', fields: [YN('chk', 'All items must be Yes or N/A', [
          'SDS reviewed and crew briefed on the hazards',
          'Line isolated (double block & bleed or blinds) and locked',
          'Depressurised and drained; zero pressure verified',
          'Flushed / purged / cleaned as required',
          'Spill containment and drip trays in place',
          'Eyewash / safety shower tested and within reach',
          'Correct chemical PPE worn (gloves, face shield, apron, respirator)',
          'Ventilation or gas monitoring in place',
          'Waste disposal arranged',
          'Emergency response for a release is known to the crew'
        ])]
      }
    ]
  }
};
var PERMIT_KEYS = Object.keys(PERMITS);

/* =====================================================================
   JHA & JSA definitions
   ===================================================================== */
var PERMIT_LABELS = PERMIT_KEYS.map(function (k) { return PERMITS[k].name; }).concat(['None required']);

var JHA = {
  kind: 'JHA', code: 'JHA', icon: '🧾', name: 'Job Hazard Analysis (JHA)', sub: 'Break a job into steps, rate the risk, agree the controls',
  intro: 'A JHA looks at the whole job before it starts: what could go wrong at each step, how serious it would be, and what controls make it safe. Risk = severity × likelihood.',
  finalStatus: 'approved', finalBtn: '✅ Approve JHA',
  sections: [
    {
      title: 'Job details', fields: [
        T('title', 'Job / task title', { req: 1 }), T('site', 'Site / location', { req: 1 }), T('dept', 'Department / area'),
        D('date', 'Date', { req: 1, def: 'today' }), T('by', 'Prepared by', { req: 1, def: 'name' }), T('ref', 'Work order / reference'),
        TA('desc', 'Job description'), TA('tools', 'Tools & equipment to be used')
      ]
    },
    { title: 'PPE required', fields: [CH('ppe', 'Tick all that apply', PPE, { dl: 'PPE required' })] },
    { title: 'Permits needed for this job', fields: [CH('permits', 'Tick all that apply', PERMIT_LABELS, { dl: 'Permits needed' })] },
    {
      title: 'Job steps, hazards & controls', note: 'Rate the risk before controls (initial) and after controls (residual). Controls, best to worst: eliminate › substitute › engineering › administrative › PPE.',
      fields: [ROWS('steps', 'Steps', [
        TA('step', 'Job step', { rows: 2, req: 1 }), TA('haz', 'Hazards', { rows: 2, req: 1 }), TA('ctl', 'Controls', { rows: 3, req: 1 }),
        SEL('iS', 'Initial severity', SEV), SEL('iL', 'Initial likelihood', LIK), SEL('rS', 'Residual severity', SEV), SEL('rL', 'Residual likelihood', LIK),
        T('resp', 'Responsible person')
      ], { risk: true, req: 1, rowName: 'Step', addLabel: 'Add step' })]
    },
    { title: 'Emergency information', fields: [T('assembly', 'Assembly / muster point'), T('emerg', 'Emergency contact & number'), T('aid', 'First-aid kit / nearest medical facility')] },
    {
      title: 'Approval', fields: [
        SIG('by_sign', 'Prepared by – signature', { req: 1 }), T('appby', 'Reviewed / approved by (name)', { req: 1 }), SIG('app_sign', 'Approver signature', { req: 1 })
      ]
    }
  ]
};

var JSA = {
  kind: 'JSA', code: 'JSA', icon: '👷', name: 'Job Safety Analysis (JSA)', sub: 'Daily pre-task safety briefing with crew sign-on',
  intro: 'A JSA is the field-level pre-task plan: the crew walks the job, agrees the hazards and controls, and signs on before starting. Anyone can stop work if it is unsafe.',
  finalStatus: 'completed', finalBtn: '✅ Complete JSA',
  sections: [
    {
      title: 'Task details', fields: [
        T('title', 'Task / job', { req: 1 }), T('site', 'Site / location', { req: 1 }), D('date', 'Date', { req: 1, def: 'today' }),
        TM('time', 'Start time'), T('sup', 'Supervisor / foreman', { req: 1, def: 'name' }), T('ref', 'Work order / permit ref.'), T('weather', 'Weather / site conditions')
      ]
    },
    { title: 'Hazards present today', fields: [CH('hazcats', 'Tick all that apply', HAZ, { dl: 'Hazards present' })] },
    { title: 'PPE required', fields: [CH('ppe', 'Tick all that apply', PPE, { dl: 'PPE required' })] },
    {
      title: 'Pre-task checks', fields: [YN('chk', 'All items must be Yes or N/A', [
        'Crew briefed on the task and each person\'s role',
        'Hazards identified for every step',
        'Required permits obtained and displayed',
        'PPE inspected and worn correctly',
        'Tools and equipment inspected',
        'Emergency plan, muster point and first-aid location known',
        'Weather and site conditions assessed',
        'Work area walked and housekeeping checked',
        'Everyone knows they can stop work if it is unsafe',
        'Crew will re-do this JSA if the scope or conditions change'
      ])]
    },
    {
      title: 'Task steps, hazards & controls', fields: [ROWS('steps', 'Steps', [
        TA('step', 'Task step', { rows: 2, req: 1 }), TA('haz', 'Hazard', { rows: 2, req: 1 }), TA('ctl', 'Control measure', { rows: 2, req: 1 }), T('resp', 'Person responsible')
      ], { req: 1, rowName: 'Step', addLabel: 'Add step' })]
    },
    {
      title: 'Crew sign-on', note: 'By signing, each person confirms they understand the hazards and controls and will follow them.',
      fields: [ROWS('crew', 'Crew', [T('name', 'Name', { req: 1 }), T('co', 'Company'), { t: 'sign', k: 'sign', l: 'Signature', req: 1 }], { req: 1, rowName: 'Person', addLabel: 'Add crew member' })]
    },
    { title: 'Supervisor', fields: [SIG('sup_sign', 'Supervisor signature', { req: 1 })] },
    { title: 'Post-job review (optional)', fields: [TA('review', 'Incidents, near misses, changes or lessons learned', { rows: 3 })] }
  ]
};

function schemaOf(rec) {
  if (rec.kind === 'JHA') return JHA;
  if (rec.kind === 'JSA') return JSA;
  var p = PERMITS[rec.type];
  return { kind: 'PERMIT', icon: p.icon, name: p.name, sub: p.sub, intro: p.intro, code: p.code, finalBtn: '🔓 Issue permit',
    sections: PCOMMON.concat(p.sections, PAPPROVE) };
}
function allFields(sch) { var o = []; sch.sections.forEach(function (s) { s.fields.forEach(function (f) { o.push(f); }); }); return o; }
function fieldByKey(rec, k) { return allFields(schemaOf(rec)).find(function (f) { return f.k === k; }); }

/* =====================================================================
   Records
   ===================================================================== */
function defVal(f) {
  var d = f.def;
  if (d == null) return '';
  if (d === 'today') return todayISO();
  if (d === 'now') return localISO(new Date());
  if (d === '+8h') return localISO(new Date(Date.now() + 8 * 3600e3));
  if (d === 'name') return settings.name || '';
  if (d === 'company') return brandCompany();
  return d;
}
function initData(rec) {
  var sch = schemaOf(rec);
  allFields(sch).forEach(function (f) {
    if (f.t === 'rows') rec.data[f.k] = Array.from({ length: f.min || 0 }, function () { return {}; });
    else if (f.t === 'checks') rec.data[f.k] = [];
    else if (f.t === 'yna') rec.data[f.k] = new Array(f.items.length).fill('');
    else if (f.t !== 'sign') rec.data[f.k] = defVal(f);
  });
}
function nextNo(kind, type) {
  var code = kind === 'PERMIT' ? PERMITS[type].code : kind;
  var day = todayISO().replace(/-/g, '');
  var prefix = code + '-' + day + '-';
  var n = store.filter(function (r) { return r.no && r.no.indexOf(prefix) === 0; }).length + 1;
  return prefix + String(n).padStart(3, '0');
}
function bumpNo(no) {
  var m = /^(.*-)(\d+)$/.exec(no);
  return m ? m[1] + String(+m[2] + 1).padStart(m[2].length, '0') : no + '-2';
}
function blank(kind, type) {
  var rec = { id: uid(), kind: kind, type: type || '', status: 'draft', created: Date.now(), updated: Date.now(), no: nextNo(kind, type), data: {} };
  initData(rec);
  return rec;
}
function cloneRec(src) {
  var n = blank(src.kind, src.type);
  var d = JSON.parse(JSON.stringify(src.data));
  allFields(schemaOf(src)).forEach(function (f) {
    if (f.t === 'sign') { delete d[f.k]; delete d[f.k + '_at']; }
    else if (f.t === 'yna') d[f.k] = new Array(f.items.length).fill('');
    else if (f.t === 'rows') {
      if (f.fresh) d[f.k] = Array.from({ length: f.min || 0 }, function () { return {}; });
      else (d[f.k] || []).forEach(function (row) { f.cols.forEach(function (c) { if (c.t === 'sign') { delete row[c.k]; delete row[c.k + '_at']; } }); });
    } else if (f.def === 'today' || f.def === 'now' || f.def === '+8h') d[f.k] = defVal(f);
  });
  n.data = d;
  return n;
}
function validTo(rec) {
  var ex = rec.extensions || [];
  return ex.length ? ex[ex.length - 1].to : rec.data.vto;
}
function effStatus(rec) {
  if (rec.kind === 'PERMIT' && rec.status === 'active') {
    var t = new Date(validTo(rec));
    if (!isNaN(t) && t < new Date()) return 'expired';
  }
  return rec.status;
}
var STATUS_LABEL = { draft: 'Draft', active: 'Active', expired: 'Expired', closed: 'Closed', cancelled: 'Cancelled', approved: 'Approved', completed: 'Completed' };
function titleOf(r) { var d = r.data; return d.title || d.desc || d.site || '(untitled)'; }
function whoOf(r) { var d = r.data; return d.reqby || d.by || d.sup || ''; }

/* =====================================================================
   Risk & gas evaluation
   ===================================================================== */
function lvl(s) {
  if (s <= 4) return { n: 'Low', c: 'r-low' };
  if (s <= 9) return { n: 'Medium', c: 'r-med' };
  if (s <= 16) return { n: 'High', c: 'r-high' };
  return { n: 'Extreme', c: 'r-ext' };
}
function badge(s) { if (!s) return '<span class="rb rb0">–</span>'; var l = lvl(s); return '<span class="rb ' + l.c + '">' + s + ' · ' + l.n + '</span>'; }
function riskOf(row) { return { i: (+row.iS || 0) * (+row.iL || 0), r: (+row.rS || 0) * (+row.rL || 0) }; }
var GAS = { o2: [19.5, 23.5, 'O₂'], lel: [0, 10, 'LEL'], h2s: [0, 10, 'H₂S'], co: [0, 35, 'CO'] };
function gasEval(row) {
  var bad = [], filled = 0;
  Object.keys(GAS).forEach(function (k) {
    var v = row[k];
    if (v === undefined || v === '' || v === null || isNaN(+v)) return;
    filled++;
    if (+v < GAS[k][0] || +v > GAS[k][1]) bad.push(GAS[k][2]);
  });
  return { bad: bad, filled: filled, ok: filled === 4 && !bad.length };
}
function rowLine(f, row) {
  if (f.risk) { var r = riskOf(row); return 'Initial ' + badge(r.i) + ' → Residual ' + badge(r.r); }
  if (f.gas) {
    var g = gasEval(row);
    if (!g.filled) return '<span class="rb rb0">Enter all four readings</span>';
    if (g.bad.length) return '<span class="gas-bad">✖ Out of limits: ' + g.bad.join(', ') + ' — do NOT enter</span>';
    return g.ok ? '<span class="gas-ok">✔ Within limits</span>' : '<span class="rb rb0">Enter all four readings</span>';
  }
  return '';
}
function summaryLine(f, rec) {
  var rows = rec.data[f.k] || [], max = 0, maxI = 0;
  rows.forEach(function (r) { var x = riskOf(r); if (x.r > max) max = x.r; if (x.i > maxI) maxI = x.i; });
  return 'Highest initial risk ' + badge(maxI) + ' → highest residual risk ' + badge(max);
}

/* =====================================================================
   Form rendering
   ===================================================================== */
function inputHTML(f, val, attrs) {
  var v = val == null ? '' : val;
  switch (f.t) {
    case 'textarea': return '<textarea ' + attrs + ' rows="' + (f.rows || 3) + '" placeholder="' + esc(f.ph || '') + '">' + esc(v) + '</textarea>';
    case 'select':
      return '<select ' + attrs + '><option value="">Select…</option>' + f.opts.map(function (o) {
        var ov = Array.isArray(o) ? o[0] : o, ol = Array.isArray(o) ? o[1] : o;
        return '<option value="' + esc(ov) + '"' + (String(v) === String(ov) ? ' selected' : '') + '>' + esc(ol) + '</option>';
      }).join('') + '</select>';
    case 'datetime': return '<input type="datetime-local" ' + attrs + ' value="' + esc(v) + '">';
    case 'number': return '<input type="number" inputmode="decimal" step="' + (f.step || 'any') + '"' + (f.min != null ? ' min="' + f.min + '"' : '') + ' ' + attrs + ' value="' + esc(v) + '" placeholder="' + esc(f.ph || '') + '">';
    default: return '<input type="' + f.t + '" ' + attrs + ' value="' + esc(v) + '" placeholder="' + esc(f.ph || '') + '">';
  }
}
function sigHTML(img, at, attrs) {
  img = safeImg(img);
  if (!img) return '<button type="button" class="btn sigbtn" data-act="sign" ' + attrs + '>✍️ Tap to sign</button>';
  return '<div class="sigbox"><img src="' + img + '" alt="signature"><div class="sigm">' + (at ? esc(fmtDT(at)) : '') + '</div><button type="button" class="btn ghost sm" data-act="sign" ' + attrs + '>Re-sign</button></div>';
}
function cellHTML(f, c, row, i) {
  var attrs = 'data-rk="' + f.k + '" data-r="' + i + '" data-c="' + c.k + '"';
  var wide = c.t === 'textarea' || c.t === 'sign';
  var lab = esc(c.l) + (c.req ? ' *' : '');
  if (c.t === 'sign') return '<div class="f full"><span class="fl">' + lab + '</span>' + sigHTML(row[c.k], row[c.k + '_at'], attrs) + '</div>';
  return '<label class="f' + (wide ? ' full' : '') + '"><span class="fl">' + lab + '</span>' + inputHTML(c, row[c.k], attrs) + '</label>';
}
function fieldHTML(f, rec) {
  var d = rec.data, lab = esc(f.l) + (f.req ? ' *' : '');
  switch (f.t) {
    case 'checks':
      return '<div class="f full"><span class="fl">' + lab + '</span><div class="chips">' + f.opts.map(function (o) {
        var on = (d[f.k] || []).indexOf(o) >= 0;
        return '<label class="chip"><input type="checkbox" data-ck="' + f.k + '" data-v="' + esc(o) + '"' + (on ? ' checked' : '') + '><span>' + esc(o) + '</span></label>';
      }).join('') + '</div></div>';
    case 'yna':
      return '<div class="f full"><span class="fl">' + lab + '</span>' + f.items.map(function (it, i) {
        var a = (d[f.k] || [])[i] || '';
        var nm = f.k + '_' + i;
        return '<div class="yn"><div class="yn-t">' + (i + 1) + '. ' + esc(it) + '</div><div class="seg">' +
          [['Y', 'sy', 'Yes'], ['A', 'sa', 'N/A'], ['N', 'sn', 'No']].map(function (b) {
            return '<label class="' + b[1] + '"><input type="radio" name="' + nm + '" data-yk="' + f.k + '" data-yi="' + i + '" data-v="' + b[0] + '"' + (a === b[0] ? ' checked' : '') + '><span>' + b[2] + '</span></label>';
          }).join('') + '</div></div>';
      }).join('') + '</div>';
    case 'rows':
      var rows = d[f.k] || [];
      var h = '<div class="f full"><span class="fl">' + lab + '</span>';
      rows.forEach(function (row, i) {
        h += '<div class="rowc"><div class="rowh"><b>' + esc(f.rowName || 'Row') + ' ' + (i + 1) + '</b><button type="button" class="x" data-act="delrow" data-rk="' + f.k + '" data-r="' + i + '" aria-label="Remove">✕</button></div><div class="grid">';
        f.cols.forEach(function (c) { h += cellHTML(f, c, row, i); });
        h += '</div>';
        if (f.risk || f.gas) h += '<div class="rl" data-rl="' + f.k + '" data-r="' + i + '">' + rowLine(f, row) + '</div>';
        h += '</div>';
      });
      h += '<button type="button" class="btn ghost" data-act="addrow" data-rk="' + f.k + '">＋ ' + esc(f.addLabel || 'Add row') + '</button>';
      if (f.risk) h += '<div class="rl sum" data-sum="' + f.k + '">' + summaryLine(f, rec) + '</div>';
      return h + '</div>';
    case 'sign':
      return '<div class="f full"><span class="fl">' + lab + '</span>' + sigHTML(d[f.k], d[f.k + '_at'], 'data-sk="' + f.k + '"') + '</div>';
    default:
      var wide = f.t === 'textarea';
      return '<label class="f' + (wide ? ' full' : '') + '"><span class="fl">' + lab + '</span>' + inputHTML(f, d[f.k], 'data-k="' + f.k + '"') + '</label>';
  }
}
function statusPill(st) { return '<span class="st ' + st + '">' + (STATUS_LABEL[st] || st) + '</span>'; }
function formHTML(rec) {
  var sch = schemaOf(rec);
  var h = '<div id="formRoot"><div class="dochead"><div><h2>' + sch.icon + ' ' + esc(sch.name) + '</h2><small>No. ' + esc(rec.no) + '</small></div>' + statusPill('draft') + '</div>';
  if (sch.intro) h += '<p class="note">' + esc(sch.intro) + '</p>';
  h += '<p class="note">Changes are saved automatically on this device.</p>';
  sch.sections.forEach(function (s) {
    h += '<section class="card"><h3>' + esc(s.title) + '</h3>' + (s.note ? '<p class="note">' + esc(s.note) + '</p>' : '') + '<div class="grid">';
    s.fields.forEach(function (f) { h += fieldHTML(f, rec); });
    h += '</div></section>';
  });
  h += '<div class="bar"><button class="btn ghost" data-act="saveexit">💾 Save &amp; close</button><button class="btn ok" data-act="finalize">' + sch.finalBtn + '</button></div></div>';
  return h;
}
function rerenderForm() {
  var y = window.scrollY;
  $('#main').innerHTML = formHTML(cur);
  window.scrollTo(0, y);
}

/* =====================================================================
   Validation & finalising
   ===================================================================== */
function isBlank(v) { return v == null || String(v).trim() === ''; }
function problems(rec) {
  var sch = schemaOf(rec), d = rec.data, out = [];
  allFields(sch).forEach(function (f) {
    if (f.t === 'yna') {
      var a = d[f.k] || [];
      if (f.items.some(function (_, i) { return !a[i]; })) out.push('Answer every item in the checklist (Yes / N/A / No)');
      else if (a.indexOf('N') >= 0) out.push('Checklist has "No" answers — fix them, or set N/A if they do not apply');
    } else if (f.t === 'rows') {
      if (f.req) {
        var ok = (d[f.k] || []).some(function (r) {
          var reqCols = f.cols.filter(function (c) { return c.req; });
          return reqCols.length ? reqCols.every(function (c) { return !isBlank(r[c.k]); }) : f.cols.some(function (c) { return !isBlank(r[c.k]); });
        });
        if (!ok) out.push('Complete at least one row in "' + f.l + '"');
      }
    } else if (f.t === 'checks') {
      if (f.req && !(d[f.k] || []).length) out.push(f.l);
    } else if (f.req) {
      if (f.t === 'sign' ? !safeImg(d[f.k]) : isBlank(d[f.k])) out.push(f.l);
    }
  });
  if (rec.kind === 'PERMIT') {
    if (d.vfrom && d.vto && new Date(d.vto) <= new Date(d.vfrom)) out.push('"Valid until" must be after "Valid from"');
    if (rec.type === 'confined') {
      var g = (d.gas || []).filter(function (r) { return gasEval(r).filled; });
      if (g.length && !gasEval(g[g.length - 1]).ok) out.push('Latest gas test is not within limits — entry is not allowed');
    }
  }
  return out.filter(function (x, i) { return out.indexOf(x) === i; });
}
function modal(html) {
  var m = $('#modal');
  m.innerHTML = '<div class="sheet">' + html + '</div>';
  m.classList.add('on');
  return m;
}
function closeModal() { var m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; }
$('#modal').addEventListener('click', function (e) { if (e.target.id === 'modal') closeModal(); });

function showProblems(list) {
  modal('<h3>Not ready yet</h3><p class="note">Please fix the following:</p><ul>' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
    '</ul><div class="btns"><button class="btn" data-m="close">OK</button></div>');
  $('#modal [data-m="close"]').onclick = closeModal;
}
function finalize() {
  var p = problems(cur);
  if (p.length) { showProblems(p); return; }
  var sch = schemaOf(cur);
  if (cur.kind === 'JHA') {
    var hi = (cur.data.steps || []).some(function (r) { return riskOf(r).r >= 10; });
    if (hi && !confirm('At least one step still has a HIGH or EXTREME residual risk. Approve anyway?')) return;
  }
  cur.status = cur.kind === 'PERMIT' ? 'active' : sch.finalStatus;
  if (cur.kind === 'PERMIT') cur.issuedAt = Date.now();
  touch(cur); flush();
  toast(cur.kind === 'PERMIT' ? 'Permit issued' : 'Saved');
  go('view/' + cur.id);
}

/* =====================================================================
   Signature pad
   ===================================================================== */
function mountPad(cv) {
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var w = cv.clientWidth || 300, h = cv.clientHeight || 170;
  cv.width = w * dpr; cv.height = h * dpr;
  var ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0b1f4d';
  var drawing = false, dirty = false;
  function pos(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  cv.addEventListener('pointerdown', function (e) {
    drawing = true; dirty = true;
    try { cv.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
    var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.1, p.y + 0.1); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    e.preventDefault();
  });
  cv.addEventListener('pointermove', function (e) {
    if (!drawing) return;
    var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    e.preventDefault();
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { cv.addEventListener(t, function () { drawing = false; }); });
  return {
    clear: function () { ctx.clearRect(0, 0, w, h); dirty = false; },
    blank: function () { return !dirty; },
    data: function () { return cv.toDataURL('image/png'); }
  };
}
function signModal(cb) {
  modal('<h3>Sign here</h3><p class="note">Use your finger or a mouse.</p><canvas class="pad" id="pad"></canvas>' +
    '<div class="btns"><button class="btn ghost" data-m="clear">Clear</button><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Save</button></div>');
  var pad = mountPad($('#pad'));
  $('#modal [data-m="clear"]').onclick = function () { pad.clear(); };
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = function () {
    if (pad.blank()) { toast('Please sign first'); return; }
    var img = pad.data(); closeModal(); cb(img);
  };
}

/* =====================================================================
   Read-only document view
   ===================================================================== */
function optLabel(f, v) {
  if (f.t !== 'select') return v;
  var o = (f.opts || []).find(function (x) { return String(Array.isArray(x) ? x[0] : x) === String(v); });
  return o ? (Array.isArray(o) ? o[1] : o) : v;
}
function valText(f, v) {
  if (isBlank(v)) return '—';
  if (f.t === 'datetime') return fmtDT(v);
  if (f.t === 'date') return fmtD(v);
  return optLabel(f, v);
}
function sigDoc(label, img, at) {
  img = safeImg(img);
  return '<div class="dsig">' + (img ? '<img src="' + img + '" alt="">' : '<div style="height:60px;border-bottom:1px solid #999;width:150px"></div>') + '<small>' + esc(label) + (at ? ' · ' + esc(fmtDT(at)) : '') + '</small></div>';
}
function docField(f, rec) {
  var d = rec.data;
  switch (f.t) {
    case 'checks':
      return '<div class="dl full"><dt>' + esc(f.dl || f.l) + '</dt><dd>' + ((d[f.k] || []).length ? esc((d[f.k] || []).join(', ')) : '—') + '</dd></div>';
    case 'yna':
      return '<div class="dl full tw"><table class="t"><tr><th>#</th><th>Check</th><th>Answer</th></tr>' + f.items.map(function (it, i) {
        var a = (d[f.k] || [])[i];
        var lab = a === 'Y' ? '<span class="a-y">✔ Yes</span>' : a === 'N' ? '<span class="a-n">✖ No</span>' : a === 'A' ? '<span class="a-a">N/A</span>' : '—';
        return '<tr><td class="c">' + (i + 1) + '</td><td>' + esc(it) + '</td><td class="c">' + lab + '</td></tr>';
      }).join('') + '</table></div>';
    case 'rows':
      var rows = d[f.k] || [];
      var nonEmpty = rows.filter(function (r) { return f.cols.some(function (c) { return !isBlank(r[c.k]); }); });
      if (!nonEmpty.length) return '<div class="dl full"><dt>' + esc(f.l) + '</dt><dd>—</dd></div>';
      var cols = f.risk ? f.cols.filter(function (c) { return ['iS', 'iL', 'rS', 'rL'].indexOf(c.k) < 0; }) : f.cols;
      var extra = f.risk ? '<th>Risk (severity × likelihood)</th>' : f.gas ? '<th>Result</th>' : '';
      var t = '<div class="dl full tw"><dt>' + esc(f.l) + '</dt><table class="t"><tr><th>#</th>' + cols.map(function (c) { return '<th>' + esc(c.l) + '</th>'; }).join('') + extra + '</tr>';
      nonEmpty.forEach(function (r, i) {
        t += '<tr><td class="c">' + (i + 1) + '</td>' + cols.map(function (c) {
          if (c.t === 'sign') { var im = safeImg(r[c.k]); return '<td>' + (im ? '<img src="' + im + '" style="height:34px" alt="">' : '—') + '</td>'; }
          return '<td>' + esc(valText(c, r[c.k])) + '</td>';
        }).join('');
        if (f.risk) {
          var x = riskOf(r);
          t += '<td>Initial ' + esc((r.iS || '?') + '×' + (r.iL || '?')) + ' ' + badge(x.i) + '<br>Residual ' + esc((r.rS || '?') + '×' + (r.rL || '?')) + ' ' + badge(x.r) + '</td>';
        } else if (f.gas) t += '<td>' + rowLine(f, r) + '</td>';
        t += '</tr>';
      });
      t += '</table>' + (f.risk ? '<div class="rl sum">' + summaryLine(f, rec) + '</div>' : '') + '</div>';
      return t;
    case 'sign':
      return '<div class="dl full">' + sigDoc(f.l, d[f.k], d[f.k + '_at']) + '</div>';
    default:
      return '<div class="dl' + (f.t === 'textarea' ? ' full' : '') + '"><dt>' + esc(f.l) + '</dt><dd>' + esc(valText(f, d[f.k])) + '</dd></div>';
  }
}
function docHTML(rec) {
  var sch = schemaOf(rec), st = effStatus(rec);
  var h = '<div class="doc"><div class="dh"><div>' + brandHTML() + '<h2>' + sch.icon + ' ' + esc(sch.name) + '</h2><div class="co">No. ' + esc(rec.no) +
    ' · Created ' + esc(fmtDT(rec.created)) + '</div></div><div>' + statusPill(st) + '</div></div>';
  if (rec.kind === 'PERMIT') {
    h += '<div class="dg"><div class="dl"><dt>Valid from</dt><dd>' + esc(fmtDT(rec.data.vfrom)) + '</dd></div><div class="dl"><dt>Valid until' + ((rec.extensions || []).length ? ' (extended)' : '') + '</dt><dd>' + esc(fmtDT(validTo(rec))) + '</dd></div></div>';
  }
  sch.sections.forEach(function (s) {
    h += '<div class="dsec"><h4>' + esc(s.title) + '</h4><div class="dg">' + s.fields.filter(function (f) { return !(rec.kind === 'PERMIT' && (f.k === 'vfrom' || f.k === 'vto')); }).map(function (f) { return docField(f, rec); }).join('') + '</div></div>';
  });
  if (rec.extensions && rec.extensions.length) {
    h += '<div class="dsec"><h4>Extensions</h4><div class="tw"><table class="t"><tr><th>New end time</th><th>Reason</th><th>Approved by</th><th>Signature</th></tr>' + rec.extensions.map(function (x) {
      var im = safeImg(x.sign);
      return '<tr><td>' + esc(fmtDT(x.to)) + '</td><td>' + esc(x.reason) + '</td><td>' + esc(x.by) + '<br><small>' + esc(fmtDT(x.at)) + '</small></td><td>' + (im ? '<img src="' + im + '" style="height:34px" alt="">' : '—') + '</td></tr>';
    }).join('') + '</table></div></div>';
  }
  if (rec.closeout) {
    var c = rec.closeout;
    h += '<div class="dsec"><h4>Close-out</h4><div class="tw"><table class="t">' + (c.items || []).map(function (it) { return '<tr><td>' + esc(it) + '</td><td class="c a-y">✔</td></tr>'; }).join('') + '</table></div>' +
      '<div class="dg"><div class="dl full"><dt>Comments</dt><dd>' + esc(c.comments || '—') + '</dd></div><div class="dl"><dt>Closed by</dt><dd>' + esc(c.by) + '</dd></div><div class="dl"><dt>Closed at</dt><dd>' + esc(fmtDT(c.at)) + '</dd></div></div>' +
      sigDoc('Close-out signature', c.sign, c.at) + '</div>';
  }
  if (rec.cancel) {
    h += '<div class="dsec"><h4>Cancelled</h4><div class="dl"><dt>Reason · ' + esc(fmtDT(rec.cancel.at)) + '</dt><dd>' + esc(rec.cancel.reason) + '</dd></div></div>';
  }
  h += '<div class="foot">Generated by SafeSite on ' + esc(new Date().toLocaleString()) + '. This is a general-purpose template based on common industry practice; it does not replace your company procedures or local regulations.</div></div>';
  return h;
}
function viewHTML(rec) {
  var st = effStatus(rec), act = '';
  if (rec.kind === 'PERMIT' && (st === 'active' || st === 'expired')) {
    act += '<button class="btn ok" data-act="closeout">✅ Close-out</button><button class="btn ghost" data-act="extend">⏱ Extend</button>';
  }
  act += '<button class="btn ghost" data-act="print">🖨 Print / PDF</button>';
  if (rec.kind === 'PERMIT' && (st === 'active' || st === 'expired')) act += '<button class="btn bad" data-act="cancelpermit">⛔ Cancel permit</button>';
  act += '<button class="btn ghost" data-act="dup">⧉ Duplicate</button><button class="btn bad" data-act="delete">🗑 Delete</button>';
  var warn = st === 'expired' ? '<div class="card" style="border-color:#f3b4b4;background:#fff5f5"><b style="color:#b71c1c">⚠ This permit has expired.</b> Work must stop until it is extended or closed out.</div>' : '';
  return warn + '<div class="card">' + docHTML(rec) + '</div><div class="bar noprint">' + act + '</div>';
}

/* =====================================================================
   Home / Saved / Settings
   ===================================================================== */
function tile(kind, type, s) {
  return '<button class="tile" data-act="new" data-kind="' + kind + '" data-type="' + (type || '') + '"><span class="ti">' + s.icon + '</span><span class="tx"><b>' + esc(s.name) + '</b><small>' + esc(s.sub) + '</small></span></button>';
}
function itemCard(r) {
  var s = schemaOf(r), st = effStatus(r);
  var sub = r.kind === 'PERMIT' && (st === 'active' || st === 'expired') ? 'Valid until ' + fmtDT(validTo(r)) : fmtDT(r.updated);
  return '<button class="item" data-act="open" data-id="' + r.id + '"><span class="ii">' + s.icon + '</span><span class="im"><b>' + esc(s.name) + '</b><small>' + esc(r.no) + ' · ' + esc(titleOf(r)) + '</small><small>' + esc(sub) + '</small></span>' + statusPill(st) + '</button>';
}
function homeHTML() {
  var active = store.filter(function (r) { return r.kind === 'PERMIT' && r.status === 'active'; }).sort(function (a, b) { return new Date(validTo(a)) - new Date(validTo(b)); });
  var h = '';
  if (active.length) h += '<section class="card"><h3>🔔 Active permits (' + active.length + ')</h3>' + active.slice(0, 5).map(itemCard).join('') + '</section>';
  h += '<h2 class="sec">Job analysis</h2><div class="tiles">' + tile('JHA', '', JHA) + tile('JSA', '', JSA) + '</div>';
  h += '<h2 class="sec">Permits to work</h2><div class="tiles">' + PERMIT_KEYS.map(function (k) { return tile('PERMIT', k, PERMITS[k]); }).join('') + '</div>';
  h += '<p class="note disc">Templates follow common industry practice (OSHA, NFPA, ISO 45001-style). Adapt them to your company procedures and local law, and have a competent person review them.</p>';
  return h;
}
var fKind = 'ALL', fq = '';
function listHTML() {
  var q = fq.trim().toLowerCase();
  var rows = store.filter(function (r) {
    if (fKind !== 'ALL' && r.kind !== fKind) return false;
    if (!q) return true;
    return (r.no + ' ' + schemaOf(r).name + ' ' + titleOf(r) + ' ' + (r.data.site || '') + ' ' + whoOf(r)).toLowerCase().indexOf(q) >= 0;
  }).sort(function (a, b) { return b.updated - a.updated; });
  return rows.length ? rows.map(itemCard).join('') : '<div class="empty">Nothing here yet.</div>';
}
function savedHTML() {
  var n = { JHA: 0, JSA: 0, PERMIT: 0 };
  store.forEach(function (r) { n[r.kind]++; });
  var F = [['ALL', 'All (' + store.length + ')'], ['JHA', 'JHA (' + n.JHA + ')'], ['JSA', 'JSA (' + n.JSA + ')'], ['PERMIT', 'Permits (' + n.PERMIT + ')']];
  return '<div class="card"><input type="text" id="q" placeholder="Search number, site, task…" value="' + esc(fq) + '"><div class="filters">' +
    F.map(function (x) { return '<button data-act="filter" data-f="' + x[0] + '" class="' + (fKind === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') +
    '</div></div><div id="list">' + listHTML() + '</div>' +
    '<div class="bar"><button class="btn ghost" data-act="csv">⬇ Export CSV</button><button class="btn ghost" data-act="json">⬇ Export JSON</button></div>';
}
function settingsHTML() {
  return '<div class="card"><h3>Your details</h3><p class="note">Your name is used to pre-fill forms. Company name, logo and brand colour come from the Settings tab and appear on printed documents.</p><div class="grid">' +
    '<label class="f"><span class="fl">Your name</span><input type="text" data-set="name" value="' + esc(settings.name) + '"></label></div></div>' +
    '<div class="card"><h3>Backup & restore</h3><p class="note">Records live only on this device. Export a JSON backup regularly, and import it to move records to another phone or computer.</p>' +
    '<div class="bar"><button class="btn ghost" data-act="json">⬇ Export backup (JSON)</button><button class="btn ghost" data-act="csv">⬇ Export list (CSV)</button><button class="btn ghost" data-act="import">⬆ Import backup</button></div>' +
    '<input type="file" id="imp" accept="application/json,.json" style="display:none"></div>' +
    '<div class="card"><h3>Danger zone</h3><button class="btn bad" data-act="wipe">🗑 Delete all JHA / JSA / permit records</button></div>';
}

/* =====================================================================
   Router
   ===================================================================== */
function curPath() { var h = location.hash || ''; return h.indexOf('#pf/') === 0 ? h.slice(4) : 'new'; }
function go(p) { location.hash = 'pf/' + p; }
function goReplace(p) { location.replace('#pf/' + p); }
function render() {
  var parts = curPath().split('/'), p = parts[0], arg = parts[1];
  cur = null;
  root.querySelectorAll('.sub button').forEach(function (bt) {
    var r = bt.dataset.r;
    bt.classList.toggle('on', r === p || (p === 'form' && r === 'new') || (p === 'view' && r === 'saved') || (p === '' && r === 'new'));
  });
  var m = $('#main');
  if (p === 'saved') m.innerHTML = savedHTML();
  else if (p === 'settings') m.innerHTML = settingsHTML();
  else if (p === 'form') {
    var r = getRec(arg);
    if (!r) { goReplace('saved'); return; }
    if (r.status !== 'draft') { goReplace('view/' + r.id); return; }
    cur = r; m.innerHTML = formHTML(r);
  } else if (p === 'view') {
    var v = getRec(arg);
    if (!v) { goReplace('saved'); return; }
    if (v.status === 'draft') { goReplace('form/' + v.id); return; }
    m.innerHTML = viewHTML(v);
  } else m.innerHTML = homeHTML();
  if (isActive()) window.scrollTo(0, 0);
}

/* =====================================================================
   Events
   ===================================================================== */
function findRow(rk, r) { return cur && cur.data[rk] ? cur.data[rk][+r] : null; }

function onInput(e) {
  var t = e.target;
  if (t.matches && t.matches('#q')) { fq = t.value; $('#list').innerHTML = listHTML(); return; }
  if (t.dataset.set) { settings[t.dataset.set] = t.value; lsSet(LS_SET, settings); return; }
  if (!cur) return;
  if (t.dataset.k !== undefined) {
    cur.data[t.dataset.k] = t.value; touch(cur);
  } else if (t.dataset.rk !== undefined) {
    var row = findRow(t.dataset.rk, t.dataset.r);
    if (!row) return;
    row[t.dataset.c] = t.value; touch(cur);
    var f = fieldByKey(cur, t.dataset.rk);
    if (f && (f.risk || f.gas)) {
      var line = $('[data-rl="' + f.k + '"][data-r="' + t.dataset.r + '"]');
      if (line) line.innerHTML = rowLine(f, row);
      var sum = $('[data-sum="' + f.k + '"]');
      if (sum) sum.innerHTML = summaryLine(f, cur);
    }
  }
}
function onChange(e) {
  var t = e.target;
  if (t.dataset.set) return;
  if (!cur) return;
  if (t.dataset.ck !== undefined) {
    var arr = cur.data[t.dataset.ck] || (cur.data[t.dataset.ck] = []);
    var i = arr.indexOf(t.dataset.v);
    if (t.checked && i < 0) arr.push(t.dataset.v);
    if (!t.checked && i >= 0) arr.splice(i, 1);
    touch(cur);
  } else if (t.dataset.yk !== undefined) {
    var a = cur.data[t.dataset.yk] || (cur.data[t.dataset.yk] = []);
    a[+t.dataset.yi] = t.dataset.v; touch(cur);
  } else if (t.tagName === 'SELECT' || t.type === 'datetime-local' || t.type === 'date' || t.type === 'time') {
    onInput(e);
  }
}

function download(name, mime, text) {
  var blob = new Blob([text], { type: mime });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function csvCell(v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function exportCSV() {
  var head = ['Type', 'Number', 'Status', 'Site', 'Title / description', 'By', 'Created', 'Valid from', 'Valid until'];
  var lines = [head.join(',')];
  store.forEach(function (r) {
    lines.push([schemaOf(r).name, r.no, STATUS_LABEL[effStatus(r)], r.data.site, titleOf(r), whoOf(r), new Date(r.created).toISOString(), r.data.vfrom || '', r.kind === 'PERMIT' ? validTo(r) : ''].map(csvCell).join(','));
  });
  download('safesite-records-' + todayISO() + '.csv', 'text/csv;charset=utf-8', '\ufeff' + lines.join('\n'));
}
function exportJSON() {
  download('safesite-backup-' + todayISO() + '.json', 'application/json', JSON.stringify({ app: 'safesite-forms', version: 1, records: store }, null, 1));
}
function importJSON(file) {
  var rd = new FileReader();
  rd.onload = function () {
    try {
      var j = JSON.parse(rd.result), arr = Array.isArray(j) ? j : j.records;
      if (!Array.isArray(arr)) throw new Error('bad');
      var added = 0;
      arr.forEach(function (r) {
        if (!r || !r.id || !r.kind || !r.data) return;
        if (r.kind !== 'JHA' && r.kind !== 'JSA' && !(r.kind === 'PERMIT' && PERMITS[r.type])) return;
        if (store.some(function (x) { return x.id === r.id; })) return;
        store.push(r); added++;
      });
      flush(); toast(added + ' record(s) imported');
    } catch (err) { toast('That file is not a valid backup'); }
  };
  rd.readAsText(file);
}

function closeoutModal(rec) {
  var items = CLOSE_BASE.concat(PERMITS[rec.type].close);
  modal('<h3>Close-out permit</h3><p class="note">Confirm the work is finished and the area is safe.</p>' +
    items.map(function (t, i) { return '<label class="chk"><input type="checkbox" data-ci="' + i + '"><span>' + esc(t) + '</span></label>'; }).join('') +
    '<label class="f"><span class="fl">Comments</span><textarea id="co_c" rows="2"></textarea></label>' +
    '<label class="f"><span class="fl">Closed by (name) *</span><input type="text" id="co_n" value="' + esc(settings.name) + '"></label>' +
    '<div class="f"><span class="fl">Signature *</span><canvas class="pad" id="pad"></canvas></div>' +
    '<div class="btns"><button class="btn ghost" data-m="clear">Clear</button><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Close permit</button></div>');
  var pd = mountPad($('#pad'));
  $('#modal [data-m="clear"]').onclick = function () { pd.clear(); };
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = function () {
    var boxes = root.querySelectorAll('#modal [data-ci]');
    var all = Array.prototype.every.call(boxes, function (b) { return b.checked; });
    if (!all) { toast('Tick every close-out item'); return; }
    var by = $('#co_n').value.trim();
    if (!by) { toast('Enter your name'); return; }
    if (pd.blank()) { toast('Please sign'); return; }
    rec.closeout = { items: items, comments: $('#co_c').value.trim(), by: by, sign: pd.data(), at: new Date().toISOString() };
    rec.status = 'closed'; rec.updated = Date.now(); flush(); closeModal(); toast('Permit closed'); render();
  };
}
function extendModal(rec) {
  var def = localISO(new Date(new Date(validTo(rec)).getTime() + 4 * 3600e3));
  modal('<h3>Extend permit</h3>' +
    '<label class="f"><span class="fl">New end time *</span><input type="datetime-local" id="ex_t" value="' + esc(def) + '"></label>' +
    '<label class="f"><span class="fl">Reason *</span><textarea id="ex_r" rows="2"></textarea></label>' +
    '<label class="f"><span class="fl">Approved by (name) *</span><input type="text" id="ex_n" value="' + esc(settings.name) + '"></label>' +
    '<div class="f"><span class="fl">Signature *</span><canvas class="pad" id="pad"></canvas></div>' +
    '<div class="btns"><button class="btn ghost" data-m="clear">Clear</button><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Extend</button></div>');
  var pd = mountPad($('#pad'));
  $('#modal [data-m="clear"]').onclick = function () { pd.clear(); };
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = function () {
    var to = $('#ex_t').value, why = $('#ex_r').value.trim(), by = $('#ex_n').value.trim();
    if (!to || new Date(to) <= new Date()) { toast('New end time must be in the future'); return; }
    if (!why || !by) { toast('Enter the reason and your name'); return; }
    if (pd.blank()) { toast('Please sign'); return; }
    (rec.extensions = rec.extensions || []).push({ to: to, reason: why, by: by, sign: pd.data(), at: new Date().toISOString() });
    rec.updated = Date.now(); flush(); closeModal(); toast('Permit extended'); render();
  };
}

function onClick(e) {
  var b = e.target.closest('[data-act]');
  if (!b) return;
  var act = b.dataset.act;
  switch (act) {
    case 'new': {
      var rec = blank(b.dataset.kind, b.dataset.type);
      pending[rec.id] = rec;
      go('form/' + rec.id);
      break;
    }
    case 'open': {
      var r = getRec(b.dataset.id);
      if (r) go((r.status === 'draft' ? 'form/' : 'view/') + r.id);
      break;
    }
    case 'filter': fKind = b.dataset.f; $('#main').innerHTML = savedHTML(); break;
    case 'saveexit': flush(); go('saved'); break;
    case 'nav': go(b.dataset.r); break;
    case 'finalize': finalize(); break;
    case 'addrow': {
      if (!cur) break;
      (cur.data[b.dataset.rk] = cur.data[b.dataset.rk] || []).push({}); touch(cur); rerenderForm();
      break;
    }
    case 'delrow': {
      if (!cur) break;
      var arr = cur.data[b.dataset.rk], f = fieldByKey(cur, b.dataset.rk);
      if (arr.length <= (f.min || 0)) arr[+b.dataset.r] = {}; else arr.splice(+b.dataset.r, 1);
      touch(cur); rerenderForm();
      break;
    }
    case 'sign': {
      if (!cur) break;
      var sk = b.dataset.sk, rk = b.dataset.rk, ri = b.dataset.r, c = b.dataset.c;
      signModal(function (img) {
        var now = new Date().toISOString();
        if (sk) { cur.data[sk] = img; cur.data[sk + '_at'] = now; }
        else { var row = findRow(rk, ri); if (row) { row[c] = img; row[c + '_at'] = now; } }
        touch(cur); rerenderForm();
      });
      break;
    }
    case 'print': { var pr = currentView(); if (pr) printDoc(pr); break; }
    case 'closeout': { var cr = currentView(); if (cr) closeoutModal(cr); break; }
    case 'extend': { var er = currentView(); if (er) extendModal(er); break; }
    case 'cancelpermit': {
      var xr = currentView();
      if (!xr) break;
      var why = prompt('Reason for cancelling this permit?');
      if (why && why.trim()) { xr.status = 'cancelled'; xr.cancel = { reason: why.trim(), at: new Date().toISOString() }; xr.updated = Date.now(); flush(); toast('Permit cancelled'); render(); }
      break;
    }
    case 'dup': {
      var sr = currentView();
      if (!sr) break;
      var n = cloneRec(sr); pending[n.id] = n; toast('Copy created — review and sign again'); go('form/' + n.id);
      break;
    }
    case 'delete': {
      var dr = currentView();
      if (dr && confirm('Delete ' + dr.no + '? This cannot be undone.')) {
        store.splice(store.indexOf(dr), 1); flush(); toast('Deleted'); go('saved');
      }
      break;
    }
    case 'csv': exportCSV(); break;
    case 'json': exportJSON(); break;
    case 'import': $('#imp').click(); break;
    case 'wipe':
      if (confirm('Delete ALL JHA, JSA and permit records on this device?') && confirm('Really delete everything? This cannot be undone.')) {
        store = []; flush(); toast('All records deleted'); render();
      }
      break;
  }
}
function currentView() {
  var parts = curPath().split('/');
  return parts[0] === 'view' ? getRec(parts[1]) : null;
}
root.addEventListener('input', onInput);
root.addEventListener('change', function (e) {
  if (e.target.id === 'imp') { if (e.target.files[0]) importJSON(e.target.files[0]); e.target.value = ''; return; }
  onChange(e);
});
root.addEventListener('click', onClick);

/* =====================================================================
   Fit into the SafeSite app (tab, branding, printing)
   ===================================================================== */
var tabBtn = document.querySelector('.tab[data-view="forms"]');
var section = document.getElementById('view-forms');
function isActive() { return !!section && section.classList.contains('active'); }
function activateTab() {
  document.querySelectorAll('.tab').forEach(function (t) {
    var on = t === tabBtn;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', String(on));
  });
  document.querySelectorAll('.view').forEach(function (v) { v.classList.toggle('active', v === section); });
}
var tabBar = document.querySelector('.tab-bar');
if (tabBar) {
  tabBar.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('.tab') : null;
    if (!t) return;
    // Wait until the app's own tab code has finished, then make sure our view is in the right state
    setTimeout(function () {
      if (t === tabBtn) {
        activateTab();
        history.replaceState(null, '', location.pathname + location.search + '#pf/new');
        render();
        window.scrollTo(0, 0);
      } else {
        if (section) section.classList.remove('active');
        if ((location.hash || '').indexOf('#pf/') === 0) history.replaceState(null, '', location.pathname + location.search);
      }
    }, 0);
  });
}
window.addEventListener('hashchange', function () {
  if ((location.hash || '').indexOf('#pf/') === 0) { activateTab(); render(); }
});
document.addEventListener('visibilitychange', function () {
  if (!document.hidden && isActive() && curPath() === 'new') render();
});

function brandName() { var n = document.getElementById('brand-name'); return n ? n.textContent.trim() : 'SafeSite'; }
function brandCompany() { var n = brandName(); return n === 'SafeSite' ? '' : n; }
function brandLogo() {
  var i = document.getElementById('brand-logo-img');
  var src = i && !i.hidden ? (i.getAttribute('src') || '') : '';
  return /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/.test(src) ? src : '';
}
function brandHTML() {
  var l = brandLogo();
  return '<div class="co">' + (l ? '<img class="logo" src="' + l + '" alt=""> ' : '') + esc(brandName()) + '</div>';
}
function syncBrand() {
  var m = document.getElementById('meta-theme');
  var c = m && m.getAttribute('content');
  if (c && /^#[0-9a-f]{3,8}$/i.test(c)) host.style.setProperty('--brand', c);
}
var metaTheme = document.getElementById('meta-theme');
if (metaTheme && window.MutationObserver) new MutationObserver(syncBrand).observe(metaTheme, { attributes: true, attributeFilter: ['content'] });
syncBrand();

// Printing: show the document in a hidden layer, hide the rest of the page while printing
var printStyle = document.createElement('style');
printStyle.textContent = '#pf-print{display:none}@page{margin:12mm}@media print{body.pf-printing>*:not(#pf-print){display:none!important}body.pf-printing #pf-print{display:block!important}}';
document.head.appendChild(printStyle);
function printDoc(rec) {
  var ph = document.getElementById('pf-print');
  if (!ph) { ph = document.createElement('div'); ph.id = 'pf-print'; document.body.appendChild(ph); ph.attachShadow({ mode: 'open' }); }
  var c = host.style.getPropertyValue('--brand');
  if (c) ph.style.setProperty('--brand', c);
  ph.shadowRoot.innerHTML = '<style>' + PRINT_BASE + DOC_CSS + '</style>' + docHTML(rec);
  document.body.classList.add('pf-printing');
  var done = function () { document.body.classList.remove('pf-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(function () { window.print(); }, 60);
}

if ((location.hash || '').indexOf('#pf/') === 0) activateTab();
render();

})();
