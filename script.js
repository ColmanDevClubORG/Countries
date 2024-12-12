const countriesGrid = document.querySelector('.countries-grid');
let countryFetchedData = null;

async function fetchCountriesData() {
    if (countryFetchedData) {
        return;
    }
    try {
        const response = await fetch('./CountriesData.json');
        if (!response.ok) {
            throw `Failed to fetch countries data with status - ${response.status}`;
        }
        countryFetchedData = await response.json();
    } catch (error) {
        console.error('Error fetching countries data:', error);
    }
}

function getDropdownsRegions(data) {
    const dropdownRegionFilter = document.querySelector('.dropdown-body');
    const uniqueRegionsSet = new Set(data.map(country => country.region));
    const uniqueRegions = [...uniqueRegionsSet]

    const dropdownList = document.createElement('ul');
    const allOption = document.createElement('li');
    allOption.setAttribute('data-region', 'all');
    allOption.textContent = 'All';
    dropdownList.appendChild(allOption);

    uniqueRegions.forEach(region => {
        const dropdownItem = document.createElement('li');
        dropdownItem.setAttribute('data-region', region);
        dropdownItem.textContent = region;
        dropdownList.appendChild(dropdownItem);
    });
    dropdownRegionFilter.appendChild(dropdownList);
}

function getSearchdata() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        searchValue = e.target.value;
        const filteredData = filterDataSearch(countryFetchedData, searchValue);
        countriesGrid.innerHTML = '';
        analyzeMainContainer(filteredData);
    });
}

function filterDataSearch(data, searchValue) {
    return data.filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()));
}

function analyzeMainContainer(data) {
    data.forEach(({ name, flag, population, region, capital }) => {
        const countryCard = document.createElement('a');
        countryCard.href = './details.html';
        countryCard.addEventListener('click', function () {
            const countryData = { name, flag, population, region, capital };
            localStorage.setItem('countryDetails', JSON.stringify(countryData));
        });

        countryCard.className = 'country scale-effect';
        countryCard.setAttribute('data-country-name', name);

        countryCard.innerHTML = `
      <div class="country-flag">
        <img src="${flag}" alt="${name} Flag">
      </div>
      <div class="country-info">
        <h2 class="country-title">${name}</h2>
        <ul class="country-brief">
          <li><strong>Population: </strong>${population}</li>
          <li><strong>Region: </strong>${region}</li>
          <li><strong>Capital: </strong>${capital}</li>
        </ul>
      </div>`;

        countriesGrid.appendChild(countryCard);
    });
}

function handleDropdownClick() {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    dropdownWrapper.addEventListener('click', function () {
        this.classList.toggle('open');
    });

    const dropdownItems = dropdownWrapper.querySelector('.dropdown-body ul');
    dropdownItems.addEventListener('click', function (e) {
        e.stopPropagation();
        const selectedRegion = e.target.getAttribute('data-region');
        if (selectedRegion) {
            dropdownWrapper.classList.remove('open');
            getCountriesByRegion(selectedRegion);
        }
    });
}

function getCountriesByRegion(region) {
    let selectedDropdoenOrigin;
    if (region === 'all') {
        selectedDropdoenOrigin = countryFetchedData;
    } else {
        selectedDropdoenOrigin = countryFetchedData.filter(country => country.region === region);
    }
    countriesGrid.innerHTML = '';
    analyzeMainContainer(selectedDropdoenOrigin);
}

async function displayData() {
    await fetchCountriesData();
    if (countryFetchedData) {
        analyzeMainContainer(countryFetchedData);
        getDropdownsRegions(countryFetchedData);
        getSearchdata();
        handleDropdownClick();
    }
    else {
        console.error('Error display countries data');
    }
}
displayData();

function displayCountryDetails() {
    const countryInfo = document.querySelector('.country-details');
    const countryData = JSON.parse(localStorage.getItem('countryDetails'));

    if (countryData) {
        const { name, flag, population, region, capital } = countryData;
        const countryDetailsHTML = `
        <div class="country-flag">
            <img src="${flag}" alt="${name} Flag">
        </div>
      <div class="country-info">
        <h1 class="country-title">${name}</h1>
        <ul class="country-brief">
          <li><strong>Population: </strong>${population}</li>
          <li><strong>Region: </strong>${region}</li>
          <li><strong>Capital: </strong>${capital}</li>
        </ul>
      </div>`;

        countryInfo.innerHTML = countryDetailsHTML;
    } else {
        countryInfo.innerHTML = '<h1 class="country-info">No country selected</h1>';
    }
}

function handleLoaderSpinner() {
    const loaderSpinner = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderSpinner.style.display = 'none';
        }, 700);
    });
}

function handleSwitchThemeMode() {
    const themeSwitcherButton = document.querySelector('.theme-toggle');
    themeSwitcherButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
    });
}

handleSwitchThemeMode();
displayCountryDetails();
handleLoaderSpinner();
