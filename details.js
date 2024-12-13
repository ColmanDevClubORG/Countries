document.addEventListener("DOMContentLoaded", () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const flag = urlParams.get("flag");
    const population = urlParams.get("population");
    const region = urlParams.get("region");
    const capital = urlParams.get("capital");

    const countryDetailsSection = document.querySelector(".country-details");
    const loader = document.querySelector(".loader");

    loader.style.display = "flex";

    if (name && flag && population && region && capital) {
        const cardHTML = `
            <div class="country">
                <div class="country-flag">
                    <img src="${flag}" alt="${name} Flag" class="country-image" />
                </div>
                <div class="country-info">
                    <h2 class="country-title">${name}</h2>
                    <ul>
                        <li><strong>Population:</strong> ${Number(population).toLocaleString()}</li>
                        <li><strong>Region:</strong> ${region}</li>
                        <li><strong>Capital:</strong> ${capital}</li>
                    </ul>
                </div>
            </div>
        `;

        countryDetailsSection.innerHTML = cardHTML;
        loader.style.display = "none";
    } else {
        loader.style.display = "none";
        alert("Failed to load country details. Missing data.");
    }
});
