// Uses localStorage to remember the last time this visitor
// loaded the Discover page, and shows one of three messages
// about how long it has been since their last visit.


const STORAGE_KEY = "discoverLastVisit";

const messageBox = document.querySelector("#visitMessage");
const messageText = document.querySelector("#visitMessageText");
const closeButton = document.querySelector("#visitMessageClose");

const lastVisit = localStorage.getItem(STORAGE_KEY);
const now = Date.now();

let message = "";

if (!lastVisit) {
  // first time this visitor has loaded the page
  message = "Welcome! Let us know if you have any questions.";
} else {
  const msInDay = 1000 * 60 * 60 * 24;
  const millisecondsSinceLastVisit = now - Number(lastVisit);

  if (millisecondsSinceLastVisit < msInDay) {
    message = "Back so soon! Awesome!";
  } else {
    const daysSinceLastVisit = Math.floor(millisecondsSinceLastVisit / msInDay);
    const dayWord = daysSinceLastVisit === 1 ? "day" : "days";
    message = `You last visited ${daysSinceLastVisit} ${dayWord} ago.`;
  }
}

messageText.textContent = message;
messageBox.hidden = false;

// store this visit for next time
localStorage.setItem(STORAGE_KEY, String(now));

// let the visitor dismiss the message
closeButton.addEventListener("click", () => {
  messageBox.hidden = true;
});