// Handles the small-screen hamburger menu.
// Shared by every page, so the navigation behaves the same everywhere.

const hamburgerButton = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburgerButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // Update the button label so screen readers announce the state change.
  const isOpen = navLinks.classList.contains('open');
  hamburgerButton.setAttribute('aria-expanded', isOpen);
});
