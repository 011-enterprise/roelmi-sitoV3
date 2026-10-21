/* ==========================================================================
   Footer — su telefono (come SITO 1) ogni colonna si apre e chiude dal suo
   titolo. Il bottone esiste solo su telefono: da 600px in su le colonne sono
   sempre aperte e il titolo torna testo semplice.
   ========================================================================== */

(function () {
  'use strict';

  var cols = Array.prototype.slice.call(document.querySelectorAll('.site-footer .ft-col'));
  if (!cols.length) return;

  var mq = window.matchMedia('(max-width: 599.98px)');

  function setup() {
    cols.forEach(function (col, i) {
      var h = col.querySelector('.ft-h');
      var list = col.querySelector('ul');
      if (!h || !list) return;
      var btn = h.querySelector('.ft-toggle');

      if (mq.matches && !btn) {
        if (!list.id) list.id = 'ft-list-' + (i + 1);
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ft-toggle';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', list.id);
        btn.textContent = h.textContent;
        h.textContent = '';
        h.appendChild(btn);
        list.hidden = true;
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') !== 'true';
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          list.hidden = !open;
        });
      } else if (!mq.matches && btn) {
        h.textContent = btn.textContent;
        list.hidden = false;
      }
    });
  }

  mq.addEventListener('change', setup);
  setup();
})();
