// SafeSite — install support (Android + desktop Chrome/Edge) and offline registration.
// Works with the app's existing "Install App" button, or adds its own if there isn't one.
(function () {
  'use strict';
  var scriptSrc = document.currentScript && document.currentScript.src;
  var deferredPrompt = null;
  var floatBtn = null;

  // ---------- Service worker (offline) ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      var swUrl = scriptSrc ? new URL('sw.js', scriptSrc).href : 'sw.js';
      navigator.serviceWorker.register(swUrl).catch(function (err) {
        console.warn('SafeSite: service worker failed', err);
      });
    });
  }

  // ---------- Helpers ----------
  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function isInstallEl(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el === floatBtn) return true;
    var idc = (el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '');
    if (/install/i.test(idc)) return true;
    var txt = (el.textContent || '').trim();
    return txt.length > 0 && txt.length < 30 && /\binstall\b/i.test(txt);
  }
  function installEls() {
    var out = [];
    var all = document.querySelectorAll('button,a,[role="button"]');
    for (var i = 0; i < all.length; i++) if (isInstallEl(all[i])) out.push(all[i]);
    return out;
  }

  // ---------- Help dialog when the browser can't prompt ----------
  function showHelp() {
    var msg = isIOS()
      ? 'On iPhone/iPad: tap the Share icon, then "Add to Home Screen".'
      : 'Open this page in Chrome or Edge (not inside WhatsApp, Facebook or another app). ' +
        'On Android: open the browser menu (⋮) and tap "Install app" or "Add to Home screen". ' +
        'On a computer: click the install icon at the right end of the address bar. ' +
        'If you don\'t see it, reload the page once and try again.';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.55);display:flex;' +
      'align-items:center;justify-content:center;padding:20px';
    var box = document.createElement('div');
    box.style.cssText = 'max-width:380px;width:100%;background:#fff;color:#111;border-radius:16px;padding:20px;' +
      'font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.4)';
    var h = document.createElement('div');
    h.textContent = 'Install SafeSite';
    h.style.cssText = 'font-weight:700;font-size:18px;margin-bottom:8px;color:#0d47a1';
    var p = document.createElement('div');
    p.textContent = msg;
    var ok = document.createElement('button');
    ok.type = 'button';
    ok.textContent = 'OK';
    ok.style.cssText = 'margin-top:16px;width:100%;padding:12px;border:0;border-radius:10px;background:#0d47a1;' +
      'color:#fff;font:600 16px system-ui,sans-serif;cursor:pointer';
    ok.onclick = function () { document.body.removeChild(wrap); };
    box.appendChild(h); box.appendChild(p); box.appendChild(ok);
    wrap.appendChild(box);
    document.body.appendChild(wrap);
  }

  function doInstall() {
    if (isStandalone()) return;
    if (deferredPrompt) {
      var p = deferredPrompt;
      deferredPrompt = null;
      p.prompt();
      p.userChoice.then(function (c) { if (c && c.outcome === 'accepted') hideInstall(); });
    } else {
      showHelp();
    }
  }

  function hideInstall() {
    installEls().forEach(function (el) { el.style.display = 'none'; });
    if (floatBtn && floatBtn.parentNode) floatBtn.parentNode.removeChild(floatBtn);
    floatBtn = null;
  }

  // Take over clicks on any install button (runs before the page's own handlers)
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('button,a,[role="button"]') : null;
    if (t && isInstallEl(t)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      doInstall();
    }
  }, true);

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    hideInstall();
  });

  // Add a floating button only if the app has no install button of its own
  function setup() {
    if (isStandalone()) { hideInstall(); return; }
    if (installEls().length) return;
    floatBtn = document.createElement('button');
    floatBtn.type = 'button';
    floatBtn.textContent = '⬇ Install app';
    floatBtn.style.cssText =
      'position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:99999;' +
      'padding:12px 18px;border:0;border-radius:999px;background:#0d47a1;color:#fff;' +
      'font:600 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
      'box-shadow:0 4px 14px rgba(0,0,0,.35);cursor:pointer';
    document.body.appendChild(floatBtn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
