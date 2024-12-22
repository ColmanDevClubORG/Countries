document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const countryName = decodeURIComponent(params.get('country'));
    const loader = document.querySelector('.loader'); 

    fetch('CountriesData.json')
        .then(response => response.json())
        .then(countries => {
            const country = countries.find(c => c.name === countryName);
            if (!country) {
                document.querySelector('.country-details').innerHTML = `<p>Country not found.</p>`;
                loader.classList.add('close');  
                return;
            }

            document.querySelector('.country-details').innerHTML = `
                <div class="country-flag">
                    <img src="${country.flag}" alt="Flag of ${country.name}" />
                </div>
                <div class="country-info">
                    <h1>${country.name}</h1>
                    <ul>
                        <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
                        <li><strong>Region: </strong>${country.region}</li>
                        <li><strong>Capital: </strong>${country.capital || 'N/A'}</li>
                    </ul>
                </div>
            `;
            loader.classList.add('close');  
        })
        .catch(error => {
            console.error('Error loading the country details:', error);
            loader.classList.add('close');  
        });
});
