(function () {
  'use strict';

  var menuToggle = document.getElementById('menu-toggle');
  var menuIcon = document.getElementById('menu-icon');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIcon.classList.replace('fa-xmark', 'fa-bars');
  }

  menuToggle.addEventListener('click', function () {
    var isOpen = !mobileMenu.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuIcon.classList.replace(isOpen ? 'fa-bars' : 'fa-xmark', isOpen ? 'fa-xmark' : 'fa-bars');
  });

  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) closeMenu();
  });

  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 70 + 'ms';
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function syncActiveLink() {
    var offset = window.scrollY + 120;
    var currentId = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= offset) currentId = section.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });
  }

  var backToTop = document.getElementById('back-to-top');
  var navbar = document.getElementById('navbar');
  var ticking = false;

  function syncScrollUI() {
    var scrolled = window.scrollY > 400;
    backToTop.classList.toggle('is-visible', scrolled);
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
    syncActiveLink();
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      syncScrollUI();
      ticking = false;
    });
  }, { passive: true });

  syncScrollUI();

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    function showStatus(text, ok) {
      status.textContent = text;
      status.hidden = false;
      status.classList.toggle('is-ok', ok);
      status.classList.toggle('is-error', !ok);
    }

    if (!name || !email || !message) {
      showStatus('Please fill in every field before sending.', false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('That email address does not look valid.', false);
      return;
    }

    var subject = 'Portfolio enquiry from ' + name;
    var body = message + '\n\n--\n' + name + '\n' + email;
    window.location.href = 'mailto:yogaprabowo45@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    showStatus('Opening your email client — thanks for reaching out!', true);
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
