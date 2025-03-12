// variables globales
let btnProducts = document.querySelectorAll(".btn-product");
let contadorcarito = document.querySelector(".contar-pro");
let listaCarrito = document.querySelector(".list-cart tbody");
let con = 0;

document.addEventListener("DOMContentLoaded", () => {
    cargaProLocalstorage();
});

btnProducts.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        // agregar producto al carrito
        infoProducto(i);
        
        // contador de producto en el carrito
        con++;
        contadorcarito.textContent = con;
    });
});

// agregar producto al carrito
function agregarProducto(producto) {
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> ${con} </td>
        <td> <img src="${producto.imagen}" width="70px"> </td>
        <td> ${producto.nombre} </td>
        <td> ${producto.precio} </td>
        <td> <span onclick="borrarProducto(${con})" class="btn btn-danger"> x</span> </td>
    `;
    listaCarrito.appendChild(fila);
}

// función para agregar la información del producto al carrito
function infoProducto(pos) {
    let producto = btnProducts[pos].parentElement.parentElement.parentElement;
    let infoPro = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    };

    agregarProducto(infoPro);
    guardarProLocalstorage(infoPro);
}

// función para quitar un producto del carrito
function borrarProducto(pos) {
    let producto = event.target;
    producto.parentElement.parentElement.remove();
    // disminuir el contador
    if (con > 0) {
        con--;
        contadorcarito.textContent = con;
    }
    eliminarProductoLocalstorage(pos);
}

// guardar producto en localStorage
function guardarProLocalstorage(producto) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    todosProductos.push(producto);
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
}

// eliminar productos del localStorage
function eliminarProductoLocalstorage(pos) {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    
    if (todosProductos.length > 0) {
        todosProductos.splice(pos, 1); // Elimina el producto en la posición dada
        localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
    }
    
    // Recargar el carrito después de eliminar un producto
    listaCarrito.innerHTML = "";
    cargaProLocalstorage();
}

// cargar productos de localStorage en el carrito
function cargaProLocalstorage() {
    let todosProductos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    contadorcarito.textContent = 0;
    con = 0;
    todosProductos.forEach((producto) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td> ${con} </td>
            <td> <img src="${producto.imagen}" width="70px"> </td>
            <td> ${producto.nombre} </td>
            <td> ${producto.precio} </td>
            <td> <span onclick="borrarProducto(${con})" class="btn btn-danger"> x</span> </td>
        `;
        listaCarrito.appendChild(fila);
        contadorcarito.textContent = parseInt(contadorcarito.textContent) + 1;
        con = parseInt(con) + 1;
    });
}

contadorcarito.parentElement.addEventListener("click",()=>{
    listaCarrito.parentElement.classList.toggle("ocultar")

})