/* =====================================================================
   SafeSite — app lock
   Asks for a passcode every time the app is opened and again after it has
   been in the background for a while (you choose how long in Settings). It keeps casual users out; it is a screen
   lock for this device, not encryption of the saved data.
   Loaded in <head> so the app is hidden before anything is drawn.
   ===================================================================== */
(function () {
'use strict';

var KEY = 'safesite.app.pin.v1';        // custom passcode hash (if changed)
var AFTER_KEY = 'safesite.app.lockafter.v1'; // seconds away before locking again (0 = right away)
var DEFAULT_AFTER = 60;
var LOCK_VERSION = '2';
var DEFAULT_HASH = '904c41baeb4b4b4c06e51158e1f3b8de2b0044d4a8b1578b47d9daf160591b74';

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

function hashPin(p) { return sha256('safesite-app:' + p); }
function lsGet(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
function lockAfterSec() { var v = parseInt(lsGet(AFTER_KEY), 10); return isNaN(v) ? DEFAULT_AFTER : v; }
function currentHash() { return lsGet(KEY) || DEFAULT_HASH; }

var root = document.documentElement;
var style = document.createElement('style');
style.textContent = 'html.sf-locked body>*:not(#sf-lock){visibility:hidden!important}html.sf-locked{overflow:hidden;background:#0d47a1}';
(document.head || root).appendChild(style);

var unlocked = false;               // every fresh open starts locked
root.classList.add('sf-locked');

var failCount = 0, lockedOutUntil = 0, hiddenAt = 0;

function appBrand() {
  var n = document.getElementById('brand-name');
  var m = document.getElementById('meta-theme');
  var c = m && m.getAttribute('content');
  var img = document.getElementById('brand-logo-img');
  var src = img && !img.hidden ? (img.getAttribute('src') || '') : '';
  return {
    name: n ? n.textContent.trim() || 'SafeSite' : 'SafeSite',
    color: c && /^#[0-9a-f]{3,8}$/i.test(c) ? c : '#0d47a1',
    logo: /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/.test(src) ? src : ''
  };
}

function buildOverlay() {
  var o = document.getElementById('sf-lock');
  if (o) return o;
  o = document.createElement('div');
  o.id = 'sf-lock';
  o.setAttribute('role', 'dialog');
  o.setAttribute('aria-modal', 'true');
  o.setAttribute('aria-label', 'SafeSite is locked');
  o.style.cssText = 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;display:none;align-items:center;justify-content:center;' +
    'padding:24px;color:#fff;text-align:center;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif';
  o.innerHTML =
    '<div style="width:100%;max-width:340px">' +
      '<div id="sf-lock-icon" style="font-size:64px;line-height:1;margin-bottom:10px"></div>' +
      '<div id="sf-lock-name" style="font-size:26px;font-weight:800;margin-bottom:4px"></div>' +
      '<div style="opacity:.9;margin-bottom:22px">Enter your passcode to open the app</div>' +
      '<input id="sf-lock-pin" type="password" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="12" aria-label="Passcode" ' +
        'style="width:100%;box-sizing:border-box;font-size:28px;letter-spacing:.35em;text-align:center;padding:14px;border-radius:16px;border:0;outline:0;color:#111;background:#fff">' +
      '<div id="sf-lock-msg" style="min-height:22px;margin:10px 0;font-weight:600;color:#ffd7d7"></div>' +
      '<button id="sf-lock-go" type="button" style="width:100%;font:inherit;font-weight:700;font-size:18px;padding:14px;border:0;border-radius:16px;background:#fff;color:#0d47a1;cursor:pointer">Unlock</button>' +
    '</div>';
  document.body.appendChild(o);
  var inp = o.querySelector('#sf-lock-pin');
  o.querySelector('#sf-lock-go').addEventListener('click', tryUnlock);
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
  return o;
}

function paintOverlay() {
  var o = buildOverlay(), b = appBrand();
  o.style.background = 'linear-gradient(160deg,' + b.color + ',#04183d)';
  var icon = o.querySelector('#sf-lock-icon');
  icon.innerHTML = '';
  if (b.logo) {
    var im = document.createElement('img');
    im.src = b.logo; im.alt = ''; im.style.cssText = 'height:72px;max-width:160px;object-fit:contain;border-radius:12px';
    icon.appendChild(im);
  } else icon.textContent = '🛡️';
  o.querySelector('#sf-lock-name').textContent = b.name;
  return o;
}

function showLock() {
  if (!document.body) { document.addEventListener('DOMContentLoaded', showLock); return; }
  var o = paintOverlay();
  o.style.display = 'flex';
  o.querySelector('#sf-lock-msg').textContent = '';
  var inp = o.querySelector('#sf-lock-pin');
  inp.value = '';
  setTimeout(function () { try { inp.focus(); } catch (e) { /* ignore */ } }, 60);
}

function hideLock() {
  var o = document.getElementById('sf-lock');
  if (o) o.style.display = 'none';
  root.classList.remove('sf-locked');
}

function tryUnlock() {
  var o = document.getElementById('sf-lock');
  if (!o) return;
  var inp = o.querySelector('#sf-lock-pin'), msg = o.querySelector('#sf-lock-msg');
  if (Date.now() < lockedOutUntil) {
    msg.textContent = 'Too many tries. Wait ' + Math.ceil((lockedOutUntil - Date.now()) / 1000) + ' s.';
    return;
  }
  if (hashPin(inp.value.trim()) === currentHash()) {
    failCount = 0; unlocked = true; inp.value = ''; hideLock();
  } else {
    failCount++;
    if (failCount >= 5) { failCount = 0; lockedOutUntil = Date.now() + 30000; msg.textContent = 'Too many tries. Wait 30 seconds.'; }
    else msg.textContent = 'Wrong passcode. Try again.';
    inp.value = ''; inp.focus();
  }
}

function lockNow() {
  unlocked = false;
  root.classList.add('sf-locked');
  showLock();
}

// Lock again when the app has been away for a while
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    hiddenAt = Date.now();
    if (unlocked && lockAfterSec() === 0) lockNow();   // also hides the app in the app switcher
    return;
  }
  if (unlocked && hiddenAt && Date.now() - hiddenAt >= lockAfterSec() * 1000) lockNow();
  hiddenAt = 0;
});
// Coming back from the browser's back/forward memory counts as a fresh open
window.addEventListener('pageshow', function (e) { if (e.persisted) lockNow(); });

