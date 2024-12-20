const countriesGrid = document.querySelector(".countries-grid");
const searchInput = document.querySelector(".search-input");
const dropdownHeader = document.querySelector(".dropdown-header");
const dropdownBody = document.querySelector(".dropdown-body");
const dropdownItems = document.querySelectorAll(".dropdown-body ul li");

// Fetch data from CountriesData.json
fetch("./CountriesData.json")
  .then((response) => response.json())
  .then((data) => {
    renderCountries(data); 
    setupFilters(data); 
  });

// Function to render countries
const renderCountries = (data) => {
  countriesGrid.innerHTML = ""; 
  data.forEach((country) => {
    countriesGrid.innerHTML += `
      <a href="#" class="country scale-effect" data-country-name="${country.name}" data-region="${country.region.toLowerCase()}" onclick="setupCountryLinks(event)">
        <div class="country-flag">
          <img src="${country.flag}" alt="${country.name} Flag" />
        </div>
        <div class="country-info">
          <h2 class="country-title">${country.name}</h2>
          <ul class="country-brief">
            <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
            <li><strong>Region: </strong>${country.region}</li>
            <li><strong>Capital: </strong>${country.capital}</li>
          </ul>
        </div>
      </a>`;
  });
};


const setupCountryLinks = (event) => {

    event.preventDefault();  // Prevent default anchor behavior
    const countryName = event.currentTarget.getAttribute("data-country-name");
    window.location.href = `details.html?country=${encodeURIComponent(countryName)}`;
  };

  

  const openOptions = () => {
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    dropdownWrapper.classList.toggle('open');
  };



// Set up search and region filters
const setupFilters = (data) => {

    searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = data.filter((country) =>
      country.name.toLowerCase().includes(query)
    );
    renderCountries(filteredData);
  });

  
  // Dropdown filter
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const region = item.getAttribute("data-region");
      const filteredData =
        region === "all"
          ? data
          : data.filter((country) => country.region.toLowerCase() === region);
      renderCountries(filteredData);
      
      // Close dropdown after selection
      dropdownBody.classList.remove("visible");
    });
  });
}
