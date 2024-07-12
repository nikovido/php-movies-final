
function isValidTitulo(titulo) {
    let tituloPattern = /^[a-zA-Z0-9\s:!?'".,]+$/;
    return tituloPattern.test(titulo);
}

function isValidDuracion(duracion){
    let duracionPattern = /^\d+h \d+m$/;
    return duracionPattern.test(duracion);
}

function isValidGenero(genero){
    let generoPattern =/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    return generoPattern.test(genero);
}

function isValidImagen(imagen){
    let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.test(imagen);
}


function displayErrorMessage(elementId, message) {
    let errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
}

function resetErrorMessages() {
    let errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(function (element) {
        element.innerText = "";
    });
}


const validarCargaPelicula = () => {
    document.getElementById("administradorFormulario"), addEventListener("submit", function (event) {

        event.preventDefault(); // evitar que se envio automaticamnete al backend para primero validar
        resetErrorMessages();  // resetea los mensajes de error

        // validar 
        let titulo = this.document.getElementById("titulo").value;
        let duracion = this.document.getElementById("duracion").value;
        let genero= this.document.getElementById("genero").value;
        let imagen = this.document.getElementById("imagen").value;
        let isValid = true;

        if (!isValidTitulo(titulo)) {
            displayErrorMessage("errorTitulo", "Por favor ingrese un título válido");
            isValid = false;
        }

        if (!isValidDuracion(duracion)) {
            displayErrorMessage("errorDuracion", "El formato de duración ingresado es incorrecto");
            isValid = false;
        }

        if (!isValidGenero(genero)) {
            displayErrorMessage("errorGenero", "Ingrese un género válido");
            isValid= false;
        }

        if (!isValidImagen(imagen)) {
            displayErrorMessage("errorImagen", "Ingrese un formato de archivo válido");
            isValid= false;
        }

        if (isValid) {
            alert("¡Película cargada corectamente!");
        }

    }
    );
}

document.addEventListener("DOMContentLoaded", validarCargaPelicula);