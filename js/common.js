


const getAllCountriesData = async () => {
    let isLoading = true;
    try {
        loading(isLoading);
        const result = await fetch(`../FullCountriesData.json`);
        if (!result.ok) {
            throw "Failed to fetch data";
        }
        const json = await result.json();
        // console.log(json);
        return json;
    }
    catch (error) {
        console.log(error);
    } finally {
        isLoading = false;
        loading(isLoading);
    }
}

const loading = () => {
    const loader = document.querySelector('.country-details')
        ? document.querySelector('.country-details')
        : document.querySelector('.countries-grid');

    if (loader) {
        loader.innerHTML = `
                    <div class="loader">
                        <div class="spinner">
                            <i class="fa-regular fa-circle-notch fa-spin icon"></i>
                        </div>
                    </div>
                `;
    }
    else {
        loader.innerHtml = '';
    }
}


const selectCountry = async (e) => {
    const data = await getAllCountriesData();
    const countryName = e.target.closest(".country");
    const country = countryName.dataset.countryName;
    const findCountry = data.find(({ name }) => name === country)

    if (!findCountry) return;

    window.location.href = `details.html?country=${country}`;
}


const darkModeToggle = document.querySelector('.theme-toggle');
darkModeToggle.addEventListener('click', () => {
    const darkMode = darkModeToggle.classList.contains('dark-mode');
    const themeText = document.querySelector('.theme-text');
    const themeIcon = document.querySelector('.theme-toggle>i');

    themeIcon.classList.add('fa-moon');
    themeIcon.classList.remove('fa-sun');
    if (darkMode) {
        document.body.style.backgroundColor = '#ffff';
        themeText.innerHTML = 'Dark Mode';
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.remove('fa-sun');
        darkModeToggle.classList.remove('dark-mode')
    }
    else {
        themeText.innerText = 'Light Mode';
        document.body.style.backgroundColor = '#333';
        themeIcon.classList.add('fa-sun');
        themeIcon.classList.remove('fa-moon');
        darkModeToggle.classList.add('dark-mode');
    }
});







