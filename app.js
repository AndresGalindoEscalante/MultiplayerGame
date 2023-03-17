let main = document.getElementsByTagName('main')[0];
main.classList.add('container');

let nFilas = 6;

let posXJugador1 = 0;
let posYJugador1 = 0;
let posXJugador2 = 0;
let posYJugador2 = 0;
let posXAgujero1 = 0;
let posYAgujero1 = 0;
let posXAgujero2 = 0;
let posYAgujero2 = 0;

let posiciones = [5][5];
let casillaMeta;
let casillaJugador1;
let casillaJugador2;
let agujero1;
let agujero2;

let pJ1 = document.createElement('p');
let pJ2 = document.createElement('p');
let pJC = document.createElement('p');
let divJ1 = document.getElementById("marcadorJugador1");
let divJ2 = document.getElementById("marcadorJugador2");
let divJC = document.getElementById("marcadorColisiones");
let contJugador1 = 0;
let contJugador2 = 0;
let contChoque = 0;

pJ1.textContent = contJugador1;
divJ1.appendChild(pJ1);
pJ2.textContent = contJugador2;
divJ2.appendChild(pJ2);
pJC.textContent = contChoque;
divJC.appendChild(pJC);



document.addEventListener("load", inicio());



function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function inicio() {

    crearTablero();
    casillasInit();
    juego();
}


function crearTablero() {
    nFilas = numeroAleatorio(6, 14);
    // nFilas=15;
    for (let i = 0; i < nFilas; i++) {
        for (let j = 0; j < nFilas; j++) {
            div = document.createElement('div');
            div.classList.add('card');
            div.setAttribute('id', `f${i}c${j}`);
            main.appendChild(div);
        }
    }
    main.setAttribute('style', 'grid-template-columns:repeat( ' + nFilas + ',7vh)');
}

function generarPosIniciales() {

}


function casillasInit() {


    casillaMeta = document.getElementById(crearId());
    casillaMeta.classList.add('meta');
    casillaJugador1 = document.getElementById(crearId());
    casillaJugador1.classList.add('jugador1');
    casillaJugador2 = document.getElementById(crearId());
    casillaJugador2.classList.add('jugador2');

    agujero1 = document.getElementById(crearId());
    agujero1.classList.add('agujero')

    agujero2 = document.getElementById(crearId());
    agujero2.classList.add('agujero')


    posXJugador1 = coordenadaX(casillaJugador1);
    posYJugador1 = coordenadaY(casillaJugador1);

    posXJugador2 = coordenadaX(casillaJugador2);
    posYJugador2 = coordenadaY(casillaJugador2);

    posXAgujero1 = coordenadaX(agujero1);
    posYAgujero1 = coordenadaY(agujero1);

    posXAgujero2 = coordenadaX(agujero2);
    posYAgujero2 = coordenadaY(agujero2);



}

function coordenadaX(casilla) {
    let resul = casilla.id.substring(casilla.id.indexOf('c') + 1, casilla.id.length);
    return parseInt(resul);
}

function coordenadaY(casilla) {
    let resul = casilla.id.substring(1, casilla.id.indexOf('c'));
    return parseInt(resul);
}


//Funcion para crear el objetivo y los jugadores en una casilla libre
function crearId() {
    let resul;
    let ocupado = true;
    let fila;
    let columna;

    do {
        fila = numeroAleatorio(0, nFilas - 1);
        columna = numeroAleatorio(0, nFilas - 1);
        resul = `f${fila}c${columna}`;

        if (document.getElementById(resul).classList.length == 1) {
            ocupado = false;
        }

    } while (ocupado);

    return resul;
}


