// navigation.js
// Handles the small-screen hamburger toggle for the primary navigation.

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && primaryNav.classList.contains('is-open')) {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});
