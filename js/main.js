/* Crystal Kilpatrick Group — Sprint 1
   Minimal client-side: nav scroll state, mobile menu, CTA tracking.
*/
(function () {
  'use strict';

  var nav = document.getElementById('siteNav');
  var mobileNav = document.getElementById('mobileNav');
  var navToggle = document.querySelector('.nav-toggle');
  var navClose = document.querySelector('.mobile-nav-close');
  var body = document.body;

  /* --- nav scroll shadow (only when nav is transparent over hero) --- */
  function updateNavState() {
    if (!nav) return;
    var isTransparent = nav.getAttribute('data-transparent') === 'true';
    if (!isTransparent) return;
    if (window.scrollY > 40) {
      nav.classList.add('is-solid');
    } else {
      nav.classList.remove('is-solid');
    }
  }
  if (nav && nav.getAttribute('data-transparent') !== 'true') {
    nav.classList.add('is-inner');
  }
  window.addEventListener('scroll', updateNavState, { passive: true });
  updateNavState();

  /* --- mobile nav --- */
  function openMobile() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-open');
  }
  function closeMobile() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  }
  if (navToggle) navToggle.addEventListener('click', openMobile);
  if (navClose) navClose.addEventListener('click', closeMobile);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobile();
    }
  });
  /* clicking any link inside mobile nav closes it */
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== mobileNav) {
        if (t.tagName === 'A') { closeMobile(); break; }
        t = t.parentNode;
      }
    });
  }

  /* --- CTA tracking (console.info for now; analytics layer plugs in here) --- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('.js-track-cta');
    if (!el) return;
    var event = el.getAttribute('data-event') || 'cta_click';
    var href = el.getAttribute('href') || '';
    if (typeof console !== 'undefined' && console.info) {
      console.info('[ckg-cta]', event, { href: href, page: window.location.pathname });
    }
  });

  /* --- scroll reveal via IntersectionObserver ---
     Progressive enhancement: we only add `.reveal` (which sets opacity:0)
     once we know the observer is supported. Without JS, content stays visible. */
  if ('IntersectionObserver' in window) {
    var revealSelectors = [
      '.markets-head',
      '.testimonials-head',
      '.pillars',
      '.markets-grid',
      '.about-hero-grid',
      '.quick-facts h2',
      '.bio-grid',
      '.designations h2',
      '.designations-grid',
      '.awards h2',
      '.awards-list',
      '.team h2',
      '.team-grid'
    ];
    var staggerSelectors = ['.pillars', '.markets-grid', '.designations-grid', '.team-grid'];
    var staggerSet = {};
    for (var s = 0; s < staggerSelectors.length; s++) staggerSet[staggerSelectors[s]] = true;

    var targets = [];
    for (var i = 0; i < revealSelectors.length; i++) {
      var sel = revealSelectors[i];
      var nodes = document.querySelectorAll(sel);
      for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
        /* suppress the transition for the first frame so the element snaps
           to opacity:0 instead of fading out from its painted state */
        node.style.transition = 'none';
        node.classList.add('reveal');
        if (staggerSet[sel]) node.classList.add('reveal-stagger');
        targets.push(node);
      }
    }

    if (targets.length) {
      /* force a reflow, then restore transitions on the next frame */
      void document.body.offsetHeight;
      requestAnimationFrame(function () {
        for (var u = 0; u < targets.length; u++) targets[u].style.transition = '';
      });

      var observer = new IntersectionObserver(function (entries, obs) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            entries[k].target.classList.add('active');
            obs.unobserve(entries[k].target);
          }
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      for (var t = 0; t < targets.length; t++) observer.observe(targets[t]);
    }
  }

  /* --- contact form: lightweight UX state (no backend assumed) --- */
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      var consent = form.querySelector('input[name="consent"]');
      if (consent && !consent.checked) {
        e.preventDefault();
        consent.focus();
        var msg = form.querySelector('.form-error');
        if (msg) msg.textContent = 'Please review and accept the contact consent before sending.';
      }
    });
  }
})();
