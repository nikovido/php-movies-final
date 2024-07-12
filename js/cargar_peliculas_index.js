const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
        
    }
};

// Función para cargar películas en la cuadrícula de tendencias
const cargarPeliculasTendencia = async (page = 1) => {
    // Realizamos una petición fetch a la API para obtener las películas populares
    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
    const data = await response.json(); // Convertimos la respuesta a JSON
    const movies = data.results;// Extraemos las películas de la respuesta
    console.log(movies);
    const tendenciasContainer = document.querySelector('.peliculasTendencias .peliculas');// Seleccionamos el contenedor de películas de tendencia en el DOM, la section que tiene dentro el div peliculas
    tendenciasContainer.innerHTML = '';// Limpiamos el contenido previo del contenedor

    //* Iteramos sobre cada película obtenida y creamos los elementos HTML para mostrar la película teniendo que en cuenta que se debe respetar la siguiente estructura por los estilos:
    /*<a href="./pages/detalle.html">
                    <div class="pelicula">
                        <img class="imgTendencia" src="./assets/img/peli_1.jpg" alt="The Beekeeper" loading="lazy">
                        <div class="tituloPelicula">
                            <h4>The Beekeeper</h4>
                        </div>
                    </div>
      </a>*/
    movies.forEach(movie => {
        // creo el ancla
        const ancla = document.createElement('a');
        ancla.href = './pages/detalle.html';
        ancla.classList.add('text-decoration-none');
        
        // creo el div pelicula
        const pelicula = document.createElement('div');
        pelicula.classList.add('pelicula');
        pelicula.classList.add('col');
        pelicula.classList.add('card');

        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgTendencia');
        img.classList.add('img-fluid');
        img.classList.add('img-card');
        img.classList.add('rounded-3');
        img.classList.add('shadow-lg');
        //img.classList.add('border');
        //img.classList.add('border-secondary');
        //img.classList.add('border-3');
        img.classList.add('mh-50');
        img.classList.add('mw-50');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';

        // creo el div tituloPelicula
        const tituloPelicula = document.createElement('div');
        tituloPelicula.classList.add('tituloPelicula');
        tituloPelicula.classList.add('card-img-overlay');
        tituloPelicula.classList.add('text-center');
        
        // creo el h4
        const titulo = document.createElement('h4');
        titulo.classList.add('text-light');
        titulo.classList.add('card-title');
        titulo.textContent = movie.title;
        // relaciono los elementos
        ancla.appendChild(pelicula);
        pelicula.appendChild(img);
        pelicula.appendChild(tituloPelicula);
        tituloPelicula.appendChild(titulo);
        tendenciasContainer.appendChild(ancla);
    });

    // Actualizamos el atributo data-page con el número de página actual
    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

// Event listener para el botón "Anterior"
botonAnterior.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Si es la primera página, no hacemos nada
    if (currentPage <= 1) return;
    // Cargar las películas de la página anterior
    cargarPeliculasTendencia(currentPage - 1);
});

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Cargar las películas de la página siguiente
    cargarPeliculasTendencia(currentPage + 1);
    // ir al top
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en la cuadrícula de tendencias
    cargarPeliculasTendencia();
});