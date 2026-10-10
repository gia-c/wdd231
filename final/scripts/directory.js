// Loads the café data, builds the cards, and handles the modal,
// the district/type filters, the favorites toggle, and localStorage.

const FAVORITES_KEY = 'limaCoffeeMapFavorites';

const cardGrid = document.querySelector('#card-grid');
const districtFilter = document.querySelector('#district-filter');
const typeFilter = document.querySelector('#type-filter');
const favoritesToggle = document.querySelector('#favorites-toggle');

const modalOverlay = document.querySelector('#modal-overlay');
const modalClose = document.querySelector('#modal-close');
const modalTitle = document.querySelector('#modal-title');
const modalDistrict = document.querySelector('#modal-district');
const modalType = document.querySelector('#modal-type');
const modalSpecialty = document.querySelector('#modal-specialty');
const modalPrice = document.querySelector('#modal-price');
const modalAddress = document.querySelector('#modal-address');
const modalHours = document.querySelector('#modal-hours');
const modalDescription = document.querySelector('#modal-description');
const modalWebsite = document.querySelector('#modal-website');

let allCafes = []; // Holds every café once it's loaded from the JSON file.
let showOnlyFavorites = false;

// ---------- Favorites (localStorage) ----------

function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function toggleFavorite(cafeId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(cafeId);

  if (index === -1) {
    favorites.push(cafeId);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

// ---------- Building the cards ----------

function createCardHTML(cafe, favorites) {
  const isFavorite = favorites.includes(cafe.id);

  // Template literal builds the whole card markup in one readable block.
  return `
    <article class="cafe-card" data-id="${cafe.id}">
      <button
        class="favorite-btn"
        aria-label="Save ${cafe.name} to favorites"
        aria-pressed="${isFavorite}"
        data-id="${cafe.id}"
      >${isFavorite ? '&#9733;' : '&#9734;'}</button>
      <img src="${cafe.image}" alt="${cafe.name}" loading="lazy" width="400" height="300">
      <div class="cafe-card-body">
        <h3>${cafe.name}</h3>
        <p>${cafe.district} &middot; ${cafe.type}</p>
        <p>${cafe.specialty}</p>
        <p class="cafe-price">${cafe.price}</p>
      </div>
    </article>
  `;
}

function renderCards(cafeList) {
  const favorites = getFavorites();

  if (cafeList.length === 0) {
    cardGrid.innerHTML = '<p>No places match this filter yet.</p>';
    return;
  }

  // Array method (map) turns each café object into HTML, then we join it.
  cardGrid.innerHTML = cafeList
    .map((cafe) => createCardHTML(cafe, favorites))
    .join('');
}

// ---------- Filters (district, type, favorites) ----------

function populateFilterOptions(cafeList) {
  // Unique districts, built with array methods.
  const districts = cafeList
    .map((cafe) => cafe.district)
    .filter((district, index, all) => all.indexOf(district) === index);

  districts.forEach((district) => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    districtFilter.appendChild(option);
  });

  // Unique types (Café / Restaurant).
  const types = cafeList
    .map((cafe) => cafe.type)
    .filter((type, index, all) => all.indexOf(type) === index);

  types.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}

function applyFilters() {
  const selectedDistrict = districtFilter.value;
  const selectedType = typeFilter.value;
  const favorites = getFavorites();

  const filtered = allCafes.filter((cafe) => {
    const matchesDistrict = selectedDistrict === 'all' || cafe.district === selectedDistrict;
    const matchesType = selectedType === 'all' || cafe.type === selectedType;
    const matchesFavorite = !showOnlyFavorites || favorites.includes(cafe.id);
    return matchesDistrict && matchesType && matchesFavorite;
  });

  renderCards(filtered);
}

// ---------- Modal ----------

function openModal(cafe) {
  modalTitle.textContent = cafe.name;
  modalDistrict.textContent = cafe.district;
  modalType.textContent = cafe.type;
  modalSpecialty.textContent = cafe.specialty;
  modalPrice.textContent = cafe.price;
  modalAddress.textContent = cafe.address;
  modalHours.textContent = cafe.hours;
  modalDescription.textContent = cafe.description;
  modalWebsite.href = cafe.website;

  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  modalOverlay.classList.add('hidden');
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
  // Only close if the click was on the dark overlay, not inside the box.
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// ---------- Handling clicks on the card grid ----------

cardGrid.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('.favorite-btn');

  if (favoriteButton) {
    // Clicked the star: toggle favorite instead of opening the modal.
    const cafeId = favoriteButton.dataset.id;
    const favorites = toggleFavorite(cafeId);

    const isFavorite = favorites.includes(cafeId);
    favoriteButton.setAttribute('aria-pressed', isFavorite);
    favoriteButton.innerHTML = isFavorite ? '&#9733;' : '&#9734;';

    // If we're only showing favorites, removing one should update the grid.
    if (showOnlyFavorites) {
      applyFilters();
    }
    return;
  }

  const card = event.target.closest('.cafe-card');
  if (card) {
    const cafe = allCafes.find((item) => item.id === card.dataset.id);
    if (cafe) {
      openModal(cafe);
    }
  }
});

districtFilter.addEventListener('change', applyFilters);
typeFilter.addEventListener('change', applyFilters);

favoritesToggle.addEventListener('click', () => {
  showOnlyFavorites = !showOnlyFavorites;
  favoritesToggle.setAttribute('aria-pressed', showOnlyFavorites);
  applyFilters();
});

// ---------- Loading the data ----------

async function loadCafes() {
  try {
    const response = await fetch('data/cafes.json');

    if (!response.ok) {
      throw new Error('Could not load the café data.');
    }

    allCafes = await response.json();
    populateFilterOptions(allCafes);
    renderCards(allCafes);
  } catch (error) {
    cardGrid.innerHTML = `<p>Sorry, something went wrong loading the directory. Please try again later.</p>`;
    console.error(error);
  }
}

loadCafes();
