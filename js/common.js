const themeToggleButton = document.getElementById("theme-toggle");

const changeBackgroundColor = () => {
  // Toggle the 'Dark' class on the <body>
  document.body.classList.toggle('Dark');

  if (document.body.classList.contains('Dark')) {
    themeToggleButton.querySelector('.theme-text').textContent = 'Light Mode';
    document.body.style.backgroundColor = 'hsl(207, 26%, 17%)';
    document.querySelector('header').style.backgroundColor = 'hsl(209, 23%, 22%)'; // Dark header
    document.querySelector('header').style.color = 'white'; // Light text color
  } else {
    themeToggleButton.querySelector('.theme-text').textContent = 'Dark Mode';
    document.body.style.backgroundColor = 'white'; // Light background
    document.querySelector('header').style.backgroundColor = 'white'; // Light header
    document.querySelector('header').style.color = 'black'; // Dark text color
  }
};
