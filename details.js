// DOM Elements
const loader = document.querySelector('.loader'); // Loader element
const countryDetailsSection = document.querySelector('.country-details');

// Show Loader (optional step to explicitly show it before hiding)
function showLoader() {
  loader.classList.remove('close'); // Ensure loader is visible
}

// Hide Loader
function hideLoader() {
  loader.classList.add('close'); // Add 'close' class to hide the loader
}

// Retrieve selected country data from localStorage
const selectedCountryData = localStorage.getItem('selectedCountry');

// Simulate a data fetch or loading process
if (selectedCountryData) {
  const country = JSON.parse(selectedCountryData);

  // Render country details after a slight delay to simulate loading
  setTimeout(() => {
    countryDetailsSection.innerHTML = `
      <div class="country-flag">
        <img src="${country.flag}" alt="${country.name} Flag" />
      </div>
      <div class="country-info">
        <h1>${country.name}</h1>
        <div class="col-2">
          <ul>
            <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
            <li><strong>Region:</strong> ${country.region}</li>
            <li><strong>Capital:</strong> ${country.capital || 'N/A'}</li>
          </ul>
        </div>
        <div class="col-3">
          <strong>Border Countries:</strong>
        </div>
      </div>
    `;

    hideLoader(); // Hide loader once the data is rendered
  }, 1000); // Simulating a 1-second delay for data loading
} else {
  // If no data is found, show an error message and hide the loader
  setTimeout(() => {
    countryDetailsSection.innerHTML = `<p>Country details not found. Please go back and select a country.</p>`;
    hideLoader();
  }, 1000);
}
