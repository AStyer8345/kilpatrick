/* GA4 loader. Set MEASUREMENT_ID to enable — empty string = analytics off.
   CTA/form events are bridged from main.js via window.gtag. */
(function () {
  'use strict';
  var MEASUREMENT_ID = ''; // e.g. 'G-XXXXXXXXXX'
  if (!MEASUREMENT_ID) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
})();
