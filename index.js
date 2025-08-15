document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle-btn");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-list a"); // todos los links del menú

    // Función para cerrar el menú
    const closeMenu = () => {
        navList.classList.remove("active");
        toggleBtn.innerHTML = "&#9776;"; // ☰
        toggleBtn.setAttribute("aria-label", "Abrir menú");
    };

    // Abrir/cerrar con el botón
    toggleBtn.addEventListener("click", () => {
        navList.classList.toggle("active");

        if (navList.classList.contains("active")) {
            toggleBtn.innerHTML = "&times;"; // X
            toggleBtn.setAttribute("aria-label", "Cerrar menú");
        } else {
            toggleBtn.innerHTML = "&#9776;"; // ☰
            toggleBtn.setAttribute("aria-label", "Abrir menú");
        }
    });

    // Cerrar cuando hago click en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
});
