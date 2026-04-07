# START — Viamonte Psicología

Guía de referencia para trabajar en la web de Carmen Viamonte en cualquier sesión o entorno nuevo.

---

## Proyecto

- **Ruta local:** `/Users/julio.garcia/Desktop/Antigravity projects/Proyectos en curso/Viamonte Astro`
- **Repo GitHub:** `juliogv00/viamonte-astro`
- **Web en producción:** `https://viamonte-psicologia.juliogv00.workers.dev`
- **Dominio final:** `viamontepsicologia.com` (pendiente conectar al worker)
- **Panel CMS:** `https://viamonte-psicologia.juliogv00.workers.dev/_emdash/admin`

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 6 (SSR) |
| CMS | Emdash (panel visual `/_emdash/admin`) |
| CSS | Tailwind v4 (`@tailwindcss/vite`) |
| Animaciones | GSAP + Lenis + SplitType |
| Infraestructura | Cloudflare Workers + D1 + R2 |

---

## Flujo de trabajo

### 1. Desarrollo local

```bash
cd "/Users/julio.garcia/Desktop/Antigravity projects/Proyectos en curso/Viamonte Astro"
npm run dev
```

Abre `http://localhost:4321` en el navegador.

### 2. Hacer cambios

Editar los archivos en `src/`:

| Qué quieres tocar | Dónde |
|---|---|
| Secciones de la home | `src/components/*.astro` |
| Estilos globales, fuentes, cursor | `src/layouts/BaseLayout.astro` |
| Animaciones GSAP | `src/scripts/animations.js` |
| Colores, tipografía Tailwind | `tailwind.config.mjs` |
| Página de blog | `src/pages/blog/index.astro` |

### 3. Build

```bash
npm run build
```

Genera `dist/` con el Worker compilado.

### 4. Deploy a producción

```bash
cd dist/server
npx wrangler deploy --config wrangler.json
```

Los cambios se publican en `viamonte-psicologia.juliogv00.workers.dev` en ~30 segundos.

### 5. Push a GitHub (para tener copia de seguridad)

```bash
cd "/Users/julio.garcia/Desktop/Antigravity projects/Proyectos en curso/Viamonte Astro"
git add -A
git commit -m "descripción del cambio"
git push
```

> GitHub **no despliega automáticamente** — el deploy se hace siempre con el paso 4.

---

## Cloudflare — recursos creados

| Recurso | Nombre | ID |
|---|---|---|
| Worker | `viamonte-psicologia` | — |
| D1 Database | `viamonte-psicologia` | `c7419735-89be-496a-9047-a2b7a08e1ad1` |
| R2 Bucket | `viamonte-media` | — |

Para gestionar estos recursos: `dash.cloudflare.com` → cuenta `juliogv00`.

---

## Tareas pendientes

- [ ] Conectar dominio `viamontepsicologia.com` al worker en Cloudflare Dashboard → Workers & Pages → `viamonte-psicologia` → Settings → Domains & Routes → Add Custom Domain

---

## Notas importantes

- **No subir `.wrangler/`** a git — está en `.gitignore`. Contiene bases de datos locales y tokens de sesión.
- El `wrangler.jsonc` de la raíz define los bindings (DB, R2). El `dist/server/wrangler.json` lo genera el build automáticamente — no editarlo a mano.
- Astro 6 requiere **Node.js 22** — verificar con `node -v` si algo falla en el build.
- Emdash **no es compatible con Cloudflare Pages** — el deploy es siempre vía `wrangler deploy`, nunca desde el panel de Pages.
