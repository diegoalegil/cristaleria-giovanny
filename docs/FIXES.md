# FIXES.md — Iteración 1 de Cristalería Giovanny

> Lista priorizada de bugs, optimizaciones y una feature nueva.
> Implementar **todo** en esta iteración. Un commit semántico por bloque.

---

## Resumen ejecutivo

| # | Tipo | Cambio | Commit sugerido |
|---|---|---|---|
| 1 | 🔴 Bug | Optimizar/reemplazar banner.png (2.1 MB) | `perf: optimize promo banner image` |
| 2 | 🔴 Bug | Color de estrellas vacías sin contraste | `fix: increase contrast of empty stars in testimonials` |
| 3 | 🔴 Bug | Carrusel mobile no reanuda tras touch | `fix: restart testimonials autoplay after touchend` |
| 4 | 🟡 Bug | Iconos de pago en texto plano | `feat: replace payment text icons with proper SVGs` |
| 5 | 🟡 Bug | Redundancia "25 años" en hero | `style: rewrite hero H1 to avoid duplication` |
| 6 | 🟡 Bug | Hero LCP no priorizado | `perf: optimize hero image LCP` |
| 7 | 🟢 Perf | Convertir imágenes a WebP | `perf: add WebP sources for all images` |
| 8 | 🟢 Perf | Preload de fuente principal | `perf: preload Fraunces font` |
| 9 | 🟢 SEO | robots.txt + sitemap.xml | `chore: add robots.txt and sitemap.xml` |
| 10 | ✨ Feat | Pantalla de carga con logo | `feat: add brand preloader screen` |
| 11 | 💡 UX | Reubicar promo-banner | `refactor: move promo banner closer to final CTA` |

---

## 1 · 🔴 Banner.png pesa 2.1 MB

**Diagnóstico:** todas las demás imágenes pesan 35–168 KB. Solo `banner.png` pesa **2 121 KB**. Aunque tiene `loading="lazy"`, al hacer scroll se traba.

