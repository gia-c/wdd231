// ============================================================
// directory.js
// Loads member data from members.json and displays it as
// cards. Also handles the grid/list toggle, the mobile menu,
// and the footer date information.
// ============================================================

const memberListEl = document.querySelector("#member-list");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

// membership level number to a readable label
const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

// Get the member data from the JSON file
async function getMemberData() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data.members;
}

// Build the HTML for one member card
function buildCard(member) {
  const card = document.createElement("div");
  card.classList.add("member-card");

  card.innerHTML = `
    <div class="member-card-header">
      <h2>${member.name}</h2>
      <p>${member.tagline}</p>
    </div>
    <div class="member-card-body">
      <img src="${member.image}" alt="${member.name} logo" />
      <div class="member-info">
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Website:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
        <span class="membership-badge badge-${member.membership}">
          ${membershipLabels[member.membership]}
        </span>
      </div>
    </div>
  `;

  return card;
}

// Display all member cards inside #member-list
function displayMembers(members) {
  memberListEl.innerHTML = "";
  members.forEach((member) => {
    const card = buildCard(member);
    memberListEl.appendChild(card);
  });
}

// Run everything once the data is ready
async function init() {
  const members = await getMemberData();
  displayMembers(members);
}

init();

// ---------- Grid / List toggle ----------

gridBtn.addEventListener("click", () => {
  memberListEl.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  memberListEl.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

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
