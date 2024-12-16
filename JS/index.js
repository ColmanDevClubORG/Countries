console.log('hello');
let countries = [];
const containerCountries = document.querySelector(".countries-grid");
const countryCardTemplate = document.querySelector(".country.scale-effect");

fetch('./CountriesData.json')
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        countries = data;
        console.log(data);
        innerDetailsIntoCards(countries); 
    })
    .catch((error) => {
        console.error("Unable to fetch data:", error);
    });

const innerDetailsIntoCards = (array) => {
    containerCountries.innerHTML = '';

    array.forEach((country) => {
        const cloneCard = countryCardTemplate.cloneNode(true);
       
        const titleElement = cloneCard.querySelector(".country-title");
        const flagImage = cloneCard.querySelector(".country-flag img");
        const countryInfo = cloneCard.querySelectorAll(".country-brief li");

        titleElement.innerHTML = country.name;
        flagImage.src = country.flag;
        flagImage.alt = `${country.name}`;
        
        countryInfo[0].innerHTML = `<strong>Population:</strong> ${country.population}`;
        countryInfo[1].innerHTML = `<strong>Region:</strong> ${country.region}`;
        countryInfo[2].innerHTML = `<strong>Capital:</strong> ${country.capital}`;

        containerCountries.appendChild(cloneCard);
    });
};

const openDropDown = () => {
  const dropDown = document.querySelector(".dropdown-wrapper");
  console.log('enter');
  dropDown.classList.toggle("open");
}

const filterByRegion = (event) => {
   const region = event.target.getAttribute("data-region");
   console.log("select region:" + region)

   if(region!="all"){
   const result = countries.filter((country)=>{
    return country.region.toLowerCase() == region.toLowerCase()
   })
   console.log(result);
   innerDetailsIntoCards(result);
}
else{
    innerDetailsIntoCards(countries);
}

//    const result =  countries.filter((country)=>{
//          return country.region === "Africa";
//     })
//     console.log(result);
}

const matchValues = (country, input) => {
    return (country.name.toLowerCase().includes(input) || 
        country.population.toString().includes(input)) ||
        country.region.toLowerCase().includes(input) ||
        country.capital.toLowerCase().includes(input)
}
const filterBySerach = (event) =>{
    console.log("enter to filterbyserach func");
    const input = event.target.value.toLowerCase();
    console.log(input);

    const resultBySearch = countries.filter((country)=>{
        return matchValues(country,input);
     })
    console.log(resultBySearch);
    innerDetailsIntoCards(resultBySearch);
}


const switchPage = (event) =>{
    const card = event.currentTarget;
    console.log(card.innerHTML);
    
    const titleElement = card.querySelector(".country-title").textContent;
    const flagImage = card.querySelector(".country-flag img").src;
    const population = card.querySelector(".country-brief li:nth-child(1)").textContent;
    const region = card.querySelector(".country-brief li:nth-child(2)").textContent;
    const capital = card.querySelector(".country-brief li:nth-child(3)").textContent;
    
    const countryInfo = {name:titleElement, flagImg:flagImage, population:population, region: region, capital:capital};
    console.log(countryInfo);
    localStorage.setItem("selectedCountry", JSON.stringify(countryInfo));
    window.location.href = "details.html";
}


//maybe do this
const changeColorOfPage = () =>{
    console.log("enter");
    const currentColor = getComputedStyle(document.body).backgroundColor;
    
    if (currentColor === "rgb(33, 37, 41)") { 
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    } else {
        document.body.style.backgroundColor = "rgb(33, 37, 41)";
    }
};
    








// const containerCountries = document.querySelector(".countries-grid");
// const countryCard = document.querySelector(".country.scale-effect");
// const cards= document.querySelectorAll(".country");

// fetch('./CountriesData.json')
//     .then((res) => {
//         if (!res.ok) {
//             throw new Error
//                 (`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//     })
//     .then((data) => {
//         countries = data;
//         console.log(data); 
//         duplicateCard(); 
//         innerTextIntoCardDetails(countries);
//     })
//     .catch((error) =>
//         console.error("Unable to fetch data:", error));

// const duplicateCard = () =>{
//     const lenArray = countries.length;
    
//     for(i=1;i<lenArray;i++){
//        const cloneCard = countryCard.cloneNode(true);
//        containerCountries.appendChild(cloneCard);
//     }
// }
// const innerTextIntoCardDetails = (array) =>{
//     const cards= document.querySelectorAll(".country"); //take after the duplicate
    
//     for(i=0;i<countries.length;i++){
//         const titleElement = cards[i].querySelector(".country-title");
//         const flagImage = cards[i].querySelector(".country-flag img"); //choost the img in the selector 
//         const countryInfo = cards[i].querySelectorAll(".country-brief li");
        
//         countryInfo.forEach((item)=>{
//             const label = item.querySelector("strong").textContent.trim().replace(":", "");
//             if(label==="population"){
//                item.innerHTML = countries[i].population;
//             }
//             else if(label==="Region"){
//                 item.innerHTML = countries[i].region;
//              }
//              else if(label==="capital"){
//                 item.innerHTML = countries[i].capital;
//              }
//         })
//         titleElement.innerHTML = countries[i].name;
//         flagImage.src = countries[i].flag;
//         flagImage.alt = `${countries[i].name}`;
//     }
// }

    

    
