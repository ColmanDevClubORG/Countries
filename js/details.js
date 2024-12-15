
const getSelectedCountry = async () => {
    const data = await getAllCountriesData();
    const displayCountry = document.querySelector('.country-details');

    let params = new URLSearchParams(document.location.search);
    let countryName = params.get('country');
    if (!countryName) return;

    const myCountry = data?.find(({ name }) => name === countryName);
    console.log(countryName);

    const { name,nativeName,subRegion, flag, population, region, capital,topLevelDomain,currencies,languages ,borders} = myCountry;
    displayCountry.innerHTML = `
    <div class="country-details ">
      <div class="country-flag"style="width: 100%; max-width: 500px;height: 100%;">
        <img src="${flag}" alt="${name} Flag" style="width: 100%;object-fit: cover;   height: 100%;" />
      </div>
      <div class="country-info">
        <h2 class="country-title">${name}</h2>
        <br/>
  
        <div class="col-2">
          <ul>
            <li><strong>Native Name: </strong>${nativeName}</li>
            <li><strong>Population: </strong>${population}</li>
            <li><strong>Region: </strong>${region}</li>
            <li><strong>Sub Region: </strong>${subRegion}</li>
            <li><strong>Capital: </strong>${capital}</li>
          </ul>
  
          <ul>
            <li><strong>Top Level Domain: </strong>${topLevelDomain.map(item => item)}</li>
            <li><strong>Currencies: </strong>${currencies.map(item => item)}</li>
            <li><strong>Languages: </strong>${languages.map(item => item)}</li>
          </ul>
        </div>
  
        <h2><strong>Border Countries: </strong></h2>
        <div class="col-3">
        ${borders.length > 0? borders?.map(item => 
          `
          <button class="btn">${item}</button>
          `
          
        ).join(' '): 'No border countries found.'}

        </div>
      </div>
    </div>
  `;
  
  
}
