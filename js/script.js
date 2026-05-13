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
})();
