var contenedor = document.getElementById('contenedor-juego');
var boton = document.getElementById('iniciar-juego');
var arregloCards = [];
var arregloCardsVolteadas = [];
var arreglocardsEncontradas = [];
var contador = document.getElementById('contador-movimientos');
let contadorMovimientos = 0;


boton.addEventListener('click', iniciarJuego)

const imagenes = [
  'images/c-.png',
  'images/c-sharp.png',
  'images/css-3.png',
  'images/html.png',
  'images/java.png',
  'images/php.png'
];
function iniciarJuego(){
  contenedor.innerHTML =''
  arregloCards = [];
  arreglocardsEncontradas = [];  
  
  contador.classList.remove('oculto');

  contadorMovimientos = 0;
  contador.textContent = 'Movimientos: 0';

  for(let j=0; j<2; j++){
    for(let i=0; i<imagenes.length; i++){
        let cardHTML = `<div class="card" data-card="${i}">
                        <img src="${imagenes[i]}" class="oculta" />
                      </div>`;
        arregloCards.push(cardHTML)
    }
  
//desordenar cartas
arregloCards.sort(() => Math.random() - 0.5);
contenedor.innerHTML = arregloCards.join('');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', voltearCarta);
  });
}

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

    if(arreglocardsEncontradas.length == arregloCards.length){
        contenedor.innerHTML=''
        contador.classList.add('oculto')
        let mensaje = '<h3 id="mensaje">Felicitaciones, juego completado</h3>'
        contenedor.innerHTML = mensaje
        
    }
}