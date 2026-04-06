// src/ui.js
import { gsap } from './lenis.js';
import { EASE, DUR } from './constants.js';

// ── Testimonials data ──────────────────────────────────────
const testimonials = [
  {
    text: '"Llegué a consulta con ataques de ansiedad casi diarios. Carmen me ayudó a entender que la ansiedad no era el enemigo, sino una alarma. El trabajo que hicimos me cambió la perspectiva por completo."',
    author: '— Carlos M.',
  },
  {
    text: '"Llevaba años repitiendo los mismos patrones en mis relaciones. Con Carmen entendí de dónde venían y, por primera vez, pude hacer algo diferente. Ha sido un proceso transformador."',
    author: '— Laura P.',
  },
  {
    text: '"La primera sesión gratuita me dio la confianza que necesitaba para dar el paso. Carmen crea un espacio donde te sientes completamente seguro para hablar de lo que sea."',
    author: '— Andrés R.',
  },
];

// ── Focus trap utility ─────────────────────────────────────
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }
  element.addEventListener('keydown', handler);
  return () => element.removeEventListener('keydown', handler);
}

// ── Modal de Contacto ──────────────────────────────────────
let modalTrigger = null;
let removeTrap   = null;

function toggleModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const isOpen = modal.classList.contains('is-open');

  if (!isOpen) {
    // Remember what triggered the modal so we can restore focus on close
    modalTrigger = document.activeElement;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        modal.removeAttribute('aria-hidden');
        // Move focus to the close button inside the visible step
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
        firstFocusable?.focus();
        removeTrap = trapFocus(modal);
      });
    });
  } else {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      goToStep(1);
      if (removeTrap) { removeTrap(); removeTrap = null; }
      // Restore focus
      modalTrigger?.focus();
      modalTrigger = null;
    }, 300);
  }
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('contactModal');
    if (modal?.classList.contains('is-open')) toggleModal();

    const mobileMenu = document.getElementById('mobile-menu');
    if (isMobileMenuOpen) toggleMobileMenu();
  }
});

// ── Modal steps ────────────────────────────────────────────
let currentTipo = '';

function goToStep(step, tipo) {
  const step1  = document.getElementById('modal-step-1');
  const step2  = document.getElementById('modal-step-2');
  const title  = document.getElementById('modal-step-2-title');
  const tipoInput = document.getElementById('modal-tipo');

  if (step === 1) {
    step2?.classList.add('hidden');
    step1?.classList.remove('hidden');
    // Update dialog label to reflect current step
    document.getElementById('contactModal')?.setAttribute('aria-labelledby', 'modal-heading-1');
    step1?.querySelector('button, [href], input')?.focus();
  } else {
    currentTipo = tipo || currentTipo;
    if (tipoInput) tipoInput.value = currentTipo;
    if (title) {
      title.innerHTML = currentTipo === 'primera'
        ? 'Cuéntame<br>un poco'
        : 'Bienvenida<br>de nuevo';
    }
    step1?.classList.add('hidden');
    step2?.classList.remove('hidden');
    document.getElementById('contactModal')?.setAttribute('aria-labelledby', 'modal-heading-2');
    // @ts-ignore
    if (typeof lucide !== 'undefined') lucide.createIcons();
    step2?.querySelector('button, [href], input')?.focus();
  }
}

// ── Menú Móvil ─────────────────────────────────────────────
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  const btn      = document.getElementById('mobile-menu-btn');
  const menu     = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  isMobileMenuOpen = !isMobileMenuOpen;
  const icon = btn.querySelector('i');

  btn.setAttribute('aria-expanded', String(isMobileMenuOpen));
  btn.setAttribute('aria-label', isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú');

  if (isMobileMenuOpen) {
    menu.classList.remove('translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');
    menu.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    icon?.setAttribute('data-lucide', 'x');
    gsap.fromTo(
      '#mobile-menu nav a, #mobile-menu button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: EASE.out, stagger: 0.06, delay: 0.15 }
    );
    // Focus first link
    setTimeout(() => menu.querySelector('a')?.focus(), 200);
  } else {
    menu.classList.add('translate-x-full', 'opacity-0');
    menu.classList.remove('translate-x-0', 'opacity-100');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    icon?.setAttribute('data-lucide', 'menu');
    btn.focus();
  }
  // @ts-ignore
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ── Navbar blur on scroll ──────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener(
    'scroll',
    () => {
      if (!navbar) return;
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-sm', 'bg-[#EEE5DB]/95');
        navbar.classList.remove('bg-[#EEE5DB]/90');
      } else {
        navbar.classList.remove('shadow-sm', 'bg-[#EEE5DB]/95');
        navbar.classList.add('bg-[#EEE5DB]/90');
      }
    },
    { passive: true }
  );
}

// ── Scroll reveal ──────────────────────────────────────────
function initScrollReveal() {
  function reveal() {
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
}

// ── Testimonials ───────────────────────────────────────────
function updateDots(index) {
  document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
    const isActive = i === index;
    dot.classList.toggle('w-6', isActive);
    dot.classList.toggle('bg-main', isActive);
    dot.classList.toggle('w-2', !isActive);
    dot.classList.toggle('bg-main/20', !isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function showTestimonial(index) {
  const textEl   = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  if (!textEl || !authorEl) return;

  // Unified animation: opacity + y — no blur
  const tl = gsap.timeline();
  tl.to([textEl, authorEl], {
    opacity: 0, y: -8,
    duration: 0.22, ease: 'power2.in',
  });
  tl.call(() => {
    textEl.textContent   = testimonials[index].text;
    authorEl.textContent = testimonials[index].author;
    updateDots(index);
    // Announce to screen readers
    const live = document.getElementById('testimonial-live');
    if (live) live.textContent = `${testimonials[index].text} ${testimonials[index].author}`;
  });
  tl.fromTo(
    [textEl, authorEl],
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out', stagger: 0.05 }
  );
}

function initTestimonials() {
  let current = 0;

  document.getElementById('prev-testimonial')?.addEventListener('click', () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
  });

  document.getElementById('next-testimonial')?.addEventListener('click', () => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  });

  document.querySelectorAll('.testimonial-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      if (!isNaN(idx) && idx !== current) {
        current = idx;
        showTestimonial(current);
      }
    });
  });
}

// ── Mobile menu wiring ─────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  if (btn) btn.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobileMenuOpen) toggleMobileMenu();
    });
  });
}

// ── Form submit ────────────────────────────────────────────
function handleFormSubmit(event) {
  event.preventDefault();
  toggleModal();
}

// ── Public API ─────────────────────────────────────────────
export { initNavbar };

export function initUI() {
  initNavbar();
  initScrollReveal();
  initTestimonials();
  initMobileMenu();
}

window.toggleModal      = toggleModal;
window.toggleMobileMenu = toggleMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.goToStep         = goToStep;
