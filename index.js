
fetch('CountriesData.json')
.then(response=>{
    if (!response.ok){
        throw new Error("Failed to load countries JSON file")

    }
    return response.json()
})
.then(countries =>{
    const container = document.querySelector('.countries-grid')

        countries.forEach(country => {
        const countryFrame = document.createElement('a');
        countryFrame.href = "#";
        countryFrame.classList.add('country', 'scale-effect');
        countryFrame.setAttribute('data-country-name', country.name);

        countryFrame.innerHTML =`
        <div class="country-flag">
            <img
            src = "${country.flag}"
            alt = "${country.name} FLag"
            />
        </div>
        <div class="country-info">
            <h2 class="country-title">${country.name}</h2>
            <ul class="country-brief">
                <li>
                    <strong>Population:</strong>
                    ${country.population}
                </li>
                <li>
                    <strong>Region:</strong>
                   ${country.region}
                </li>
                <li>
                    <strong>Capital:</strong>
                    ${country.capital}
                </li>
                </ul>
        </div>

        `;

        container.appendChild(countryFrame);
    });
}).catch(error => console.error(error));
