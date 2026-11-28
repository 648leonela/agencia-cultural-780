/**
 * ============================================================================
 * JAVASCRIPT PRINCIPAL - FUNDACIÓN ESPERANZA VIVA
 * Funcionalidades interactivas, validaciones y animaciones sin dependencias externas
 * ============================================================================
 */

/**
 * URL de la aplicación web de Google Apps Script que guarda los mensajes
 * del formulario de contacto en Google Sheets.
 * Ver instrucciones en: google-apps-script/LEEME.md
 */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxfJ-5qEEvk2yqEjRuk2tVT9MB4fc6yvSj95SkjbgFpBeddY03Iq0zpsym9sX9D63P0Aw/exec';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navegación Móvil (Menú hamburguesa)
  initMobileMenu();

  // 2. Efecto de cabecera al hacer scroll
  initHeaderScroll();

  // 3. Enlaces activos en navegación según la sección visible
  initScrollSpy();

  // 4. Animación de números / estadísticas de impacto
  initCounterAnimation();

  // 5. Calculadora / Selector de donaciones interactivo
  initDonationWidget();

  // 6. Validación y envío del formulario de contacto
  initContactForm();

  // 7. Formulario de Newsletter (Pie de página)
  initNewsletterForm();

  // 8. Botón flotante para subir (Scroll to top)
  initScrollTop();

  // 9. Sistema de modales
  initModals();

  // 10. Videos de YouTube en las galerías (se cargan solo al hacer clic)
  initGalleryVideos();
});

/* ==========================================================================
   10. VIDEOS EN GALERÍAS
   Muestra la portada del video y, al hacer clic, la reemplaza por el
   reproductor de YouTube dentro de la misma casilla de la galería.
   ========================================================================== */
function initGalleryVideos() {
  document.querySelectorAll('.gallery-video[data-youtube-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.youtubeId;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = button.getAttribute('aria-label') || 'Video de YouTube';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      const wrapper = document.createElement('div');
      wrapper.className = button.className.replace('gallery-video', 'gallery-video gallery-video--playing');
      wrapper.appendChild(iframe);
      button.replaceWith(wrapper);
      iframe.focus();
    });
  });
}

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Cerrar al hacer clic en un enlace
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   2. CABECERA AL HACER SCROLL
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. SCROLL SPY (Enlace activo según sección)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. ANIMACIÓN DE NÚMEROS / CONTADORES
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let hasRun = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const impactBar = document.querySelector('.impact-bar');
  if (!impactBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        runCounters();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(impactBar);
}

/* ==========================================================================
   5. CALCULADORA Y SELECTOR DE DONACIONES
   ========================================================================== */
function initDonationWidget() {
  const freqBtns = document.querySelectorAll('.freq-btn');
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customAmount');
  const impactDesc = document.getElementById('impactDescription');
  const donateSubmitBtn = document.getElementById('btnStartDonation');

  let selectedFrequency = 'Única vez';
  let selectedAmount = 25;

  const impactEquivalencies = {
    10: 'Permite entregar 1 kit de útiles escolares a un niño de escasos recursos.',
    25: 'Proporciona una canasta de alimentos básicos para una familia durante 1 semana.',
    50: 'Financia atención médica general y medicamentos para 2 niños.',
    100: 'Cubre la beca educativa integral y talleres de nutrición durante 1 mes.'
  };

  function updateImpactText(amount) {
    if (!impactDesc) return;
    if (impactEquivalencies[amount]) {
      impactDesc.textContent = impactEquivalencies[amount];
    } else if (amount > 0) {
      impactDesc.textContent = `Tu aporte de $${amount} USD será destinado directamente a los programas prioritarios de educación y nutrición.`;
    } else {
      impactDesc.textContent = 'Selecciona o ingresa una cantidad para conocer el impacto de tu apoyo.';
    }
  }

  // Frecuencia (Única / Mensual)
  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFrequency = btn.getAttribute('data-freq');
    });
  });

  // Botones de monto fijo
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = parseInt(btn.getAttribute('data-amount'), 10);
      if (customInput) customInput.value = '';
      updateImpactText(selectedAmount);
    });
  });

  // Entrada personalizada
  if (customInput) {
    customInput.addEventListener('input', (e) => {
      amountBtns.forEach(b => b.classList.remove('active'));
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        selectedAmount = val;
      } else {
        selectedAmount = 0;
      }
      updateImpactText(selectedAmount);
    });
  }

  // Botón procesar donación
  if (donateSubmitBtn) {
    donateSubmitBtn.addEventListener('click', () => {
      if (selectedAmount <= 0) {
        showToast('Por favor, selecciona o ingresa un monto válido.', 'error');
        return;
      }

      // Rellenar información en el modal de confirmación
      document.getElementById('modalDonationAmount').textContent = `$${selectedAmount} USD`;
      document.getElementById('modalDonationFreq').textContent = selectedFrequency;
      
      openModal('donationSuccessModal');
    });
  }
}

