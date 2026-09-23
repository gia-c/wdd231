// Sets the hidden timestamp field when the form loads, and
// opens/closes the membership level modals.


// ---------- Hidden timestamp ----------
// Records the date and time the form was loaded by the user.
document.querySelector("#timestamp").value = new Date().toLocaleString();

// ---------- Membership modals ----------

const modalButtons = document.querySelectorAll("[data-modal]");
modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.modal}`);
    if (modal) modal.showModal();
  });
});

const closeButtons = document.querySelectorAll("[data-close]");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.close}`);
    if (modal) modal.close();
  });
});
