
document.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll("#menu .tile");

    tiles.forEach(tile => {
        tile.addEventListener("click", function (e) {
            // Si ya está volteado, quitar clase (toggle)
            if (tile.classList.contains("flipped")) {
                tile.classList.remove("flipped");
            } else {
                // Quitar la clase de otros (opcional)
                tiles.forEach(t => t.classList.remove("flipped"));
                tile.classList.add("flipped");
            }
        });
    });
});

document.querySelector(".about-tile a").addEventListener("click", function() {
    alert("¡Hola! Estás yendo a la sección SOBRE MI");
  });
  