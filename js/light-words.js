/* ==========================================================================
   Paragrafo che si accende parola per parola scorrendo (come Who We Are in
   home). Vale per ogni elemento con data-light-words.
   Le parole si dividono sul posto: link, grassetti e accenti restano veri e
   lo screen reader legge la frase intera.
   Spente = classe .lw-word (colore nel CSS della pagina), accese = .is-lit.
   Con Stop animation / reduced-motion: tutto acceso.
   ========================================================================== */

(function () {
  'use strict';

  var els = Array.prototype.slice.call(document.querySelectorAll('[data-light-words]'));
  if (!els.length) return;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function motionOn() {
    return window.RoelmiMotion ? !window.RoelmiMotion.isPaused() : true;
  }

  function split(el, words) {
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var w = document.createElement('span');
            w.className = 'lw-word';
            w.textContent = part;
            frag.appendChild(w);
            words.push(w);
          }
        });
        el.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        split(node, words);
      }
    });
  }

  var items = els.map(function (el) {
    var words = [];
    split(el, words);
    el.classList.add('is-ready');
    return { el: el, words: words };
  });

  function render() {
    var vh = window.innerHeight;
    items.forEach(function (it) {
      var r = it.el.getBoundingClientRect();
      // si accende mentre il paragrafo sale dall'85% dello schermo
      var p = motionOn() ? clamp((vh * 0.85 - r.top) / (r.height + vh * 0.5)) : 1;
      var lit = Math.round(p * it.words.length);
      for (var i = 0; i < it.words.length; i++) {
        it.words[i].classList.toggle('is-lit', i < lit);
      }
    });
  }

  window.addEventListener('scroll', render, { passive: true });
  window.addEventListener('resize', render);
  if (window.RoelmiMotion) window.RoelmiMotion.onChange(render);
  render();
})();
