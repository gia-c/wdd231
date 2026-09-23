// Reads the form data submitted via the URL query string
// (the join form uses method="get") and displays the
// required fields on the confirmation page.


const params = new URLSearchParams(window.location.search);

const fields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "businessName",
  "timestamp",
];

fields.forEach((field) => {
  const output = document.querySelector(`#out-${field}`);
  if (output) {
    output.textContent = params.get(field) || "Not provided";
  }
});
