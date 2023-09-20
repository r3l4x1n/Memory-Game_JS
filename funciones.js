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

botonIniciar.addEventListener("click", function () {
    if (!juegoIniciado) {
        juegoIniciado = true;
        iniciarJuego();
    }
});

let tiempo = 0;
let intervaloTiempo;
let juegoTerminado = false;

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

    function agregarImagenes() {
        for (let x = 0; x < imagenes.length; x++) {
            let div = d.createElement("div");
            let img = d.createElement("img");
            div.setAttribute("class", "col-3");
            img.setAttribute("src", "imagenes/cover.jpg");
            img.setAttribute("class", "img-fluid altoimg");
            img.setAttribute("data-matched", "false");
            img.setAttribute("id", x);
            img.addEventListener("click", mostrarImagenes);
            div.appendChild(img);
            tablero.appendChild(div);
        }
    }
    agregarImagenes();

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

    tablero.innerHTML = "";

    clearInterval(intervaloTiempo);
    if (!juegoTerminado) {
        iniciarJuego();
    }
};

function mostrarImagenes() {
    let imgID = this.getAttribute("id");
    if (this.getAttribute("data-matched") === "true" || posImg.includes(imgID)) {
        return;
    }
    this.setAttribute("src", imagenes[imgID].url);
    nombreImg.push(imagenes[imgID].nombre);
    posImg.push(imgID);
    if (nombreImg.length == 2) {
        intentos++;
        document.querySelector(".intentos").textContent = intentos;
        setTimeout(comparaImg, 800);
    }
};

function comparaImg() {
    let todasImg = d.querySelectorAll(".tablero .col-3 img");
    if (nombreImg[0] == nombreImg[1]) {
        todasImg[posImg[0]].setAttribute("src", "imagenes/ok.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/ok.jpg");
        todasImg[posImg[0]].setAttribute("data-matched", "true");
        todasImg[posImg[1]].setAttribute("data-matched", "true");
        aciertos++;
        document.querySelector(".aciertos").textContent = aciertos;
        if (aciertos === totalParejas) {
            juegoTerminado = true;
            clearInterval(intervaloTiempo);
            guardarResultados(tiempo, intentos);
        }
    } else {
        todasImg[posImg[0]].setAttribute("src", "imagenes/cover.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/cover.jpg");
    }
    nombreImg = [];
    posImg = [];
}

function guardarResultados(tiempo, intentos) {
    const tablaEstadisticas = document.querySelector(".estadisticas tbody");
    const fila = document.createElement("tr");
    const celdaPuesto = document.createElement("td");
    const celdaJugador = document.createElement("td");
    const celdaTiempo = document.createElement("td");
    const celdaIntentos = document.createElement("td");
    const numeroFilas = tablaEstadisticas.rows.length + 1;

    // Establece los valores de las celdas
    celdaPuesto.textContent = numeroFilas;
    celdaJugador.textContent = "Player";
    celdaTiempo.textContent = tiempo;
    celdaIntentos.textContent = intentos;

    // Agrega las celdas a la fila
    fila.appendChild(celdaPuesto);
    fila.appendChild(celdaJugador);
    fila.appendChild(celdaTiempo);
    fila.appendChild(celdaIntentos);

    // Agregar la fila a la tabla de estadísticas
    tablaEstadisticas.appendChild(fila);
}