/* Crystal Kilpatrick Group — Sprint 1
   Minimal client-side: mobile menu, CTA tracking, contact form state.
*/
(function () {
  'use strict';

  var nav = document.getElementById('siteNav');
  var mobileNav = document.getElementById('mobileNav');
  var navToggle = document.querySelector('.nav-toggle');
  var navClose = document.querySelector('.mobile-nav-close');
  var body = document.body;

  if (nav && nav.getAttribute('data-transparent') !== 'true') {
    nav.classList.add('is-inner');
  }

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

  /* --- contact form: consent guard + post-submit success state --- */
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

  /* Web3Forms redirects back with ?sent=1 — reveal the confirmation. */
  var success = document.getElementById('contactSuccess');
  if (success && /[?&]sent=1\b/.test(window.location.search)) {
    success.hidden = false;
    if (form) form.hidden = true;
    success.setAttribute('tabindex', '-1');
    success.focus();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    /* Drop the query so a refresh doesn't re-show the banner. */
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
})();
