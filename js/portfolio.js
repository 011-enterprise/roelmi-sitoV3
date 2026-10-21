/* ==========================================================================
   Portfolio — carosello con un prodotto alla volta
   - I nomi in alto sono schede (tablist): clic, frecce ← →, Home, Fine
   - Frecce sotto il testo: prodotto precedente / successivo (in giro)
   - Su touch: swipe orizzontale
   - Niente scorrimento automatico
   I prodotti nascosti sono visibility: hidden (fuori da Tab e screen reader).
   ========================================================================== */

(function () {
  'use strict';

  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var tablist = carousel.querySelector('.pf-tabs');
  var tabs = Array.prototype.slice.call(carousel.querySelectorAll('.pf-tab'));
  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.pf-slide'));
  var stage = carousel.querySelector('.pf-stage');
  var N = Math.min(tabs.length, slides.length);
  if (!N) return;

  var current = 0;

  // Ruoli ARIA: solo con JS (senza JS i prodotti sono semplici articoli)
  tablist.setAttribute('role', 'tablist');
  tabs.forEach(function (tab, i) {
    tab.setAttribute('role', 'tab');
    slides[i].setAttribute('role', 'tabpanel');
    slides[i].setAttribute('aria-labelledby', tab.id);
  });

  function go(i, focusTab) {
    current = (i + N) % N;
    for (var k = 0; k < N; k++) {
      var on = k === current;
      tabs[k].setAttribute('aria-selected', on ? 'true' : 'false');
      tabs[k].tabIndex = on ? 0 : -1;
      slides[k].classList.toggle('is-active', on);
      if (on) slides[k].removeAttribute('inert');
      else slides[k].setAttribute('inert', '');
    }
    // La scheda attiva resta visibile se i nomi scorrono (telefono)
    var t = tabs[current];
    var l = t.offsetLeft - tablist.offsetLeft;
    if (l < tablist.scrollLeft || l + t.offsetWidth > tablist.scrollLeft + tablist.clientWidth) {
      tablist.scrollLeft = l;
    }
    if (focusTab) t.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { go(i); });
  });

  tablist.addEventListener('keydown', function (e) {
    var next = null;
    if (e.key === 'ArrowRight') next = current + 1;
    else if (e.key === 'ArrowLeft') next = current - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = N - 1;
    if (next === null) return;
    e.preventDefault();
    go(next, true);
  });

  Array.prototype.forEach.call(carousel.querySelectorAll('.pf-arrow'), function (btn) {
    btn.addEventListener('click', function () {
      go(current + (parseInt(btn.getAttribute('data-dir'), 10) || 1));
    });
  });

  // Swipe: solo dito/penna; lo scroll verticale resta al browser (touch-action: pan-y)
  var startX = null, startY = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') return;
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener('pointerup', function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', function () { startX = null; });

  go(0);
})();