//Los eventos de teclado
function juego() {
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            //Controles jugador2
            case "ArrowRight":
                if (posXJugador2 == nFilas - 1) {
                    posXJugador2 = -1;
                }

                posXJugador2++;
                casillaJugador2.classList.remove('jugador2');
                casillaJugador2 = document.getElementById(`f${posYJugador2}c${posXJugador2}`);
                casillaJugador2.classList.add('jugador2');
                ganador('jugador2');

                break;
            case "ArrowLeft":
                if (posXJugador2 == 0) {
                    posXJugador2 = nFilas;
                }
                posXJugador2--;
                casillaJugador2.classList.remove('jugador2');
                casillaJugador2 = document.getElementById(`f${posYJugador2}c${posXJugador2}`);
                casillaJugador2.classList.add('jugador2');
                ganador('jugador2');
                break;
            case "ArrowUp":
                if (posYJugador2 == 0) {
                    posYJugador2 = nFilas;
                }
                posYJugador2--;
                casillaJugador2.classList.remove('jugador2');
                casillaJugador2 = document.getElementById(`f${posYJugador2}c${posXJugador2}`);
                casillaJugador2.classList.add('jugador2');
                ganador('jugador2');
                break;
            case "ArrowDown":
                if (posYJugador2 == nFilas - 1) {
                    posYJugador2 = -1;
                }
                posYJugador2++;
                casillaJugador2.classList.remove('jugador2');
                casillaJugador2 = document.getElementById(`f${posYJugador2}c${posXJugador2}`);
                casillaJugador2.classList.add('jugador2');
                ganador('jugador2');
                break;
            //Controles jugador1
            case "d":
                if (posXJugador1 == nFilas - 1) {
                    posXJugador1 = -1;
                }
                posXJugador1++;
                casillaJugador1.classList.remove('jugador1');
                casillaJugador1 = document.getElementById(`f${posYJugador1}c${posXJugador1}`);
                casillaJugador1.classList.add('jugador1');
                ganador('jugador1');
                break;
            case "a":
                if (posXJugador1 == 0) {
                    posXJugador1 = nFilas;
                }
                posXJugador1--;
                casillaJugador1.classList.remove('jugador1');
                casillaJugador1 = document.getElementById(`f${posYJugador1}c${posXJugador1}`);
                casillaJugador1.classList.add('jugador1');
                ganador('jugador1');
                break;
            case "w":
                if (posYJugador1 == 0) {
                    posYJugador1 = nFilas;
                }
                posYJugador1--;
                casillaJugador1.classList.remove('jugador1');
                casillaJugador1 = document.getElementById(`f${posYJugador1}c${posXJugador1}`);
                casillaJugador1.classList.add('jugador1');
                ganador('jugador1');
                break;
            case "s":
                if (posYJugador1 == nFilas - 1) {
                    posYJugador1 = -1;
                }
                posYJugador1++;
                casillaJugador1.classList.remove('jugador1');
                casillaJugador1 = document.getElementById(`f${posYJugador1}c${posXJugador1}`);
                casillaJugador1.classList.add('jugador1');
                ganador('jugador1');
                break;
        }
    });
}


function ganador(jugador) {
    if (casillaMeta.classList.length === 3) {
        alert('Ha ganado el ' + jugador);
        if (jugador === 'jugador1') {
            contJugador1++;
            pJ1.textContent = contJugador1;
            divJ1.appendChild(pJ1);
        } else {
            contJugador2++;
            pJ2.textContent = contJugador2;
            divJ2.appendChild(pJ2);
        }
        reset();
    } else if (casillaJugador1.classList.contains('jugador1') && casillaJugador1.classList.contains('jugador2')) {
        alert('Habeis perdido por chocaros');
        contChoque++;
        pJC.textContent = contChoque;
        divJC.appendChild(pJC);
        reset();
    } else if (jugador === 'jugador1' && casillaJugador1.classList.contains('agujero')) {
        if (casillaJugador1 === agujero1) {
            casillaJugador1.classList.remove('jugador1');
            casillaJugador1 = document.getElementById(`f${posYAgujero2}c${posXAgujero2}`);
            posXJugador1 = posXAgujero2;
            posYJugador1 = posYAgujero2;
            casillaJugador1.classList.add('jugador1');
        } else {
            casillaJugador1.classList.remove('jugador1');
            casillaJugador1 = document.getElementById(`f${posYAgujero1}c${posXAgujero1}`);
            posXJugador1 = posXAgujero1;
            posYJugador1 = posYAgujero1;
            casillaJugador1.classList.add('jugador1');
        }
    } else if (jugador === 'jugador2' && casillaJugador2.classList.contains('agujero')) {
        if (casillaJugador2 === agujero1) {
            casillaJugador2.classList.remove('jugador2');
            casillaJugador2 = document.getElementById(`f${posYAgujero2}c${posXAgujero2}`);
            posXJugador2 = posXAgujero2;
            posYJugador2 = posYAgujero2;
            casillaJugador2.classList.add('jugador2');
        } else {
            casillaJugador2.classList.remove('jugador2');
            casillaJugador2 = document.getElementById(`f${posYAgujero1}c${posXAgujero1}`);
            posXJugador2 = posXAgujero1;
            posYJugador2 = posYAgujero1;
            casillaJugador2.classList.add('jugador2');
        }
    }
}


function reset() {
    casillaMeta.classList.remove('meta');
    casillaJugador1.classList.remove('jugador1');
    casillaJugador2.classList.remove('jugador2');
    main.innerHTML = "";
    crearTablero();
    casillasInit();
}