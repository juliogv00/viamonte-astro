# DESIGN.md — Carmen Viamonte · Psicología y Psicoanálisis

> Este documento define el sistema de diseño del sitio de Carmen Viamonte.
> Está inspirado en los principios de Apple (precisión tipográfica, whitespace dramático),
> Airbnb (calidez, fotografía como protagonista) y Notion (bordes whisper, elevación sutil, warm neutrals).
> Los agentes de IA deben leer este documento antes de generar o modificar cualquier UI.

---

## 1. Visual Theme & Atmosphere

El sitio de Carmen Viamonte es un espacio de calma y confianza. El diseño nunca compite con el mensaje — actúa como un fondo cuidado que invita a detenerse. La paleta warm sand y los tipados redondeados de Parkinsans crean una presencia cálida pero profesional, nunca clínica.

La analogía visual es la de un despacho bien cuidado: luz natural, materiales de calidad, ningún elemento innecesario. La marca no grita — susurra con confianza.

**Principios clave:**
- Warmth over sterility: colores arena y marrón, nunca gris frío
- Tipografía como jerarquía: Parkinsans para display (emoción), Instrument Sans para cuerpo (claridad)
- Whitespace generoso — el vacío comunica tanto como el contenido
- Fotografía de naturaleza y paisaje como metáfora del proceso terapéutico
- Un solo color de acción: verde (#3B6544 / #4A8A57) — nunca naranja, nunca rojo
- Animaciones de entrada unificadas: `opacity 0, y: N → opacity 1, y: 0` siempre

---

## 2. Color Palette & Roles

### Fondos
- **Base** (`#EEE5DB`): Fondo principal. Arena cálida, nunca blanco puro.
- **Sección alternada**: misma base, sin cambio brusco. El ritmo visual viene del espaciado.

### Texto
- **Main** (`#553527`): Texto principal, headings. Marrón cálido, nunca negro puro.
- **Muted** (`#7A6256`): Texto secundario, descripciones, metadatos.
- **Testimonial** (`#503629`): Variante ligeramente más oscura para citas destacadas.

### Acción
- **Accent** (`#3B6544`): Verde marca. CTAs primarios, enlaces activos, tags de énfasis.
- **Forest** (`#4A8A57`): Verde secundario. Hover states, labels, decoración.

### Sombras
- **Soft**: `0 12px 40px rgba(85, 53, 39, 0.05)` — elevación mínima, tarjetas en reposo.
- **Hover**: `0 20px 50px rgba(85, 53, 39, 0.12)` — elevación en hover, feedback táctil.
- **Glow**: `0 0 15px rgba(74, 138, 87, 0.5)` — aura verde para elementos de acción en dark.

### Bordes
- **Whisper**: `1px solid rgba(85, 53, 39, 0.12)` — divisores de sección, tarjetas, inputs.
- **Tag border**: `border border-main/25` — tags de especialidad, chips.

---

## 3. Typography Rules

### Fuentes
- **Display**: `Parkinsans` — headings, títulos de sección, citas, números grandes. Redondeado, humano, distintivo.
- **Body**: `Instrument Sans` — cuerpo de texto, labels, UI, navegación. Claro, legible, neutro.

### Jerarquía

| Rol | Fuente | Tamaño | Peso | Line Height | Letter Spacing | Uso |
|-----|--------|--------|------|-------------|----------------|-----|
| Hero Display | Parkinsans | clamp(4rem, 8vw, 5.5rem) | 700 | 1.05 | -0.02em | Título principal del hero |
| Section Heading | Parkinsans | clamp(2.5rem, 5vw, 4rem) | 700 | 1.1 | -0.02em | H2 de secciones |
| Card Heading | Parkinsans | 1.25rem–1.5rem | 700 | 1.2 | -0.01em | Tarjetas, testimonios |
| Quote | Parkinsans | clamp(1.25rem, 2.5vw, 2.25rem) | 500 | 1.6 | normal | Citas, frases destacadas |
| Body Large | Instrument Sans | 1.125rem | 300 | 1.7 | normal | Párrafos principales |
| Body | Instrument Sans | 1rem | 400 | 1.65 | normal | Cuerpo estándar |
| Label / Tag | Instrument Sans | 0.625rem–0.75rem | 700 | 1.3 | 0.15em | uppercase, etiquetas de sección |
| Button | Instrument Sans | 0.875rem–1rem | 600–700 | 1 | normal | CTAs |
| Meta | Instrument Sans | 0.625rem | 500 | 1.3 | 0.05em | Fechas, metadatos |

### Principios
- **Parkinsans solo para display** (≥1.25rem o roles emocionales). Nunca para cuerpo o UI pequeño.
- **Negative tracking en headings**: siempre `-0.01em` a `-0.02em` en títulos grandes.
- **Labels siempre uppercase** con `tracking-widest` (`letter-spacing: 0.15em`).
- **Pesos restringidos**: body usa 300–400, UI usa 500–600, headings usan 700–800.

---

## 4. Component Stylings

### Botones

**Primario (CTA principal)**
- Background: `#3B6544` (accent) o `#4A8A57` (forest)
- Texto: `#EEE5DB`
- Padding: `px-6 py-3` a `px-8 py-4`
- Radius: `rounded-full` (píldora completa)
- Hover: `bg-forest/90` + `translateY(-1px)` + `shadow-hover`
- Font: Instrument Sans 600–700, 0.875rem–1rem

**Secundario (outline)**
- Background: transparent
- Border: `border border-main/30`
- Texto: `#553527`
- Hover: `bg-main` + `text-[#EEE5DB]`
- Radius: `rounded-full`

**Terciario (texto con underline)**
- Background: transparent
- Texto: `#553527` con `border-b border-main`
- Hover: color → `#4A8A57`, border-color → `#4A8A57`

### Tarjetas
- Background: `#EEE5DB` (mismo que fondo) — elevación solo por sombra
- Border: `1px solid rgba(85, 53, 39, 0.10)` (whisper)
- Radius: `rounded-[1.5rem]` a `rounded-[2rem]`
- Shadow en reposo: `shadow-soft`
- Shadow en hover: `shadow-hover` + `translateY(-8px)`
- Transición: `0.5s cubic-bezier(0.25, 0.8, 0.25, 1)`

### Inputs & Formularios
- Background: transparent
- Border: `border border-main/25`
- Radius: `rounded-xl` (inputs) / `rounded-2xl` (textareas)
- Focus: `border-main` + `ring-1 ring-main`
- Placeholder: `text-main/30`
- Font: Instrument Sans 300–400

### Modales
- Backdrop: `bg-main/50` + `backdrop-blur-[8px]`
- Panel: `bg-[#EEE5DB]`, `rounded-[2rem]`, `shadow-2xl`
- Entrada: `translateY(16px) opacity-0` → `translateY(0) opacity-1`, `0.35s cubic-bezier(0.22, 1, 0.36, 1)`
- Botón de cierre: `text-muted hover:text-main`

### Navegación
- Background: `bg-[#EEE5DB]/90 backdrop-blur-md`
- Sticky top con `border-b border-main/10`
- Links: Instrument Sans 500, 14px, `text-main`
- Hover: color → accent + `underline` animado desde `width: 0`
- CTA: botón primario `rounded-full bg-forest`
- Top bar: `bg-main text-[#EEE5DB]`, 9–10px, `uppercase tracking-widest whitespace-nowrap`

### Tags / Chips de Especialidad
- Border: `border border-main/25`
- Background: transparent → hover `bg-accent text-[#EEE5DB] border-accent`
- Radius: `rounded-full`
- Font: Instrument Sans 500, 0.875rem
- Transición: `0.25s` para background, color, border-color

---

## 5. Layout Principles

### Sistema de espaciado
- Unidad base: 8px (Tailwind default)
- Secciones: `py-16 md:py-24` entre secciones estándar
- Hero: `pt-20 md:pt-24 pb-20 md:pb-28`
- Contenedor máximo: `max-w-7xl mx-auto px-6 lg:px-12`

### Grid
- Home: secciones en stack vertical, sin grid de múltiples columnas excepto `SobreMí` (5+7) y `Testimonios` (1fr + 340px)
- Blog index: featured (2 col en md: imagen 460–520px + texto) + lista de filas
- Blog posts: columna editorial centrada, `max-w-3xl`

### Filosofía de whitespace
- **Respiración cinematográfica**: cada sección tiene su propio ritmo. El espacio no es vacío, es pausa.
- **Separadores invisibles**: las secciones se dividen con `border-b border-main/12` o simplemente con espaciado — nunca con líneas pesadas.
- **Densidad solo donde aporta**: los tags de áreas de trabajo son densos; los párrafos de texto son amplios.

### Border Radius Scale
- `rounded-xl` (12px): inputs, chips pequeños
- `rounded-2xl` (16px): textareas, tarjetas internas
- `rounded-[1.5rem]` (24px): tarjetas estándar, imágenes
- `rounded-[2rem]` (32px): tarjetas grandes, secciones hero
- `rounded-full`: botones, tags, píldoras, avatares

---

## 6. Depth & Elevation

| Nivel | Tratamiento | Uso |
|-------|-------------|-----|
| Plano (0) | Sin sombra | Fondos, texto, separadores |
| Elevado (1) | `shadow-soft` | Tarjetas en reposo |
| Hover (2) | `shadow-hover` + `translateY(-8px)` | Hover sobre tarjetas interactivas |
| Modal (3) | `shadow-2xl` | Paneles modales, overlays |
| Glow (acción) | `shadow-glow` | Elementos de acción en dark backgrounds |

**Filosofía de sombra**: Todas las sombras usan `rgba(85, 53, 39, ...)` — nunca negro puro. El warm tint de la sombra mantiene coherencia con la paleta. Las sombras son soft y difusas (blur alto, opacity baja), nunca duras.

---

## 7. Do's and Don'ts

### Do ✓
- Usar `#EEE5DB` como único fondo de página — nunca blanco puro ni gris
- Reservar Parkinsans para headings, títulos y citas — nunca para body text pequeño
- Usar verde (`#3B6544` / `#4A8A57`) exclusivamente para acciones y highlights
- Aplicar `opacity-0 y:N → opacity-1 y:0` como animación de entrada estándar en todas las secciones
- Labels de sección siempre en `uppercase tracking-widest text-forest text-xs font-bold`
- `rounded-full` para todos los botones CTA
- Sombras siempre con `rgba(85, 53, 39, ...)` para mantener warmth

### Don't ✗
- No usar naranja (`#DD7254`) ni ningún color caliente que no sea el marrón de marca
- No usar `clip-path`, `blur()` ni animaciones de entrada diferentes al estándar `opacity + y`
- No usar `white` puro como fondo de página — siempre `#EEE5DB`
- No aplicar Parkinsans bajo 1.25rem de tamaño
- No añadir bordes pesados en tarjetas — solo whisper borders (`rgba(85,53,39,0.10-0.12)`)
- No usar sombras negras puras (`rgba(0,0,0,...)`) en elementos sobre fondo `#EEE5DB`
- No más de 2 colores de acción visibles simultáneamente en el viewport

---

## 8. Responsive Behavior

### Breakpoints (Tailwind)
| Name | Width | Cambios clave |
|------|-------|---------------|
| mobile | <640px | Stack vertical, sin imágenes flotantes hero, áreas con colapso |
| sm | 640px | 2 columnas en grids de blog |
| md | 768px | Nav completa, imágenes flotantes en hero, hero texto más grande |
| lg | 1024px | Scroll horizontal completo, número de posts en blog, flecha en rows |
| xl | 1280px | Max-width containers activos |

### Estrategia mobile
- Hero: imágenes flotantes ocultas, título 2 líneas fijas con `<br>`, botón "Agendar cita" visible
- Áreas de trabajo: 8 tags visibles + colapso con `max-height` transition
- Top bar: `whitespace-nowrap text-[9px]` — nunca 2 líneas
- Testimonios: column layout, imagen debajo del texto
- Blog: featured en stack vertical, rows compactos sin número ni flecha

### Comportamiento de imágenes
- Hero images: absolutas, `z-0`, detrás del texto, con overlay `bg-main/20`
- Tarjetas: `object-cover object-top` en retratos (carmen.jpeg), `object-cover object-center` en paisajes
- Blog thumbnails: `object-cover`, proporción cuadrada en mobile, rectangular en desktop

---

## 9. Agent Prompt Guide

### Color quick reference
```
Background:     #EEE5DB
Main text:      #553527
Muted text:     #7A6256
Accent (CTA):   #3B6544
Forest (hover): #4A8A57
Border whisper: rgba(85, 53, 39, 0.12)
Shadow warm:    rgba(85, 53, 39, 0.05–0.12)
```

### Prompts de componentes
- **Hero heading**: `font-display text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-main`
- **Section label**: `text-forest font-bold uppercase tracking-widest text-xs mb-3 block`
- **CTA button**: `bg-forest text-[#EEE5DB] px-6 py-3 rounded-full font-bold text-sm hover:bg-forest/90 transition-all`
- **Card**: `bg-[#EEE5DB] border border-main/10 rounded-[2rem] shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-500`
- **Whisper divider**: `border-b border-main/12`
- **Tag chip**: `area-tag border border-main/25 text-main text-sm font-medium px-4 py-2 rounded-full`
- **Entrada animación**: `gsap.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: ... })`

### Iteración
1. Fondo siempre `#EEE5DB` — nunca blanco
2. Un solo acento: verde (`#3B6544`/`#4A8A57`) — para CTAs y highlights únicamente
3. Parkinsans para display, Instrument Sans para todo lo demás
4. Animaciones de entrada: `opacity + y` siempre — cero blur, cero clip-path, cero rotaciones
5. Sombras warm: `rgba(85, 53, 39, ...)` nunca negras
6. Bordes whisper: `rgba(85, 53, 39, 0.10–0.12)` en tarjetas y divisores
7. Botones siempre `rounded-full`
8. Labels de sección siempre `uppercase tracking-widest text-xs text-forest font-bold`
