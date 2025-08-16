

document.addEventListener('DOMContentLoaded', function () {
  // Insert current year into any footer span with id beginning with 'year'
  var year = new Date().getFullYear();
  ['year', 'year-case', 'year-privacy'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = year;
    }
  });

  // Cookie consent banner logic
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('accept-cookies');

  function hideBanner() {
    if (banner) {
      banner.classList.add('d-none');
    }
  }

  function loadAnalytics() {
    if (window.gtag) return;
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', '');
    scriptTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-4KTXJGHKBG';
    document.head.appendChild(scriptTag);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-4KTXJGHKBG');
  }

  // Show banner if consent not given
  if (banner && document.cookie.indexOf('cookie_consent=true') === -1) {
    banner.classList.remove('d-none');
  }

  // Accept button handler
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      var expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie = 'cookie_consent=true; expires=' + expiryDate.toUTCString() + '; path=/';
      hideBanner();
      loadAnalytics();
    });
  }

  // Load analytics automatically if consent stored
  if (document.cookie.indexOf('cookie_consent=true') !== -1) {
    loadAnalytics();
  }

  // Lazy loading for images
  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.01
    });
    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  } else {
    lazyImages.forEach(function (img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
});