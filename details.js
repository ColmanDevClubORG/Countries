function getCountry() {
  document.addEventListener("DOMContentLoaded", () => {
    const countryDetails = JSON.parse(localStorage.getItem("countryDetails"));

    if (countryDetails) {
      document.querySelector(".country-flag img").src = countryDetails.flag;
      document.querySelector(".country-flag img").alt = `${countryDetails.name} Flag`;
      document.querySelector(".country-title").textContent = countryDetails.name;

      const countryBrief = document.querySelector(".country-brief");
      countryBrief.innerHTML = `
        <li><strong>Population:</strong> ${countryDetails.population}</li>
        <li><strong>Region:</strong> ${countryDetails.region}</li>
        <li><strong>Capital:</strong> ${countryDetails.capital}</li>
      `;

      console.log("Country details loaded:", countryDetails);
    } else {
      console.error("No country details found in localStorage.");
    }
  });
}

getCountry();
