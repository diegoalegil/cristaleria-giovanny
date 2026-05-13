# PROJECT.md — Cristalería Giovanny

> Brief completo del proyecto. Este documento es la **fuente única de verdad**.
> Cualquier colaborador debe leerlo antes de tocar código.

---

## 1. Contexto del proyecto

Sitio web institucional (landing page de una sola página) para **Cristalería Giovanny**, taller venezolano de fabricación e instalación de vidrio y aluminio. Cliente real, contacto familiar.

**Objetivo principal:** generar contactos por WhatsApp (CTA dominante en toda la página).
**Audiencia:** dueños de casa, gente remodelando, constructores pequeños en Miranda y Caracas.
**Acceso esperado:** ~90% móvil, ~10% desktop. **Mobile-first obligatorio.**

---

## 2. Sobre el negocio

| Campo | Valor |
|---|---|
| Nombre comercial | Cristalería Giovanny |
| WhatsApp | +58 414-232-52-58 |
| Link WhatsApp | `https://wa.me/584142325258` |
| Mensaje pre-cargado | `?text=Hola%2C%20me%20interesa%20conocer%20los%20servicios%20de%20Cristaler%C3%ADa%20Giovanny` |
| Zona principal | Estado Miranda, Venezuela |
| Zona secundaria | Caracas |
| Dirección física | Pendiente (taller en construcción) |
| Servicio a domicilio | Sí (mediciones, presupuestos, instalación) |
| Horario | Lun–Vie: 8:00 am – 6:00 pm · Sáb: con cita previa |
| Años de experiencia | **+25 años** (protagonista del hero) |
| Presupuestos | Gratuitos, sin compromiso |
| RIF | Pendiente |
| Garantía formal | Pendiente (de momento usar fórmula "trabajo respaldado por más de 25 años de experiencia") |
| Email | A definir |
| Instagram / Facebook | A definir |

**Servicios:**
- Ventanas panorámicas
- Ventanas tipo belglass
- Ventanas proyectantes
- Puertas de baño en vidrio templado
- Espejos decorativos
- Herrería en general
- Asesoría para remodelaciones

**Vidrios que maneja:** todo tipo (templado, laminado, escarchado, espejo, etc.).

**Métodos de pago:** Bolívares (efectivo / Pago Móvil), Dólares (efectivo), Zelle, transferencia bancaria.

---

## 3. Stack técnico

| Categoría | Tecnología | Justificación |
|---|---|---|
| Marcado | HTML5 semántico | SEO, accesibilidad, sin frameworks |
| Estilos | CSS3 puro (sin Tailwind/SASS) | Aprendizaje DAM, control total |
| Interactividad | JavaScript vanilla | Lightbox, carrusel testimonios, menú móvil |
| Hosting | GitHub Pages | Gratis, integración directa con repo |
| Versionado | Git + GitHub | Portafolio público |
| Fuentes | Google Fonts (Fraunces + Inter Tight) | Tipografía profesional gratuita |
| Iconos | Lucide (SVG inline) o Heroicons | Ligeros, customizables |

**Sin frameworks JS, sin build tools, sin npm.** Mantener HTML/CSS/JS plano para máxima portabilidad y aprendizaje.

---

## 4. Estructura de carpetas

```
cristaleria-giovanny/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── hero.jpg
│   ├── ventana-proyectante.jpg
│   ├── mampara-elegante.jpg
│   ├── mampara-marco-negro.jpg
│   ├── mampara-bano.jpg
│   ├── espejo-decorativo.jpg
│   └── ventana-decorada.jpg
├── docs/
│   └── PROJECT.md
├── .gitignore
├── LICENSE
├── README.md
└── CNAME            (solo si hay dominio propio comprado)
```

---

## 5. Paleta de colores

```css
:root {
  --color-text:       #1a1a1a;   /* Charcoal — texto principal */
  --color-text-soft:  #6b6b6b;   /* Gris medio — texto secundario */
  --color-bg:         #fafaf7;   /* Off-white cálido — fondo */
  --color-surface:    #ffffff;   /* Blanco puro — tarjetas */
  --color-accent:     #a87b4a;   /* Bronce — acentos y CTAs */
  --color-accent-dk:  #8a6238;   /* Bronce oscuro — hover */
  --color-border:     #e8e4dc;   /* Beige neutro — divisores */
  --color-whatsapp:   #25D366;   /* Verde oficial WhatsApp */
}
```

**Reglas de uso:**
- Bronce solo en CTAs, acentos puntuales y el panel del logo. No saturarlo.
- Verde WhatsApp solo en botones de WhatsApp. Nada más.
- Off-white de fondo en vez de blanco puro. Evita lo "frío clínico".

