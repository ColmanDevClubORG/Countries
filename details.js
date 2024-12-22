
const loader = document.querySelector('.loader'); 
const countryDetailsSection = document.querySelector('.country-details');

function showLoader() {
  loader.classList.remove('close'); 
}

function hideLoader() {
  loader.classList.add('close'); 
}

const selectedCountryData = localStorage.getItem('selectedCountry');

if (selectedCountryData) {
  const country = JSON.parse(selectedCountryData);

    countryDetailsSection.innerHTML = `
      <div class="country-flag">
        <img src="${country.flag}" alt="${country.name} Flag" />
      </div>
      <div class="country-info">
        <h1>${country.name}</h1>
        <div class="col-2">
          <ul>
            <li><strong>Native Name:</strong> ${country.nativeName }</li>
            <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
            <li><strong>Region:</strong> ${country.region}</li>
            <li><strong>Sub Region:</strong> ${country.subregion}</li>
            <li><strong>Capital:</strong> ${country.capital}</li>
          </ul>
          <ul>
            <li><strong>Top Level Domain:</strong> ${country.topLevelDomain}</li>
            <li><strong>Currencies:</strong> ${country.currencies}</li>
            <li><strong>Languages:</strong> ${country.languages}</li>
          </ul>
        </div>
        <div class="col-3">
          <strong>Border Countries:</strong>
          <ul>
            ${country.borders?.map(border => `<li>${border}</li>`).join('') || '<li></li>'}
          </ul>
        </div>
      </div>
    `;

    hideLoader(); 
} else {
     countryDetailsSection.innerHTML = `<p>Country details not found</p>`;
    hideLoader();
}