**Opción A — Compresión rápida:**
1. Pasar `banner.png` por [Squoosh](https://squoosh.app) o [TinyPNG](https://tinypng.com).
2. Exportar como `banner.jpg` (calidad 80) + `banner.webp` (calidad 80).
3. Reemplazar en HTML:
   ```html
   <picture>
     <source srcset="img/banner.webp" type="image/webp">
     <img src="img/banner.jpg" alt="..." loading="lazy" width="1200" height="400">
   </picture>
   ```
4. Borrar `banner.png` del repo.

**Opción B — Reemplazo nativo (recomendada):**
Sustituir el PNG por HTML + SVG. Pesa **5 KB en vez de 2 MB**, y se puede animar/recolorear con CSS.

```html
<section class="promo-banner" aria-label="Resumen visual de Cristalería Giovanny">
  <div class="container">
    <div class="promo-banner__wrap">
      <div class="promo-banner__bg" aria-hidden="true"></div>
      <div class="promo-banner__content">
        <p class="promo-banner__eyebrow">Soluciones a la medida</p>
        <h3 class="promo-banner__title">Vidrio y aluminio,<br>hechos para tu espacio</h3>
        <ul class="promo-banner__points">
          <li>+25 años de experiencia</li>
          <li>Presupuestos sin costo</li>
          <li>Miranda y Caracas</li>
        </ul>
        <a class="btn btn--whatsapp" href="https://wa.me/584142325258?text=Hola%2C%20quiero%20solicitar%20un%20presupuesto.">
          Solicitar presupuesto
        </a>
      </div>
    </div>
  </div>
</section>
```

Mi voto: **Opción B**.

---

## 2 · 🔴 Estrellas vacías invisibles

**Diagnóstico:** el color `#d8d2c5` sobre fondo blanco da contraste 1.46:1. Resultado visual: todas las puntuaciones se ven como 5★. Se pierde el balance de 3.5–4.5–5 que da credibilidad.

**Fix:** en `css/styles.css`, sección `.testimonial__stars`, cambiar:

```css
/* ANTES */
#d8d2c5 var(--filled),
#d8d2c5 100%

/* DESPUÉS */
#a89e87 var(--filled),
#a89e87 100%
```

Contraste objetivo ≥ 3:1 (WCAG AA para componentes no textuales).

---

## 3 · 🔴 Carrusel congelado en mobile

**Diagnóstico:** `script.js` escucha `touchstart` para pausar la auto-rotación pero **nunca la reanuda**. Primer toque en mobile = adiós rotación.

**Fix:** en `js/script.js`, sección "Carrusel de testimonios", reemplazar el bloque de eventos por:

```js
track.addEventListener('pointerenter', stop);
track.addEventListener('pointerleave', start);
track.addEventListener('focusin',  stop);
track.addEventListener('focusout', start);

// MOBILE: pausar al tocar, reanudar al soltar
track.addEventListener('touchstart',  stop,  { passive: true });
track.addEventListener('touchend',    start, { passive: true });
track.addEventListener('touchcancel', start, { passive: true });
```

---

## 4 · 🟡 Iconos de pago en texto plano

**Diagnóstico:** "Bs", "$", "Z", "PM", "T" como texto en `<span>`. Pobres visualmente.

**Fix:** reemplazar bloque en HTML:

```html
<ul class="payments__list">
  <li class="payment-badge">
    <span class="payment-badge__icon payment-badge__icon--text">Bs</span>
    <span class="payment-badge__label">Bolívares</span>
  </li>

  <li class="payment-badge">
    <span class="payment-badge__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    </span>
    <span class="payment-badge__label">USD efectivo</span>
  </li>

  <li class="payment-badge">
    <span class="payment-badge__icon payment-badge__icon--brand payment-badge__icon--zelle">Z</span>
    <span class="payment-badge__label">Zelle</span>
  </li>

  <li class="payment-badge">
    <span class="payment-badge__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    </span>
    <span class="payment-badge__label">Pago Móvil</span>
  </li>

  <li class="payment-badge">
    <span class="payment-badge__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    </span>
    <span class="payment-badge__label">Transferencia</span>
  </li>
</ul>
```

**CSS adicional:**

```css
.payment-badge__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
}
.payment-badge__icon svg { width: 24px; height: 24px; }
.payment-badge__icon--text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}
.payment-badge__icon--brand {
  background: #6D1ED4;     /* Zelle purple */
  color: #fff;
  font-weight: 700;
  font-family: var(--font-body);
}
```

---

## 5 · 🟡 Redundancia "25 años" en el hero

**Diagnóstico:** el badge superior dice "+25 años de oficio" y el H1 vuelve a decir "...con más de 25 años de oficio". El usuario lee lo mismo dos veces.

**Fix:** en `index.html`, sección hero:

```html
<!-- ANTES -->
<h1 id="hero-titulo" class="hero__title">
  Cristalería y herrería con más de <span class="hero__accent">25 años de oficio</span>.
</h1>

<!-- DESPUÉS -->
<h1 id="hero-titulo" class="hero__title">
  Vidrio y aluminio,<br>
  <span class="hero__accent">hechos para tu espacio.</span>
</h1>
```

El badge superior `+25 años de oficio` queda como único dato repetido. El H1 ahora comunica el "qué" en lugar de un dato.

---

## 6 · 🟡 Optimizar LCP del hero

**Diagnóstico:** la imagen del hero es la LCP. No tiene `fetchpriority`, ni preload, ni WebP.

**Fix:**

En `<head>`:
```html
<link rel="preload" as="image" href="img/hero.webp" type="image/webp" fetchpriority="high">
```

En el `<picture>` del hero:
```html
<picture class="hero__picture">
  <source srcset="img/hero.webp" type="image/webp">
  <img src="img/hero.jpg"
       alt="Ventana proyectante blanca instalada sobre fachada oscura — trabajo de Cristalería Giovanny"
       width="900" height="1200"
       fetchpriority="high">
</picture>
```

---

## 7 · 🟢 WebP en todas las imágenes

**Acción:**
1. Generar versión `.webp` (calidad 80) de cada imagen del repo.
2. Convertir cada `<img>` de la galería en `<picture>` con fallback:

```html
<picture>
  <source srcset="img/ventana-proyectante.webp" type="image/webp">
  <img src="img/ventana-proyectante.jpg"
       alt="Ventana proyectante blanca abierta sobre fachada oscura"
       loading="lazy" width="800" height="1067">
</picture>
```

Aplicar el patrón a las 6 imágenes de galería, la del banner (si se queda con la Opción A) y la duplicada de "Sobre el taller".

---

## 8 · 🟢 Preload de Fraunces

En `<head>`, justo después del `<link>` de Google Fonts:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="https://fonts.gstatic.com/s/fraunces/v32/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk.woff2">
```

Solo precargar el peso 700 (que es el que usa el H1).

---

## 9 · 🟢 robots.txt y sitemap.xml

Crear dos archivos en la raíz del repo.

**`robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://diegoalegil.github.io/cristaleria-giovanny/sitemap.xml
```

**`sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://diegoalegil.github.io/cristaleria-giovanny/</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 10 · ✨ Pantalla de carga (preloader)

**Concepto:** los 4 paneles del logo aparecen secuencialmente; el panel bronce se "proyecta" hacia afuera al final, igual que una ventana proyectante. Identidad de marca convertida en feedback de carga.

**Duración máx:** 1.2 s. Si JS falla, fallback automático a 3 s.

### HTML

Justo después de `<body>`, antes de `<a class="skip-link">`:

```html
<div class="preloader" id="preloader" role="status" aria-label="Cargando">
  <div class="preloader__logo" aria-hidden="true">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect class="preloader__panel preloader__panel--1" x="25" y="30" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3"/>
      <rect class="preloader__panel preloader__panel--2" x="25" y="52" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3"/>
      <rect class="preloader__panel preloader__panel--3" x="47" y="52" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3"/>
      <rect class="preloader__panel preloader__panel--4" x="53" y="16" width="22" height="22" fill="#a87b4a" stroke="currentColor" stroke-width="3"/>
    </svg>
  </div>
  <p class="preloader__brand">Cristalería Giovanny</p>
</div>
```

### CSS

Añadir al final de `styles.css` (antes del bloque de `prefers-reduced-motion`):

```css
/* ============ PRELOADER ============ */
.preloader {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  z-index: 9999;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1.2rem;
  color: var(--color-text);
  transition: opacity .5s ease, visibility .5s ease;
  /* Fallback: si JS falla, ocultar a los 3s */
  animation: preloader-auto-out .5s ease 3s forwards;
}

.preloader.is-done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.preloader__logo {
  width: 96px;
  height: 96px;
}

.preloader__brand {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: .02em;
  opacity: 0;
  animation: preloader-fade-in .4s ease .5s forwards;
}

.preloader__panel {
  opacity: 0;
  animation: preloader-panel-in .35s ease forwards;
}
.preloader__panel--1 { animation-delay:  .00s; }
.preloader__panel--2 { animation-delay:  .12s; }
.preloader__panel--3 { animation-delay:  .24s; }
.preloader__panel--4 {
  animation: preloader-panel-in .35s ease .36s forwards,
             preloader-panel-project 1.2s cubic-bezier(.4,0,.2,1) .65s forwards;
  transform-origin: bottom right;
}

@keyframes preloader-panel-in {
  from { opacity: 0; transform: scale(.9); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes preloader-panel-project {
  0%   { transform: translate(0, 0)     scale(1); }
  50%  { transform: translate(3px, -4px) scale(1); }
  100% { transform: translate(0, 0)     scale(1); }
}

@keyframes preloader-fade-in { to { opacity: 1; } }

@keyframes preloader-auto-out {
  to { opacity: 0; visibility: hidden; pointer-events: none; }
}

@media (prefers-reduced-motion: reduce) {
  .preloader__panel,
  .preloader__brand {
    animation: none !important;
    opacity: 1 !important;
  }
  .preloader { animation: preloader-auto-out .3s ease 1s forwards; }
}
```

### JS

Al inicio del IIFE en `script.js`, justo después de `'use strict';`:

```js
// ---------- Preloader ----------
const preloader = document.getElementById('preloader');
if (preloader) {
  const hide = () => {
    preloader.classList.add('is-done');
    setTimeout(() => preloader.remove(), 600);
  };
  // Ocultar cuando todo (imágenes incluidas) cargó, mínimo 900ms para que se vea la animación
  const minTime = new Promise(r => setTimeout(r, 900));
  const loadFn  = new Promise(r => window.addEventListener('load', r, { once: true }));
  Promise.all([minTime, loadFn]).then(hide);

  // Safety net: si pasa demasiado, ocultar igual
  setTimeout(hide, 4000);
}
```

### Notas

- Si la primera visita es lenta, el preloader cubre la espera. Si es rápida, dura mínimo 900 ms para que se vea (sin ser molesto).
- Si JS falla por cualquier razón, el `@keyframes preloader-auto-out` lo oculta a los 3 s.
- En `prefers-reduced-motion` la animación se desactiva y la pantalla solo hace un fade simple a 1 s.
- El `role="status"` hace que los lectores de pantalla anuncien "Cargando" al inicio.

---

## 11 · 💡 Reubicar el promo-banner

**Diagnóstico actual:** el banner intermedio rompe el flujo emocional galería → "sobre el taller". El usuario está explorando trabajos y de repente le aparece un CTA agresivo antes de leer sobre el taller.

**Fix:** moverlo a **justo antes del CTA final**, o eliminarlo si se decide que sobra. Sugiero **moverlo**, así dobla el cierre del embudo:

Nuevo orden vertical:
1. Hero
2. Servicios
3. Galería
4. **Sobre el taller** ← (antes era después del banner, ahora va después de galería)
5. Testimonios
6. Info (zonas/horario/domicilio)
7. Pagos
8. **Promo-banner** ← reubicado aquí
9. CTA final
10. Footer

---

## Plan de commits sugerido

Hacer cada cambio en un commit separado, en este orden:

```bash
git checkout -b iteration-1

# Bugs críticos primero
git commit -m "fix: increase contrast of empty stars in testimonials"
git commit -m "fix: restart testimonials autoplay after touchend on mobile"
git commit -m "perf: replace 2MB banner png with native HTML/SVG"

# Bugs menores
git commit -m "feat: replace payment text icons with proper SVG icons"
git commit -m "style: rewrite hero H1 to avoid duplication with badge"
git commit -m "refactor: move promo banner before final CTA"

# Performance
git commit -m "perf: add WebP sources for all images"
git commit -m "perf: preload hero image and Fraunces font"
git commit -m "perf: add fetchpriority high to LCP image"

# SEO
git commit -m "chore: add robots.txt and sitemap.xml"

# Feature
git commit -m "feat: add brand preloader with projecting window animation"

# Final
git checkout main
git merge iteration-1
git push origin main
```

---

## Verificación final

Después de aplicar todo, validar con:

1. **Lighthouse mobile** → Performance ≥ 95, Accessibility ≥ 95, SEO 100
2. **Real device** (no solo DevTools) → mobile real, especialmente el carrusel táctil
3. **Console del navegador** → cero errores ni warnings
4. **HTML validator** → https://validator.w3.org
5. **WebPageTest** → tiempo de LCP < 2.5 s en 4G simulado

---

**Versión:** Iteración 1
**Fecha:** Mayo 2026