---

## 6. Tipografías

**Importación en `<head>`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
```

**Asignación:**

```css
:root {
  --font-display: 'Fraunces', Georgia, serif;     /* Títulos */
  --font-body:    'Inter Tight', system-ui, sans-serif;  /* Cuerpo */
}

body { font-family: var(--font-body); }
h1, h2, h3 { font-family: var(--font-display); }
```

**Jerarquía sugerida (mobile-first):**

| Elemento | Tamaño móvil | Tamaño desktop | Peso |
|---|---|---|---|
| H1 (hero) | 2.5rem | 4rem | 700 |
| H2 (secciones) | 1.75rem | 2.5rem | 600 |
| H3 (tarjetas) | 1.25rem | 1.5rem | 600 |
| Body | 1rem | 1.05rem | 400 |
| Small | 0.875rem | 0.9rem | 400 |

---

## 7. Logo

El archivo SVG ya está en `img/logo.svg`. Código de referencia:

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cristalería Giovanny">
  <rect x="25" y="30" width="22" height="22" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <rect x="25" y="52" width="22" height="22" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <rect x="47" y="52" width="22" height="22" fill="none" stroke="#1a1a1a" stroke-width="3"/>
  <rect x="53" y="16" width="22" height="22" fill="#a87b4a" stroke="#1a1a1a" stroke-width="3"/>
</svg>
```

**Implementación recomendada:** inline en el HTML (no como `<img>`) para poder animar/recolorear con CSS.

**Concepto:** los 4 paneles representan una ventana clásica; el panel superior derecho elevado en bronce representa una **ventana proyectante** — el servicio estrella del negocio. El logo cuenta lo que hace el taller sin necesidad de texto.

**Favicon:** mismo SVG, copiar a `img/favicon.svg`. Apple touch icon: convertir a PNG de 180×180 si se quiere mejor render en iOS.

---

## 8. Arquitectura de secciones (orden vertical en mobile)

### 8.1 Header (sticky)
- Logo SVG a la izquierda
- Botón WhatsApp a la derecha (visible siempre)
- En desktop: menú con anchors (Servicios, Galería, Sobre, Contacto)
- En mobile: menú hamburguesa

### 8.2 Hero
- **H1:** "Cristalería y herrería con más de 25 años de oficio."
- **Subtítulo:** "Fabricación e instalación a la medida. Miranda y Caracas. Servicio a domicilio."
- **CTA primario:** botón "Pedir presupuesto por WhatsApp" (verde WhatsApp)
- **CTA secundario:** "Ver trabajos" (anchor a galería, texto con flecha)
- **Imagen:** ventana proyectante (foto del cliente) — derecha en desktop, debajo en mobile

### 8.3 Servicios
Grid de 6 tarjetas. Cada tarjeta: icono SVG + título + descripción corta + "Consultar" (link a WhatsApp).

1. **Ventanas panorámicas** — Vistas amplias, máxima entrada de luz natural.
2. **Ventanas belglass** — Sistema corredizo elegante para espacios modernos.
3. **Ventanas proyectantes** — Apertura hacia afuera, ventilación sin perder espacio.
4. **Puertas de baño** — Vidrio templado a la medida, herrajes durables.
5. **Espejos y herrería** — Espejos decorativos, barandas, rejas, estructuras a pedido.
6. **Remodelaciones** — Asesoría y fabricación para proyectos completos.

### 8.4 Galería
Grid de 6 fotos (las del cliente). Click → lightbox modal.
- En mobile: 1 columna
- En tablet: 2 columnas
- En desktop: 3 columnas con un poco de masonry (alturas variables)

### 8.5 Sobre el taller
Bloque de dos columnas (desktop) / una columna (mobile):
- Izquierda: foto del Sr. Giovanny o del taller (cuando esté disponible). Mientras no haya, usar una foto del trabajo más representativo.
- Derecha: copy aprobado (versión media).

**Copy:**
> Cristalería Giovanny es un taller de fabricación e instalación con más de 25 años de experiencia en el rubro del vidrio y el aluminio. Trabajamos cada pieza por encargo: ventanas panorámicas, proyectantes y tipo belglass, puertas de baño en vidrio templado, espejos decorativos y herrería en general.
>
> Cubrimos todo el estado Miranda y zonas de Caracas, llevando el servicio directo a tu hogar u obra. Medimos, presupuestamos y fabricamos a la medida exacta de cada espacio. Sin compromiso.

**Badges destacados al final del bloque:**
- ✓ +25 años de oficio
- ✓ Presupuestos sin costo
- ✓ Servicio a domicilio
- ✓ Trabajo respaldado por experiencia

