document.addEventListener('DOMContentLoaded', function () {
  // Insert current year into footer spans
  const year = new Date().getFullYear();
  ['year', 'year-case', 'year-privacy'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Cookie consent logic
  const banner = document.getElementById('cookie-banner');
  const overlay = document.getElementById('cookie-banner-overlay');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  function showBanner() {
    if (banner && overlay) {
      banner.classList.remove('d-none');
      banner.style.display = 'block';
      overlay.style.display = 'block';
      document.body.classList.add('cookie-banner-active');
    }
  }

  function hideBanner() {
    if (banner && overlay) {
      banner.classList.add('d-none');
      banner.style.display = 'none';
      overlay.style.display = 'none';
      document.body.classList.remove('cookie-banner-active');
    }
  }

  function loadAnalytics() {
    if (window.gtag) return;
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-4KTXJGHKBG';
    document.head.appendChild(scriptTag);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-4KTXJGHKBG');
  }

  // Consent check
  const consent = localStorage.getItem('cookiesConsent');
  if (consent !== 'accepted') {
    showBanner();
  } else {
    loadAnalytics();
  }

  if (acceptBtn) {
    acceptBtn.onclick = function () {
      localStorage.setItem('cookiesConsent', 'accepted');
      hideBanner();
      loadAnalytics();
    };
  }
  if (declineBtn) {
    declineBtn.onclick = function () {
      localStorage.setItem('cookiesConsent', 'declined');
      hideBanner();
      // No analytics
    };
  }
});
