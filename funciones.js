// Variables Globales
const botonIniciar = document.getElementById("boton-iniciar");
let juegoIniciado = false;
const d = document;
let imagenes = [
    {
        "nombre": "Emily",
        "url": "imagenes/img1.jpg"
    },
    {
        "nombre": "Elfie",
        "url": "imagenes/img2.jpg"
    },
    {
        "nombre": "Rhoades",
        "url": "imagenes/img3.jpg"
    },
    {
        "nombre": "Lena",
        "url": "imagenes/img4.jpg"
    },
    {
        "nombre": "Malkova",
        "url": "imagenes/img5.jpg"
    },
    {
        "nombre": "Martix",
        "url": "imagenes/img6.jpg"
    },
    {
        "nombre": "Martix",
        "url": "imagenes/img7.jpg"
    },
    {
        "nombre": "Elfie",
        "url": "imagenes/img8.jpg"
    },
    {
        "nombre": "Malkova",
        "url": "imagenes/img9.jpg"
    },
    {
        "nombre": "Lena",
        "url": "imagenes/img10.jpg"
    },
    {
        "nombre": "Emily",
        "url": "imagenes/img11.jpg"
    },
    {
        "nombre": "Rhoades",
        "url": "imagenes/img12.jpg"
    }
];

let tablero = d.querySelector(".tablero");
let nombreImg = [];
let posImg = [];
let intentos = 0;
let aciertos = 0;
let totalParejas = imagenes.length / 2;

// Agrega manejador de eventos al botón de inicio
botonIniciar.addEventListener("click", function () {
    if (!juegoIniciado) {
        // Inicia el juego solo si aún no ha comenzado.
        juegoIniciado = true;
        iniciarJuego();
    }
});

let tiempo = 0;
let intervaloTiempo;
let juegoTerminado = false;

// Función para iniciar el juego
function iniciarJuego() {
    if (juegoTerminado) {
        return;
    }
    intentos = 0;
    aciertos = 0;
    tiempo = 0;
    document.querySelector(".intentos").textContent = intentos;
    document.querySelector(".aciertos").textContent = aciertos;
    document.querySelector(".tiempo").textContent = tiempo;

    // Agregar imagenes al tablero
    function agregarImagenes() {
        for (let x = 0; x < imagenes.length; x++) {
            let div = d.createElement("div");
            let img = d.createElement("img");
            div.setAttribute("class", "col-3");
            img.setAttribute("src", "imagenes/cover.jpg");
            img.setAttribute("class", "img-fluid altoimg");
            img.setAttribute("data-matched", "false"); // Atributo para controlar emparejamiento
            img.setAttribute("id", x);
            img.addEventListener("click", mostrarImagenes);
            div.appendChild(img);
            tablero.appendChild(div);
        }
    }
    agregarImagenes();

    //Iniciar el contador
    intervaloTiempo = setInterval(function () {
        tiempo++;
        document.querySelector(".tiempo").textContent = tiempo;
    }, 600);
};

const botonReiniciar = document.getElementById("boton-reiniciar");
botonReiniciar.addEventListener("click", function () {
    reiniciarJuego();
});

function reiniciarJuego() {
    juegoIniciado = false;
    nombreImg = [];
    posImg = [];
    intentos = 0;
    aciertos = 0;
    tiempo = 0;
    document.querySelector(".intentos").textContent = intentos;
    document.querySelector(".aciertos").textContent = aciertos;
    document.querySelector(".tiempo").textContent = tiempo;

    // Reinicia las tarjetas del tablero
    tablero.innerHTML = "";

    // Reiniciar el contador de tiempo
    clearInterval(intervaloTiempo);
    if (!juegoTerminado) {
        iniciarJuego(); // Reinicia el juego si no ha terminado
    }
};

//funcion para mostrar las imagenes
function mostrarImagenes() {
    //guardar ID de la imagen
    let imgID = this.getAttribute("id");
    // Verifica si la tarjeta ya está emparejada o si ya se ha seleccionado
    if (this.getAttribute("data-matched") === "true" || posImg.includes(imgID)) {
        return;
    }
    this.setAttribute("src", imagenes[imgID].url);
    //guardando el nombre y id de la imagen
    nombreImg.push(imagenes[imgID].nombre);
    posImg.push(imgID);
    //ejecutar la funcion comparar imagenes
    if (nombreImg.length == 2) {
        intentos++; // Incrementa el contador de intentos
        document.querySelector(".intentos").textContent = intentos; // Actualiza el contador en el DOM
        setTimeout(comparaImg, 800);
    }
};

//funcion para comparar las imagenes
function comparaImg() {
    let todasImg = d.querySelectorAll(".tablero .col-3 img");
    if (nombreImg[0] == nombreImg[1]) {
        todasImg[posImg[0]].setAttribute("src", "imagenes/ok.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/ok.jpg");
        // Marcar las tarjetas como emparejadas
        todasImg[posImg[0]].setAttribute("data-matched", "true");
        todasImg[posImg[1]].setAttribute("data-matched", "true");
        aciertos++;
        document.querySelector(".aciertos").textContent = aciertos; // Actualiza el contador en el DOM
        // Verifica que se hayan emparejado todas las vartas
        if (aciertos === totalParejas) {
            juegoTerminado = true;
            clearInterval(intervaloTiempo); // Detiene el contador de tiempo
            guardarResultados(tiempo, intentos); // Llama a la función para guardar los resultados
        }
    } else {
        todasImg[posImg[0]].setAttribute("src", "imagenes/cover.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/cover.jpg");
    }
    nombreImg = [];
    posImg = [];
}

function guardarResultados(tiempo, intentos) {
    // Obtener la tabla de estadísticas
    const tablaEstadisticas = document.querySelector(".estadisticas tbody");

    // Crear una nueva fila de resultados
    const fila = document.createElement("tr");

    // Crear celdas para Puesto, Jugador, Tiempo Juego e Intentos Totales
    const celdaPuesto = document.createElement("td");
    const celdaJugador = document.createElement("td");
    const celdaTiempo = document.createElement("td");
    const celdaIntentos = document.createElement("td");

    // Incrementar el número de filas existentes en la tabla para calcular el puesto
    const numeroFilas = tablaEstadisticas.rows.length + 1;

    // Establecer los valores de las celdas
    celdaPuesto.textContent = numeroFilas;
    celdaJugador.textContent = "Player"; // Aquí debes asignar el nombre del jugador si lo tienes
    celdaTiempo.textContent = tiempo;
    celdaIntentos.textContent = intentos;

    // Agregar las celdas a la fila
    fila.appendChild(celdaPuesto);
    fila.appendChild(celdaJugador);
    fila.appendChild(celdaTiempo);
    fila.appendChild(celdaIntentos);

    // Agregar la fila a la tabla de estadísticas
    tablaEstadisticas.appendChild(fila);
}