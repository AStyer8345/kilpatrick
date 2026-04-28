/* Crystal Kilpatrick Group: restrained scroll effects. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('siteNav');

  function updateNavState() {
    if (!nav || nav.getAttribute('data-transparent') !== 'true') return;
    var isScrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', isScrolled);
    nav.classList.toggle('is-solid', isScrolled);
  }

  if (nav && nav.getAttribute('data-transparent') === 'true') {
    var navTicking = false;
    window.addEventListener('scroll', function () {
      if (navTicking) return;
      navTicking = true;
      requestAnimationFrame(function () {
        updateNavState();
        navTicking = false;
      });
    }, { passive: true });
    updateNavState();
  }

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  var targets = [];

  function addReveal(node, delay) {
    if (!node) return;
    node.style.transition = 'none';
    node.classList.add('reveal');
    if (delay) node.style.setProperty('--reveal-delay', delay + 's');
    targets.push(node);
  }

  addReveal(document.querySelector('.off-market h2'));
  addReveal(document.querySelector('.off-market-inner > div:last-child'));

  document.querySelectorAll('.pillar').forEach(function (node) {
    addReveal(node);
  });

  document.querySelectorAll('.market').forEach(function (node, index) {
    addReveal(node, index * 0.08);
  });

  document.querySelectorAll('.credibility-item').forEach(function (node, index) {
    addReveal(node, index * 0.08);
  });

  addReveal(document.querySelector('.authority-row'));
  addReveal(document.querySelector('.bottom-cta .container'));

  if (!targets.length) return;

  void document.body.offsetHeight;
  requestAnimationFrame(function () {
    targets.forEach(function (node) {
      node.style.transition = '';
    });
  });

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach(function (node) {
    observer.observe(node);
  });
})();
