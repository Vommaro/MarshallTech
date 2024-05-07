document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener valores del formulario
        const nombre = document.querySelector("#inputnombre").value;
        const email = document.querySelector("#inputmail").value;
        const tel = document.querySelector("#inputtel").value;
        const notas = document.querySelector("#inputNotas").value;


        // Crear un objeto con los datos del formulario
        const datosformulario = {
            nombre: nombre,
            email: email,
            tel: tel,
            notas: notas
        };

        // Convertir el objeto a formato JSON
        const datosJSON = JSON.stringify(datosformulario);

        // Guardar en localStorage
        localStorage.setItem("datosformulario", datosJSON);

        // Mostrar mensaje de éxito o cualquier otra acción que desees realizar
        Swal.fire({
            title: "Formulario enviado con Exito",
            text: "Muchas Gracias por contactarnos",
            icon: "success"
          });    });
});
