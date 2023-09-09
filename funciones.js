//variables globales
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

//agregar imagenes al tablero
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
    } else {
        todasImg[posImg[0]].setAttribute("src", "imagenes/cover.jpg");
        todasImg[posImg[1]].setAttribute("src", "imagenes/cover.jpg");
    }
    nombreImg = [];
    posImg = [];
}
