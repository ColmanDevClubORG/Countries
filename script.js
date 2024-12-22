    fetch('./CountriesData.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.countries-grid');  // המיכל שבו תוסיף את כל המדינות
    
            data.forEach(country => {

    
                // יצירת לינק (a) עבור כל מדינה
                const countryLink = document.createElement('a');
                countryLink.href = `details.html?country=${encodeURIComponent(country.name)}`;
                countryLink.classList.add('country','scale-effect');
                countryLink.setAttribute('data-country-name', country.name);
    
                // יצירת div עבור דגל המדינה
                const countryFlagDiv = document.createElement('div');
                countryFlagDiv.classList.add('country-flag');
                const countryFlagImg = document.createElement('img');
                countryFlagImg.src = country.flag;
                countryFlagImg.alt = `${country.name} flag`;
                countryFlagDiv.appendChild(countryFlagImg);
    
                // יצירת div עבור פרטי המדינה
                const countryInfoDiv = document.createElement('div');
                countryInfoDiv.classList.add('country-info');
    
                const countryTitle = document.createElement('h2');
                countryTitle.classList.add('country-title');
                countryTitle.textContent = country.name;
    
                const countryBriefList = document.createElement('ul');
                countryBriefList.classList.add('country-brief');
    
                // יצירת פריטים (li) עבור אוכלוסייה, אזור ו-בירה
                const populationLi = document.createElement('li');
                populationLi.innerHTML = `<strong>Population:</strong> ${country.population}`;
                const regionLi = document.createElement('li');
                regionLi.innerHTML = `<strong>Region:</strong> ${country.region}`;
                const capitalLi = document.createElement('li');
                capitalLi.innerHTML = `<strong>Capital:</strong> ${country.capital}`;
    
                // הוספת כל הפריטים לרשימה
                countryBriefList.appendChild(populationLi);
                countryBriefList.appendChild(regionLi);
                countryBriefList.appendChild(capitalLi);
    
                // הוספת כל האלמנטים ל-countryInfoDiv
                countryInfoDiv.appendChild(countryTitle);
                countryInfoDiv.appendChild(countryBriefList);
    
                // הוספת כל האלמנטים ל-countryLink
            
                countryLink.appendChild(countryFlagDiv);
                countryLink.appendChild(countryInfoDiv);
            
    
                // הוספת ה-countryLink ל-countryDiv
                container.appendChild(countryLink);

            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

const dropDownListClicked = () => {
    const dropDown = document.getElementsByClassName('dropdown-wrapper')[0];
    if (dropDown) {
        dropDown.classList.toggle('open');
    } else {
        console.error('Dropdown element not found');
    }
    
}

const filterByRegion = (region) => {
    const countries = document.getElementsByClassName('country');
    for (let i = 0; i < countries.length; i++) {
        const countryRegion = countries[i].getElementsByClassName('country-brief')[0].getElementsByTagName('li')[1].innerText.split(':')[1].trim(); 
        if (region === 'All' || countryRegion === region) {
            countries[i].style.display = 'block';
        } else {
            countries[i].style.display = 'none';
        }
    }
};