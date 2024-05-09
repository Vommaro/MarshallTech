const carritoFinal = document.querySelector("#carritoFinal");
const botonFinalizarCompra =document.querySelector("#botonFinalizarCompra");

botonFinalizarCompra.addEventListener("click", () =>{

    if (localStorage.getItem("carrito").length === 0) {
        Swal.fire({
            title: "Aun no Agregaste Productos al carrito",
            text: "Muchas Gracias por contactarnos",
            icon: "error"
          });    
            
    }
        
})