/* ==========================================================================
   6. FORMULARIO DE CONTACTO Y VOLUNTARIADO
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const typeSelect = document.getElementById('contactType');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = form.querySelector('button[type="submit"]');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, condition) {
    if (!condition) {
      input.classList.add('invalid');
      return false;
    } else {
      input.classList.remove('invalid');
      return true;
    }
  }

  // Validaciones en tiempo real
  nameInput.addEventListener('input', () => {
    validateField(nameInput, nameInput.value.trim().length >= 3);
  });

  emailInput.addEventListener('input', () => {
    validateField(emailInput, emailRegex.test(emailInput.value.trim()));
  });

  messageInput.addEventListener('input', () => {
    validateField(messageInput, messageInput.value.trim().length >= 10);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 3);
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
    const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showToast('Por favor completa todos los campos requeridos correctamente.', 'error');
      return;
    }

    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.startsWith('PEGA_AQUI')) {
      console.warn('Configura GOOGLE_SHEET_URL en js/main.js para recibir los mensajes.');
      showToast('El formulario aún no está configurado. Escríbenos a contacto@acsieteochenta.com', 'error');
      return;
    }

    // Datos que se guardan en la hoja de cálculo
    const checkedReason = form.querySelector('input[name="contactType"]:checked');
    const reasonText = checkedReason
      ? checkedReason.closest('label').querySelector('span').textContent.trim()
      : '';
    const visitorName = nameInput.value.trim();

    const data = new URLSearchParams({
      nombre: visitorName,
      correo: emailInput.value.trim(),
      organizacion: document.getElementById('contactOrg').value.trim(),
      motivo: reasonText,
      mensaje: messageInput.value.trim(),
      website: document.getElementById('contactWebsite').value // campo antispam
    });

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando mensaje...';

    fetch(GOOGLE_SHEET_URL, { method: 'POST', body: data })
      .then(res => res.json())
      .then(result => {
        if (result.result !== 'success') throw new Error(result.error || 'Error al guardar');
        form.reset();
        document.getElementById('thankYouName').textContent = visitorName || 'amigo/a';
        openModal('contactSuccessModal');
      })
      .catch(err => {
        console.error('Error enviando el formulario:', err);
        showToast('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a contacto@acsieteochenta.com', 'error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
}

/* ==========================================================================
   7. FORMULARIO DE NEWSLETTER
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const emailInput = form.querySelector('input[type="email"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      showToast('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    showToast('¡Gracias por unirte a nuestro boletín de noticias!');
    form.reset();
  });
}

/* ==========================================================================
   8. BOTÓN SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. MODALES Y NOTIFICACIONES TOAST
   ========================================================================== */
function initModals() {
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // Cerrar al hacer clic en el fondo oscuro
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(modal => {
        if (modal.classList.contains('open')) {
          closeModal(modal.id);
        }
      });
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast toast-success';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (type === 'error') {
    toast.style.borderLeftColor = 'var(--accent)';
  } else {
    toast.style.borderLeftColor = 'var(--primary)';
  }

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
