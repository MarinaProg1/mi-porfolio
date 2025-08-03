document.addEventListener("DOMContentLoaded", ()=>{

// toggle

    
    const toggleBtn = document.querySelector(".toggle-btn");
    const navList = document.querySelector(".nav-list");

    toggleBtn.addEventListener("click", () => {
        navList.classList.toggle("active");

         // Cambiar icono según estado
        if (navList.classList.contains("active")) {
            toggleBtn.innerHTML = "&times;"; // X
            toggleBtn.setAttribute("aria-label", "Cerrar menú");
        } else {
            toggleBtn.innerHTML = "&#9776;"; // ☰
            toggleBtn.setAttribute("aria-label", "Abrir menú");
        }
       
    });



});


