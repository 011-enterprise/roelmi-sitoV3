/* ==========================================================================
   Contatti — controllo del modulo
   - All'invio: ogni campo obbligatorio vuoto o sbagliato riceve il suo
     messaggio sotto (aria-invalid + aria-describedby), in cima un riepilogo
     annunciato e il focus va sul primo campo da correggere
   - Mentre si scrive, un campo già segnato si ricontrolla e l'errore sparisce
   - Tutto giusto: messaggio di conferma (role="status") e modulo svuotato.
     L'INVIO VERO NON È COLLEGATO: va aggiunto quando c'è il server
   Senza JS restano i controlli del browser (required, type="email").
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var summary = document.getElementById('ctSummary');
  var status = document.getElementById('ctStatus');
  var fields = Array.prototype.slice.call(form.querySelectorAll('[required]'));
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function errorEl(field) {
    return document.getElementById(field.id + '-err');
  }

  // Messaggio d'errore del campo, o '' se va bene
  function check(field) {
    var err = errorEl(field);
    if (field.type === 'checkbox') return field.checked ? '' : err.getAttribute('data-msg');
    var v = field.value.trim();
    if (!v) return err.getAttribute('data-msg');
    if (field.type === 'email' && !emailRe.test(v)) return err.getAttribute('data-msg-format');
    return '';
  }

  function show(field, msg) {
    var err = errorEl(field);
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      err.textContent = msg;
      err.hidden = false;
    } else {
      field.removeAttribute('aria-invalid');
      err.textContent = '';
      err.hidden = true;
    }
  }

  // Un campo già segnato in errore si ricontrolla mentre lo si corregge
  fields.forEach(function (field) {
    var ev = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(ev, function () {
      if (field.getAttribute('aria-invalid') === 'true') show(field, check(field));
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    var wrong = [];
    fields.forEach(function (field) {
      var msg = check(field);
      show(field, msg);
      if (msg) wrong.push(field);
    });

    if (wrong.length) {
      summary.textContent = wrong.length === 1
        ? '1 field needs your attention.'
        : wrong.length + ' fields need your attention.';
      summary.hidden = false;
      wrong[0].focus();
      return;
    }

    summary.hidden = true;
    summary.textContent = '';
    // Qui andrà l'invio al server
    form.reset();
    status.textContent = 'Thank you for your message. Our team will get back to you soon.';
  });
})();
