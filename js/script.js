/* =========================================
   Cristalería Giovanny — script.js
   JavaScript vanilla. Sin dependencias.
   ========================================= */

(function () {
  'use strict';

  // ---------- Menú móvil ----------
  const nav     = document.querySelector('.nav');
  const toggle  = nav?.querySelector('.nav__toggle');
  const menu    = nav?.querySelector('.nav__menu');

  if (nav && toggle && menu) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      setOpen(!nav.classList.contains('is-open'));
    });

    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    const mq = window.matchMedia('(min-width: 900px)');
    mq.addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  // ---------- Lightbox de galería ----------
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = lightbox?.querySelector('.lightbox__img');
  const lbCaption    = lightbox?.querySelector('.lightbox__caption');
  const lbClose      = lightbox?.querySelector('.lightbox__close');
  const lbPrev       = lightbox?.querySelector('.lightbox__prev');
  const lbNext       = lightbox?.querySelector('.lightbox__next');
  const galleryItems = Array.from(document.querySelectorAll('[data-lightbox]'));

  if (lightbox && lbImg && galleryItems.length) {
    let currentIndex = 0;
    let lastFocus = null;

    const renderSlide = (index) => {
      const item = galleryItems[index];
      const img  = item.querySelector('img');
      lbImg.src     = img.src;
      lbImg.alt     = img.alt;
      lbCaption.textContent = item.dataset.caption || img.alt || '';
    };

    const openLB = (index) => {
      currentIndex = index;
      lastFocus = document.activeElement;
      renderSlide(currentIndex);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => lbClose?.focus());
    };

    const closeLB = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      lastFocus?.focus();
    };

    const advance = (dir) => {
      currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
      renderSlide(currentIndex);
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLB(i));
    });

    lbClose?.addEventListener('click', closeLB);
    lbPrev?.addEventListener('click', () => advance(-1));
    lbNext?.addEventListener('click', () => advance(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLB();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape')    closeLB();
      if (e.key === 'ArrowLeft') advance(-1);
      if (e.key === 'ArrowRight')advance(1);
    });
  }

  // ---------- Carrusel de testimonios ----------
  const track = document.querySelector('[data-testimonials]');
  const navBtns = document.querySelectorAll('.testimonials__btn');

  if (track && navBtns.length) {
    const getStep = () => {
      const card = track.firstElementChild;
      if (!card) return 0;
      const gap  = parseFloat(getComputedStyle(track).columnGap || 16);
      return card.getBoundingClientRect().width + gap;
    };

    const scrollBy = (dir) => {
      const step = getStep();
      let next = track.scrollLeft + step * dir;
      const max = track.scrollWidth - track.clientWidth;
      if (next < 0) next = max;
      else if (next > max - 4) next = 0;
      track.scrollTo({ left: next, behavior: 'smooth' });
    };

    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.dir === 'next' ? 1 : -1;
        scrollBy(dir);
      });
    });

    // Auto-rotación cada 5s con pausa al interactuar
    let auto = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = () => {
      if (isReducedMotion) return;
      stop();
      auto = setInterval(() => scrollBy(1), 5000);
    };
    const stop = () => {
      if (auto) clearInterval(auto);
      auto = null;
    };

    track.addEventListener('pointerenter', stop);
    track.addEventListener('pointerleave', start);
    track.addEventListener('focusin',  stop);
    track.addEventListener('focusout', start);

    // MOBILE: pausar al tocar, reanudar al soltar
    track.addEventListener('touchstart',  stop,  { passive: true });
    track.addEventListener('touchend',    start, { passive: true });
    track.addEventListener('touchcancel', start, { passive: true });

    // Pausar cuando la sección no está visible para ahorrar recursos
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(([entry]) => {
        entry.isIntersecting ? start() : stop();
      }, { threshold: 0.2 });
      obs.observe(track);
    } else {
      start();
    }
  }

  // ---------- Botón flotante WhatsApp: ocultar mientras hero está visible ----------
  const floatWA = document.querySelector('.float-wa');
  const heroEl  = document.querySelector('.hero');

  if (floatWA && heroEl && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(([entry]) => {
      floatWA.dataset.hidden = entry.isIntersecting ? 'true' : 'false';
    }, { threshold: 0.15 });
    obs.observe(heroEl);
  } else if (floatWA) {
    floatWA.dataset.hidden = 'false';
  }
})();
