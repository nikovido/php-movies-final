const optiones = {
    method: 'GET', // Método de la petición (GET)
    headers: {
            'Content-Type': 'application/json' // Tipo de respuesta esperada (JSON)
    }
};

// Función para cargar películas en el carrusel de PELICULAS ACLAMADAS
const cargarPeliculasAclamadas = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const resp = await fetch('https://desarrollamos.org/phpmovies-api/peliculas', optiones);
    const datos = await resp.json();// Convertimos la respuesta a JSON
    const pelis = datos // Extraemos las películas de la respuesta
    const aclamadasContainer = document.querySelector('.peliculasAclamadas .container .aclamadas'); // Seleccionamos el contenedor de películas aclamadas en el DOM
    const botonesCarrousel = document.querySelector('.peliculasAclamadas .container .aclamadas .botones');// seleccionamos el carrousel
    console.log(pelis);
    let cont = 0;
    // Iteramos sobre cada película obtenida para lograr la estructura de html que pongo a continuación:
    /*<div class="peliculaItem">
         <img class="imgAclamada" src="./assets/img/aclamada_1.jpg" alt="aclamada_1" loading="lazy">
      </div>*/
    pelis.forEach(movie => {
        // creo el div peliculaItem y el item del carroulel
        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('carousel-item');
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgAclamada');
        img.src = "./assets/img/" + movie.imagen;
        img.alt = movie.titulo;
        img.classList.add('img-aclamada');
        //img.classList.add('d-block');
        img.classList.add('rounded-3');
        img.classList.add('w-25');
        img.classList.add('container');
        img.classList.add('d-flex');
        img.classList.add('border');
        img.classList.add('border-secondary');
        img.classList.add('border-2');
        img.classList.add('p-0');
        img.classList.add('justify-content-center');
        img.classList.add('align-items-center');
        img.classList.add('align-middle');
        img.loading = 'lazy';
        // creo el control del carrousel
        const controlItem = document.createElement('button');
        controlItem.setAttribute('type', 'button');
        controlItem.setAttribute('data-bs-target', '#sliderAclamadas');
        controlItem.setAttribute('data-bs-slide-to', cont);
        controlItem.setAttribute('aria-label', 'Slide '+ cont);
        // relaciono los elementos
        peliculaItem.appendChild(img);
        aclamadasContainer.appendChild(peliculaItem);
        botonesCarrousel.appendChild(controlItem);
        //cambio los primero
        //botonesCarrousel.firstChild.classList.add('active');
        //sumo al contador
        cont += 1;
    });
    //resalto con active los primeros elementos
    console.log(botonesCarrousel.firstElementChild);
    botonesCarrousel.firstElementChild.classList.add('active');
    const resaltarItem = document.querySelector('.peliculasAclamadas .container .aclamadas .carousel-item');
    console.log(resaltarItem);
    resaltarItem.classList.add('active');

};

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en el carrusel de películas aclamadas
    cargarPeliculasAclamadas();
});