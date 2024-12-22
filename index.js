

let allCountries = []; 
const container = document.querySelector('.countries-grid');
const dropdownWrapper = document.querySelector('.dropdown-wrapper');
const dropdownHeader = document.querySelector('.dropdown-header');
const dropdownBody = document.querySelector('.dropdown-body');
const searchInput = document.querySelector('.search-input');

fetch('CountriesData.json')
  .then(response => response.json())
  .then(countries => {
    allCountries = countries; 
    renderCountries(allCountries); 
  })
  .catch(error => console.error('Error fetching countries:', error));

function renderCountries(countries) {
  container.innerHTML = ''; 
  countries.forEach(country => {
    const countryFrame = document.createElement('a');
    countryFrame.href = "details.html";
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
    countryFrame.addEventListener('click', () => {
        localStorage.setItem('selectedCountry', JSON.stringify(country));
      });
    container.appendChild(countryFrame);
  });
}



////---------------------------------Filtering countries by region---------------------------------//



dropdownHeader.addEventListener('click', () => {
    dropdownWrapper.classList.toggle('open'); 
  });
  
  document.addEventListener('click', event => {
    if (!dropdownWrapper.contains(event.target)) {
      dropdownWrapper.classList.remove('open'); 
    }
  });
  
  dropdownBody.addEventListener('click', event => {
    const selectedRegion = event.target.dataset.region; 
    if (!selectedRegion) return;
  
    dropdownHeader.querySelector('span').textContent = 
      event.target.textContent;
  
    const filteredCountries = selectedRegion === 'all'
      ? allCountries
      : allCountries.filter(country => 
          country.region.toLowerCase() === selectedRegion
        );
  
    renderCountries(filteredCountries); 
    dropdownWrapper.classList.remove('open'); 
  });
  
  searchInput.addEventListener('input', event => {
    const searchValue = event.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
      country.name.toLowerCase().includes(searchValue)
    );
    renderCountries(filteredCountries);
  });


