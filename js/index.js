fetch('./CountriesData.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response - not ok');
        }
        return response.json();
    })
    .then((data) => {
        displayCountries(data);
    })
    .catch((error) => {
        console.error('Error fetching countries data:', error);
    });

const displayCountries = (countries) => {
    const countriesGrid = document.querySelector('.countries-grid');
    countriesGrid.innerHTML = '';

    // Loop through each country and generate its card
    countries.forEach((country) => {
        const countryCard = `
      <a href="details.html?country=${encodeURIComponent(country.name)}" class="country scale-effect">
        <div class="country-flag">
          <img src="${country.flag}" alt="${country.name} Flag">
        </div>
        <div class="country-info">
          <h2 class="country-title">${country.name}</h2>
          <ul class="country-brief">
            <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
            <li><strong>Region:</strong> ${country.region}</li>
            <li><strong>Capital:</strong> ${country.capital || 'N/A'}</li>
          </ul>
        </div>
      </a>
    `;
        countriesGrid.innerHTML += countryCard;
    });
}
const showRegions = () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');

    if (dropdownWrapper.classList.contains('open')) {
        dropdownWrapper.classList.remove('open');
    } 
    else {
        dropdownWrapper.classList.add('open');
    }
}

const chosenRegion = (element) => {
    const region = element.getAttribute('data-region');
    filterByRegion(region);
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    dropdownWrapper.classList.remove('open');
}

const filterByRegion = (region) => {
    let filteredCountries;
    fetch('./CountriesData.json')
        .then((response) => response.json())
        .then((countries) => {
            if (region === 'all') {
                filteredCountries = countries;
            }
            else {
                filteredCountries = countries.filter((country) => country.region.toLowerCase() === region);
            }
            displayCountries(filteredCountries);
        })
        .catch((error) => {
            console.error('Error filtering countries:', error);
        });
}



