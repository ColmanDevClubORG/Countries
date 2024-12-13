document.addEventListener("DOMContentLoaded", () => {
    fetch("CountriesData.json")

        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load countries JSON");
            }
            return response.json();
        })

        .then(countries => {
            const template=document.querySelector(".country[data-country-name]")
            const grid=document.querySelector(".countries-grid");

            function displayCountries(filteredCountries) {
                grid.innerHTML = ""; // מנקה את הכרטיסים הקיימים
                filteredCountries.forEach(country => {
                    const card = template.cloneNode(true);
                    card.style.display = "block";
                    card.setAttribute("data-country-name", country.name);

                    card.setAttribute("href", `details.html?name=${encodeURIComponent(country.name)}&flag=${encodeURIComponent(country.flag)}&population=${country.population}&region=${encodeURIComponent(country.region)}&capital=${encodeURIComponent(country.capital || "N/A")}`);


                    card.querySelector(".country-image").src = country.flag;
                    card.querySelector(".country-image").alt = `${country.name} Flag`;
                    card.querySelector(".country-title").textContent = country.name;
                    card.querySelector(".country-population").textContent = country.population.toLocaleString();
                    card.querySelector(".country-region").textContent = country.region;
                    card.querySelector(".country-capital").textContent = country.capital || "N/A";

                    grid.appendChild(card);
                });
            }

            displayCountries(countries);

            const dropdownItems = document.querySelectorAll(".dropdown-body li");

            dropdownItems.forEach(item => {
                item.addEventListener("click", (event) => {
                    const region = event.target.getAttribute("data-region");

                    const filteredCountries = region === "all"
                        ? countries
                        : countries.filter(country => country.region.toLowerCase() === region.toLowerCase());


                    displayCountries(filteredCountries);

                    const dropdownWrapper = document.querySelector(".dropdown-wrapper");
                    dropdownWrapper.classList.remove("open");
                });
            });

        })
        .catch(error => {
            console.error("Error loading countries data: ", error);
        });


    const dropdownHeader = document.querySelector(".dropdown-header");
    const dropdownWrapper = document.querySelector(".dropdown-wrapper");

    dropdownHeader.addEventListener("click", () => {
        dropdownWrapper.classList.toggle("open");
    });
    
    document.addEventListener("click",(event)=>{
        if(!dropdownWrapper.contains(event.target) && !dropdownHeader.contains(event.target))
            dropdownWrapper.classList.remove("open");
    });
});



