const carrier = [];
const productos = [
    {
        titulo: "Placa de Video EVGA GeForce RTX 3090 12GB GDDR6 Ventus OC",
        precio: 250000,
        imagen: "../img/placa1.png",
    },
    {
        titulo: "Placa De Video Nvidia Msi Gtx 1650 Gaming X 4gb GDDR6 Twin",
        precio: 250000,
        imagen: "../img/placa2.png",
    },
    {
        titulo: "Placa Video Gigabyte Geforce Rtx 4060 Ti Aero Oc 8gb GDDR6",
        precio: 250000,
        imagen: "../img/placa3.jpg",
    },
    {
        titulo: "Placa de Video Gigabyte Nvidia GeForce RTX 4080 Eagle 16Gb GDDR6X",
        precio: 250000,
        imagen: "../img/placa4.png",
    },
    {
        titulo: "placa de video rtx 3070 ti zotac gaming amp holo 8gb GDDR6x | maldito hard",
        precio: 250000,
        imagen: "../img/placa5.png",
    },
    {
        titulo: "Placa De Video Asus Rtx 3080 Rog Strix Gaming Oc 10g Nvidia",
        precio: 250000,
        imagen: "../img/placa6.png",
    },
    {
        titulo: "Placa De Video Nvidia Geforce Asus RTX 4060 Ti Rog Strix Gaming 8GB GDDR6 OC",
        precio: 250000,
        imagen: "../img/placa7.png",
    },
];

const conteinerProductos = document.querySelector("#productos");

productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto", "row", "m-2");
    div.innerHTML =`
        <h3 class="titulo__producto col-md-12 p-2 m-0"> ${producto.titulo}</h3>
        <div class="cajita d-flex row">
            <img class="img__produc col-md-6 m-3" src="${producto.imagen}" alt="${producto.titulo}">
            <p class="col-md-6 precio">$${producto.precio}</p>        
        </div>
    `;

    const btn = document.createElement("button");
    btn.classList.add("animated-button");
    btn.innerText = "Agregar al carrito";
    btn.innerHTML = `
    <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text">Añadir Al Carrito</span>
  <span class="circle"></span>
  <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
    `;

    btn.addEventListener("click", () => {
        agregarAlCarrito(combo);
    })


    div.append(btn);
    conteinerProductos.append(div);
})