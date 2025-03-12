//variables globales
let tablaCarrito = document.querySelector(".cart-table tbody")
let resumenSubtotal = document.querySelector (".subtotal")
let resumenDescuento = document.querySelector (".descuento")
let resumenTotal = document.querySelector (".resumenTotal")
let resumenDomicilio = document.querySelector (".valor-domi")
let destino = document.querySelector (".destino")
let btnResumen = document.querySelector(".btn-resumen")

//agregar evento
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos()
})

//funcion de cargar productos guardados
function cargarProductos() {
    // let todosProductos= JSONSON.parse(localStorage.getItem("pro-carrito"))|| [];
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    //Limpiar tabla
    tablaCarrito.innerHTML = ""

    //Comprobar si hay productos en localStorage
    if (todosProductos.length != 0) {
        todosProductos.forEach((producto, i) => {

            let fila = document.createElement("tr");
            fila.innerHTML = `
        <td class="d-flex justify-content-evenly align-items-center"> 
        <span onclick="borrarProducto(${i})" class="btn btn-danger">x</span>
        <img src="${producto.imagen}" width="70px">
        ${producto.nombre}
        </td>
        <td> 
           $<span>${producto.precio}</span>
        </td>
        <td>
          <div class="quantity quantiy-wrap">
            
            <div class="drecement" onclick="actualizarCantidad(${i},-1)"> <i class="fa-solid fa-minus"></i> </div>
            <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlengh="2" size="1" readonly></input>
            <div class="increment" onclick="actualizarCantidad(${i},1)"> <i class="fa-solid fa-plus"></i> </div>

          </div>
        </td>
        <td> $ ${(producto.precio * producto.cantidad).toFixed (3)} </td>
    `;
            tablaCarrito.appendChild(fila);
        });
    } else {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td colpan="4">
                <p class:"text-center">NO HAY PRODUCTOS EN EL CARRITO POR FAVOR SELECCIONE UNO</p>
            </td>
            `
        tablaCarrito.appendChild(fila);
    }

    //Ejecutar el resumen del carrito
    resumenCompra();
}

//función para la actualizar cantidades del producto
function actualizarCantidad(pos, cambio) {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }

    if (todosProductos[pos]) {
        //actualizar cantidad
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + cambio

        //Asegurarse de que la cantidad no sea menor a 1
        if (todosProductos[pos].cantidad < 1) {
            todosProductos[pos].cantidad = 1
        }

        //Calcular subtotal del producto
        let subtotal = todosProductos[pos].precio * todosProductos[pos] .cantidad
    }
    //Actualizar el local Storage
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))

    //Recargar la tabka
    cargarProductos();
}

//Función boton borrar producto del carrito
function borrarProducto (pos){
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem("pro-carrito"));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    //Eliminar producto
    todosProductos.splice(pos, 1);

    //Actualizar el local Storage
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))
    //Recargar tabla
    cargarProductos();
}

//Función para el resumen de la compra
//Función para el resumen de la compra
function resumenCompra() {
    let todosProductos= JSON.parse(localStorage.getItem("pro-carrito")) || []
    let subtotal = 0 //Acomular el subtotal

    //Recorrer cada producto que estamos utilizando
    todosProductos.forEach((producto)=>{
        subtotal += producto.precio * producto.cantidad
    })

     //Calcular el valor del domicilio
     let domicilio = 0 
     switch (destino.value) {
         case "Medellin":default: domicilio; break;
         case "Bello": domicilio = 10.000; break;
         case "Itagui": case "Envigado": domicilio = 15.000; break;
         case "LaEstrella": case "Copacabana": case "Caldas": domicilio = 20.000; break;     
     }

    //calcular el descuento de 10% si la compra es mayor a 100.000
    let descuento = (subtotal >100.000) ? subtotal * 0.1 : 0

    //Calcular el total a pagar en compras
    let totalApagar = subtotal - descuento +domicilio

   

    //mostrar los calculos de resumen de compra 
    resumenSubtotal.textContent = subtotal.toFixed(3)
    resumenDescuento.textContent = descuento.toFixed (3)
    resumenTotal.textContent = totalApagar.toFixed (3)
    resumenDomicilio.textContent = domicilio.toFixed (3)
}

//Agregar evento change al destino para calcular el valor del domicilio
destino.addEventListener("change",()=>{

    //Actualice el resumen de la compra
    resumenCompra();
}
)

//Evento al boton pagar para guardar el resumen

btnResumen.addEventListener("click", () => {

    let productos = JSON.parse(localStorage.getItem("pro-carrito")) || [];
       
    let resumen ={
    
   //copia
    "productos": productos
   
    } 
     //llenar las variables con la informacion
     resumen.subtotal= resumenSubtotal.textContent
     resumen.descuento= resumenDescuento.textContent
     resumen.destino= destino.value
     resumen.domicilio= resumenDomicilio.textContent
     resumen.totalApagar= resumenTotal.textContent

     // guar en local storen
     localStorage.setItem("pro-resumen",JSON.stringify(resumen))
     // rwdirijir paginia  de pago
   
    console.log(resumen);
})