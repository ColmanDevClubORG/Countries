document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');
    
    fetch('./CountriesData.json', {
        method: 'GET'
      }).then((response) => {
        response.json().then((data) => {
          console.log(data)

          const country = data.find(c => c.name === countryName)

          const countryDetailsSection = document.querySelector('.country-details');

          countryDetailsSection.innerHTML = `
            <div class="country-flag">
            <img src="${country.flag}" alt="${country.name} Flag" />
          </div>
          <div class="country-info">
            <h2 class="country-title">${country.name}</h2>
            <ul class="country-brief">
              <li><strong>Population: </strong>${country.population}</li>
              <li><strong>Region: </strong>${country.region}</li>
              <li><strong>Capital: </strong>${country.capital}</li>
            </ul>
          </div>
          `;
        })
       
        

       




      }).catch((err) => {
        console.log(`Error: ${err}` )
      });


});