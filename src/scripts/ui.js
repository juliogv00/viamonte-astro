// src/ui.js
import { gsap } from './lenis.js';
import { EASE, DUR } from './constants.js';

// ── Testimonials data ──────────────────────────────────────
const testimonials = [
  {
    quote: '"Llegué con ataques de ansiedad casi diarios. Carmen me ayudó a entender que la ansiedad no era el enemigo, sino una señal. El trabajo que hicimos cambió mi perspectiva por completo."',
    name: 'Carlos M.',
    role: 'Paciente',
  },
  {
    quote: '"Llevaba años repitiendo los mismos patrones en mis relaciones. Con Carmen entendí de dónde venían y, por primera vez, pude hacer algo diferente. Ha sido un proceso transformador."',
    name: 'Laura R.',
    role: 'Paciente',
  },
  {
    quote: '"La primera sesión me dio la confianza que necesitaba para dar el paso. Carmen crea un espacio donde te sientes completamente seguro para hablar de lo que sea."',
    name: 'Miguel T.',
    role: 'Paciente',
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
    modalTrigger = document.activeElement;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        modal.removeAttribute('aria-hidden');
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
      resetModalState();
      if (removeTrap) { removeTrap(); removeTrap = null; }
      modalTrigger?.focus();
      modalTrigger = null;
    }, 300);
  }
}

function resetModalState() {
  const bookingForm    = document.getElementById('bookingForm');
  const firstTimeInfo  = document.getElementById('firstTimeInfo');
  const initialButtons = document.getElementById('initialButtons');
  if (bookingForm)    bookingForm.classList.add('hidden');
  if (firstTimeInfo)  firstTimeInfo.classList.add('hidden');
  if (initialButtons) initialButtons.classList.remove('hidden');
}

function showBookingForm() {
  const initialButtons = document.getElementById('initialButtons');
  const firstTimeInfo  = document.getElementById('firstTimeInfo');
  const bookingForm    = document.getElementById('bookingForm');
  if (initialButtons) initialButtons.classList.add('hidden');
  if (firstTimeInfo)  firstTimeInfo.classList.add('hidden');
  if (bookingForm)    bookingForm.classList.remove('hidden');

  setTimeout(() => {
    if (window.Cal) {
      window.Cal('init', { origin: 'https://cal.com' });
      window.Cal('inline', {
        elementOrSelector: '#calEmbedContainer',
        calLink: 'julio-garcia-uv80qp',
      });
    }
  }, 300);
}

function hideBookingForm() {
  const bookingForm    = document.getElementById('bookingForm');
  const initialButtons = document.getElementById('initialButtons');
  if (bookingForm)    bookingForm.classList.add('hidden');
  if (initialButtons) initialButtons.classList.remove('hidden');
}

function toggleFirstTime() {
  const info = document.getElementById('firstTimeInfo');
  if (info) info.classList.toggle('hidden');
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('contactModal');
    if (modal?.classList.contains('is-open')) toggleModal();

    if (isMobileMenuOpen) toggleMobileMenu();
  }
});

// ── Menú Móvil ─────────────────────────────────────────────
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
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
let currentTestimonial = 0;
let autorotate = true;
let autorotateInterval = null;
let progressInterval = null;
const AUTOROTATE_TIME = 5000;

function updateTestimonialBars(index) {
  document.querySelectorAll('.testimonial-bar').forEach((bar, i) => {
    const isActive = i === index;
    bar.classList.toggle('bg-forest', isActive);
    bar.classList.toggle('bg-main/20', !isActive);
    bar.style.width = '32px';
    bar.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function startProgressAnimation() {
  if (progressInterval) clearInterval(progressInterval);

  document.querySelectorAll('.testimonial-bar').forEach((bar) => {
    bar.style.width = '32px';
  });

  const activeBar = document.querySelector(`.testimonial-bar[data-index="${currentTestimonial}"]`);
  if (activeBar) {
    activeBar.classList.remove('bg-main/20');
    activeBar.classList.add('bg-forest');

    let width = 32;
    const step = 32 / (AUTOROTATE_TIME / 50);
    progressInterval = setInterval(() => {
      width += step;
      if (width >= 64) { width = 64; clearInterval(progressInterval); }
      activeBar.style.width = `${width}px`;
    }, 50);
  }
}

function showTestimonial(index, animate = true) {
  const quoteEl  = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  if (!quoteEl) return;

  currentTestimonial = index;
  const t = testimonials[index];

  if (animate) {
    const tl = gsap.timeline();
    tl.to([quoteEl, authorEl].filter(Boolean), {
      opacity: 0, y: -8,
      duration: 0.22, ease: 'power2.in',
    });
    tl.call(() => {
      quoteEl.textContent = t.quote;
      if (authorEl) authorEl.textContent = `${t.name} — ${t.role}`;
      updateTestimonialBars(index);
      startProgressAnimation();
      const live = document.getElementById('testimonial-live');
      if (live) live.textContent = `${t.quote} ${t.name}`;
    });
    tl.fromTo(
      [quoteEl, authorEl].filter(Boolean),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out', stagger: 0.05 }
    );
  } else {
    quoteEl.textContent = t.quote;
    if (authorEl) authorEl.textContent = `${t.name} — ${t.role}`;
    updateTestimonialBars(index);
    startProgressAnimation();
  }
}

function startAutorotate() {
  if (autorotateInterval) clearInterval(autorotateInterval);
  startProgressAnimation();
  autorotateInterval = setInterval(() => {
    if (autorotate) {
      const next = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(next);
    }
  }, AUTOROTATE_TIME);
}

function stopAutorotate() {
  autorotate = false;
  if (autorotateInterval) { clearInterval(autorotateInterval); autorotateInterval = null; }
  if (progressInterval)   { clearInterval(progressInterval);   progressInterval   = null; }
}

function initTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  showTestimonial(0, false);
  startAutorotate();

  document.getElementById('prev-testimonial')?.addEventListener('click', () => {
    stopAutorotate();
    const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev);
    setTimeout(() => { autorotate = true; startAutorotate(); }, 3000);
  });

  document.getElementById('next-testimonial')?.addEventListener('click', () => {
    stopAutorotate();
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
    setTimeout(() => { autorotate = true; startAutorotate(); }, 3000);
  });

  document.querySelectorAll('.testimonial-bar').forEach((bar) => {
    bar.addEventListener('click', () => {
      stopAutorotate();
      const idx = parseInt(bar.dataset.index, 10);
      if (!isNaN(idx) && idx !== currentTestimonial) showTestimonial(idx);
      setTimeout(() => { autorotate = true; startAutorotate(); }, 3000);
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
window.showBookingForm  = showBookingForm;
window.hideBookingForm  = hideBookingForm;
window.toggleFirstTime  = toggleFirstTime;
