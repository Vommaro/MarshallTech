const carrito = [];

const combos = [
    {
        titulo: "PC Oficina",
        precio: 250000,
        img: "./img/PC_Off.png",
        lista:{
            item1: "Kit Mid Tower Performance 2800W",
            item2: "Intel Core i3 n10500k",
            item3: "MSI A520-A PRO",
            item4: "8GB DDR4 3200MHZ ADATA VALUE",
            item5: "SSD M2 PCI-E 256GB//HHD 1TB SeaGate Barracuda",
            item6: "Placa de Video Geforce GT 710 2GB Ram MSI",
            item7: "Fuente y cooler Incluidos con el Gabinete",
        },
    },
    {
        titulo: "PC Gamer",
        precio: 500000,
        img: "./img/PC_Gamer2.PNG",
        lista:{
            item1: "Gabinete Mid Tower Solarmax 5901 6 Fan Rgb Vidrio Templado",
            item2: "Procesador Intel Core I5 12600K 4.9 GHZ",
            item3: "Motherboard 1700 12°Gen Msi Pro H610m-G DDR4",
            item4: "8GB DDR4 3200 Mhz Corsair Vengeance (x2)",
            item5: "Disco Solido SSD 480GB",
            item6: "Placa De Video Geforce GTX1650 4gb Msi Oc",
            item7: "Fuente Cooler Master V2 750w 80 Bronze",
        },
    },
    {
        titulo: "PC Stremer",
        precio: 1000000,
        img: "./img/PC_Gamer_Pro.PNG",
        lista:{
            item1: "Kit Mid Tower Performance 2800W",
            item2: "Intel Core i3 n10500k",
            item3: "MSI A520-A PRO",
            item4: "8GB DDR4 3200MHZ ADATA VALUE",
            item5: "SSD M2 PCI-E 256GB//HHD 1TB SeaGate Barracuda",
            item6: "Placa de Video Geforce GT 710 2GB Ram MSI",
            item7: "Fuente y cooler Incluidos con el Gabinete",
        },
    }
];
const contenedorCombos = document.querySelector("#combos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

// Recorro el array para mostrarlos en pantalla
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
    contenedorCombos.append(div);
})



function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach(producto => {
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
                borrarDelCarrito(producto);
            })
            div.append(btn);

            carritoProductos.append(div);
        })
    }
    actualizarTotal();
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
    actualizarCarrito();
}
const borrarDelCarrito = (combo) => {
    const prodIndex = carrito.findIndex(item => item.titulo === combo.titulo);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();
}

const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}
