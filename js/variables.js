const URL = "js/productos.json";

const recuperarLS = () => {
  if (localStorage.getItem("miCarrito")) {
    return JSON.parse(localStorage.getItem("miCarrito"));
  } else {
    return [];
  }
};

const carrito = recuperarLS();

const productos = [];
