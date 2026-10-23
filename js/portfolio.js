/* ==========================================================================
   Portfolio — carosello con un prodotto alla volta (struttura di SITO 1)
   - Frecce: prodotto precedente / successivo (in giro)
   - Su touch: swipe orizzontale
   - Ogni prodotto ha le sue frecce sotto "Discover …" (attive solo quelle del
     prodotto visibile) e il suo contatore 01 / 03
   - A ogni cambio una riga di stato dice "Product 2 of 3: ColorGLAM®"
   - Niente scorrimento automatico
   I prodotti nascosti sono fuori dal Tab e dagli screen reader (inert).
   ========================================================================== */

(function () {
  'use strict';

  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.pf-slide'));
  var stage = carousel.querySelector('.pf-stage');
  var status = carousel.querySelector('[data-pf-status]');
  var N = slides.length;
  if (!N) return;

  var current = 0;

  function go(i, announce) {
    current = (i + N) % N;
    slides.forEach(function (s, k) {
      var on = k === current;
      s.classList.toggle('is-active', on);
      if (on) s.removeAttribute('inert');
      else s.setAttribute('inert', '');
    });
    if (announce && status) {
      var name = slides[current].querySelector('.pf-name');
      status.textContent = 'Product ' + (current + 1) + ' of ' + N + (name ? ': ' + name.textContent.trim() : '');
    }
  }

  // Frecce: il focus passa alla stessa freccia del nuovo prodotto (quella
  // cliccata diventa inert insieme al suo prodotto)
  Array.prototype.forEach.call(carousel.querySelectorAll('.pf-arrow'), function (btn) {
    btn.addEventListener('click', function () {
      var dir = btn.getAttribute('data-dir');
      var hadFocus = document.activeElement === btn;
      go(current + (parseInt(dir, 10) || 1), true);
      if (hadFocus) {
        var twin = slides[current].querySelector('.pf-arrow[data-dir="' + dir + '"]');
        if (twin) twin.focus({ preventScroll: true });
      }
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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1), true);
  });
  stage.addEventListener('pointercancel', function () { startX = null; });

  go(0, false);
})();
