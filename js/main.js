const container = document.querySelector(".contenedor");
const imgCarrito = document.querySelector(".imgCarrito");

const retornarCardProducto = (producto) => {
  return `  <div class="card">
              <img class="card-img-top" src="${producto.imagen}"/>
              <div class="card-body description">
                <h3 class="card-title">${producto.item}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <p class="precio card-text"> $ ${producto.precio}</p>
              </div>
              <button id="${producto.codigo}" class="button btn">Agregar</button>
            </div>`;
};

const retornarCardError = () => {
  return `<div class="description card-error">
            <p>Ha habido un error al cargar los productos. Por favor, volvé a intenrarlo más tarde.</p>
          </div>`;
};

const cargarProductos = () => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += retornarCardProducto(producto);
  });
  activarClickEnBotones();
};

const obtenerProductos = () => {
  fetch(URL)
    .then((respuesta) => respuesta.json())
    .then((data) => productos.push(...data))
    .then(() => cargarProductos())
    .catch((error) => (container.innerHTML = retornarCardError()));
};
obtenerProductos();

const activarClickEnBotones = () => {
  const botones = document.querySelectorAll(".button.btn");
  for (let boton of botones) {
    boton.addEventListener("click", (e) => {
      const productoElegido = productos.find(
        (producto) => producto.codigo === e.target.id
      );
      carrito.push(productoElegido);
      confirmarProductoCargado(productoElegido.item);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
    });
  }
};

const confirmarProductoCargado = (productoElegido) => {
  Swal.fire({
    position: "center",
    icon: "success",
    text: "Tu " + productoElegido + " se agregó al carrito.",
    showConfirmButton: true,
    timer: 3000,
  });
};

imgCarrito.addEventListener("click", () => {
  location.href = "./pages/carrito.html";
});
