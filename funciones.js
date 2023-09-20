//variables globales
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

// Agregar un manejador de eventos al botón de inicio
botonIniciar.addEventListener("click", function () {
    if (!juegoIniciado) {
        // Iniciar el juego solo si aún no ha comenzado
        juegoIniciado = true;
        iniciarJuego();
    }
});

// Función para iniciar el juego
function iniciarJuego() {
    intentos = 0;
    aciertos = 0;
    document.querySelector(".intentos").textContent = intentos;
    document.querySelector(".aciertos").textContent = aciertos;

    // Agregar imagenes al tablero
function agregarImagenes() {
    for (let x = 0; x < imagenes.length; x++) {
        let div = d.createElement("div");
        let img = d.createElement("img");
        div.setAttribute("class", "col-3");
        img.setAttribute("src", "imagenes/cover.jpg");
        img.setAttribute("class", "img-fluid altoimg");
        img.setAttribute("data-matched", "false"); // Nuevo atributo para controlar emparejamiento
        img.setAttribute("id", x);
        img.addEventListener("click", mostrarImagenes);
        div.appendChild(img);
        tablero.appendChild(div);
    }
}
agregarImagenes();
};

const botonReiniciar = document.getElementById("boton-reiniciar");
botonReiniciar.addEventListener("click", function () {
    reiniciarJuego();
});
function reiniciarJuego() {
    // Restablecer el estado del juego a su estado inicial
    juegoIniciado = false;
    nombreImg = [];
    posImg = [];
    intentos = 0; 
    aciertos = 0;

    // Restablecer las imágenes en el tablero a la imagen de portada
    let todasImg = d.querySelectorAll(".tablero .col-3 img");
    todasImg.forEach(function (img) {
        img.setAttribute("src", "imagenes/cover.jpg");
        img.setAttribute("data-matched", "false");
    });

    document.querySelector(".intentos").textContent = intentos;
    document.querySelector(".aciertos").textContent = aciertos;
    
}

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
}


//funcion para comparar las imagenes
function comparaImg() {
    let todasImg = d.querySelectorAll(".tablero .col-3 img");
    if (nombreImg[0] == nombreImg[1]) {
        todasImg[posImg[0]].setAttribute("src", "imagenes/ok.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/ok.jpg");
        // Marcar las tarjetas como emparejadas
        todasImg[posImg[0]].setAttribute("data-matched", "true");
        todasImg[posImg[1]].setAttribute("data-matched", "true");
        aciertos++; // Incrementa el contador de aciertos
        document.querySelector(".aciertos").textContent = aciertos; // Actualiza el contador en el DOM
    } else {
        todasImg[posImg[0]].setAttribute("src", "imagenes/cover.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/cover.jpg");
    }
    nombreImg = [];
    posImg = [];
}

