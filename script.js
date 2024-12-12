const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector)

let currentCountries = {}

const getAllCountries = async function () {
  const response = await fetch('CountriesData.json')
  return await response.json()
}

const displayCountries =  function (data) {
  const countriesGrid = $('.countries-grid');
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
  $('.dropdown-body').classList.toggle("on")

  $$('.li-drop').forEach(countryLi => {
    countryLi.addEventListener("click", async () => {
      $('.dropdown-header span').textContent = countryLi.textContent
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
  $('body').classList.toggle('dark-theme')
}

$('.search-input').addEventListener('input', (e) => {
  const data = currentCountries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
  displayCountries(data)
})

window.onload = async function () {
  const data = await getAllCountries();
  currentCountries = data
  displayCountries(data)
}

