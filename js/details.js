document.addEventListener("DOMContentLoaded", () => {
  const countryName = new URLSearchParams(window.location.search).get('country');
  if (countryName) {
    fetchCountryData(countryName);
  }
  else {
    console.error('Country name not found');
  }
});

const fetchCountryData = (countryName) => {
  fetch('./CountriesData.json')
    .then(response => response.json())
    .then(countries => {
      const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
      if (country) {
        displayCountryDetails(country);
      }
      else {
        console.error('Country not found');
      }
    })
    .catch(error => {
      console.error('Error fetching country data:', error);
    });
};

const displayCountryDetails = (country) => {
  const detailsContainer = document.querySelector('.country-details');
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
  
  detailsContainer.innerHTML = `
    <h2>${country.name}</h2>
    <div class="country-flag">
      <img src="${country.flag}" alt="${country.name} Flag">
    </div>
    <ul>
      <li><strong>Capital:</strong> ${country.capital || 'N/A'}</li>
      <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
      <li><strong>Region:</strong> ${country.region}</li>
    </ul>
  `;
};
