
// DOM Elements
let allCountries = []; // To store all countries
const container = document.querySelector('.countries-grid');
const dropdownWrapper = document.querySelector('.dropdown-wrapper');
const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownBody = document.querySelector('.dropdown-body');
const searchInput = document.querySelector('.search-input');

// Fetch countries and render them
fetch('CountriesData.json')
  .then(response => response.json())
  .then(countries => {
    allCountries = countries; // Store fetched data
    renderCountries(allCountries); // Render all countries initially
  })
  .catch(error => console.error('Error fetching countries:', error));

  // Function to render countries
function renderCountries(countries) {
  container.innerHTML = ''; // Clear container
  countries.forEach(country => {
    const countryFrame = document.createElement('a');
    countryFrame.href = "#";
    countryFrame.classList.add('country', 'scale-effect');
    countryFrame.innerHTML = `
      <div class="country-flag">
        <img src="${country.flag}" alt="${country.name} Flag" />
      </div>
      <div class="country-info">
        <h2 class="country-title">${country.name}</h2>
        <ul class="country-brief">
          <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
          <li><strong>Region:</strong> ${country.region}</li>
          <li><strong>Capital:</strong> ${country.capital}</li>
        </ul>
      </div>
    `;
    container.appendChild(countryFrame);
  });
}

// Toggle dropdown visibility
dropdownHeader.addEventListener('click', () => {
  dropdownWrapper.classList.toggle('open'); // Add/remove 'open' class to toggle visibility
});

// Close dropdown when clicking outside
document.addEventListener('click', event => {
  if (!dropdownWrapper.contains(event.target)) {
    dropdownWrapper.classList.remove('open'); // Close dropdown if clicked outside
  }
});

// Handle dropdown selection
dropdownBody.addEventListener('click', event => {
  const selectedRegion = event.target.dataset.region; // Get selected region
  if (!selectedRegion) return;

  // Update dropdown header text
  dropdownHeader.querySelector('span').textContent = 
    event.target.textContent;

  // Filter countries
  const filteredCountries = selectedRegion === 'all'
    ? allCountries
    : allCountries.filter(country => 
        country.region.toLowerCase() === selectedRegion
      );

  renderCountries(filteredCountries); // Re-render countries
  dropdownWrapper.classList.remove('open'); // Close dropdown after selection
});

// Handle search functionality
searchInput.addEventListener('input', event => {
  const searchValue = event.target.value.toLowerCase();
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchValue)
  );
  renderCountries(filteredCountries);
});
