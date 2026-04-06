// src/animations.js — GSAP ScrollTrigger animations
import { gsap, ScrollTrigger } from './lenis.js';
import SplitType from 'split-type';
import { EASE, DUR, STAGGER } from './constants.js';

export function initAnimations() {
  try { setupPageTransition(); } catch(e) { console.warn('pageTransition:', e); }
  try { setupHero(); }          catch(e) { console.warn('hero:', e); }
  try { setupHeroParallax(); }  catch(e) { console.warn('heroParallax:', e); }
  try { setupSVGDrawing(); }    catch(e) { console.warn('svgDraw:', e); }
  try { setupQuote(); }         catch(e) { console.warn('quote:', e); }
  try { setupHorizontalScroll(); } catch(e) { console.warn('hScroll:', e); }
  try { setupTerapia(); }       catch(e) { console.warn('terapia:', e); }
  try { setupCounters(); }      catch(e) { console.warn('counters:', e); }
  try { setupAreas(); }         catch(e) { console.warn('areas:', e); }
  try { setupSobreMi(); }       catch(e) { console.warn('sobreMi:', e); }
  try { setupBlogPreview(); }   catch(e) { console.warn('blog:', e); }
  try { setupTestimonios(); }    catch(e) { console.warn('testimonios:', e); }
  try { setupFAQ(); }           catch(e) { console.warn('faq:', e); }
  try { setupFooter(); }        catch(e) { console.warn('footer:', e); }
}

// ── Page Transition ──────────────────────────────────────────
function setupPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  gsap.fromTo(overlay,
    { scaleY: 1, transformOrigin: 'top' },
    { scaleY: 0, duration: 0.7, ease: EASE.inOut, delay: 0.05 }
  );

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.fromTo(overlay,
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.6, ease: EASE.inOut,
          onComplete: () => { window.location.href = href; } }
      );
    });
  });
}

// ── Hero ─────────────────────────────────────────────────────
function setupHero() {
  const h1 = document.querySelector('[data-split-words]');
  if (!h1) return;

  const split = new SplitType(h1, { types: 'words' });
  h1.style.visibility = 'visible';

  const tl = gsap.timeline({ defaults: { ease: EASE.out } });

  tl.fromTo(split.words,
    { opacity: 0, y: 40, rotateX: -15 },
    { opacity: 1, y: 0, rotateX: 0, duration: DUR.slow, stagger: STAGGER.loose }
  );

  tl.fromTo('[data-hero] [data-fade-up]',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: DUR.normal },
    '-=0.6'
  );

  tl.fromTo('[data-hero-img]',
    { opacity: 0, scale: 0.88, y: 30 },
    { opacity: 0.85, scale: 1, y: 0, duration: DUR.slow, stagger: 0.12 },
    0.3
  );
}

// ── Hero Image Parallax ───────────────────────────────────────
function setupHeroParallax() {
  const images = document.querySelectorAll('[data-hero-img]');
  const rates  = [-0.12, 0.18, -0.08];
  images.forEach((img, i) => {
    gsap.to(img, {
      yPercent: (rates[i] || 0) * 100,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 1.5 },
    });
  });
}

