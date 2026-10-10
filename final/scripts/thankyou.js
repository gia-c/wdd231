// Reads the form data from the URL and displays it on this page.

const detailsList = document.querySelector('#confirmation-details');

// Friendly labels for each field name used in the form.
const fieldLabels = {
  type: 'Request type',
  name: 'Name',
  email: 'Email',
  place: 'Place name',
  message: 'Message',
};

const params = new URLSearchParams(window.location.search);

// Array method: turn the labels object into an array of [key, label] pairs,
// then map each one into a dt/dd block using a template literal.
const rows = Object.entries(fieldLabels)
  .filter(([key]) => params.get(key)) // only show fields that were actually filled in
  .map(([key, label]) => {
    const value = params.get(key);
    return `<dt>${label}</dt><dd>${value}</dd>`;
  });

if (rows.length === 0) {
  detailsList.innerHTML = '<p>No form data was found. Please fill out the form first.</p>';
} else {
  detailsList.innerHTML = rows.join('');
}
