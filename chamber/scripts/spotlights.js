// Loads member data and displays 2-3 randomly chosen
// gold or silver member spotlights. A different set appears
// each time the page loads.

const membershipLabels = {
  2: "Silver",
  3: "Gold",
};

// Get the member data from the JSON file
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data.members;
}

// Only gold (3) and silver (2) members qualify for a spotlight
function getEligibleMembers(members) {
  return members.filter((member) => member.membership === 2 || member.membership === 3);
}

// Shuffle an array and return the first "count" items
function pickRandom(members, count) {
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Build the HTML for one spotlight card
function buildSpotlightCard(member) {
  const card = document.createElement("div");
  card.classList.add("spotlight-card");

  card.innerHTML = `
    <img src="${member.image}" alt="${member.name} logo">
    <h3>${member.name}</h3>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><strong>Website:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
    <span class="membership-badge badge-${member.membership}">
      ${membershipLabels[member.membership]}
    </span>
  `;

  return card;
}

async function displaySpotlights() {
  const list = document.querySelector("#spotlight-list");

  try {
    const members = await getMembers();
    const eligible = getEligibleMembers(members);

    // randomly show either 2 or 3 spotlights
    const count = Math.random() < 0.5 ? 2 : 3;
    const chosen = pickRandom(eligible, count);

    list.innerHTML = "";
    chosen.forEach((member) => {
      list.appendChild(buildSpotlightCard(member));
    });
  } catch (error) {
    list.innerHTML = "<p>Member spotlights are unavailable right now.</p>";
  }
}

displaySpotlights();
