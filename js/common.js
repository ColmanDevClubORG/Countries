document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.querySelector('.theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    const scrollTopButton = document.querySelector('.scroll-top');
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
