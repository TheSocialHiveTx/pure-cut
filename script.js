'use strict';
document.documentElement.classList.add('js-ready');

const PHONE = '+18325197554';

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');

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
window.matchMedia('(max-width: 900px)').addEventListener('change', closeMenu);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Estimate form -> opens a pre-filled text message to the business.
// (Static site with no backend, so this guarantees the request actually reaches them.)
const form = document.getElementById('estimate-form');
const formError = document.getElementById('form-error');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').trim();
  const phone = (data.get('phone') || '').trim();
  const address = (data.get('address') || '').trim();

  if (!name || !phone || !address) {
    formError.hidden = false;
    form.querySelector(!name ? '[name="name"]' : !phone ? '[name="phone"]' : '[name="address"]').focus();
    return;
  }
  formError.hidden = true;

  const services = data.getAll('service');
  const notes = (data.get('notes') || '').trim();
  const lines = [
    'Hi Pure Cut! I\'d like a free estimate.',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    services.length ? `Services: ${services.join(', ')}` : '',
    notes ? `Notes: ${notes}` : ''
  ].filter(Boolean);

  // "?&body=" works on both iOS and Android
  window.location.href = `sms:${PHONE}?&body=${encodeURIComponent(lines.join('\n'))}`;
  formNote.hidden = false;
});
