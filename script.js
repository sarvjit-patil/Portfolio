// --- HAMBURGER MENU TOGGLE ---
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// --- MAIN INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initScrollReveal();
  initScrollSpyAndNav();
});

// 1. DARK / LIGHT MODE THEME TOGGLE
function initThemeToggle() {
  const toggleBtnDesktop = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  const iconDesktop = document.getElementById('theme-icon');
  const iconMobile = document.getElementById('theme-icon-mobile');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (iconDesktop) iconDesktop.textContent = '☀️';
      if (iconMobile) iconMobile.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (iconDesktop) iconDesktop.textContent = '🌙';
      if (iconMobile) iconMobile.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  toggleBtnDesktop?.addEventListener('click', toggleTheme);
  toggleBtnMobile?.addEventListener('click', toggleTheme);
}

// 2. HERO TYPEWRITER ANIMATION
function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;

  const words = JSON.parse(el.getAttribute('data-words') || '[]');
  if (words.length === 0) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// 3. SCROLL REVEAL ANIMATION
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  reveals.forEach((el) => {
    observer.observe(el);
  });
}

// 4. STICKY NAV & ACTIVE SECTION SCROLL-SPY
function initScrollSpyAndNav() {
  const nav = document.getElementById('desktop-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    // Sticky nav backdrop change
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}