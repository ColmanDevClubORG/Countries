
const allCountries = async () => {
  const data = await getAllCountriesData();

  const countries = document.querySelector('.countries-grid');
  countries.innerHTML = '';

  return data.forEach(item => {
    countries.innerHTML += ` 
                  <a
                href="#"
                class="country scale-effect"
                data-country-name='${item.name}'
              >
                <div class="country-flag">
                  <img
                    src='${item.flag}'
                    alt="'${item.name}' FLag"
                  />
                </div>
                <div class="country-info">
                  <h2 class="country-title">${item.name}</h2>
                  <ul class="country-brief">
                    <li><strong>population: </strong>${item.population}</li>
                    <li><strong>Region: </strong>${item.region}</li>
                    <li><strong>capital: </strong>${item.capital}</li>
                  </ul>
                </div>
              </a>
              `
  });
}

const searchByRegion = async (e) => {
  const data = await getAllCountriesData();
  const selectRegion = e.target.attributes[0].nodeValue;
  const clearInputValue = document.querySelector('.search-input');
  if (clearInputValue.value !== '') clearInputValue.value = '';


  const regionData = data?.filter(({ region }) => {
    if (region.toLowerCase() === selectRegion)
      return region;
    else if (selectRegion == 'all')
      return region
  });

  return displayCountries(regionData)

}

const displayCountries = (data) => {

  const countries = document.querySelector('.countries-grid');
  countries.innerHTML = '';

  data?.forEach(({ name, flag, population, region, capital }) => {
    countries.innerHTML += ` 
              <a
            href="#"
            class="country scale-effect"
            data-country-name='${name}'
          >
            <div class="country-flag">
              <img
                src='${flag}'
                alt="'${name}' FLag"
              />
            </div>
            <div class="country-info">
              <h2 class="country-title">${name}</h2>
              <ul class="country-brief">
                <li><strong>population: </strong>${population}</li>
                <li><strong>Region: </strong>${region}</li>
                <li><strong>capital: </strong>${capital}</li>
              </ul>
            </div>
          </a>
          `
  });
}


const searchByInputCountries = async (e) => {
  const data = await getAllCountriesData();
  let searchInput = e.target.value.toLowerCase()
  let searchLength = searchInput.length;
  const filteredData = data?.filter(({ name }) => {
    const space = name.toLowerCase().indexOf(searchInput[0]);
    if (name.slice(0, searchLength).toLowerCase() == searchInput)
      return name;
    else if (name[space - 1] === ' ' && name.slice(space, space + searchLength).toLowerCase() == searchInput)
      return name;
  });

  return displayCountries(filteredData);
}
