// Load countries from JSON file, once completed use displayCountries to render them
const loadCountries = async () => {
  const grid = document.getElementById("countries-grid");

  try {
    const response = await fetch("./CountriesData.json");
    const countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error loading countries:", error);
  }
};

const displayCountries = (countries) => {
  const grid = document.getElementById("countries-grid");
  grid.innerHTML = ""; // Reset the grid

  countries.forEach((country) => {
    const countryElement = document.createElement("a");
    countryElement.href = "#";
    countryElement.className = "country scale-effect";
    countryElement.setAttribute("data-country-name", country.name);

    countryElement.innerHTML = `
        <div class="country-flag">
          <img
            src="${country.flag}"
            alt="${country.name} Flag"
          />
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

    // Append the country element to the grid
    grid.appendChild(countryElement);
  });
};

const filterCountries = async (region) => {
  try {
    const response = await fetch("./CountriesData.json");
    const countries = await response.json();
    const filteredCountries =
      region === "all"
        ? countries
        : countries.filter(
            (country) => country.region.toLowerCase() === region
          );
    displayCountries(filteredCountries);
  } catch (error) {
    console.error("Error filtering countries:", error);
  }
};

// Load countries when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadCountries();

  const dropdownWrapper = document.querySelector(".dropdown-wrapper");
  const dropdownHeader = document.querySelector(".dropdown-header");
  const dropdownItems = document.querySelectorAll(".dropdown-body li");

  dropdownHeader.addEventListener("click", () => {
    dropdownWrapper.classList.toggle("open");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const region = event.target.getAttribute("data-region");
      filterCountries(region);
      dropdownWrapper.classList.remove("open"); // close the dropdown
    });
  });
});
