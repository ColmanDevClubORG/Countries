const getDetailsOfCountry = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const countryDetails = JSON.parse(localStorage.getItem("countryDetails"));
    
        if (countryDetails) {
            console.log("Country Details on details.html:", countryDetails);
            document.querySelector(".main-country-flag").innerHTML = `<img class="country-flag" src="${countryDetails.flag}" alt="${countryDetails.name} flag" />`;
            document.querySelector(".country-name").textContent = `${countryDetails.name}`;
            document.querySelector(".country-population").textContent = `Population: ${countryDetails.population}`;
            document.querySelector(".country-region").textContent = `Region: ${countryDetails.region}`;
            document.querySelector(".country-capital").textContent = `Capital: ${countryDetails.capital}`;
        } else {
            console.error("No country details found in localStorage.");
        }
    });
    
}
getDetailsOfCountry()
