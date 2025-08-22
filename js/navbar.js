(function() {
  function injectNavbar() {
    const isIndex =
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html';

    const projectsHref = isIndex ? '#projects' : '/#projects';

    const navHTML = `
<nav id="mainNav" class="navbar navbar-expand-lg py-3 px-2 position-fixed top-0 w-100">
  <div class="container position-relative">
    <!-- Name left on desktop, hidden on mobile -->
    <a class="navbar-brand fw-semibold d-none d-lg-flex align-items-center position-absolute start-0 top-50 translate-middle-y" href="index.html" style="z-index:2;">
      <span class="navbar-name">Yevhenii Kalashnyk</span>
    </a>
    <!-- Logo left, name center, hamburger right on mobile -->
    <a class="navbar-logo-link d-flex align-items-center justify-content-center mx-auto" href="index.html" >
      <img src="images/logo.svg" alt="Logo" class="navbar-logo" />
    </a>
    <span class="navbar-name-mobile fw-semibold d-lg-none">Yevhenii Kalashnyk</span>
    <button class="navbar-toggler custom-hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavCollapse" aria-controls="mainNavCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="custom-hamburger-icon">
        <span></span>
        <span></span>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="mainNavCollapse">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4">
        <li class="nav-item">
          <a class="nav-link" href="about.html">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${projectsHref}">Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    `;
    // Remove any existing nav before injecting
    const oldNav = document.getElementById('mainNav');
    if (oldNav) oldNav.remove();

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Ensure navbar-collapse is always open on large screens or landscape on small screens
    function updateNavCollapse() {
      var navCollapse = document.getElementById('mainNavCollapse');
      if (
        window.innerWidth >= 992 ||
        (window.innerWidth < 992 && window.matchMedia('(orientation: landscape)').matches)
      ) {
        navCollapse.classList.add('show');
        document.body.classList.remove('menu-open');
      } else {
        navCollapse.classList.remove('show');
      }
    }
    updateNavCollapse();
    window.addEventListener('resize', updateNavCollapse);

    // Animate hamburger icon to X when menu is open/closed
    const toggler = document.querySelector('.custom-hamburger');
    const collapse = document.getElementById('mainNavCollapse');
    if (toggler && collapse) {
      collapse.addEventListener('show.bs.collapse', function() {
        toggler.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
      });
      collapse.addEventListener('hide.bs.collapse', function() {
        toggler.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    }

    // Smoothly close navbar on mobile when clicking a nav-link
    document.addEventListener('DOMContentLoaded', function() {
      var navCollapse = document.getElementById('mainNavCollapse');
      if (!navCollapse) return;
      var navLinks = navCollapse.querySelectorAll('.nav-link');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth < 992) {
            var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
            setTimeout(function() {
              bsCollapse.hide();
              document.body.classList.remove('menu-open'); // Ensure scroll is restored
            }, 80);
          }
        });
      });

      // Close menu when clicking outside the navbar on mobile
      const mainNav = document.getElementById('mainNav');
      if (mainNav) {
        document.addEventListener('click', function(e) {
          var navCollapse = document.getElementById('mainNavCollapse');
          var toggler = document.querySelector('.navbar-toggler');
          if (
            navCollapse &&
            navCollapse.classList.contains('show') &&
            !navCollapse.contains(e.target) &&
            !toggler.contains(e.target) &&
            window.innerWidth < 992
          ) {
            var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
            bsCollapse.hide();
            document.body.classList.remove('menu-open'); // Restore scroll
          }
        });
      }
    });

    // Automatically close mobile menu only after navbar has scrolled out of view
    let lastScrollY = window.scrollY;
    let navHidden = false;
    const nav = document.getElementById('mainNav');

    window.addEventListener('scroll', function() {
      var navCollapse = document.getElementById('mainNavCollapse');
      if (!nav) return;

      // Check if navbar is out of view (scrolled up)
      const navRect = nav.getBoundingClientRect();
      if (navRect.bottom <= 0) {
        navHidden = true;
      } else {
        navHidden = false;
      }

      // Only close menu if navbar is hidden and menu is open
      if (
        navCollapse &&
        navCollapse.classList.contains('show') &&
        window.innerWidth < 992 &&
        navHidden
      ) {
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
        document.body.classList.remove('menu-open'); // Restore scroll and blur
      }
      lastScrollY = window.scrollY;
    });

    // Remove menu-open if navbar is removed (edge case)
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new MutationObserver(function() {
        if (!document.getElementById('mainNav')) {
          document.body.classList.remove('menu-open');
        }
      });
      observer.observe(document.body, { childList: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavbar);
  } else {
    injectNavbar();
  }
})();

