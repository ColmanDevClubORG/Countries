document.querySelector('.loader').style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
    
    const selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

    if (selectedCountry) {
        
        const countryDetails = document.querySelector('.country-details');
        countryDetails.classList.add('country-details');

        const countryInfo = document.createElement('div');
        countryInfo.classList.add('country-info');

        const countryName = document.createElement('h1');
        countryName.textContent = selectedCountry.name;
        countryName.classList.add('h1');

        const countryDataList = document.createElement('ul');
        countryDataList.classList.add('country-data-list');

        const countryNativeName = document.createElement('li');
        countryNativeName.innerHTML = `<strong>Native Name:</strong> ${selectedCountry.nativeName}`;

        const countryPopulation = document.createElement('li');
        countryPopulation.innerHTML = `<strong>Population:</strong> ${selectedCountry.population}`;

        const countryRegion = document.createElement('li');
        countryRegion.innerHTML = `<strong>Region:</strong> ${selectedCountry.region}`;

        const countrySubRegion = document.createElement('li');
        countrySubRegion.innerHTML = `<strong>Sub Region:</strong> ${selectedCountry.subregion}`;

        const countryCapital = document.createElement('li');
        countryCapital.innerHTML = `<strong>Capital:</strong> ${selectedCountry.capital}`;

        const countryDomain = document.createElement('li');
        countryDomain.innerHTML = `<strong>Top Level Domain:</strong> ${selectedCountry.topLevelDomain}`;

        const countryCurrencies = document.createElement('li');
        countryCurrencies.innerHTML = `<strong>Currencies:</strong> ${selectedCountry.currencies}`;

        const countryLanguages = document.createElement('li');
        countryLanguages.innerHTML = `<strong>Languages:</strong> ${selectedCountry.languages}`;

        const countryBorders = document.createElement('li');
        countryBorders.innerHTML = `<strong>Border Countries:</strong> `;
        countryBorders.classList.add('border-countries');
        
        selectedCountry.borders.forEach(border => {
            const borderButton = document.createElement('button');
            borderButton.textContent = border;
            borderButton.classList.add('btn'); 
            countryBorders.appendChild(borderButton);
        });

        const countryFlag = document.createElement('img');
        countryFlag.src = `https://flagcdn.com/${selectedCountry.alpha2Code.toLowerCase()}.svg`;
        countryFlag.alt = `${selectedCountry.name} Flag`;
        countryFlag.classList.add('country-flag');

        countryDetails.appendChild(countryFlag);
        countryDetails.appendChild(countryInfo);

        countryInfo.appendChild(countryName);
        countryInfo.appendChild(countryDataList);

        countryDataList.appendChild(countryNativeName);
        countryDataList.appendChild(countryPopulation);
        countryDataList.appendChild(countryRegion);
        countryDataList.appendChild(countrySubRegion);
        countryDataList.appendChild(countryCapital);
        countryDataList.appendChild(countryDomain);
        countryDataList.appendChild(countryCurrencies);
        countryDataList.appendChild(countryLanguages);
        countryDataList.appendChild(countryBorders);
    } 
});
