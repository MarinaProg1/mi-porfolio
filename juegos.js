document.addEventListener("DOMContentLoaded", ()=>{
const contenedorJuego1 = document.getElementById('contenedor-juego1');
const tablero = document.getElementById('tablero');
const contenedorJuego2 = document.getElementById('contenedor-juego2');
const botonMemo = document.getElementById('iniciar-juego1');
const botonBurbujas = document.getElementById('iniciar-juego2');
const contenButton = document.getElementsByClassName('content-button')

var contador = document.getElementById('contador-movimientos');
var acumulador = document.getElementById('acumulador-puntos');

var arregloCards = [];
var arregloCardsVolteadas = [];
var arreglocardsEncontradas = [];
let contadorMovimientos = 0;
let acumuladorPuntos = 0;
let totalBurbujas = 50;
let burbujasTerminadas = 0;

// no se ven al inicio
contenedorJuego1.style.display = "none";
contenedorJuego2.style.display = "none";

// Mostrar solo juego 1
    botonMemo.addEventListener('click', ()=>{
        contenedorJuego1.style.display = "block";
        contenedorJuego2.style.display = "none";
        iniciarJuegoMemoria(); // <-- tu función
    });

    // Mostrar solo juego 2
    botonBurbujas.addEventListener('click', ()=>{
        contenedorJuego2.style.display = "block";
        contenedorJuego1.style.display = "none";
        iniciarJuegoBurbujas(); 
    });


const imagenes = [
  'images/c-.png',
  'images/c-sharp.png',
  'images/css-3.png',
  'images/html.png',
  'images/java.png',
  'images/php.png',
  'images/science.png',
  'images/letter-c.png'
];

const puntajePorImagen = {
  'images/c-.png': 20,
  'images/c-sharp.png': 35,  
  'images/css-3.png': 30,
  'images/html.png': 12,
  'images/java.png': 15,
  'images/php.png': 5,
  'images/science.png': 25,
  'images/letter-c.png': 10
};

function iniciarJuegoMemoria(){
  tablero.innerHTML ='';
  arregloCards = [];
  arreglocardsEncontradas = [];  
  
  contador.classList.remove('oculto');
  ocultarBotones();
  contadorMovimientos = 0;
  contador.textContent = 'Movimientos: 0';

  for(let j=0; j<2; j++){
    for(let i=0; i<imagenes.length; i++){
        let cardHTML = `<div class="card" data-card="${i}">
                        <img src="${imagenes[i]}" class="oculta" />
                      </div>`;
        arregloCards.push(cardHTML)
    }
  }

  //desordenar cartas
  arregloCards.sort(() => Math.random() - 0.5);
  tablero.innerHTML = arregloCards.join('');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', voltearCarta);
  });
}
function ocultarBotones(){
 botonMemo.classList.add('oculto');
  botonBurbujas.classList.add('oculto');

}
function mostrarBotones(){
  botonMemo.classList.remove('oculto');
  botonBurbujas.classList.remove('oculto');
  
}
function voltearCarta() {
  if (arregloCardsVolteadas.length < 2 && 
      !arregloCardsVolteadas.includes(this) && 
      !arreglocardsEncontradas.includes(this)) {
    this.querySelector('img').classList.remove('oculta');
    arregloCardsVolteadas.push(this);

    if (arregloCardsVolteadas.length === 2) {
        contadorMovimientos++;
        document.getElementById('contador-movimientos').textContent = `Movimientos: ${contadorMovimientos}`;

      validarCarta();
    }
  }
}
function validarCarta() {
  const [card1, card2] = arregloCardsVolteadas;

  if (card1.dataset.card === card2.dataset.card) {
    arreglocardsEncontradas.push(card1, card2);
    arregloCardsVolteadas = [];
  } else {
    setTimeout(() => {
      arregloCardsVolteadas.forEach(card => {
        card.querySelector('img').classList.add('oculta');
      });
      arregloCardsVolteadas = [];
    }, 1000);
  }

   if (contadorMovimientos < 25) {
    if (arreglocardsEncontradas.length == arregloCards.length) {
      mostrarFinJuego("Felicitaciones, juego completado 🎉");
    }
  } else {
    mostrarFinJuego("Superaste los 25 movimientos permitidos 😢");
  }
   
}
 function mostrarFinJuego(mensaje) {
  contador.classList.add('oculto'); 
  contenedorJuego1.innerHTML = `
    <h3 id="mensaje">${mensaje}</h3>
    <button id="volver-inicio">Volver al inicio</button>
  `;

  document.getElementById("volver-inicio").addEventListener("click", ()=>{
    contenedorJuego1.style.display = "none";
    mostrarBotones(); 
  });
}
function iniciarJuegoBurbujas() {
  ocultarBotones();
  acumulador.classList.remove('oculto');
  acumuladorPuntos = 0;
  acumulador.textContent = 'Puntos acumulados: 0';

  const burbujasContainer = document.getElementById('burbujas-container');
  burbujasContainer.innerHTML = '';
  burbujasTerminadas = 0;

  for (let i = 0; i < totalBurbujas; i++) {
    const burbuja = document.createElement('div');
    burbuja.classList.add('burbuja', 'efecto');

    let burbujaContada = false; // ✅ NUEVO: evita duplicar conteo

    // al terminar la animación
    burbuja.addEventListener("animationend", () => {
      if (!burbujaContada) {
        burbujaContada = true;
        burbuja.remove();
        burbujasTerminadas++;
        verificarFin();
      }
    });

    // posicionamiento/velocidad
    burbuja.style.left = (60 + Math.random() * 20) + "%";
    burbuja.style.transform = "translateX(-50%)";
    burbuja.style.animationDuration = (4 + Math.random() * 3) + "s";

    // imagen + puntaje fijo
    const img = document.createElement('img');
    const src = imagenes[Math.floor(Math.random() * imagenes.length)];
    img.src = src;
    img.alt = "imagen de lenguaje";
    img.style.width = "40px";
    img.style.height = "40px";

    const puntosFijos = puntajePorImagen[src] ?? 0;
    img.dataset.puntos = String(puntosFijos);

    burbuja.appendChild(img);
    burbujasContainer.appendChild(burbuja);

    // click en la burbuja
    burbuja.addEventListener("click", () => {
      if (!burbujaContada) {
        burbujaContada = true;

        const puntos = Number(img.dataset.puntos) || 0;
        acumuladorPuntos += puntos;
        acumulador.textContent = `Puntos acumulados: ${acumuladorPuntos}`;

        const flotante = document.createElement("span");
        flotante.textContent = `+${puntos}`;
        flotante.classList.add("puntos-flotantes");
        burbuja.appendChild(flotante);

        setTimeout(() => flotante.remove(), 1000);

        // eliminar burbuja después del efecto
        setTimeout(() => {
          burbuja.remove();
          burbujasTerminadas++;
          verificarFin();
        }, 1000);
      }
    });
  }
}

function verificarFin() { 
  if (burbujasTerminadas >= totalBurbujas) { 
    const mensajeFinal = document.getElementById("mensaje-final"); 
    const textoMensaje = document.getElementById("texto-mensaje"); 
    textoMensaje.textContent = `🎉 ¡Felicitaciones, has logrado ${acumuladorPuntos} puntos! 🎉`; 
    
    mensajeFinal.classList.remove("oculto"); 

    document.getElementById("btn-reiniciar").onclick = () => {
      mensajeFinal.classList.add("oculto"); 
      iniciarJuegoBurbujas(); 
    }; 

    document.getElementById("btn-inicio").onclick = () => {
      mensajeFinal.classList.add("oculto"); 
      contenedorJuego2.style.display = "none";
      mostrarBotones(); 
    }; 
  } 
}


});


