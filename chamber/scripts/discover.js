
// Imports the list of places from discover.mjs and builds
// one card per item inside #discoverGrid. Each card's "Learn
// more" button toggles a short fun fact for that place.

import { discoverItems } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");

function buildCard(item, index) {
  const card = document.createElement("div");

  // item-1 .. item-8 — used by the CSS grid-template-areas
  // to place each card in its named area for the current screen size
  card.classList.add("discover-card", `item-${index + 1}`);

  card.innerHTML = `
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    </figure>
    <h2>${item.name}</h2>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <p class="fun-fact" hidden>${item.funFact}</p>
    <button type="button" class="learn-more-btn" aria-expanded="false">Learn more</button>
  `;

  return card;
}

function displayItems() {
  grid.innerHTML = "";
  discoverItems.forEach((item, index) => {
    grid.appendChild(buildCard(item, index));
  });
}

displayItems();

// ---------- Learn more toggle ----------
// One listener on the grid instead of one per button, since the
// buttons are created dynamically above.
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".learn-more-btn");
  if (!button) return;

  const card = button.closest(".discover-card");
  const funFact = card.querySelector(".fun-fact");
  const isHidden = funFact.hidden;

  funFact.hidden = !isHidden;
  button.textContent = isHidden ? "Show less" : "Learn more";
  button.setAttribute("aria-expanded", String(isHidden));
});