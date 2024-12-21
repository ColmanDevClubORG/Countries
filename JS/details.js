console.log("hello details.page");
const loader = document.querySelector(".loader");
loader.style.display = "none";

const countryDetails = JSON.parse(localStorage.getItem("selectedCountry"));
console.log("selected country", countryDetails);

const htmlDetails = document.querySelector('.country-details');
htmlDetails.innerHTML = `<a href="#" class="country scale-effect" data-country-name="${countryDetails.name}">
          <div class="country-flag">
            <img src=${countryDetails.flagImg}
              alt="${countryDetails.name} FLag" />
          </div>
          <div class="country-info">
            <h2 class="country-title">${countryDetails.name}</h2>
            <ul class="country-brief">
              <li>${countryDetails.population}</li>
              <li>${countryDetails.region}</li>
              <li>${countryDetails.capital}</li>
            </ul>
          </div>
        </a>`;
document.querySelector(".country-flag img").style.width = "450px";
