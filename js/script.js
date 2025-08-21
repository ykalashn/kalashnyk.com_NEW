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

  // Hide nav on scroll down, show on scroll up
  (function () {
    const nav = document.getElementById("mainNav");
    const navCollapse = document.getElementById('mainNavCollapse');
    if (!nav) return;
    let lastScrollTop = 0;
    const THRESHOLD = 8;
    const TOP_LOCK = 60;
    window.addEventListener("scroll", () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll < TOP_LOCK) {
        nav.style.transform = "translateY(0)";
        lastScrollTop = currentScroll;
        return;
      }
      if (currentScroll > lastScrollTop + THRESHOLD) {
        nav.style.transform = "translateY(-100%)";
        // Close menu if open
        if (
          navCollapse &&
          navCollapse.classList.contains('show') &&
          window.innerWidth < 992
        ) {
          var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
          bsCollapse.hide();
        }
      } else if (currentScroll < lastScrollTop - THRESHOLD) {
        nav.style.transform = "translateY(0)";
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  })();

  // Lazy loading with animation for images
  const lazyImages = document.querySelectorAll('img[data-src]');
  function animateImage(img) {
    img.classList.add('fade-in');
    setTimeout(() => img.classList.remove('fade-in'), 1000);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          animateImage(img);
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.01
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      animateImage(img);
    });
  }

  // Use Bootstrap collapse events to toggle menu-open class on body
  const navCollapse = document.getElementById('mainNavCollapse');
  if (navCollapse) {
    navCollapse.addEventListener('show.bs.collapse', function () {
      document.body.classList.add('menu-open');
    });
    navCollapse.addEventListener('hide.bs.collapse', function () {
      document.body.classList.remove('menu-open');
    });
  }
});

