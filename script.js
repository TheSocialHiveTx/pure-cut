'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  // --- MOBILE NAV TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');

  if (menuToggle && navigation) {
    menuToggle.hidden = false;

    function closeMenu() {
      navigation.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', () => {
      const opened = navigation.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(opened));
    });

    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.header')) closeMenu();
    });

    window.matchMedia('(max-width: 768px)').addEventListener('change', closeMenu);
  }

  // --- COPYRIGHT YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- INSTANT ESTIMATE CALCULATOR LOGIC ---
  const calcPriceDisplay = document.getElementById('calc-price-display');
  const calcCheckboxes = document.querySelectorAll('input[name="calc-service"]');
  const calcYardRadios = document.querySelectorAll('input[name="yard-size"]');
  const calcFreqRadios = document.querySelectorAll('input[name="frequency"]');
  const btnLockEstimate = document.getElementById('btn-lock-estimate');

  function calculateEstimate() {
    let basePrice = 0;
    const selectedServices = [];

    calcCheckboxes.forEach(cb => {
      if (cb.checked) {
        basePrice += parseFloat(cb.getAttribute('data-price') || 0);
        selectedServices.push(cb.closest('.calc-checkbox-card').querySelector('strong').textContent.trim());
      }
    });

    if (basePrice === 0) {
      if (calcPriceDisplay) calcPriceDisplay.innerHTML = `$0 <small>/ visit</small>`;
      return;
    }

    let sizeMultiplier = 1.0;
    let sizeLabel = 'Medium';
    calcYardRadios.forEach(radio => {
      if (radio.checked) {
        sizeMultiplier = parseFloat(radio.getAttribute('data-mult') || 1.0);
        sizeLabel = radio.closest('.calc-radio-card').querySelector('strong').textContent.trim();
      }
    });

    let freqDiscount = 1.0;
    let freqLabel = 'Weekly';
    calcFreqRadios.forEach(radio => {
      if (radio.checked) {
        freqDiscount = parseFloat(radio.getAttribute('data-disc') || 1.0);
        freqLabel = radio.closest('.calc-radio-card').querySelector('strong').textContent.trim();
      }
    });

    const calculatedLow = Math.round(basePrice * sizeMultiplier * freqDiscount);
    const calculatedHigh = Math.round(calculatedLow * 1.25);

    if (calcPriceDisplay) {
      calcPriceDisplay.innerHTML = `$${calculatedLow} - $${calculatedHigh} <small>/ visit</small>`;
    }
  }

  calcCheckboxes.forEach(el => el.addEventListener('change', calculateEstimate));
  calcYardRadios.forEach(el => el.addEventListener('change', calculateEstimate));
  calcFreqRadios.forEach(el => el.addEventListener('change', calculateEstimate));
  calculateEstimate();

  if (btnLockEstimate) {
    btnLockEstimate.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const serviceSelect = document.getElementById('form-service');
      const notesTextarea = document.getElementById('form-notes');

      // Pre-fill notes with chosen options
      const selectedServices = Array.from(calcCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.closest('.calc-checkbox-card').querySelector('strong').textContent.trim());
      
      const selectedSize = Array.from(calcYardRadios)
        .find(r => r.checked)?.closest('.calc-radio-card').querySelector('strong').textContent.trim();
      
      const selectedFreq = Array.from(calcFreqRadios)
        .find(r => r.checked)?.closest('.calc-radio-card').querySelector('strong').textContent.trim();

      if (notesTextarea) {
        notesTextarea.value = `[Calculator Estimate Request]\nServices: ${selectedServices.join(', ')}\nYard Size: ${selectedSize}\nFrequency: ${selectedFreq}`;
      }

      if (serviceSelect && selectedServices.length > 0) {
        serviceSelect.value = selectedServices.length > 1 ? 'multiple' : 'mowing';
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- ZIP CODE SERVICE AREA CHECKER ---
  const zipInput = document.getElementById('zip-input');
  const zipCheckBtn = document.getElementById('zip-check-btn');
  const zipResult = document.getElementById('zip-result');

  const supportedZips = [
    '74103', '74104', '74105', '74106', '74107', '74108', '74110', '74112', '74114', '74115',
    '74116', '74117', '74119', '74120', '74126', '74127', '74128', '74129', '74130', '74131',
    '74132', '74133', '74134', '74135', '74136', '74137', '74145', '74146', '74011', '74012',
    '74014', '74055', '74037', '74063', '74066', '74008', '74021', '74033', '74429'
  ];

  function checkZipCode() {
    if (!zipInput || !zipResult) return;
    const val = zipInput.value.trim();
    if (!val || val.length < 5) {
      zipResult.hidden = false;
      zipResult.className = 'zip-result-message not-found';
      zipResult.textContent = 'Please enter a valid 5-digit zip code.';
      return;
    }

    zipResult.hidden = false;
    if (supportedZips.includes(val) || val.startsWith('741') || val.startsWith('740')) {
      zipResult.className = 'zip-result-message success';
      zipResult.innerHTML = `✅ Great news! Zip code <strong>${val}</strong> is in our daily service area.`;
    } else {
      zipResult.className = 'zip-result-message success';
      zipResult.innerHTML = `📍 We service the entire Tulsa metro region including <strong>${val}</strong>! Contact us to confirm scheduling.`;
    }
  }

  if (zipCheckBtn) zipCheckBtn.addEventListener('click', checkZipCode);
  if (zipInput) {
    zipInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkZipCode();
      }
    });
  }

  // --- FAQ ACCORDION ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close other opened questions for clean toggle
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  // --- ESTIMATE FORM SUBMISSION ---
  const estimateForm = document.getElementById('estimate-form');
  const formSuccessMsg = document.getElementById('form-success-msg');

  if (estimateForm) {
    estimateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = estimateForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Request...';
      }

      setTimeout(() => {
        estimateForm.hidden = true;
        if (formSuccessMsg) formSuccessMsg.hidden = false;
      }, 800);
    });
  }
});
