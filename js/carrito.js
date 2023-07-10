const tableBody = document.querySelector(".tableBody");
const total = document.querySelector(".total");
const botonesQuitar = document.querySelectorAll(".quitar");
const botonFinalizar = document.querySelector(".finalizar");

const armarFila = (producto) => {
  return `<tr>
            <td>${producto.codigo}</td>
            <td>${producto.item}</td>
            <td>$ ${producto.precio}</td>
            <td><button id="${producto.codigo}" class="quitar button btn">Quitar</button></td>
            </tr>`;
};

const activarClickEnBotonesQuitar = () => {
  const botonesQuitar = document.querySelectorAll(".quitar");
  for (let botonQuitar of botonesQuitar) {
    botonQuitar.addEventListener("click", () => {
      let productoEliminado = carrito.find(
        (producto) => producto.codigo === botonQuitar.id
      );
      if (
        carrito.find((producto) => producto.codigo === productoEliminado.codigo)
      ) {
        const index = carrito.findIndex(
          (producto) => producto.codigo === productoEliminado.codigo
        );
        carrito.splice(index, 1);
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        listaItemsCarrito();
      }
    });
  }
};

const mostrarTotal = () => {
  const obtenerSubtotal = () => {
    if (carrito.length > 0) {
      return carrito.reduce((acc, producto) => acc + producto.precio, 0);
    }
  };
  return `<p class="description card-text">TOTAL:</p>
            <p class="description card-text"> <b>$ ${obtenerSubtotal()} <b></p>
            `;
};

const incluirTotal = () => {
  if (carrito.length > 0) {
    total.innerHTML = "";
    total.innerHTML += mostrarTotal();
  }
};

const listaItemsCarrito = () => {
  tableBody.innerHTML = "";
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      tableBody.innerHTML += armarFila(producto);
    });
    incluirTotal();
    activarClickEnBotonesQuitar();
  } else if (carrito.length === 0) {
    total.innerHTML = "";
  }
};

listaItemsCarrito();

const activarClickEnBotonFinalizar = () => {
  botonFinalizar.addEventListener("click", () => {
    if (carrito.length > 0) {
      confirmarCompra();
    } else {
      alertarError();
    }
  });
};

activarClickEnBotonFinalizar();

const confirmarCompra = () => {
  Swal.fire({
    position: "center",
    text: "¿Estás seguro que deseas finalizar tu compra?",
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: "¡Gracias por tu compra!",
        showConfirmButton: true,
        timer: 3000,
      });
      limpiarCarrito();
    } else if (result.isDenied) {
      Swal.fire({
        position: "center",
        icon: "info",
        text: "No hay problema. Volvé pronto.",
        showConfirmButton: true,
        timer: 3000,
      });
      limpiarCarrito();
    }
  });
};

const limpiarCarrito = () => {
  tableBody.innerHTML = "";
  total.innerHTML = "";
  localStorage.clear();
  carrito.splice(0, carrito.length);
};

const alertarError = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    text: "Tu carrito está vacío. Agregá productos para realizar una compra.",
    showConfirmButton: true,
    timer: 4000,
  });
};