// ── SVG Draw ─────────────────────────────────────────────────
function setupSVGDrawing() {
  const path1 = document.getElementById('svg-path-1');
  const path2 = document.getElementById('svg-path-2');

  if (path1) {
    gsap.fromTo(path1, { strokeDashoffset: 300 }, {
      strokeDashoffset: 0, duration: 2.0, ease: EASE.inOut,
      scrollTrigger: { trigger: '[data-hero]', start: 'top 80%', toggleActions: 'play none none none' },
    });
  }
  if (path2) {
    gsap.fromTo(path2, { strokeDashoffset: 300 }, {
      strokeDashoffset: 0, duration: 2.4, ease: EASE.inOut, delay: 0.4,
      scrollTrigger: { trigger: '[data-hero]', start: 'top 80%', toggleActions: 'play none none none' },
    });
  }

  const underlinePath = document.querySelector('[data-split-words] span svg path');
  if (underlinePath) {
    const len = underlinePath.getTotalLength ? underlinePath.getTotalLength() : 200;
    gsap.set(underlinePath, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(underlinePath, { strokeDashoffset: 0, duration: 0.8, ease: EASE.out, delay: DUR.slow * 0.7 });
  }
}

// ── Quote ─────────────────────────────────────────────────────
function setupQuote() {
  const section = document.querySelector('[data-section="quote"]');
  const quoteEl = section?.querySelector('[data-split-lines]');
  if (!quoteEl) return;

  // Parallax en la imagen de fondo — se mueve más lento que el scroll
  const bgImg = section.querySelector('img');
  if (bgImg) {
    gsap.fromTo(bgImg,
      { yPercent: -10 },
      { yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      }
    );
  }

  // Leve zoom-out de la imagen al entrar en viewport
  gsap.fromTo(bgImg,
    { scale: 1.08 },
    { scale: 1, duration: 1.6, ease: EASE.inOut,
      scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // Reveal de líneas del texto
  const split = new SplitType(quoteEl, { types: 'lines' });
  quoteEl.style.visibility = 'visible';

  split.lines.forEach((line) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow:hidden; display:block;';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.fromTo(split.lines, { y: '105%' }, {
    y: '0%', duration: DUR.slow, ease: EASE.out, stagger: STAGGER.normal,
    scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
  });
}

// ── Horizontal Scroll — GSAP pin replaces h-[600vh] ──────────
function setupHorizontalScroll() {
  const section   = document.getElementById('enfoque-horizontal');
  const track     = document.getElementById('h-track');
  const container = document.getElementById('track-container');
  const progress  = document.getElementById('h-progress');
  const counter   = document.getElementById('h-counter-current');
  const stepCards = document.querySelectorAll('.h-step-card');

  if (!section || !track || !container) return;

  const getMaxScroll = () => Math.max(0, track.scrollWidth - container.clientWidth);

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${getMaxScroll()}`,
    pin: true,
    scrub: 1.2,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p   = self.progress;
      const max = getMaxScroll();

      track.style.transform = `translate3d(-${p * max}px, 0, 0)`;

      if (progress) {
        progress.style.width = `${p * 100}%`;
        progress.parentElement?.setAttribute('aria-valuenow', String(Math.round(p * 100)));
      }

      // Update step counter
      if (counter && stepCards.length) {
        const vw = window.innerWidth;
        let closestIdx = 0;
        let closestDist = Infinity;
        stepCards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - vw / 2);
          if (dist < closestDist) { closestDist = dist; closestIdx = i; }
        });
        counter.textContent = String(closestIdx + 1).padStart(2, '0');
      }

      // Subtle depth effect on cards going offscreen to the left
      const vw = window.innerWidth;
      stepCards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardRight = rect.right;
        if (cardRight < 0) {
          card.style.opacity = '0';
        } else if (cardRight < 120) {
          card.style.opacity = String(cardRight / 120);
        } else {
          card.style.opacity = '1';
        }
      });
    },
  });
}

// ── Terapia ───────────────────────────────────────────────────
function setupTerapia() {
  const terapia = document.getElementById('terapia');
  if (!terapia) return;

  gsap.fromTo(terapia.querySelector('h3'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out,
      scrollTrigger: { trigger: terapia, start: 'top 75%', toggleActions: 'play none none none' } }
  );

  const list = terapia.querySelector('[data-stagger]');
  if (list) {
    gsap.fromTo(list.querySelectorAll('li'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: DUR.normal, ease: EASE.out, stagger: STAGGER.normal,
        scrollTrigger: { trigger: list, start: 'top 80%', toggleActions: 'play none none none' } }
    );
  }

  const priceCard = terapia.querySelector('.border');
  if (priceCard) {
    gsap.fromTo(priceCard,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: DUR.slow, ease: EASE.out,
        scrollTrigger: { trigger: priceCard, start: 'top 85%', toggleActions: 'play none none none' } }
    );
  }
}

// ── Counters ──────────────────────────────────────────────────
function setupCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.textContent.replace(/[\d.]+/, '').trim();
    const obj    = { val: 0 };
    gsap.to(obj, {
      val: target, duration: DUR.counter, ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });
}

// ── Áreas de trabajo ──────────────────────────────────────────
function setupAreas() {
  const section = document.getElementById('areas');
  if (!section) return;

  const tags = section.querySelector('[data-stagger]');
  if (!tags) return;

  gsap.fromTo(tags.querySelectorAll('span'),
    { opacity: 0, y: 12, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: DUR.fast, ease: EASE.out, stagger: 0.04,
      scrollTrigger: { trigger: tags, start: 'top 80%', toggleActions: 'play none none none' } }
  );
}

// ── Sobre Mí ─────────────────────────────────────────────────
function setupSobreMi() {
  const section = document.querySelector('[data-section="sobre-mi"]');
  if (!section) return;

  const imgContainer = section.querySelector('[data-parallax-img]');
  if (imgContainer) {
    gsap.fromTo(imgContainer,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: DUR.slow, ease: EASE.out,
        scrollTrigger: { trigger: imgContainer, start: 'top 80%', toggleActions: 'play none none none' } }
    );
  }

  gsap.fromTo(section.querySelectorAll('h3, h2'),
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out,
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' } }
  );

  gsap.fromTo(section.querySelectorAll('p'),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out, stagger: STAGGER.tight,
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' } }
  );

  const tags = section.querySelector('[data-stagger]');
  if (tags) {
    gsap.fromTo(tags.querySelectorAll('span'),
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.tight,
        scrollTrigger: { trigger: tags, start: 'top 90%', toggleActions: 'play none none none' } }
    );
  }
}

// ── Blog Preview ──────────────────────────────────────────────
function setupBlogPreview() {
  const s = document.querySelector('[data-section="blog"]');
  if (!s) return;

  gsap.fromTo(s.querySelectorAll('h3, h2'),
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: DUR.normal, ease: EASE.out,
      scrollTrigger: { trigger: s, start: 'top 80%', toggleActions: 'play none none none' } }
  );

  const grid = s.querySelector('[data-stagger]');
  if (grid) {
    gsap.fromTo(grid.querySelectorAll('article'),
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out, stagger: STAGGER.normal,
        scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' } }
    );
  }
}

// ── Testimonios ───────────────────────────────────────────────
function setupTestimonios() {
  const section = document.getElementById('testimonios');
  if (!section) return;

  const trigger = { trigger: section, start: 'top 80%', toggleActions: 'play none none none' };

  // Cabecera: etiqueta + título
  gsap.fromTo(section.querySelectorAll('h3, span.font-bold'),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out, scrollTrigger: trigger }
  );

  // Texto de la cita
  const quoteText = section.querySelector('#testimonial-text');
  if (quoteText) {
    gsap.fromTo(quoteText,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: DUR.slow, ease: EASE.out, delay: 0.15, scrollTrigger: trigger }
    );
  }

  // Imagen derecha
  const img = section.querySelector('.h-full .rounded-\\[1\\.5rem\\]');
  if (img) {
    gsap.fromTo(img,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: DUR.slow, ease: EASE.out, delay: 0.1, scrollTrigger: trigger }
    );
  }

  // Autor + dots + flechas
  const controls = section.querySelector('.flex.items-center.justify-between');
  if (controls) {
    gsap.fromTo(controls,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out, delay: 0.3, scrollTrigger: trigger }
    );
  }
}

// ── FAQ ───────────────────────────────────────────────────────
function setupFAQ() {
  const faq = document.querySelector('[data-section="faq"]');
  if (!faq) return;
  const container = faq.querySelector('[data-stagger]');
  if (!container) return;

  gsap.fromTo(container.querySelectorAll('details'),
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.tight,
      scrollTrigger: { trigger: faq, start: 'top 80%', toggleActions: 'play none none none' } }
  );
}

// ── Footer ────────────────────────────────────────────────────
function setupFooter() {
  const footer = document.querySelector('[data-footer]');
  if (!footer) return;
  const children = footer.querySelectorAll(':scope > div > *');
  if (!children.length) return;

  gsap.fromTo(children,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: DUR.normal, ease: EASE.out, stagger: STAGGER.normal,
      scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none none' } }
  );
}
