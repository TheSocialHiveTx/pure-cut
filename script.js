'use strict';
document.documentElement.classList.add('js-ready');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
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
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
document.getElementById('year').textContent = new Date().getFullYear();
