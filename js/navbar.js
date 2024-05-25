function toggleMenu() {
    var links = document.querySelector('.page-links');
    var hamburgerMenu = document.querySelector('.hamburger-menu');

    links.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
}
