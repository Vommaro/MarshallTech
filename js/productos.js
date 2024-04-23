let carrier = JSON.parse(localStorage.getItem("carrier")) || [];
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
        agregarAlCarrito(producto);
    })
    div.append(btn);
    conteinerProductos.append(div);
})
function actualizarProductos() {
    if (carrier.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrier.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.cantidad * producto.precio}</p>
            `;

            const btn = document.createElement("button");
            btn.classList.add("carrito-producto-btn");
            btn.innerText = "✖️";
            btn.addEventListener("click", () => {
                borrarProducto(producto);
            })
            div.append(btn);

            carritoProductos.append(div);
        })
    }
    actualizarTotal2();
    localStorage.setItem("carrier", JSON.stringify(carrier));
}
const agregarProducto = (producto) => {
    const itemEncontrado = carrier.find(item => item.titulo === producto.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrier.push({...producto, cantidad: 1});
    }
    actualizarProductos();
}
const borrarProducto = (producto) => {
    const prodIndex = carrier.findIndex(item => item.titulo === producto.titulo);
    carrier.splice(prodIndex, 1);
    actualizarProductos();
}

const actualizarTotal2 = () => {
    const total = carrier.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

actualizarTotal2();
localStorage.setItem("carrier", JSON.stringify(carrier));
actualizarProductos();