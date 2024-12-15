function toggleDropdown() {
    const wrapper = document.querySelector('.dropdown-wrapper');
    wrapper.classList.toggle('open');

    if (wrapper.classList.contains('open')) {
        document.addEventListener('click', handleOutsideClick);
    } else {
        document.removeEventListener('click', handleOutsideClick);
    }
}

function handleOutsideClick(event) {
    const wrapper = document.querySelector('.dropdown-wrapper');
    const body = document.querySelector('.dropdown-body');
    const header = document.querySelector('.dropdown-header');

    if (!body.contains(event.target) && !header.contains(event.target)) {
        wrapper.classList.remove('open');
        document.removeEventListener('click', handleOutsideClick);
    }
}