### 8.6 Testimonios
Carrusel automático con 4 visibles a la vez en desktop (1 en mobile). Auto-rotación cada 5s, pausa al hover.

### 8.7 Cobertura y horario
Tres bloques horizontales (mobile: apilados):
- 📍 **Zonas:** Estado Miranda y Caracas
- 🕐 **Horario:** Lun–Vie 8 am – 6 pm · Sábados con cita previa
- 🚚 **A domicilio:** Mediciones, presupuestos e instalación

(Iconos en estilo line-art, en bronce.)

### 8.8 Métodos de pago
Fila de iconos/badges con etiquetas: **Bolívares · USD efectivo · Zelle · Pago Móvil · Transferencia**

### 8.9 CTA final
Fondo bronce con texto claro encima:
- **H2:** "¿Listo para tu proyecto?"
- Texto: "Pídenos tu presupuesto sin compromiso. Te atendemos por WhatsApp en horario laboral."
- Botón grande: "Escríbenos por WhatsApp"

### 8.10 Footer
- Logo en pequeño
- Datos: WhatsApp, zona, horario
- Redes (cuando estén): Instagram, Facebook
- Copyright: `© 2026 Cristalería Giovanny. Todos los derechos reservados.`
- Crédito discreto: "Diseño y desarrollo: [tu nombre/handle]" (suma a portafolio)

### 8.11 Botón flotante WhatsApp
Fixed bottom-right. Visible en todas las secciones excepto el hero (para no duplicar CTA). Animación sutil de pulso al cargar y cada 30s.

---

## 9. Testimonios (formato final aprobado)

Mostrar 4 visibles + carrusel rotando entre los 10. **Sin fotos de perfil.**

```
⭐⭐⭐⭐⭐  M.F.R. — Puerta de baño, Caracas
"Excelente trabajo. Me instalaron una puerta de baño en vidrio templado y quedó muy limpia, bien medida y firme. Fueron puntuales y explicaron todo antes de empezar."

⭐⭐⭐⭐½  J.A.P. — Ventanas, apartamento
"Mandé a hacer unas ventanas y quedaron bastante bien. Buena atención y buen acabado. Tardaron un poco más de lo previsto, pero el resultado valió la pena."

⭐⭐⭐⭐⭐  C.M. — Medición a domicilio, Miranda
"Muy responsables. Vinieron a medir, me dieron presupuesto sin compromiso y luego instalaron todo sin desorden. Se nota la experiencia."

⭐⭐⭐⭐  L.A.G. — Reparación ventana proyectante
"Buen servicio y precios razonables. Me repararon una ventana proyectante que ya daba problemas. Quedó funcionando mucho mejor."

⭐⭐⭐⭐⭐  A.V. — Espejo decorativo, sala
"Quedé encantada con el espejo decorativo. La medida fue exacta y el acabado se ve elegante. Los recomiendo."

⭐⭐⭐⭐½  R.C. — Puerta de baño + herrería
"Trabajo serio, sin inventos raros. Se nota que saben lo que hacen."

⭐⭐⭐⭐⭐  V.H. — Asesoría y vidrio templado
"Excelente atención desde el primer mensaje. Me orientaron sobre qué tipo de vidrio usar y el resultado quedó mejor de lo que esperaba."

⭐⭐⭐½  M.A.R. — Instalación
"El trabajo quedó bien instalado y el material se ve de calidad. Hubo un detalle con el horario, pero respondieron y resolvieron sin problema."

⭐⭐⭐⭐½  G.S. — Ventanas panorámicas, remodelación
"Pedí unas ventanas panorámicas y quedaron muy bonitas. Buen trato, buena instalación y dejaron el área limpia."

⭐⭐⭐⭐  C.E.R. — Servicio a domicilio en Miranda
"Presupuesto rápido y atención a domicilio. La instalación quedó bien. Los volvería a llamar."
```

---

## 10. Imágenes del cliente

7 fotos reales del trabajo del taller (JPG). Renombrar al guardarlas:

| Archivo final | Contenido |
|---|---|
| `ventana-proyectante.jpg` | Ventana proyectante blanca abierta sobre fachada oscura |
| `mampara-elegante.jpg` | Mampara de baño con pared decorada en hojas doradas |
| `espejo-decorativo.jpg` | Espejo con marco ranurado de madera |
| `mampara-marco-negro.jpg` | Mampara de baño con marco negro fino |
| `mampara-bano.jpg` | Mampara con vista a ventana de cuadrícula |
| `ventana-decorada.jpg` | Ventana con vidrio cortado en diseño curvo |
| `hero.jpg` | Selección para el hero (sugerencia: `ventana-proyectante.jpg`) |

