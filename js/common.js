const handleCountryClick = (country, event) => {
    event.preventDefault();
    
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    window.location.href = './details.html';
    
  }