// Referencias 

const agregarCarritoBtn = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let listaCarrito = [];

// Eventlisteners

agregarCarritoBtn.addEventListener('click', agregarCursoAlCarrito);
carrito.addEventListener('click', eliminarCurso);
vaciarCarrito.addEventListener('click', borrarCarrito);

// Funciones 

function agregarCursoAlCarrito(e){

     e.preventDefault();
     
     if (e.target.classList.contains('agregar-carrito')){
          const curso = e.target.parentElement.parentElement;
          console.log(curso);

          leerDatosCurso(curso);
     }

     mostrarCursosEnCarrito();

}

// Leer datos curso

function leerDatosCurso(curso){
     
     const datosCurso = {
          nombre: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          imagen: curso.querySelector('img').src,
          cantidad: 1,
     }

     const existe = listaCarrito.some( curso => curso.id === datosCurso.id);
     if (existe) {
          const cursos = listaCarrito.map(curso => {
               if( curso.id === datosCurso.id ){
                    curso.cantidad++;
                    return curso;
               } else {
                    return curso;
               }
          })
          listaCarrito = [...cursos];
     } else {
          listaCarrito = [...listaCarrito, datosCurso];
     }

}


// Pintar los cursos en el carrito

function mostrarCursosEnCarrito() {

     limpiarCarrito();

     listaCarrito.forEach( curso => {
          const row = document.createElement('tr');
          const { imagen, nombre, precio, cantidad, id } = curso;
          row.innerHTML = `
          <td>
               <img src="${imagen}" width="100">
          </td>
          <td>
               ${nombre}
          </td>
          <td>
               ${precio}
          </td>
          <td>
               ${cantidad}
          </td>
          <td>
               <a href="#" class="borrar-curso" id="${id}"> X </a>
          </td>
     `
     contenidoCarrito.appendChild(row);
          
     })

}

// Limpiar el carrito

function limpiarCarrito() {

     while (contenidoCarrito.firstChild){
          contenidoCarrito.removeChild(contenidoCarrito.firstChild);
     }

}

// Presionar en la X para eliminar curso

function eliminarCurso(e) {

     const cursoId = e.target.id;
     console.log(cursoId);

     listaCarrito.some( curso => {
          if( curso.id === cursoId ){
               if ( curso.cantidad > 1 ) {
                    curso.cantidad--;
               } else {
                    listaCarrito = listaCarrito.filter( curso => curso.id !== cursoId );
               }
          }
     });

     mostrarCursosEnCarrito();

}

// Vaciar carrito 

function borrarCarrito() {
     listaCarrito = [];
     limpiarCarrito();
}