**Optimización obligatoria antes de subir:**
- Pasar todas por TinyPNG o Squoosh (objetivo: < 200 KB cada una).
- Servir en formato WebP con fallback JPG (`<picture>`).
- Atributos `loading="lazy"` en todas excepto la del hero.

---

## 11. SEO y metadata

### `<head>` recomendado

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cristalería Giovanny — Ventanas, puertas de baño y herrería en Miranda y Caracas</title>
<meta name="description" content="Fabricación e instalación de ventanas, puertas de baño y herrería en Miranda y Caracas. Más de 25 años de experiencia. Servicio a domicilio. Presupuestos sin costo.">

<!-- SEO local -->
<meta name="geo.region" content="VE-M">
<meta name="geo.placename" content="Miranda, Venezuela">

<!-- Open Graph (compartir en redes/WhatsApp) -->
<meta property="og:title" content="Cristalería Giovanny — Vidrio y aluminio en Miranda y Caracas">
<meta property="og:description" content="Fabricación e instalación con más de 25 años de oficio. Pide tu presupuesto por WhatsApp.">
<meta property="og:image" content="https://[dominio]/img/hero.jpg">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_VE">

<link rel="icon" type="image/svg+xml" href="img/favicon.svg">
<link rel="canonical" href="https://[dominio]/">
```

### Schema.org LocalBusiness (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cristalería Giovanny",
  "image": "https://[dominio]/img/hero.jpg",
  "description": "Fabricación e instalación de ventanas, puertas de baño, espejos y herrería. Más de 25 años de experiencia.",
  "telephone": "+584142325258",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Miranda",
    "addressCountry": "VE"
  },
  "areaServed": ["Miranda", "Caracas"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": "Cash, USD, Zelle, Bank Transfer, Mobile Payment"
}
</script>
```

---

## 12. Accesibilidad

- Todas las imágenes con `alt` descriptivo (no decorativo: usar `alt=""`).
- Contraste mínimo AA (cumple con la paleta definida).
- Foco visible (`outline` en botones y links).
- `<button>` para acciones, `<a>` para navegación. No mezclar.
- Tamaño táctil mínimo 44×44 px en botones móviles.
- ARIA labels en el botón flotante de WhatsApp y en el menú hamburguesa.
- Soporte de teclado completo (carrusel y lightbox navegables sin mouse).

---

## 13. Performance (objetivos Lighthouse)

| Métrica | Objetivo |
|---|---|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

**Reglas:**
- CSS y JS críticos inline en `<head>`. Resto diferido.
- Imágenes WebP con lazy loading.
- Fuentes con `display=swap`.
- Sin librerías externas pesadas. No jQuery. No Bootstrap.

---

## 14. Configuración del repositorio GitHub

### Crear el repo

- **Nombre:** `cristaleria-giovanny`
- **Visibilidad:** Public (para que sirva de portafolio)
- **Inicializar con:**
  - ✅ README.md
  - ✅ .gitignore (template: ninguno, lo personalizamos)
  - ✅ LICENSE (MIT)

### `.gitignore`

```
# OS
.DS_Store
Thumbs.db

# Editores
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Node (por si en el futuro se agrega tooling)
node_modules/
package-lock.json

# Builds
dist/
build/

# Variables sensibles
.env
.env.local
```

### Activar GitHub Pages

1. Push del repo a `main` con el `index.html` en la raíz.
2. Ir a **Settings → Pages**.
3. **Source:** Deploy from a branch.
4. **Branch:** `main` / `/ (root)`.
5. Guardar. GitHub asigna URL del tipo `https://[usuario].github.io/cristaleria-giovanny/`.

### Custom domain (cuando se compre)

1. Crear archivo `CNAME` en la raíz del repo con el dominio (solo el dominio, sin `https://`):
   ```
   cristaleriagiovanny.com
   ```
2. En el panel del proveedor de dominio, agregar registros DNS:
   - **A records** apuntando a las IPs de GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** para `www`:
     ```
     www → [usuario].github.io
     ```
