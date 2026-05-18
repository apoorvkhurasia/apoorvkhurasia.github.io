(function () {
  var btn = document.getElementById('theme-toggle');
  var html = document.documentElement;

  btn.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  var header = document.querySelector('header');
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 0);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
