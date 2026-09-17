// Shared behavior used on every page of the site:
// the mobile hamburger menu, and the footer's
// copyright year and last-modified date.


// ---------- Mobile menu toggle ----------

const navToggle = document.querySelector("#navToggle");
const mainNav = document.querySelector("#mainNav");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  const isOpen = mainNav.classList.contains("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Footer: copyright year and last modified date ----------

document.querySelector("#copyrightYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
