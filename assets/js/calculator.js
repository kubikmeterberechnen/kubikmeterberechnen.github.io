(function () {
  var f = document.getElementById('calc-form');
  if (!f) return;
  var E = f.elements;
  var FACTOR = { mm: 0.001, dm: 0.1, cm: 0.01, m: 1 };
  var FORMULA = { quader: 'V = l × b × h', zylinder: 'V = π × r² × h', kugel: 'V = 4/3 × π × r³' };
  var NEED = { quader: ['l', 'b', 'h'], zylinder: ['r', 'h'], kugel: ['r'] };
  var $ = function (id) { return document.getElementById(id); };
  var out = { m3: $('res-m3'), l: $('res-l'), cm3: $('res-cm3'), note: $('calc-note'), formula: $('formula') };

  function parse(v) {
    v = String(v).trim().replace(',', '.');
    return v === '' ? NaN : Number(v);
  }
  function fmt(v) {
    var a = Math.abs(v);
    if (v !== 0 && a < 1e-6) return v.toExponential(3).replace('.', ',');
    var d = a >= 1000 ? 2 : a >= 1 ? 4 : 6;
    return v.toLocaleString('de-DE', { maximumFractionDigits: d });
  }
  function clear(msg) {
    out.m3.textContent = out.l.textContent = out.cm3.textContent = '–';
    out.note.textContent = msg;
  }
  function toggle() {
    var s = E.shape.value;
    f.querySelectorAll('[data-shapes]').forEach(function (el) {
      el.hidden = el.getAttribute('data-shapes').split(' ').indexOf(s) < 0;
    });
    out.formula.textContent = FORMULA[s];
  }
  function calc() {
    var s = E.shape.value, k = FACTOR[E.unit.value], vals = {}, missing = false, negative = false;
    NEED[s].forEach(function (n) {
      var x = parse(E[n].value);
      if (isNaN(x)) missing = true;
      else if (x < 0) negative = true;
      vals[n] = x * k;
    });
    var q = E.qty.value.trim() === '' ? 1 : parse(E.qty.value);
    if (negative) return clear('Maße dürfen nicht negativ sein.');
    if (isNaN(q) || q <= 0) return clear('Die Anzahl muss größer als 0 sein.');
    if (missing) return clear('Gib alle Maße ein. Dezimalzahlen mit Komma oder Punkt.');
    var v = s === 'quader' ? vals.l * vals.b * vals.h
          : s === 'zylinder' ? Math.PI * vals.r * vals.r * vals.h
          : 4 / 3 * Math.PI * Math.pow(vals.r, 3);
    v *= q;
    out.m3.textContent = fmt(v);
    out.l.textContent = fmt(v * 1000);
    out.cm3.textContent = fmt(v * 1e6);
    out.note.textContent = q !== 1 ? 'Gesamtvolumen für ' + fmt(q) + ' Stück.' : 'Ergebnis für ein Stück.';
  }

  f.addEventListener('input', function (e) {
    if (e.target === E.shape) toggle();
    calc();
  });
  f.addEventListener('change', function () { toggle(); calc(); });
  f.addEventListener('submit', function (e) { e.preventDefault(); });
  f.addEventListener('reset', function () { setTimeout(function () { toggle(); calc(); }, 0); });
  toggle();
  calc();
})();
