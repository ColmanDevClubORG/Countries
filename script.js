let currentCountries = {}

const getAllCountries = async function () {
  const response = await fetch('CountriesData.json')
  return await response.json()
}

const displayCountries =  function (data) {
  const countriesGrid = document.querySelector('.countries-grid');
  countriesGrid.innerHTML = ''

  data.forEach(country => {
    countriesGrid.innerHTML +=
      `<a onClick="openDetailsPage('${country.name}')"  class="country scale-effect" data-country-name='${country.name}'>
      <div class="country-flag">
      <img src="${country.flag}" />
      </div>

      <div class="country-info">
      <h2 class="country-title">${country.name}</h2>
      <ul class="country-brief">
        <li>
        <strong>Population: </strong>
        ${country.population.toLocaleString()}
        </li>
        <li>
        <strong>Region: </strong>
        ${country.region}
        </li>
        <li>
        <strong>Capital: </strong>
        ${country.capital}
        </li>
      </ul>
      </div>
    </a>`
  });
}

const openDropDown = async function () {
  document.querySelector('.dropdown-body').classList.toggle("on")

  document.querySelectorAll('.li-drop').forEach(countryLi => {
    countryLi.addEventListener("click", async () => {
      document.querySelector('.dropdown-header span').textContent = countryLi.textContent
      let data = await getAllCountries()
      if (countryLi.textContent !== "All") {
        data = data.filter(country => country.region.includes(countryLi.textContent));
      }
      currentCountries = data
      displayCountries(data);
    })
  })
}

const openDetailsPage =  function (countryName) {
  const countryData = currentCountries.filter(country => country.name == countryName)
  localStorage.setItem("country", JSON.stringify(countryData))
  window.location.href = 'details.html';
}

const activateDarkMode =  function () {
  document.querySelector('body').classList.toggle('dark-theme')
}

document.querySelector('.search-input').addEventListener('input', (e) => {
  const data = currentCountries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
  displayCountries(data)
})

window.onload = async function () {
  const data = await getAllCountries();
  currentCountries = data
  displayCountries(data)
}

