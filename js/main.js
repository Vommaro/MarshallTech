let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let combos = [];

fetch("/data/products.json")
    .then(res => res.json())
    .then(data =>{
        mostrarCarrito(data);
    })

const contenedorCombos = document.querySelector("#combos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const numCarrito = document.querySelector("#numCarrito");
const bottonDarkMode = document.querySelector("#bottonDarkMode");

// Recorro el array para mostrarlos en pantalla
let mostrarCarrito = (combos) => {

combos.forEach((combo) => {
    const div = document.createElement("div");
    div.classList.add("conteiner__combos" , "row", "mb-3");
    div.innerHTML = `
        <h3 class="texto__combo col-md-12 mt-3">${combo.titulo}</h3>
        <img class="img__combo col-md-6" src="${combo.img}" alt="${combo.titulo}">
    <div class="contenedor__lista col-md-6">
        <ul class="lista">
            <li class="item__lista">📦 Gabinete: ${combo.lista.item1}</li>
            <li class="item__lista">🧠 Procesador: ${combo.lista.item2}</li>
            <li class="item__lista">👩‍👦 MotherBoard: ${combo.lista.item3}</li>
            <li class="item__lista">🚄 Memoria: ${combo.lista.item3}</li>
            <li class="item__lista">🛒 Almacenamiento: ${combo.lista.item5}</li>
            <li class="item__lista">🎮 GPU: ${combo.lista.item6}</li>
            <li class="item__lista">🔋 Fuente: ${combo.lista.item7}</li>
        </ul>
        <p class="precio">$${combo.precio}</p>        
    </div>
        
    `;
    //Creamos boton para agregar al carrito visual
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
//Usuario hace click en agregar al carrito
    btn.addEventListener("click", () => {
        agregarAlCarrito(combo);
    })
    div.append(btn);
    contenedorCombos.append(div);
})
};

// Se actualiza el carrito en cada evento 
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach(combo => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${combo.titulo}</h3>
                <p>$${combo.precio}</p>
                <p>Cant: ${combo.cantidad}</p>
                <p>Subt: $${combo.cantidad * combo.precio}</p>
            `;

            const btnRestar = document.createElement("button");
            btnRestar.classList.add("carrito-producto-btn");
            btnRestar.innerText = "🔻";
            btnRestar.addEventListener("click", () => {
                restAlCarrito(combo);
            })
            div.append(btnRestar);
            const btnSumar = document.createElement("button");
            btnSumar.classList.add("carrito-producto-btn");
            btnSumar.innerText = "🔺";
            btnSumar.addEventListener("click", () => {
                addAlCarrito(combo);
            })
            div.append(btnSumar);
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("carrito-producto-btn");
            btnEliminar.innerText = "✖️";
            btnEliminar.addEventListener("click", () => {
                borrarCarrito(combo);
            })
            div.append(btnEliminar);

            carritoProductos.append(div);
        })
    }
    actualizarTotal();
    calcularnumCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
// Se va a llamar cuando agregue un producto al carrito
// Primero chequea si está el elemento, y si está le suma 1 a cantidad; si no está, lo pushea
const agregarAlCarrito = (combo) => {
    const itemEncontrado = carrito.find(item => item.titulo === combo.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...combo, cantidad: 1});
    }
    tostaditaOn();
    actualizarCarrito();
}
const restAlCarrito = (combo) => {
    const itemEncontrado = carrito.find(item => item.titulo === combo.titulo);
    if (combo.cantidad === 1) {
        borrarCarrito(combo);
    } else {
        itemEncontrado.cantidad--;
    }
    tostaditaOff();
    actualizarCarrito();
}

const addAlCarrito = (combo) => {
    const itemEncontrado = carrito.find(item => item.titulo === combo.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
    }
    tostaditaOn();
    actualizarCarrito();
}

const borrarCarrito = (combo) => {
    const prodIndex = carrito.findIndex(item => item.titulo === combo.titulo);
    carrito.splice(prodIndex, 1);
    tostaditaOff();
    actualizarCarrito();
}

const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}
const calcularnumCarrito = () =>{
    const numerototal = carrito.reduce((acc, prod)=> acc+prod.cantidad,0);
    numCarrito.innerText = numerototal;
}

bottonDarkMode.addEventListener("click", () =>{
    document.body.classList.toggle("darkMode");


    // LocalStorage del darkmode
    if (document.body.classList.contains("darkMode")) {
        localStorage.setItem("dark-mode","true");
    }else{
        localStorage.setItem("dark-mode","false");
    }
});
    // seteamos la pag con darkmode
    if (localStorage.getItem("dark-mode") === 'true') {
        document.body.classList.add("darkMode");
    }else{
        document.body.classList.remove("darkMode");
    }
// Tostaditas de se agrego producto
    function tostaditaOn() {
        Toastify({
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            text: "Producto Agregado",
            style: {
                background: "linear-gradient(to right, violet, purple, black)",
            },
            duration: 3000
            }).showToast();
    }
// Tostaditas de se quito producto
function tostaditaOff() {
    Toastify({
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        text: "Producto Eliminado",
        style: {  
            background: "linear-gradient(to right, red, orange)",
          },
        duration: 3000
        }).showToast();
}
actualizarCarrito();