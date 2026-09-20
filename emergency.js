/* =====================================================================
   SafeSite — Emergency Plan module
   Plugs into the "🧯 Emergency Plan" tab of index.html. Self-contained:
   its own styles, storage (safesite.emergency.v1) and printing.
   Reading and printing are open to everyone; editing needs a passcode.
   ===================================================================== */
(function () {
'use strict';
var host = document.getElementById('emergency-root');
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
var EP_CSS = `
.ep1{font-size:15px}
.ep1 a{color:inherit;text-decoration:none}
.eph{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;border-bottom:3px solid var(--blue);padding-bottom:8px;margin-bottom:10px}
.eph .co{font-size:13px;color:var(--mut)}
.eph h2{margin:2px 0;font-size:24px;color:var(--blue)}
.sitel{color:var(--mut);font-size:14px}
.revb{text-align:right;font-size:13px;color:var(--mut);white-space:nowrap}
.numbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.num{flex:1 1 130px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#c62828;color:#fff;border-radius:14px;padding:10px 8px;text-align:center}
.num .ns{font-size:12.5px;opacity:.95}
.num .nn{font-size:22px;font-weight:800;letter-spacing:.02em}
.num.none{background:#fff3e0;color:#8a4b00;font-size:14px;border:1px solid #f2b56b}
.sec1{font-weight:800;color:var(--blue);margin:12px 0 6px;font-size:15px;border-bottom:1px solid var(--line);padding-bottom:2px}
.emgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px}
.cols2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:0 16px}
.box{border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:#fbfcff;margin-bottom:8px;break-inside:avoid}
.tx{white-space:pre-line;font-size:.93em;margin-top:3px;word-break:break-word}
.loc{font-size:.88em;color:var(--mut)}
table.t.sm{font-size:.92em}
.kv{display:grid;grid-template-columns:105px 1fr;gap:3px 10px;margin:0}
.kv dt{color:var(--mut);font-size:.85em}
.kv dd{margin:0;white-space:pre-line;word-break:break-word}
.miss{color:#c62828}
.blank{display:inline-block;min-width:70px;border-bottom:1px solid #999;height:1em}
.epf{margin-top:10px;font-size:.88em;color:var(--mut);border-top:1px solid var(--line);padding-top:6px}
.callbox{background:#fff8e1;border-color:#f1d98a}
/* print pages */
.print .p1wrap{overflow:hidden}
.print .p1{transform-origin:0 0}
.print .ep1.pr{font-size:10.5px;line-height:1.28}
.print .ep1.pr .eph h2{font-size:18px}
.print .ep1.pr .num{background:#fff;color:#111;border:2px solid #c62828;padding:5px}
.print .ep1.pr .num .nn{font-size:16px}
.print .emgrid{grid-template-columns:1fr 1fr}
.print .cols2{grid-template-columns:1fr 1fr}
.print .ep1.pr .kv{grid-template-columns:82px 1fr}
.print .ep1.pr .box{padding:5px 7px;margin-bottom:5px}
.print .ep1.pr .sec1{margin:7px 0 4px}
.pgb{break-before:page;padding-top:2px}
.ph{display:flex;justify-content:space-between;align-items:center;gap:10px;border-bottom:2px solid var(--blue);padding-bottom:6px;margin-bottom:10px;font-size:13px}
.ph .co{color:var(--mut)}
h4.ph4{margin:14px 0 4px;color:var(--blue);font-size:14px}
.signoff{margin-top:26px;display:grid;gap:20px;font-size:13px}
/* map */
.mapw{position:relative;line-height:0;user-select:none;-webkit-user-select:none;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}
.mapw img{width:100%;height:auto;display:block;pointer-events:none}
.mapw svg.routes{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.mapw .mk{position:absolute;transform:translate(-50%,-50%);font-size:24px;line-height:1;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;pointer-events:none}
.mapw.editing{touch-action:none;cursor:crosshair}
.mapw.editing .mk{pointer-events:auto}
.legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:8px;font-size:13px}
.lg{white-space:nowrap}
.sw{display:inline-block;width:22px;height:6px;border-radius:3px;vertical-align:middle}
`;
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
#toast.on{opacity:1}

.sub button.lockbtn{margin-left:auto}
.ban{background:#fff8e1;border:1px solid #f1d98a;border-radius:16px;padding:12px 14px;margin-bottom:12px;font-size:15px}
.ban.warn{background:#fff3e0;border-color:#f2b56b}
.meter{height:10px;background:#e6ebf3;border-radius:999px;overflow:hidden;margin:6px 0}
.meter i{display:block;height:100%;background:var(--ok)}
ul.miss{margin:6px 0 0;padding-left:20px}
ul.miss li{color:#8a4b00}
.tools{display:flex;flex-wrap:wrap;gap:6px}
.tl{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font:inherit;font-size:22px;padding:6px 8px;border:1px solid #c9d1e0;border-radius:12px;background:#fff;min-width:66px;cursor:pointer}
.tl small{font-size:10.5px;color:var(--mut);text-align:center;line-height:1.15}
.tl.on{border-color:var(--brand);background:#eaf1fd;box-shadow:0 0 0 2px var(--brand) inset}
.sigimg{height:56px;margin-top:6px}
.planc{padding:16px}
.tw{overflow-x:auto}
.dochead h2{font-size:20px}
`;
var PRINT_BASE = `:host{display:block;--blue:var(--brand,#0d47a1);--mut:#5b6577;--line:#dfe4ee;--ok:#2e7d32;--bad:#c62828;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#111827;font-size:14px;line-height:1.4}*{box-sizing:border-box}`;

var root = host.attachShadow({ mode: 'open' });
root.innerHTML = '<style>' + APP_CSS + DOC_CSS + EP_CSS + '</style>' +
  '<div class="pf">' +
    '<div class="sub">' +
      '<button type="button" data-act="nav" data-r="plan">🚨 Plan</button>' +
      '<button type="button" data-act="nav" data-r="map">🗺️ Map</button>' +
      '<button type="button" data-act="nav" data-r="drills">🧯 Drills</button>' +
      '<button type="button" data-act="nav" data-r="docs">📎 Docs</button>' +
      '<button type="button" data-act="nav" data-r="options">⚙️ Options</button>' +
      '<button type="button" class="lockbtn" data-act="lock">🔒 Locked</button>' +
    '</div>' +
    '<div id="main"></div>' +
  '</div><div id="modal"></div><div id="toast"></div>';

/* =====================================================================
   Helpers
   ===================================================================== */
var $ = function (s, r) { return (r || root).querySelector(s); };
var esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};
var pad2 = function (n) { return String(n).padStart(2, '0'); };
var todayISO = function () { var d = new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); };
var fmtTs = function (ts) { return ts ? new Date(ts).toLocaleDateString([], { dateStyle: 'medium' }) : ''; };
var fmtTsT = function (ts) { return ts ? new Date(ts).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : ''; };
var fmtD = function (s) {
  if (!s) return '';
  var p = String(s).split('-');
  if (p.length !== 3) return String(s);
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  return isNaN(d) ? String(s) : d.toLocaleDateString([], { dateStyle: 'medium' });
};
var dateToTs = function (s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12).getTime(); };
var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
var safeImg = function (s) { return (typeof s === 'string' && /^data:image\/(png|jpeg);base64,[A-Za-z0-9+\/=]+$/.test(s)) ? s : ''; };
var telHref = function (n) { return 'tel:' + String(n || '').replace(/[^0-9+*#]/g, ''); };
var toastT = null;
function toast(msg) {
  var t = $('#toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(function () { t.classList.remove('on'); }, 2800);
}
function lsGet(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('⚠ Could not save — storage is full or blocked'); return false; } }
function getPath(o, path) { return path.split('.').reduce(function (a, k) { return a == null ? '' : a[k]; }, o); }
function setPath(o, path, val) {
  var ks = path.split('.'), last = ks.pop();
  var t = ks.reduce(function (a, k) { return a[k]; }, o);
  t[last] = val;
}

/* ---- SHA-256 (for the edit passcode) ---- */
function sha256(str) {
  var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  var b = Array.from(new TextEncoder().encode(str)), l = b.length * 8;
  b.push(0x80);
  while (b.length % 64 !== 56) b.push(0);
  b.push(0, 0, 0, 0, (l >>> 24) & 255, (l >>> 16) & 255, (l >>> 8) & 255, l & 255);
  var rr = function (n, x) { return (x >>> n) | (x << (32 - n)); };
  for (var o = 0; o < b.length; o += 64) {
    var w = new Array(64), i;
    for (i = 0; i < 16; i++) w[i] = (b[o + 4 * i] << 24) | (b[o + 4 * i + 1] << 16) | (b[o + 4 * i + 2] << 8) | b[o + 4 * i + 3];
    for (i = 16; i < 64; i++) {
      var s0 = rr(7, w[i - 15]) ^ rr(18, w[i - 15]) ^ (w[i - 15] >>> 3), s1 = rr(17, w[i - 2]) ^ rr(19, w[i - 2]) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    for (i = 0; i < 64; i++) {
      var S1 = rr(6, e) ^ rr(11, e) ^ rr(25, e), ch = (e & f) ^ (~e & g), t1 = (h + S1 + ch + K[i] + w[i]) | 0;
      var S0 = rr(2, a) ^ rr(13, a) ^ rr(22, a), mj = (a & bb) ^ (a & c) ^ (bb & c), t2 = (S0 + mj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
    }
    H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
  }
  return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
}
var DEFAULT_PIN_HASH = 'dabca0ddca558a5d62f1aa57ae06fb6973ca47b3c5c0df8d1919ca3a479367ae';
function pinHash(code) { return sha256('safesite-ep:' + code); }
function currentPinHash() { return lsGet(PIN_KEY, '') || DEFAULT_PIN_HASH; }

/* =====================================================================
   Branding (taken from the app's own Settings tab)
   ===================================================================== */
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

/* =====================================================================
   The plan (default template + storage)
   ===================================================================== */
var KEY = 'safesite.emergency.v1', PIN_KEY = 'safesite.emergency.pin.v1';

var TEMPLATES = {
  shock: { icon: '⚡', name: 'Electric shock', steps: '1) Do NOT touch the person until the power is off.\n2) Switch off at the isolator / main breaker, or push them clear with dry wood or plastic.\n3) Call the ambulance.\n4) If not breathing, start CPR.\n5) Treat burns with cool running water; keep the person warm and still.' },
  gas: { icon: '💨', name: 'Gas leak', steps: '1) No flames, no switches, no phones near the leak.\n2) Warn everyone and evacuate upwind.\n3) Close the gas valve only if it is safe to reach.\n4) Call Civil Defense from a safe distance.\n5) Nobody re-enters until it is declared safe.' },
  weather: { icon: '⛈️', name: 'Severe weather', steps: '1) Stop outdoor work, work at height and lifting.\n2) Move people indoors, away from windows and loose objects.\n3) Secure loose materials and equipment.\n4) Do a head-count. Wait for the all-clear from the Coordinator.' },
  collapse: { icon: '🏚️', name: 'Structural collapse', steps: '1) Evacuate the area at once; keep people away from the structure.\n2) Call Civil Defense and the ambulance.\n3) Do not enter to search — leave rescue to trained responders.\n4) Give responders the head-count and last known locations of missing people.' },
  security: { icon: '🛡️', name: 'Security threat', steps: '1) Do not confront. Move to a safe place away from the threat.\n2) Call the Police when it is safe.\n3) Tell the Coordinator; lock down / evacuate as directed.\n4) Note descriptions, times and direction of travel.' }
};
var TEMPLATE_LABELS = { shock: '⚡ Electric shock', gas: '💨 Gas leak', weather: '⛈️ Severe weather', collapse: '🏚️ Collapse', security: '🛡️ Security' };

function defaultPlan() {
  return {
    rev: 0, updatedAt: 0, reviewedAt: 0,
    site: { name: brandCompany(), address: '', headcount: '', owner: '' },
    emerg: [
      { icon: '🔥', name: 'Fire', steps: '1) Shout FIRE and sound the alarm.\n2) Call Civil Defense.\n3) Evacuate everyone to the assembly point. Do not use lifts.\n4) Use an extinguisher only if the fire is small, you are trained and you have an exit behind you.\n5) Switch off power / gas only if it is safe.\n6) Nobody goes back in until Civil Defense says so.' },
      { icon: '🚑', name: 'Medical emergency', steps: '1) Call the ambulance. Send someone to meet it at the gate.\n2) Send for the first aider.\n3) Do not move the person unless they are in danger.\n4) Press firmly on bleeding. If not breathing, start CPR (use an AED if available).\n5) Stay with them and note what happened and when.' },
      { icon: '🧪', name: 'Spill / leak', steps: '1) Stop work and warn others; keep people away and upwind.\n2) Stop the source only if it is safe.\n3) Check the label / SDS and wear the right PPE.\n4) Contain with absorbent or the spill kit; keep it out of drains.\n5) Call Civil Defense for large spills, fumes or fire risk.\n6) Report and record it.' },
      { icon: '🧗', name: 'Fall / person down', steps: '1) Do not move the person unless they are in danger (spine injury risk).\n2) Call the ambulance and keep the area clear.\n3) If hanging in a harness, rescue immediately using the rescue plan — suspension can be fatal within minutes.\n4) Give first aid, keep them warm and still.\n5) Note the time of the fall and stop the job.' }
    ],
    people: [
      { role: 'Emergency Coordinator (in charge)', name: '', phone: '', phone2: '' },
      { role: 'Deputy Coordinator', name: '', phone: '', phone2: '' },
      { role: 'Fire warden / evacuation marshal', name: '', phone: '', phone2: '' },
      { role: 'First aider', name: '', phone: '', phone2: '' },
      { role: 'First aider (2)', name: '', phone: '', phone2: '' },
      { role: 'Shutdown officer (power & solar)', name: '', phone: '', phone2: '' },
      { role: 'Spill response lead', name: '', phone: '', phone2: '' }
    ],
    evac: {
      alarm: 'Continuous siren / whistle, or shout "EVACUATE".',
      route1: '', route2: '', assembly: '', assembly2: '',
      rollcall: 'The marshal counts everyone at the assembly point against the attendance and visitor sheet, and reports missing people to the Coordinator. Nobody goes back in to look.',
      assist: 'Give a buddy to anyone who needs help. Visitors and contractors are escorted by their host.'
    },
    shutdown: [
      { system: 'Main electrical power', location: '', steps: 'Switch off the main breaker / isolator. Only if it is safe and you are authorised. Do not touch wet or damaged equipment.' },
      { system: 'Solar PV (AC & DC)', location: '', steps: '1) Switch off the inverter AC breaker.\n2) Turn the inverter DC isolator to OFF, then any array / combiner DC isolators.\n3) If batteries are fitted, switch off the battery breaker.\nWARNING: solar panels and DC cables stay live in daylight. Never touch, cut or spray water on PV cables or damaged panels. Tell Civil Defense there is solar on site.' },
      { system: 'Machines & equipment', location: '', steps: 'Press the nearest emergency stop, then turn off at the local isolator and remove the key. Close fuel / gas valves only if safe. Do not restart until the Coordinator clears it.' }
    ],
    help: [
      { service: 'Civil Defense (fire & rescue)', number: '', notes: '' },
      { service: 'Ambulance', number: '', notes: '' },
      { service: 'Police', number: '', notes: '' },
      { service: 'Nearest hospital / clinic', number: '', notes: '' },
      { service: 'Electricity / utility emergency', number: '', notes: '' }
    ],
    script: 'Say: 1) What has happened (fire / injury / spill / fall).\n2) Where: site name, address and a landmark.\n3) How many people are hurt and how badly.\n4) Your name and call-back number.\nStay on the line. Send someone to the gate to guide responders in.',
    docs: [
      { title: 'Site map & evacuation routes (in this plan)', where: 'This app · printed copy at the gate / office', owner: '', updated: '' },
      { title: 'Fire extinguisher & alarm inspection records', where: '', owner: '', updated: '' },
      { title: 'First-aid kit & AED checks', where: '', owner: '', updated: '' },
      { title: 'Safety data sheets (SDS)', where: '', owner: '', updated: '' },
      { title: 'Permit register (JHA / JSA / permits)', where: 'This app · JHA & Permits tab', owner: '', updated: '' },
      { title: 'Training & first-aider certificates', where: '', owner: '', updated: '' },
      { title: 'Solar / electrical diagram & shutdown procedure', where: '', owner: '', updated: '' },
      { title: 'Insurance & authority approvals', where: '', owner: '', updated: '' }
    ],
    map: { img: '', markers: [], routes: [] },
    drills: [],
    log: [],
    settings: { drillMonths: 6 }
  };
}
function loadPlan() {
  var d = defaultPlan(), s = lsGet(KEY, null);
  if (!s || typeof s !== 'object') return d;
  ['site', 'evac', 'map', 'settings'].forEach(function (k) { s[k] = Object.assign({}, d[k], s[k] || {}); });
  ['emerg', 'people', 'shutdown', 'help', 'docs', 'drills', 'log'].forEach(function (k) { if (!Array.isArray(s[k])) s[k] = d[k]; });
  if (typeof s.script !== 'string') s.script = d.script;
  s.map.markers = Array.isArray(s.map.markers) ? s.map.markers : [];
  s.map.routes = Array.isArray(s.map.routes) ? s.map.routes : [];
  return Object.assign(d, s);
}
var plan = loadPlan();
function savePlan() { return lsSet(KEY, plan); }

/* ---- access lock (edit passcode) ---- */
var unlockUntil = 0, failCount = 0, lockedOutUntil = 0;
function isUnlocked() { return Date.now() < unlockUntil; }
function refreshUnlock() { unlockUntil = Date.now() + 10 * 60 * 1000; }
function lockNow() { unlockUntil = 0; }
function pinModal(cb) {
  modal('<h3>🔒 Enter passcode to edit</h3><p class="note">Anyone can read and print the plan. A passcode is needed to change it or log a drill.</p>' +
    '<label class="f"><span class="fl">Passcode</span><input type="password" inputmode="numeric" autocomplete="off" id="pin" maxlength="20"></label>' +
    '<div id="pinmsg" class="note" style="color:var(--bad);min-height:18px"></div>' +
    '<div class="btns"><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Unlock</button></div>');
  var inp = $('#pin');
  setTimeout(function () { try { inp.focus(); } catch (e) { /* ignore */ } }, 50);
  var go = function () {
    if (Date.now() < lockedOutUntil) { $('#pinmsg').textContent = 'Too many tries. Wait ' + Math.ceil((lockedOutUntil - Date.now()) / 1000) + ' s.'; return; }
    if (pinHash(inp.value.trim()) === currentPinHash()) { failCount = 0; refreshUnlock(); closeModal(); updateLockBtn(); cb(); }
    else {
      failCount++;
      if (failCount >= 5) { lockedOutUntil = Date.now() + 30000; failCount = 0; $('#pinmsg').textContent = 'Too many tries. Wait 30 seconds.'; }
      else $('#pinmsg').textContent = 'Wrong passcode.';
      inp.value = ''; inp.focus();
    }
  };
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = go;
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
}
function needUnlock(cb) { if (isUnlocked()) { refreshUnlock(); cb(); } else pinModal(cb); }
function updateLockBtn() {
  var b = $('[data-act="lock"]');
  if (b) { b.textContent = isUnlocked() ? '🔓 Editing on' : '🔒 Locked'; b.classList.toggle('on', isUnlocked()); }
}

/* ---- modal + signature pad ---- */
function modal(html) { var m = $('#modal'); m.innerHTML = '<div class="sheet">' + html + '</div>'; m.classList.add('on'); return m; }
function closeModal() { var m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; }
$('#modal').addEventListener('click', function (e) { if (e.target.id === 'modal') closeModal(); });
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
  return { clear: function () { ctx.clearRect(0, 0, w, h); dirty = false; }, blank: function () { return !dirty; }, data: function () { return cv.toDataURL('image/png'); } };
}

/* =====================================================================
   Status, completeness, banners
   ===================================================================== */
function lastDrill() {
  var d = plan.drills.slice().sort(function (a, b) { return dateToTs(b.date) - dateToTs(a.date); });
  return d[0] || null;
}
function monthsSince(ts) { return (Date.now() - ts) / (30.44 * 86400000); }
function completeness() {
  var p = plan, has = function (v) { return String(v || '').trim() !== ''; };
  var person = function (re) { return p.people.some(function (x) { return re.test(x.role) && has(x.name) && has(x.phone); }); };
  var num = function (re) { return p.help.some(function (x) { return re.test(x.service) && has(x.number); }); };
  var sh = function (re) { return p.shutdown.some(function (x) { return re.test(x.system) && has(x.location); }); };
  var ld = lastDrill();
  return [
    ['Site name and address', has(p.site.name) && has(p.site.address)],
    ['Emergency Coordinator name + phone', person(/coordinator/i)],
    ['Fire warden name + phone', person(/fire warden|marshal/i)],
    ['First aider name + phone', person(/first aider/i)],
    ['Primary evacuation route', has(p.evac.route1)],
    ['Assembly point', has(p.evac.assembly)],
    ['Main power shut-off location', sh(/main.*power|electrical/i)],
    ['Solar DC isolator location', sh(/solar/i)],
    ['Machine shut-off location', sh(/machine/i)],
    ['Civil Defense number', num(/civil defen[cs]e/i)],
    ['Ambulance number', num(/ambulance/i)],
    ['Site map uploaded', !!safeImg(p.map.img)],
    ['A drill in the last ' + p.settings.drillMonths + ' months', !!ld && monthsSince(dateToTs(ld.date)) <= p.settings.drillMonths]
  ];
}
function needsReview() {
  var ld = lastDrill();
  if (!ld) return null;
  var t = dateToTs(ld.date);
  return (!plan.reviewedAt || plan.reviewedAt < (ld.savedAt || t)) ? ld : null;
}
function bannerHTML() {
  var h = '', ld = lastDrill(), nr = needsReview();
  if (nr) h += '<div class="ban warn"><b>⚠ Update the plan after the drill on ' + esc(fmtD(nr.date)) + '.</b><br>Change anything the drill showed, or confirm that no changes are needed.<div class="bar" style="margin:10px 0 0"><button class="btn sm" data-act="edit">✏️ Update plan</button><button class="btn ghost sm" data-act="nochange">✔ No changes needed</button></div></div>';
  if (!ld) h += '<div class="ban">🧯 No drill recorded yet. Hold a drill and log it under <b>Drills</b>.</div>';
  else if (monthsSince(dateToTs(ld.date)) > plan.settings.drillMonths) h += '<div class="ban warn">⏰ Drill overdue — the last one was ' + esc(fmtD(ld.date)) + '. Plan a new drill (every ' + plan.settings.drillMonths + ' months).</div>';
  return h;
}

/* =====================================================================
   The one-page plan (screen + print)
   ===================================================================== */
function tx(s) { return '<div class="tx">' + esc(s) + '</div>'; }
function miss(s, printMode) { return String(s || '').trim() ? esc(s) : '<span class="' + (printMode ? 'blank' : 'miss') + '">' + (printMode ? '' : '—') + '</span>'; }
function onePage(printMode) {
  var p = plan, h = '<div class="ep1' + (printMode ? ' pr' : '') + '">';
  h += '<div class="eph"><div>' + brandHTML() + '<h2>🚨 Emergency Plan</h2><div class="sitel">' + esc(p.site.name || 'Site name not set') + (p.site.address ? ' · ' + esc(p.site.address) : '') + '</div></div>' +
    '<div class="revb"><b>Rev ' + p.rev + '</b><br>' + (p.updatedAt ? esc(fmtTs(p.updatedAt)) : 'not saved yet') + (p.site.owner ? '<br>Owner: ' + esc(p.site.owner) : '') + '</div></div>';

  // numbers strip
  var nums = p.help.filter(function (x) { return String(x.number || '').trim(); }).slice(0, 4);
  h += '<div class="numbar">';
  if (nums.length) h += nums.map(function (x) {
    var inner = '<span class="ns">' + esc(x.service) + '</span><span class="nn">' + esc(x.number) + '</span>';
    return printMode ? '<div class="num">' + inner + '</div>' : '<a class="num" href="' + telHref(x.number) + '">' + inner + '</a>';
  }).join('');
  else h += '<div class="num none">⚠ No emergency numbers yet — add them under “How to call help”.</div>';
  h += '</div>';

  h += '<div class="sec1">1 · Types of emergency</div><div class="emgrid">' + p.emerg.map(function (e) {
    return '<div class="box"><b>' + esc(e.icon) + ' ' + esc(e.name) + '</b>' + tx(e.steps) + '</div>';
  }).join('') + '</div>';

  h += '<div class="cols2"><div><div class="sec1">2 · Who is in charge</div><table class="t sm"><tr><th>Role</th><th>Name</th><th>Phone</th></tr>' + p.people.map(function (x) {
    var ph = [x.phone, x.phone2].filter(function (v) { return String(v || '').trim(); });
    var phones = ph.length ? ph.map(function (v) { return printMode ? esc(v) : '<a href="' + telHref(v) + '">' + esc(v) + '</a>'; }).join('<br>') : miss('', printMode);
    return '<tr><td>' + esc(x.role) + '</td><td>' + miss(x.name, printMode) + '</td><td>' + phones + '</td></tr>';
  }).join('') + '</table></div>' +
    '<div><div class="sec1">3 · How to evacuate</div><dl class="kv">' +
    '<dt>Alarm</dt><dd>' + miss(p.evac.alarm, printMode) + '</dd>' +
    '<dt>Primary route</dt><dd>' + miss(p.evac.route1, printMode) + '</dd>' +
    '<dt>Alternate route</dt><dd>' + miss(p.evac.route2, printMode) + '</dd>' +
    '<dt>Assembly point</dt><dd><b>' + miss(p.evac.assembly, printMode) + '</b></dd>' +
    '<dt>Backup assembly</dt><dd>' + miss(p.evac.assembly2, printMode) + '</dd>' +
    '<dt>Roll call</dt><dd>' + miss(p.evac.rollcall, printMode) + '</dd>' +
    '<dt>People needing help</dt><dd>' + miss(p.evac.assist, printMode) + '</dd></dl></div></div>';

  h += '<div class="cols2"><div><div class="sec1">4 · How to shut down</div>' + p.shutdown.map(function (s) {
    return '<div class="box"><b>' + esc(s.system) + '</b> <span class="loc">Location: ' + miss(s.location, printMode) + '</span>' + tx(s.steps) + '</div>';
  }).join('') + '</div>' +
    '<div><div class="sec1">5 · How to call help</div><table class="t sm"><tr><th>Service</th><th>Number</th></tr>' + p.help.map(function (x) {
      var n = String(x.number || '').trim();
      return '<tr><td>' + esc(x.service) + (x.notes ? '<br><small>' + esc(x.notes) + '</small>' : '') + '</td><td>' + (n ? (printMode ? '<b>' + esc(n) + '</b>' : '<a href="' + telHref(n) + '"><b>' + esc(n) + '</b></a>') : miss('', printMode)) + '</td></tr>';
    }).join('') + '</table><div class="box callbox"><b>📞 What to say</b>' + tx(p.script) + (p.site.address ? '<div class="tx"><b>Our address:</b> ' + esc(p.site.address) + '</div>' : '') + '</div></div></div>';

  var ld = lastDrill();
  h += '<div class="epf">Last drill: ' + (ld ? esc(fmtD(ld.date)) + ' (' + esc(ld.type) + ')' : 'none recorded') + ' · Plan reviewed: ' + (plan.reviewedAt ? esc(fmtTs(plan.reviewedAt)) : 'never') + ' · <b>Update this plan after every drill.</b></div>';
  return h + '</div>';
}

/* ---- site map ---- */
var MARKERS = [
  ['exit', '🚪', 'Exit'], ['assembly', '📍', 'Assembly point'], ['ext', '🧯', 'Fire extinguisher'], ['aid', '➕', 'First-aid kit'],
  ['power', '⚡', 'Main power switch'], ['solar', '☀️', 'Solar DC isolator'], ['estop', '🛑', 'Machine E-stop'],
  ['spill', '🧪', 'Spill kit'], ['alarm', '🔔', 'Alarm / call point'], ['eye', '🚿', 'Eyewash / shower']
];
var MK = {}; MARKERS.forEach(function (m) { MK[m[0]] = m; });
function mapFig(m, editing) {
  var img = safeImg(m.img);
  if (!img) return '<div class="empty">No site map yet. Add a photo, screenshot or drawing of the site layout.</div>';
  var h = '<div class="mapw' + (editing ? ' editing' : '') + '" id="mapw"><img src="' + img + '" alt="Site map" draggable="false">';
  h += '<svg class="routes" viewBox="0 0 100 100" preserveAspectRatio="none">' + m.routes.map(function (r) {
    return '<polyline points="' + r.pts.map(function (q) { return (q[0] * 100).toFixed(2) + ',' + (q[1] * 100).toFixed(2); }).join(' ') + '" fill="none" stroke="' + (r.k === 'alt' ? '#ef6c00' : '#2e7d32') + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
  }).join('') + '</svg>';
  h += m.markers.map(function (k, i) {
    var d = MK[k.t]; if (!d) return '';
    return '<span class="mk" data-mi="' + i + '" style="left:' + (k.x * 100).toFixed(2) + '%;top:' + (k.y * 100).toFixed(2) + '%">' + d[1] + '</span>';
  }).join('');
  return h + '</div>';
}
function legendHTML(m) {
  var used = {}; m.markers.forEach(function (k) { used[k.t] = 1; });
  var items = MARKERS.filter(function (d) { return used[d[0]]; }).map(function (d) { return '<span class="lg">' + d[1] + ' ' + d[2] + '</span>'; });
  if (m.routes.some(function (r) { return r.k !== 'alt'; })) items.push('<span class="lg"><i class="sw" style="background:#2e7d32"></i> Primary route</span>');
  if (m.routes.some(function (r) { return r.k === 'alt'; })) items.push('<span class="lg"><i class="sw" style="background:#ef6c00"></i> Alternate route</span>');
  return items.length ? '<div class="legend">' + items.join('') + '</div>' : '';
}

/* ---- documentation page pieces ---- */
function docsTable() {
  return '<table class="t"><tr><th>Document</th><th>Where it is kept</th><th>Owner</th><th>Updated</th></tr>' + plan.docs.map(function (d) {
    return '<tr><td>' + esc(d.title) + '</td><td>' + esc(d.where || '—') + '</td><td>' + esc(d.owner || '—') + '</td><td>' + esc(d.updated ? fmtD(d.updated) : '—') + '</td></tr>';
  }).join('') + '</table>';
}
function revTable() {
  if (!plan.log.length) return '<div class="note">No revisions saved yet.</div>';
  return '<table class="t"><tr><th>Rev</th><th>Date</th><th>By</th><th>What changed</th></tr>' + plan.log.slice(0, 15).map(function (l) {
    return '<tr><td class="c">' + l.rev + (l.review ? ' <small>(review)</small>' : '') + '</td><td>' + esc(fmtTs(l.at)) + '</td><td>' + esc(l.by || '—') + '</td><td>' + esc(l.note || '—') + '</td></tr>';
  }).join('') + '</table>';
}
function drillTable(limit) {
  var ds = plan.drills.slice().sort(function (a, b) { return dateToTs(b.date) - dateToTs(a.date); }).slice(0, limit || 12);
  if (!ds.length) return '<div class="note">No drills recorded yet.</div>';
  return '<table class="t"><tr><th>Date</th><th>Drill</th><th>People</th><th>Time</th><th>Problems found</th><th>Plan changes</th><th>Led by</th></tr>' + ds.map(function (d) {
    return '<tr><td>' + esc(fmtD(d.date)) + '</td><td>' + esc(d.type) + '</td><td class="c">' + esc(d.people || '—') + '</td><td>' + esc(d.time || '—') + '</td><td>' + esc(d.problems || '—') + '</td><td>' + esc(d.actions || '—') + '</td><td>' + esc(d.by || '—') + '</td></tr>';
  }).join('') + '</table>';
}
function packHTML(onlyFirst) {
  var head = function (t) { return '<div class="ph">' + brandHTML() + '<b>' + t + '</b> — ' + esc(plan.site.name || '') + ' · Rev ' + plan.rev + '</div>'; };
  if (onlyFirst) return '<div class="print"><div class="p1wrap"><div class="p1">' + onePage(true) + '</div></div></div>';
  return '<div class="print"><div class="p1wrap"><div class="p1">' + onePage(true) + '</div></div>' +
    '<div class="pgb">' + head('Site map & evacuation routes') + mapFig(plan.map, false) + legendHTML(plan.map) + (plan.map.img ? '' : '') + '</div>' +
    '<div class="pgb">' + head('Documentation') + '<h4 class="ph4">Supporting documents</h4>' + docsTable() + '<h4 class="ph4">Drill log</h4>' + drillTable(12) + '<h4 class="ph4">Revision history</h4>' + revTable() +
    '<div class="signoff"><div>Approved by: ____________________________</div><div>Signature: ____________________________</div><div>Date: ______________</div></div></div></div>';
}

/* ---- printing (fits the plan on one page) ---- */
var printHostStyle = document.getElementById('ep-print-style');
if (!printHostStyle) {
  printHostStyle = document.createElement('style');
  printHostStyle.id = 'ep-print-style';
  printHostStyle.textContent = '#ep-print{display:none}@page{margin:12mm}@media print{body.ep-printing{background:#fff!important}body.ep-printing>*:not(#ep-print){display:none!important}body.ep-printing #ep-print{display:block!important}}';
  document.head.appendChild(printHostStyle);
}
function printHost() {
  var ph = document.getElementById('ep-print');
  if (!ph) { ph = document.createElement('div'); ph.id = 'ep-print'; document.body.appendChild(ph); ph.attachShadow({ mode: 'open' }); }
  var c = host.style.getPropertyValue('--brand');
  if (c) ph.style.setProperty('--brand', c);
  return ph;
}
var MAX_P1_H = 940; // px — fits A4 and US Letter with 12 mm margins
function fitPage(ph) {
  ph.style.cssText = 'display:block;position:absolute;left:-10000px;top:0;width:186mm;visibility:hidden';
  var wrap = ph.shadowRoot.querySelector('.p1wrap'), p1 = ph.shadowRoot.querySelector('.p1');
  var s = 1, h = 0;
  for (var i = 0; i < 30; i++) {
    p1.style.transform = s < 1 ? 'scale(' + s + ')' : '';
    p1.style.width = s < 1 ? (100 / s) + '%' : '';
    h = p1.getBoundingClientRect().height;
    if (h <= MAX_P1_H || s <= 0.4) break;
    s = Math.round((s - 0.03) * 100) / 100;
  }
  wrap.style.height = Math.ceil(h) + 'px';
  ph.style.cssText = '';
  return s;
}
function buildPrint(onlyFirst) {
  var ph = printHost();
  ph.shadowRoot.innerHTML = '<style>' + PRINT_BASE + DOC_CSS + EP_CSS + '</style>' + packHTML(onlyFirst);
  return { ph: ph, scale: fitPage(ph) };
}
function printPack() {
  buildPrint();
  document.body.classList.add('ep-printing');
  var done = function () { document.body.classList.remove('ep-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(function () { window.print(); }, 80);
}
var lastScale = null;
function scaleNote() {
  try { lastScale = buildPrint(true).scale; } catch (e) { return ''; }
  var pct = Math.round(lastScale * 100);
  return lastScale >= 0.99 ? '📄 Prints on one page.' : (lastScale >= 0.7 ? '📄 Prints on one page (shrunk to ' + pct + '%).' : '⚠ Too much text for one page — it would print at ' + pct + '%. Shorten some sections.');
}

/* =====================================================================
   Screens
   ===================================================================== */
var screenNames = ['plan', 'map', 'drills', 'docs', 'options'];
var draft = null, mapDraft = null, drillDraft = null, tool = 'marker:exit';

function planScreen() {
  var comp = completeness(), ok = comp.filter(function (c) { return c[1]; }).length;
  var miss1 = comp.filter(function (c) { return !c[1]; });
  var h = bannerHTML();
  h += '<div class="bar noprint"><button class="btn ok" data-act="print">🖨 Print / PDF (plan + map + documents)</button><button class="btn ghost" data-act="edit">✏️ Edit plan</button></div>';
  h += '<div class="card planc">' + onePage(false) + '</div>';
  h += '<div class="card"><h3>Plan completeness: ' + ok + ' of ' + comp.length + '</h3><div class="meter"><i style="width:' + Math.round(ok / comp.length * 100) + '%"></i></div>' +
    (miss1.length ? '<p class="note">Still missing:</p><ul class="miss">' + miss1.map(function (c) { return '<li>' + esc(c[0]) + '</li>'; }).join('') + '</ul>' : '<p class="note">Everything key is filled in. ✔</p>') +
    '<p class="note" id="scalenote"></p></div>';
  return h;
}
function mapScreen() {
  var h = bannerHTML();
  h += '<div class="bar noprint"><button class="btn ghost" data-act="mapedit">✏️ ' + (plan.map.img ? 'Edit map' : 'Add site map') + '</button></div>';
  h += '<div class="card">' + mapFig(plan.map, false) + legendHTML(plan.map) + '</div>';
  return h;
}
function drillsScreen() {
  var ds = plan.drills.slice().sort(function (a, b) { return dateToTs(b.date) - dateToTs(a.date); });
  var h = bannerHTML() + '<div class="bar"><button class="btn ok" data-act="newdrill">🧯 Log a drill</button></div>';
  if (!ds.length) return h + '<div class="empty">No drills logged yet.</div>';
  h += ds.map(function (d, i) {
    var idx = plan.drills.indexOf(d);
    return '<div class="card"><h3>' + esc(d.type) + ' · ' + esc(fmtD(d.date)) + '</h3>' +
      '<dl class="kv"><dt>People</dt><dd>' + esc(d.people || '—') + '</dd><dt>Evacuation time</dt><dd>' + esc(d.time || '—') + '</dd><dt>Head-count matched</dt><dd>' + esc(d.headcountOk || '—') + '</dd>' +
      '<dt>Scenario</dt><dd>' + esc(d.scenario || '—') + '</dd><dt>What went well</dt><dd>' + esc(d.well || '—') + '</dd><dt>Problems found</dt><dd>' + esc(d.problems || '—') + '</dd><dt>Changes to the plan</dt><dd>' + esc(d.actions || '—') + '</dd><dt>Led by</dt><dd>' + esc(d.by || '—') + '</dd></dl>' +
      (safeImg(d.sign) ? '<img class="sigimg" src="' + safeImg(d.sign) + '" alt="signature">' : '') +
      '<div class="bar" style="margin:8px 0 0"><button class="btn bad sm" data-act="deldrill" data-i="' + idx + '">🗑 Delete</button></div></div>';
  }).join('');
  return h;
}
function docsScreen() {
  return bannerHTML() + '<div class="bar"><button class="btn ghost" data-act="edit">✏️ Edit documents &amp; plan</button></div>' +
    '<div class="card"><h3>Supporting documents</h3><div class="tw">' + docsTable() + '</div></div>' +
    '<div class="card"><h3>Revision history</h3><div class="tw">' + revTable() + '</div></div>';
}
function optionsScreen() {
  return '<div class="card"><h3>Access</h3><p class="note">Reading and printing is open to everyone. Editing the plan and logging drills needs the passcode. This is a convenience lock for this device — it stops accidental changes but is not strong security.</p>' +
    '<div class="bar"><button class="btn ghost" data-act="changepin">🔑 Change passcode</button><button class="btn ghost" data-act="lock">🔒 Lock now</button></div></div>' +
    '<div class="card"><h3>Drill reminder</h3><label class="f"><span class="fl">Hold a drill every</span><select data-opt="drillMonths">' +
    [3, 6, 12].map(function (m) { return '<option value="' + m + '"' + (plan.settings.drillMonths === m ? ' selected' : '') + '>' + m + ' months</option>'; }).join('') + '</select></label></div>' +
    '<div class="card"><h3>Share the plan with other phones</h3><p class="note">The plan is stored on each device. Export it and send the file (for example by WhatsApp) to everyone who should have it; they import it here. The passcode is not included in the file.</p>' +
    '<div class="bar"><button class="btn ghost" data-act="export">⬇ Export plan (JSON)</button><button class="btn ghost" data-act="import">⬆ Import plan</button></div><input type="file" id="imp" accept="application/json,.json" style="display:none"></div>' +
    '<div class="card"><h3>Danger zone</h3><button class="btn bad" data-act="reset">🗑 Reset to the blank template</button></div>';
}

/* ---- plan editor ---- */
function fld(path, label, o) {
  o = o || {};
  var v = getPath(draft, path);
  var el = o.area ? '<textarea data-p="' + path + '" rows="' + (o.rows || 3) + '" placeholder="' + esc(o.ph || '') + '">' + esc(v) + '</textarea>'
    : '<input type="' + (o.type || 'text') + '" data-p="' + path + '" value="' + esc(v) + '" placeholder="' + esc(o.ph || '') + '"' + (o.type === 'tel' ? ' inputmode="tel"' : '') + '>';
  return '<label class="f' + (o.full || o.area ? ' full' : '') + '"><span class="fl">' + esc(label) + '</span>' + el + '</label>';
}
function rowCard(arr, i, title, inner) {
  return '<div class="rowc"><div class="rowh"><b>' + esc(title) + '</b><button type="button" class="x" data-act="delrow" data-arr="' + arr + '" data-i="' + i + '" aria-label="Remove">✕</button></div><div class="grid">' + inner + '</div></div>';
}
function addBtn(arr, label) { return '<button type="button" class="btn ghost" data-act="addrow" data-arr="' + arr + '">＋ ' + esc(label) + '</button>'; }
function editScreen() {
  var d = draft, h = '<div class="dochead"><div><h2>✏️ Edit emergency plan</h2><small>Revision ' + d.rev + ' → ' + (d.rev + 1) + ' when saved</small></div></div><p class="note">Fill in the blanks. Keep each section short so the plan stays on one page.</p>';
  h += '<section class="card"><h3>Site</h3><div class="grid">' + fld('site.name', 'Site / company name') + fld('site.address', 'Address, landmark or GPS (for responders)') + fld('site.headcount', 'Usual number of people on site') + fld('site.owner', 'Plan owner (name)') + '</div></section>';
  h += '<section class="card"><h3>1 · Types of emergency</h3><p class="note">What everyone must do. Number the steps.</p>' +
    d.emerg.map(function (e, i) { return rowCard('emerg', i, (e.icon || '') + ' ' + (e.name || 'Emergency'), fld('emerg.' + i + '.icon', 'Icon (emoji)') + fld('emerg.' + i + '.name', 'Name') + fld('emerg.' + i + '.steps', 'What to do', { area: true, rows: 6 })); }).join('') +
    addBtn('emerg', 'Add another emergency') + '<div class="chips" style="margin-top:10px">' + Object.keys(TEMPLATES).map(function (k) { return '<button type="button" class="btn ghost sm" data-act="qadd" data-k="' + k + '">' + TEMPLATE_LABELS[k] + '</button>'; }).join('') + '</div></section>';
  h += '<section class="card"><h3>2 · Who is in charge</h3>' +
    d.people.map(function (x, i) { return rowCard('people', i, x.role || 'Role', fld('people.' + i + '.role', 'Role') + fld('people.' + i + '.name', 'Name') + fld('people.' + i + '.phone', 'Phone', { type: 'tel' }) + fld('people.' + i + '.phone2', 'Second phone', { type: 'tel' })); }).join('') + addBtn('people', 'Add person / role') + '</section>';
  h += '<section class="card"><h3>3 · How to evacuate</h3><div class="grid">' + fld('evac.alarm', 'Alarm signal', { area: true, rows: 2 }) + fld('evac.route1', 'Primary route (from work areas to the assembly point)', { area: true }) + fld('evac.route2', 'Alternate route', { area: true }) +
    fld('evac.assembly', 'Assembly point') + fld('evac.assembly2', 'Backup assembly point') + fld('evac.rollcall', 'Roll call', { area: true }) + fld('evac.assist', 'People who need help / visitors', { area: true }) + '</div></section>';
  h += '<section class="card"><h3>4 · How to shut down</h3><p class="note">Follow the installer’s shutdown procedure for solar and batteries. Say exactly where each switch is.</p>' +
    d.shutdown.map(function (s, i) { return rowCard('shutdown', i, s.system || 'System', fld('shutdown.' + i + '.system', 'System') + fld('shutdown.' + i + '.location', 'Where is the switch / isolator?') + fld('shutdown.' + i + '.steps', 'Steps', { area: true, rows: 5 })); }).join('') + addBtn('shutdown', 'Add system') + '</section>';
  h += '<section class="card"><h3>5 · How to call help</h3><p class="note">Enter the emergency numbers used in your country.</p>' +
    d.help.map(function (x, i) { return rowCard('help', i, x.service || 'Service', fld('help.' + i + '.service', 'Service') + fld('help.' + i + '.number', 'Number', { type: 'tel' }) + fld('help.' + i + '.notes', 'Notes (address, hours…)')); }).join('') + addBtn('help', 'Add number') +
    '<div class="grid" style="margin-top:12px">' + fld('script', 'What to say when calling', { area: true, rows: 5 }) + '</div></section>';
  h += '<section class="card"><h3>Documentation</h3><p class="note">Where each supporting document is kept.</p>' +
    d.docs.map(function (x, i) { return rowCard('docs', i, x.title || 'Document', fld('docs.' + i + '.title', 'Document') + fld('docs.' + i + '.where', 'Where it is kept') + fld('docs.' + i + '.owner', 'Owner') + fld('docs.' + i + '.updated', 'Last updated', { type: 'date' })); }).join('') + addBtn('docs', 'Add document') + '</section>';
  h += '<div class="bar"><button class="btn ghost" data-act="canceledit">Cancel</button><button class="btn ok" data-act="saveplan">💾 Save plan</button></div>';
  return h;
}
function askSave(reasonDefault, apply) {
  modal('<h3>Save changes</h3><label class="f"><span class="fl">Updated by (name) *</span><input type="text" id="sv_by" value="' + esc(plan.site.owner || '') + '"></label>' +
    '<label class="f"><span class="fl">What changed?</span><input type="text" id="sv_note" value="' + esc(reasonDefault || '') + '" placeholder="e.g. New assembly point after drill"></label>' +
    '<div class="btns"><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Save</button></div>');
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = function () {
    var by = $('#sv_by').value.trim();
    if (!by) { toast('Enter your name'); return; }
    var note = $('#sv_note').value.trim();
    closeModal();
    apply(by, note);
  };
}
function markReviewed(by, note) {
  plan.reviewedAt = Date.now();
  plan.log.unshift({ rev: plan.rev, at: Date.now(), by: by, note: note, review: true });
  plan.log = plan.log.slice(0, 40);
  savePlan();
}
function commit(by, note) {
  plan.rev = (plan.rev || 0) + 1; plan.updatedAt = Date.now(); plan.reviewedAt = Date.now();
  plan.log.unshift({ rev: plan.rev, at: Date.now(), by: by, note: note });
  plan.log = plan.log.slice(0, 40);
  savePlan();
}

/* ---- map editor ---- */
function mapEditScreen() {
  var m = mapDraft;
  var h = '<div class="dochead"><div><h2>🗺️ Site map</h2><small>Tap the map to place symbols, or draw routes.</small></div></div>';
  h += '<div class="card"><label class="btn ghost" style="display:block;text-align:center;cursor:pointer">' + (m.img ? '📷 Replace map image' : '📷 Choose map image') + '<input type="file" id="mapfile" accept="image/*" style="display:none"></label>' +
    '<p class="note">Use a photo of a hand-drawn plan, a floor plan, or a satellite screenshot.</p></div>';
  if (m.img) {
    h += '<div class="card"><div class="tools">' + MARKERS.map(function (d) { return '<button type="button" class="tl' + (tool === 'marker:' + d[0] ? ' on' : '') + '" data-act="tool" data-t="marker:' + d[0] + '" title="' + d[2] + '">' + d[1] + '<small>' + d[2] + '</small></button>'; }).join('') +
      '<button type="button" class="tl' + (tool === 'route:main' ? ' on' : '') + '" data-act="tool" data-t="route:main"><i class="sw" style="background:#2e7d32"></i><small>Draw primary route</small></button>' +
      '<button type="button" class="tl' + (tool === 'route:alt' ? ' on' : '') + '" data-act="tool" data-t="route:alt"><i class="sw" style="background:#ef6c00"></i><small>Draw alternate route</small></button>' +
      '<button type="button" class="tl' + (tool === 'erase' ? ' on' : '') + '" data-act="tool" data-t="erase">🧽<small>Erase a symbol</small></button></div>' +
      '<div class="bar" style="margin:8px 0"><button class="btn ghost sm" data-act="undomap">↶ Undo last</button><button class="btn ghost sm" data-act="clearroutes">Clear routes</button></div>' +
      mapFig(m, true) + legendHTML(m) + '</div>';
  }
  h += '<div class="bar"><button class="btn ghost" data-act="canceledit">Cancel</button><button class="btn ok" data-act="savemap">💾 Save map</button></div>';
  return h;
}
function loadImageFile(file, cb) {
  var fr = new FileReader();
  fr.onload = function () {
    var im = new Image();
    im.onload = function () {
      var sc = Math.min(1, 1600 / Math.max(im.width, im.height));
      var c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(im.width * sc)); c.height = Math.max(1, Math.round(im.height * sc));
      var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
      cb(c.toDataURL('image/jpeg', 0.82));
    };
    im.onerror = function () { toast('That image could not be read'); };
    im.src = fr.result;
  };
  fr.readAsDataURL(file);
}
var mapPtr = null, mapActs = [];
function mapPointer(type, e) {
  if (!mapDraft || !e.target.closest) return;
  var w = e.target.closest('#mapw');
  if (!w || !w.classList.contains('editing')) return;
  var r = w.getBoundingClientRect();
  var x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  if (tool.indexOf('route:') === 0) {
    if (type === 'down') { mapPtr = { k: tool === 'route:alt' ? 'alt' : 'main', pts: [[x, y]] }; mapDraft.routes.push(mapPtr); try { w.setPointerCapture(e.pointerId); } catch (z) { /* ignore */ } e.preventDefault(); }
    else if (type === 'move' && mapPtr) {
      var lp = mapPtr.pts[mapPtr.pts.length - 1];
      if (Math.abs(lp[0] - x) + Math.abs(lp[1] - y) > 0.008) { mapPtr.pts.push([x, y]); refreshMapFig(); }
      e.preventDefault();
    } else if (type === 'up' && mapPtr) {
      if (mapPtr.pts.length < 2) mapDraft.routes.pop(); else mapActs.push('r');
      mapPtr = null; refreshMapFig();
    }
  } else if (tool === 'erase') {
    if (type === 'down') { var mk = e.target.closest('.mk'); if (mk) { mapDraft.markers.splice(+mk.dataset.mi, 1); refreshMapFig(); } }
  } else if (tool.indexOf('marker:') === 0 && type === 'down') {
    mapDraft.markers.push({ t: tool.slice(7), x: x, y: y }); mapActs.push('m');
    refreshMapFig();
  }
}
function refreshMapFig() {
  var w = $('#mapw'); if (!w) return;
  var tmp = document.createElement('div'); tmp.innerHTML = mapFig(mapDraft, true);
  var nw = tmp.firstChild;
  w.querySelector('svg.routes').outerHTML = nw.querySelector('svg.routes').outerHTML;
  w.querySelectorAll('.mk').forEach(function (n) { n.remove(); });
  nw.querySelectorAll('.mk').forEach(function (n) { w.appendChild(n); });
}

/* ---- drill form ---- */
var DRILL_TYPES = ['Fire evacuation', 'Medical response', 'Spill response', 'Fall rescue', 'Power / solar shutdown', 'Full emergency', 'Other'];
function newDrillDraft() { return { date: todayISO(), type: DRILL_TYPES[0], scenario: '', people: '', time: '', headcountOk: '', well: '', problems: '', actions: '', by: plan.site.owner || '', sign: '' }; }
function dfld(k, label, o) {
  o = o || {}; var v = drillDraft[k];
  var el;
  if (o.sel) el = '<select data-d="' + k + '"><option value="">Select…</option>' + o.sel.map(function (s) { return '<option' + (v === s ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join('') + '</select>';
  else if (o.area) el = '<textarea data-d="' + k + '" rows="' + (o.rows || 3) + '" placeholder="' + esc(o.ph || '') + '">' + esc(v) + '</textarea>';
  else el = '<input type="' + (o.type || 'text') + '" data-d="' + k + '" value="' + esc(v) + '" placeholder="' + esc(o.ph || '') + '"' + (o.type === 'number' ? ' inputmode="numeric"' : '') + '>';
  return '<label class="f' + (o.area ? ' full' : '') + '"><span class="fl">' + esc(label) + '</span>' + el + '</label>';
}
function drillScreen() {
  var h = '<div class="dochead"><div><h2>🧯 Log a drill</h2><small>After the drill, the plan must be reviewed and updated.</small></div></div><section class="card"><div class="grid">' +
    dfld('date', 'Date *', { type: 'date' }) + dfld('type', 'Type of drill *', { sel: DRILL_TYPES }) + dfld('people', 'People who took part', { type: 'number' }) + dfld('time', 'Time to reach the assembly point (min:sec)', { ph: 'e.g. 3:40' }) +
    dfld('headcountOk', 'Did the head-count match?', { sel: ['Yes', 'No'] }) + dfld('by', 'Led by *') +
    dfld('scenario', 'Scenario', { area: true, rows: 2, ph: 'e.g. Fire in the store room, exit A blocked' }) + dfld('well', 'What went well', { area: true, rows: 2 }) +
    dfld('problems', 'Problems found', { area: true, rows: 3 }) + dfld('actions', 'Changes to make to the plan', { area: true, rows: 3 }) + '</div>' +
    '<div class="f full" style="margin-top:10px"><span class="fl">Signature of the person who led the drill</span>' +
    (safeImg(drillDraft.sign) ? '<div class="sigbox"><img src="' + safeImg(drillDraft.sign) + '" alt=""><button class="btn ghost sm" data-act="dsign">Re-sign</button></div>' : '<button type="button" class="btn sigbtn" data-act="dsign">✍️ Tap to sign</button>') + '</div></section>' +
    '<div class="bar"><button class="btn ghost" data-act="canceledit">Cancel</button><button class="btn ok" data-act="savedrill">💾 Save drill</button></div>';
  return h;
}
function signModal(cb) {
  modal('<h3>Sign here</h3><canvas class="pad" id="pad"></canvas><div class="btns"><button class="btn ghost" data-m="clear">Clear</button><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Save</button></div>');
  var pd = mountPad($('#pad'));
  $('#modal [data-m="clear"]').onclick = function () { pd.clear(); };
  $('#modal [data-m="cancel"]').onclick = closeModal;
  $('#modal [data-m="ok"]').onclick = function () { if (pd.blank()) { toast('Please sign first'); return; } var img = pd.data(); closeModal(); cb(img); };
}

/* =====================================================================
   Router
   ===================================================================== */
function curPath() { var h = location.hash || ''; return h.indexOf('#ep/') === 0 ? h.slice(4) : 'plan'; }
function go(p) { if (location.hash === '#ep/' + p) render(); else location.hash = 'ep/' + p; }
function goReplace(p) { location.replace('#ep/' + p); }
function isActive() { return !!section && section.classList.contains('active'); }
function render() {
  var p = curPath().split('/')[0];
  if (p === 'edit' || p === 'mapedit' || p === 'drill') {
    if (!isUnlocked()) { goReplace('plan'); return; }
    if (p === 'edit' && !draft) draft = clone(plan);
    if (p === 'mapedit' && !mapDraft) mapDraft = clone(plan.map);
    if (p === 'drill' && !drillDraft) drillDraft = newDrillDraft();
  } else { draft = null; mapDraft = null; drillDraft = null; }
  root.querySelectorAll('.sub button[data-r]').forEach(function (b) {
    var r = b.dataset.r;
    b.classList.toggle('on', r === p || (p === 'edit' && r === 'plan') || (p === 'mapedit' && r === 'map') || (p === 'drill' && r === 'drills'));
  });
  var m = $('#main'), out;
  if (p === 'map') out = mapScreen();
  else if (p === 'drills') out = drillsScreen();
  else if (p === 'docs') out = docsScreen();
  else if (p === 'options') out = optionsScreen();
  else if (p === 'edit') out = editScreen();
  else if (p === 'mapedit') out = mapEditScreen();
  else if (p === 'drill') out = drillScreen();
  else out = planScreen();
  m.innerHTML = out;
  updateLockBtn();
  if (p === 'plan' || p === '' ) { var sn = $('#scalenote'); if (sn) sn.textContent = scaleNote(); }
  if (isActive()) window.scrollTo(0, 0);
}
function rerenderKeepScroll() { var y = window.scrollY; render(); window.scrollTo(0, y); }

/* =====================================================================
   Events
   ===================================================================== */
var ROW_DEFAULTS = {
  emerg: function () { return { icon: '⚠️', name: '', steps: '' }; },
  people: function () { return { role: '', name: '', phone: '', phone2: '' }; },
  shutdown: function () { return { system: '', location: '', steps: '' }; },
  help: function () { return { service: '', number: '', notes: '' }; },
  docs: function () { return { title: '', where: '', owner: '', updated: '' }; }
};
function onInput(e) {
  var t = e.target;
  if (t.dataset.p !== undefined && draft) { setPath(draft, t.dataset.p, t.value); refreshUnlock(); }
  else if (t.dataset.d !== undefined && drillDraft) { drillDraft[t.dataset.d] = t.value; refreshUnlock(); }
}
function onChange(e) {
  var t = e.target;
  if (t.id === 'imp') { if (t.files[0]) importPlan(t.files[0]); t.value = ''; return; }
  if (t.id === 'mapfile') { if (t.files[0] && mapDraft) loadImageFile(t.files[0], function (d) { mapDraft.img = d; rerenderKeepScroll(); }); t.value = ''; return; }
  if (t.dataset.opt === 'drillMonths') { var v = +t.value; render(); needUnlock(function () { plan.settings.drillMonths = v; savePlan(); toast('Saved'); render(); }); return; }
  onInput(e);
}
function download(name, mime, text) {
  var blob = new Blob([text], { type: mime }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function importPlan(file) {
  var rd = new FileReader();
  rd.onload = function () {
    try {
      var j = JSON.parse(rd.result), p = j && (j.plan || j);
      if (!p || !Array.isArray(p.emerg) || !Array.isArray(p.people) || !Array.isArray(p.help)) throw new Error('bad');
      needUnlock(function () {
        if (!confirm('Replace this device’s plan with the file (revision ' + (p.rev || 0) + ')?')) return;
        lsSet(KEY, p); plan = loadPlan(); savePlan(); toast('Plan imported'); render();
      });
    } catch (err) { toast('That file is not an emergency plan'); }
  };
  rd.readAsText(file);
}
function onClick(e) {
  var b = e.target.closest ? e.target.closest('[data-act]') : null;
  if (!b) return;
  var act = b.dataset.act;
  switch (act) {
    case 'nav': go(b.dataset.r); break;
    case 'lock': if (isUnlocked()) { lockNow(); updateLockBtn(); toast('Locked'); if (/^(edit|mapedit|drill)$/.test(curPath().split('/')[0])) go('plan'); } else pinModal(function () { toast('Unlocked'); }); break;
    case 'print': printPack(); break;
    case 'edit': needUnlock(function () { draft = clone(plan); go('edit'); }); break;
    case 'mapedit': needUnlock(function () { mapDraft = clone(plan.map); tool = 'marker:exit'; mapActs = []; go('mapedit'); }); break;
    case 'newdrill': needUnlock(function () { drillDraft = newDrillDraft(); go('drill'); }); break;
    case 'canceledit': draft = null; mapDraft = null; drillDraft = null; go(curPath().split('/')[0] === 'edit' ? 'plan' : curPath().split('/')[0] === 'mapedit' ? 'map' : 'drills'); break;
    case 'addrow': { var a = b.dataset.arr; draft[a].push(ROW_DEFAULTS[a]()); rerenderKeepScroll(); break; }
    case 'delrow': { var ar = b.dataset.arr; draft[ar].splice(+b.dataset.i, 1); rerenderKeepScroll(); break; }
    case 'qadd': { var tp = TEMPLATES[b.dataset.k]; draft.emerg.push({ icon: tp.icon, name: tp.name, steps: tp.steps }); rerenderKeepScroll(); break; }
    case 'saveplan': askSave('', function (by, note) { plan = draft; commit(by, note); draft = null; toast('Plan saved — revision ' + plan.rev); go('plan'); }); break;
    case 'nochange': needUnlock(function () { askSave('Reviewed after drill — no changes needed', function (by, note) { markReviewed(by, note); toast('Plan marked as reviewed'); render(); }); }); break;
    case 'tool': tool = b.dataset.t; refreshUnlock(); root.querySelectorAll('.tl').forEach(function (n) { n.classList.toggle('on', n.dataset.t === tool); }); break;
    case 'undomap': { var la = mapActs.pop(); if (la === 'r') mapDraft.routes.pop(); else if (la === 'm') mapDraft.markers.pop(); refreshMapFig(); break; }
    case 'clearroutes': mapDraft.routes = []; mapActs = mapActs.filter(function (x) { return x !== 'r'; }); refreshMapFig(); break;
    case 'savemap': askSave('Site map updated', function (by, note) { plan.map = mapDraft; commit(by, note); mapDraft = null; toast('Map saved'); go('map'); }); break;
    case 'dsign': signModal(function (img) { drillDraft.sign = img; rerenderKeepScroll(); }); break;
    case 'savedrill': {
      var d = drillDraft;
      if (!d.date || !d.type || !String(d.by).trim()) { toast('Fill in the date, type and who led the drill'); break; }
      d.savedAt = Date.now(); plan.drills.push(d); savePlan(); drillDraft = null;
      go('drills');
      modal('<h3>Drill saved ✔</h3><p>Now update the plan: did the drill show anything to change?</p><div class="btns" style="flex-direction:column"><button class="btn ok" data-m="upd">✏️ Update the plan now</button><button class="btn ghost" data-m="none">✔ No changes needed</button><button class="btn ghost" data-m="later">Later</button></div>');
      $('#modal [data-m="upd"]').onclick = function () { closeModal(); draft = clone(plan); go('edit'); };
      $('#modal [data-m="none"]').onclick = function () { closeModal(); askSave('Reviewed after drill on ' + fmtD(d.date) + ' — no changes needed', function (by, note) { markReviewed(by, note); toast('Plan marked as reviewed'); render(); }); };
      $('#modal [data-m="later"]').onclick = closeModal;
      break;
    }
    case 'deldrill': needUnlock(function () { if (confirm('Delete this drill record?')) { plan.drills.splice(+b.dataset.i, 1); savePlan(); render(); } }); break;
    case 'changepin': needUnlock(function () {
      modal('<h3>Change passcode</h3><label class="f"><span class="fl">New passcode (4–12 digits)</span><input type="password" inputmode="numeric" id="np1" maxlength="12"></label><label class="f"><span class="fl">Repeat it</span><input type="password" inputmode="numeric" id="np2" maxlength="12"></label>' +
        '<div class="btns"><button class="btn ghost" data-m="cancel">Cancel</button><button class="btn ok" data-m="ok">Save</button></div>');
      $('#modal [data-m="cancel"]').onclick = closeModal;
      $('#modal [data-m="ok"]').onclick = function () {
        var a1 = $('#np1').value.trim(), a2 = $('#np2').value.trim();
        if (!/^\d{4,12}$/.test(a1)) { toast('Use 4 to 12 digits'); return; }
        if (a1 !== a2) { toast('The two entries do not match'); return; }
        lsSet(PIN_KEY, pinHash(a1)); closeModal(); toast('Passcode changed on this device');
      };
    }); break;
    case 'export': download('safesite-emergency-plan-' + todayISO() + '.json', 'application/json', JSON.stringify({ app: 'safesite-emergency-plan', version: 1, plan: plan })); break;
    case 'import': $('#imp').click(); break;
    case 'reset': needUnlock(function () { if (confirm('Reset the plan, drills and history on this device to the blank template?') && confirm('Really reset? This cannot be undone.')) { plan = defaultPlan(); savePlan(); toast('Plan reset'); go('plan'); } }); break;
  }
}
root.addEventListener('click', onClick);
root.addEventListener('input', onInput);
root.addEventListener('change', onChange);
root.addEventListener('pointerdown', function (e) { mapPointer('down', e); });
root.addEventListener('pointermove', function (e) { mapPointer('move', e); });
root.addEventListener('pointerup', function (e) { mapPointer('up', e); });
root.addEventListener('pointercancel', function (e) { mapPointer('up', e); });

/* =====================================================================
   Fit into the SafeSite app (tab)
   ===================================================================== */
var tabBtn = document.querySelector('.tab[data-view="emergency"]');
var section = document.getElementById('view-emergency');
function activateTab() {
  document.querySelectorAll('.tab').forEach(function (t) { var on = t === tabBtn; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
  document.querySelectorAll('.view').forEach(function (v) { v.classList.toggle('active', v === section); });
}
var tabBar = document.querySelector('.tab-bar');
if (tabBar) {
  tabBar.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('.tab') : null;
    if (!t) return;
    setTimeout(function () {
      if (t === tabBtn) {
        activateTab();
        history.replaceState(null, '', location.pathname + location.search + '#ep/plan');
        render(); window.scrollTo(0, 0);
      } else {
        if (section) section.classList.remove('active');
        lockNow(); updateLockBtn();
        if ((location.hash || '').indexOf('#ep/') === 0) history.replaceState(null, '', location.pathname + location.search);
      }
    }, 0);
  });
}
window.addEventListener('hashchange', function () {
  if ((location.hash || '').indexOf('#ep/') === 0) { activateTab(); render(); }
});
document.addEventListener('visibilitychange', function () {
  if (document.hidden) { lockNow(); updateLockBtn(); }
  else if (isActive() && /^(plan|)$/.test(curPath().split('/')[0])) render();
});
if ((location.hash || '').indexOf('#ep/') === 0) activateTab();
render();

})();
