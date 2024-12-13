fetch('./CountriesData.json')
.then(response => {
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const countriesList = document.getElementById('countries-list');
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.href = './details.html';
        countryCard.classList.add('country', 'scale-effect');
        countryCard.setAttribute('data-country-name', country.name);
        
        countryCard.onclick = (event) => {
          handleCountryClick(country, event);
      };
            
        const countryImg = document.createElement('div');
        countryImg.classList.add('country-flag');
        const countryFlag = document.createElement('img');
        countryFlag.src = `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`;
        countryFlag.alt = `${country.name} Flag`;
        countryImg.appendChild(countryFlag);
        
        countryCard.appendChild(countryImg);
      
        const countryInfo = document.createElement('div');
        countryInfo.classList.add('country-info');
        const countryName = document.createElement('h2');
        countryName.textContent = country.name;
        countryName.classList.add('country-title');
        countryInfo.appendChild(countryName);
      
        const countryDetails = document.createElement('ul');
        countryDetails.classList.add('country-brief');
      
        const countryPopulation = document.createElement('li');
        countryPopulation.innerHTML = `<strong>Population: </strong>${country.population}`;
        countryDetails.appendChild(countryPopulation);
      
        const countryRegion = document.createElement('li');
        countryRegion.innerHTML = `<strong>Region: </strong>${country.region}`;
        countryDetails.appendChild(countryRegion);
      
        const countryCapital = document.createElement('li');
        countryCapital.innerHTML = `<strong>Capital: </strong>${country.capital}`;
        countryDetails.appendChild(countryCapital);
      
        countryInfo.appendChild(countryDetails);
        countryCard.appendChild(countryInfo);

        countryCard.setAttribute('countryregion', country.region);
      
        countriesList.appendChild(countryCard);
      })
      
})

const showFilterByRegion = () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
  
  if (dropdownWrapper.classList.contains('open')) { 
    dropdownWrapper.classList.remove('open'); 
  } else {
    dropdownWrapper.classList.add('open'); 
  }
}

const chosenRegion = (element) => {
    
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const regionFilter = document.getElementById('region-filter');
    const region = element.getAttribute('data-region').charAt(0).toUpperCase() + element.getAttribute('data-region').slice(1);
    regionFilter.textContent = region;
    dropdownWrapper.classList.remove('open');
    filterByRegion(region);
}

const filterByRegion = (region) => { 
  const countries = document.querySelectorAll('.country');
  countries.forEach(country => {
    const countryRegion = country.getAttribute('countryregion');
    
    if (!(region === 'All' || countryRegion === region)) {
      country.classList.add('hidden-country');
     } else {
      country.classList.remove('hidden-country');
     }
  })
}







