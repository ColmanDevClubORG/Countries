let countriesData = [];  
const countriesGrid= document.querySelector('.countries-grid');
const searchInput= document.querySelector('.search-input');
const dropdownWrapper = document.querySelector('.dropdown-wrapper');
const dropdownHeader = document.querySelector('.dropdown-header');


fetch('./CountriesData.json')
  .then((response) => response.json())
  .then((countries) => {
    countriesData = countries;
    renderCountreis(countries);
  })
  .catch((error) => console.error('Error fetching countries:', error));

  //----------------render the countries function----------------

function renderCountreis(countries){

  countriesGrid.innerHTML = '';

  countries.forEach((country) => {
    const countryCard= document.createElement('div');
    countryCard.classList.add('country');

    countryCard.innerHTML = `
             <a href ="details.html?country=${encodeURIComponent(country.name)}"
             onclick="setCountry('${country.flag}','${country.name}','${country.population}','${country.region}','${country.capital}')"
             class="country scale-effect countryDiv">
               <div class="country-flag" >
                <img
                     src="${country.flag}"
                     alt="${country.name} FLag"
                   />          
                 </div>
               <div class="country-info" >
                 <h2 class="country-title">${country.name}</h2>
                 <ul class="country-brief">
                   <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
                   <li><strong>Region:</strong> ${country.region}</li>
                   <li><strong>Capital:</strong> ${country.capital}</li>
                 </ul>
               </div>
               </a>
             `;

         countriesGrid.appendChild(countryCard);
  });

}

//----------------set country function- single country page (saves the data in local storage)-------------

function setCountry(flag, name, population, region, capital){
  const countryDetails = { flag, name, population, region, capital };
    localStorage.setItem("countryDetails", JSON.stringify(countryDetails));
    console.log("Country details saved:", countryDetails);
}

//----------------opens the filter by region----------------

dropdownHeader.onclick = () => {
  dropdownWrapper.classList.toggle('open');
};

//----------------filter the countries by the selected regions----------------

function filterCountries(){
  const checkBoxes= document.querySelectorAll('.dropdown-body input[type="checkbox"]');
  const selectedRegions=[];

  checkBoxes.forEach((checkbox)=>{
    if (checkbox.checked && checkbox.value!== 'all'){
      selectedRegions.push(checkbox.value.toLowerCase());
    }
  })

  let filteredCountries= countriesData;

  if (selectedRegions.length>0){
    filteredCountries=countriesData.filter((country)=>
      selectedRegions.includes(country.region.toLowerCase())
    );
  }

  renderCountreis(filteredCountries);
}

//----------------find a country by name in search-line----------------

searchInput.addEventListener("input",()=>{
  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().startsWith(searchValue) 
  );
  renderCountreis(filteredCountries); 
})