// ---------- "App lock" card in the Settings tab ----------
function dialog(html) {
  var d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483001;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px';
  d.innerHTML = '<div style="width:100%;max-width:360px;background:#fff;color:#111;border-radius:18px;padding:18px;font:16px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.4)">' + html + '</div>';
  document.body.appendChild(d);
  return d;
}
var FIELD = 'display:block;width:100%;box-sizing:border-box;margin:6px 0 12px;padding:12px;font-size:18px;border:1px solid #c9d1e0;border-radius:12px';
var BTN = 'flex:1;font:inherit;font-weight:700;padding:12px;border-radius:12px;cursor:pointer;';
function changePin() {
  var d = dialog('<div style="font-weight:800;font-size:18px;color:#0d47a1;margin-bottom:8px">Change passcode</div>' +
    '<label>Current passcode<input id="cp0" type="password" inputmode="numeric" maxlength="12" autocomplete="off" style="' + FIELD + '"></label>' +
    '<label>New passcode (4–12 digits)<input id="cp1" type="password" inputmode="numeric" maxlength="12" autocomplete="off" style="' + FIELD + '"></label>' +
    '<label>Repeat the new passcode<input id="cp2" type="password" inputmode="numeric" maxlength="12" autocomplete="off" style="' + FIELD + '"></label>' +
    '<div id="cpm" style="min-height:20px;color:#c62828;font-weight:600;margin-bottom:8px"></div>' +
    '<div style="display:flex;gap:10px"><button id="cpx" type="button" style="' + BTN + 'border:1px solid #0d47a1;background:#fff;color:#0d47a1">Cancel</button>' +
    '<button id="cps" type="button" style="' + BTN + 'border:0;background:#0d47a1;color:#fff">Save</button></div>');
  var q = function (s) { return d.querySelector(s); };
  q('#cpx').onclick = function () { d.remove(); };
  q('#cps').onclick = function () {
    var a = q('#cp0').value.trim(), b = q('#cp1').value.trim(), c = q('#cp2').value.trim(), m = q('#cpm');
    if (hashPin(a) !== currentHash()) { m.textContent = 'The current passcode is not right.'; return; }
    if (!/^\d{4,12}$/.test(b)) { m.textContent = 'Use 4 to 12 digits.'; return; }
    if (b !== c) { m.textContent = 'The two new passcodes do not match.'; return; }
    lsSet(KEY, hashPin(b)); d.remove();
    var n = document.getElementById('sf-lock-note'); if (n) n.textContent = 'Passcode changed on this device. Write it down somewhere safe.';
  };
  setTimeout(function () { try { q('#cp0').focus(); } catch (e) { /* ignore */ } }, 50);
}
function addSettingsCard() {
  var view = document.getElementById('view-settings');
  if (!view || document.getElementById('sf-lock-card')) return;
  var c = document.createElement('div');
  c.id = 'sf-lock-card';
  c.className = 'settings-panel';
  c.style.marginTop = '16px';
  c.innerHTML = '<h3 style="margin:0 0 6px">🔒 App lock</h3>' +
    '<p class="muted" style="margin:0 0 12px">The app asks for the passcode every time it is opened.</p>' +
    '<label style="display:block;margin:0 0 12px">Lock again after being away for' +
    '<select id="sf-lock-after" style="display:block;width:100%;margin-top:6px;padding:12px;font-size:16px;border-radius:12px;border:1px solid #c9d1e0">' +
    '<option value="0">Right away</option><option value="60">1 minute</option><option value="300">5 minutes</option><option value="900">15 minutes</option></select></label>' +
    '<button type="button" class="ghost-btn" id="sf-lock-now">🔒 Lock now</button> ' +
    '<button type="button" class="ghost-btn" id="sf-lock-change">🔑 Change passcode</button>' +
    '<p class="hint muted" id="sf-lock-note" style="margin:10px 0 0">App lock is on (version ' + LOCK_VERSION + ').</p>';
  var sel = c.querySelector('#sf-lock-after');
  sel.value = String(lockAfterSec());
  if (sel.value !== String(lockAfterSec())) sel.value = '60';
  sel.addEventListener('change', function () { lsSet(AFTER_KEY, sel.value); });
  view.appendChild(c);
  c.querySelector('#sf-lock-now').addEventListener('click', lockNow);
  c.querySelector('#sf-lock-change').addEventListener('click', changePin);
}

function ready() {
  buildOverlay();
  showLock();
  addSettingsCard();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
else ready();
})();
