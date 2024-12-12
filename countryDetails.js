setTimeout(() => {
  document.querySelector('.loader').style.display = "none"
}, 700)

const displayCountryDetails = function () {
  const { flag, name, population, region, capital } = (JSON.parse(localStorage.getItem("country")))[0]
  
  document.querySelector('.country-details').innerHTML =
    `
        <div class="country-flag"> 
            <img src="${flag}"/>
        </div>
        <div class="country-info">
          <h1>${name}</h1>
          <p><strong>Population: </strong> ${population.toLocaleString()} </p>
          <p><strong>Region: </strong> ${region}</p>
          <p><strong>Capital: </strong> ${capital}</p>
        </div> 
          `
}

window.onload = async function () {
  displayCountryDetails()
}