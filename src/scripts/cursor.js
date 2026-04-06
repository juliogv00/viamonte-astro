// src/cursor.js
import { gsap } from './lenis.js';

export function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot  = document.createElement('div');
  dot.id = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  document.body.append(dot, ring);

  // Dot muy preciso, ring con lag mínimo (apenas perceptible)
  const xDot  = gsap.quickTo(dot,  'x', { duration: 0.06, ease: 'none' });
  const yDot  = gsap.quickTo(dot,  'y', { duration: 0.06, ease: 'none' });
  const xRing = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2.out' });
  const yRing = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    xDot(e.clientX);
    yDot(e.clientY);
    xRing(e.clientX);
    yRing(e.clientY);
  }, { passive: true });

  const interactiveElements = 'a, button, [data-magnetic], details summary, input, textarea, select, label, article';

  document.querySelectorAll(interactiveElements).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    });
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });

  // Cambio de color en el footer (fondo oscuro)
  const footer = document.querySelector('[data-footer]');
  if (footer) {
    footer.addEventListener('mouseenter', () => {
      dot.classList.add('on-dark');
      ring.classList.add('on-dark');
    });
    footer.addEventListener('mouseleave', () => {
      dot.classList.remove('on-dark');
      ring.classList.remove('on-dark');
    });
  }

  setupMagneticButtons();
}

function setupMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const strength = parseFloat(el.dataset.magneticStrength || '0.35');

    el.addEventListener('mousemove', (e) => {
      const rect    = el.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      gsap.to(el, {
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
        duration: 0.4, ease: 'power3.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