3. En **Settings → Pages**, escribir el dominio personalizado y activar **Enforce HTTPS** (esperar a que Let's Encrypt emita el certificado, ~10 min).

---

## 15. Convenciones de Git

### Commits semánticos (Conventional Commits)

Formato: `tipo: descripción corta en imperativo`

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios visuales (CSS, no afectan lógica) |
| `refactor:` | Reorganización de código sin cambiar comportamiento |
| `docs:` | Documentación |
| `chore:` | Tareas de mantenimiento (configs, deps) |
| `perf:` | Optimización de performance |
| `a11y:` | Mejoras de accesibilidad |

**Ejemplos:**
```
feat: add hero section with WhatsApp CTA
style: update accent color to bronze (#a87b4a)
fix: correct mobile menu overflow on small screens
a11y: add aria-labels to floating WhatsApp button
docs: update README with deploy instructions
perf: convert hero image to WebP
```

### Branches

- `main` — producción. Todo merge debe estar listo para deploy.
- `feature/[nombre]` — desarrollo de features (ej: `feature/testimonials-carousel`).
- `fix/[nombre]` — correcciones (ej: `fix/mobile-menu-overflow`).

Para esta fase inicial, trabajar directo en `main` está bien. Adoptar branches cuando entren features grandes (formulario, blog, etc.).

---

## 16. README.md sugerido

```markdown
# Cristalería Giovanny

Sitio web institucional para Cristalería Giovanny, taller de fabricación e instalación de vidrio y aluminio con más de 25 años de oficio en Miranda y Caracas, Venezuela.

🔗 **Demo en vivo:** [cristaleriagiovanny.com](https://cristaleriagiovanny.com)

![Vista previa del sitio](./img/preview.png)

## Stack

- HTML5 semántico
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript vanilla (sin frameworks)
- Hospedado en GitHub Pages

## Características

- Diseño responsive mobile-first
- WhatsApp como CTA principal con botón flotante
- Galería de trabajos con lightbox
- Carrusel de testimonios
- SEO local optimizado (Schema.org LocalBusiness)
- Lighthouse 95+ en todas las métricas

## Estructura

```
cristaleria-giovanny/
├── index.html
├── css/styles.css
├── js/script.js
├── img/
└── docs/PROJECT.md
```

## Correr localmente

No requiere build ni instalación. Basta con:

```bash
git clone https://github.com/[usuario]/cristaleria-giovanny.git
cd cristaleria-giovanny
# Abrir index.html en el navegador, o usar un servidor estático:
python3 -m http.server 8000
```

## Autor

**[Tu nombre / handle]** — Estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM).

- GitHub: [@usuario](https://github.com/usuario)
- LinkedIn: [perfil](https://linkedin.com/in/usuario)

## Licencia

MIT © 2026 [Tu nombre]
```

---

## 17. Roadmap (fases futuras)

### Fase 1 — Esta entrega (MVP)
- [x] Estructura definida
- [ ] Landing page completa con todas las secciones
- [ ] Deploy en GitHub Pages
- [ ] Conexión con dominio propio

### Fase 2 — Mejoras
- [ ] Formulario de contacto (con Formspree o Netlify Forms)
- [ ] Integración con Google Maps cuando exista dirección
- [ ] Sección de FAQ (preguntas frecuentes)
- [ ] Versión en inglés (si aplica)

### Fase 3 — Crecimiento
- [ ] Blog/recursos (cuidado del vidrio, tipos de ventana, etc.) para SEO orgánico
- [ ] Panel de programación de historias de Instagram (proyecto aparte, ver nota)
- [ ] Sistema de cotización automatizada por WhatsApp

### Nota sobre el panel de Instagram
Es un proyecto independiente que requiere:
- API oficial de Meta (Graph API) — solo funciona para Reels y posts, no para Stories desde scripts.
- Alternativa legal: integración con Metricool/Buffer/Later (tienen API).
- No usar librerías no oficiales (`instagrapi`, etc.) — riesgo de baneo de cuenta.

---

## 18. Decisiones tomadas (registro)

- **Logo:** diseño vectorial original, exportado a SVG. Concepto: ventana de 4 paneles con uno proyectante en bronce.
- **Sin testimonios falsos con nombres completos:** se reformatearon a iniciales + zona/contexto para reducir riesgo y mantener profesionalismo.
- **Sin garantía formal mientras no se defina:** se usa fórmula "trabajo respaldado por más de 25 años de experiencia".
- **Mobile-first:** decisión no negociable. ~90% del tráfico será móvil.
- **Sin frameworks JS:** decisión consciente por aprendizaje DAM y portabilidad.

---

## 19. Pendientes del cliente

Datos a recolectar antes del go-live:
- [ ] Dirección exacta del taller
- [ ] RIF del negocio
- [ ] Email institucional
- [ ] Foto del Sr. Giovanny o del taller
- [ ] Cuentas oficiales de Instagram y Facebook (cuando se creen)
- [ ] Definición formal de garantía (años, alcance)
- [ ] Tiempo de entrega promedio por tipo de trabajo

---

**Versión del documento:** 1.0
**Última actualización:** Mayo 2026
