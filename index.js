document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle-btn");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-list a"); // todos los links del menú

    const form = document.querySelector(".form");
    const modal = document.getElementById("modal-confirmacion");

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

     
    form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita redirección inmediata

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          // Mostrar modal
          modal.classList.remove("oculto");

          // Ocultar a los 3 segundos
          setTimeout(() => {
            modal.classList.add("oculto");
            form.reset(); // limpia el formulario
          }, 3000);
        } else {
          alert("Hubo un error, por favor intente nuevamente.");
        }
      })
      .catch(() => {
        alert("Error de conexión, intente nuevamente.");
      });
  });
});
