(function () {
  var b = document.querySelector('.burger');
  var m = document.getElementById('menu');
  if (!b || !m) return;
  function set(open) {
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    m.classList.toggle('open', open);
  }
  b.addEventListener('click', function () {
    set(b.getAttribute('aria-expanded') !== 'true');
  });
  m.addEventListener('click', function (e) {
    if (e.target.closest('a')) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') set(false);
  });
})();
