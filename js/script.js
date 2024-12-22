document.addEventListener('DOMContentLoaded', function() {
    const url = 'CountriesData.json';
    let countriesData = [];

    fetch(url)
        .then(response => response.json())
        .then(countries => {
            countriesData = countries; 
            displayCountries(countriesData);
        })
        .catch(error => console.error('Error loading the countries data:', error));

    function displayCountries(data) {
        const countriesGrid = document.querySelector('.countries-grid');
        countriesGrid.innerHTML = ''; 

        data.forEach(country => {
            const countryElement = document.createElement('a');
            countryElement.href = `details.html?country=${encodeURIComponent(country.name)}`; 
            countryElement.className = 'country scale-effect';
            countryElement.innerHTML = `
                <div class="country-flag">
                    <img src="${country.flag}" alt="Flag of ${country.name}" />
                </div>
                <div class="country-info">
                    <h2 class="country-title">${country.name}</h2>
                    <ul class="country-brief">
                        <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
                        <li><strong>Region: </strong>${country.region}</li>
                        <li><strong>Capital: </strong>${country.capital || 'N/A'}</li>
                    </ul>
                </div>
            `;
            countriesGrid.appendChild(countryElement);
        });
    }

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(searchText));
        displayCountries(filteredCountries);
    });

    const dropdownHeader = document.querySelector('.dropdown-header');
    dropdownHeader.addEventListener('click', function() {
        const wrapper = document.querySelector('.dropdown-wrapper');
        wrapper.classList.toggle('open');
    });

    document.querySelector('.dropdown-body').addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'li') {
            const region = event.target.getAttribute('data-region');
            const regionText = event.target.textContent;
            dropdownHeader.querySelector('span').textContent = regionText; 
            document.querySelector('.dropdown-wrapper').classList.remove('open'); 

            if (region === 'all') {
                displayCountries(countriesData);
            } else {
                const filteredCountries = countriesData.filter(country => country.region.toLowerCase() === region);
                displayCountries(filteredCountries);
            }
        }
    });
});
