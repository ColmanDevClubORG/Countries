document.addEventListener('DOMContentLoaded', () => {
    fetch('./CountriesData.json', {
      method: 'GET',
    })
      .then((response) => {
        response.json().then((jsonResponse) => {
          console.log(jsonResponse);
  
          const countriesInDiv = document.querySelector('.countries-grid');
  
          if (!countriesInDiv) {
            console.error("Error: '.countries-grid' element not found in the DOM.");
            return;
          }
  
          jsonResponse.forEach((country) => {
            countriesInDiv.innerHTML += `
              <a
                href="./details.html?country=${encodeURIComponent(country.name)}"
                class="country scale-effect"
                data-country-name="${country.name}"
              >
                <div class="country-flag">
                  <img src="${country.flag}" alt="${country.name} Flag" />
                </div>
                <div class="country-info">
                  <ul class="country-brief">
                    <li><strong>population: </strong>${country.population}</li>
                    <li><strong>Region: </strong>${country.region}</li>
                    <li><strong>capital: </strong>${country.capital}</li>
                  </ul>
                </div>
              </a>
            `;
          });
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  });
  