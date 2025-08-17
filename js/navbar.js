(function() {
  function injectNavbar() {
    const isIndex =
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html';

    const projectsHref = isIndex ? '#projects' : '/#projects';

    const navHTML = `
<nav id="mainNav" class="navbar navbar-expand-lg navbar-light bg-white py-3 position-fixed top-0 w-100">
  <div class="container">
    <a class="navbar-brand fw-semibold" href="/">Yevhenii Kalashnyk</a>
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

    // Animate hamburger icon to X when menu is open/closed
    document.addEventListener('click', function(e) {
      const toggler = document.querySelector('.custom-hamburger');
      const collapse = document.getElementById('mainNavCollapse');
      if (!toggler || !collapse) return;
      collapse.addEventListener('show.bs.collapse', function() {
        toggler.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open'); // Prevent scroll
      });
      collapse.addEventListener('hide.bs.collapse', function() {
        toggler.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open'); // Restore scroll
      });
    }, { once: true });

    // Smoothly close navbar on mobile when clicking a nav-link
    document.addEventListener('DOMContentLoaded', function() {
      var navCollapse = document.getElementById('mainNavCollapse');
      var navLinks = navCollapse.querySelectorAll('.nav-link');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth < 992) {
            var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
            setTimeout(function() {
              bsCollapse.hide();
            }, 80); // slight delay for smoothness
          }
        });
      });
    });

    // Close menu when clicking outside the navbar on mobile
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavbar);
  } else {
    injectNavbar();
  }
})();
