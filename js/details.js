document.addEventListener("DOMContentLoaded", () => {
    const countryDetailsSection = document.querySelector(".country-details");
    const loader = document.querySelector(".loader");
  
    // Extract country name
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get("country");
  
    if (!countryName) {
      countryDetailsSection.innerHTML = `<p>Country not specified in the query.</p>`;
      loader.style.display = "none";
      return;
    }
  
    fetch("./CountriesData.json")
      .then((response) => response.json())
      .then((data) => {
        const country = data.find((c) => c.name === countryName);
  
        if (!country) {
          countryDetailsSection.innerHTML = `<p>Country details not found.</p>`;
          return;
        }
  
        countryDetailsSection.innerHTML = `
          <div class="country-details">
            <div class="country-flag">
              <img src="${country.flag}" alt="${country.name} Flag" />
            </div>
            <div class="country-info">
              <h2>${country.name}</h2>
              <ul>
                <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
                <li><strong>Region:</strong> ${country.region}</li>
                <li><strong>Capital:</strong> ${country.capital}</li>
              </ul>
            </div>
          </div>`;
      })
      
        loader.style.display = "none"; 
  });
  