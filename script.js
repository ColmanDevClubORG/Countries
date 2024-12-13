document.addEventListener("DOMContentLoaded", () => {
    fetch("CountriesData.json")

    .then(response=>{
        if(!response.ok){
            throw new Error("Failed to load countries JSON");
        }
        return response.json();
    })

    .then(countries => {

        const template=document.querySelector('.country[data-country-name]');
        const grid=document.querySelector(".countries-grid");

        countries.forEach(country => {
            const card=template.cloneNode(true);
            card.style.display="block";
            card.setAttribute("data-country-name",country.name);

            card.querySelector(".country-image").src=country.flag;
            card.querySelector(".country-image").alt= `${country.name} Flag`;
            card.querySelector(".country-title").textContent =country.name;
            card.querySelector(".country-population").textContent =country.population.toLocaleString();
            card.querySelector(".country-region").textContent =country.region;
            card.querySelector(".country-capital").textContent =country.capital || "N/A";

            grid.appendChild(card);
        });
    })

    .catch(error=>{
        console.error("Error loading countries data: ",error);
    });
});