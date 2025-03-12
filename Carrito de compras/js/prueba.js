// Variables globales
let resumenSubtotal = document.querySelector(".sub-total");
let resumenDescuento = document.querySelector(".promo");
let resumenDomicilio = document.querySelector(".domicilio-pago");
let resumenCiudad = document.querySelector(".ciudadDomi")
let resumenTotal = document.querySelector(".total");
 let  metodoPagoRadio = document.querySelectorAll("input[name='radio']")
let btnPagar = document.querySelector(".btn-checkout");

// Cargar el resumen de la compra
document.addEventListener("DOMContentLoaded", () => {
    let resumen = JSON.parse(localStorage.getItem("pro-resumen"));

    if (!resumen) {
        alert("No hay productos en el carrito.");
        window.location.href = "index.html";
        return;
    }
    // Mostrar valores en la interfaz
    resumenSubtotal.textContent = `$${resumen.subtotal}`;
    resumenDescuento.textContent = `$${resumen.descuento}`;
    resumenDomicilio.textContent = `$${resumen.domicilio}`;
    resumenTotal.textContent = `$${resumen.totalApagar}`;

    metodoPagoRadio.forEach(radio =>{
        radio.addEventListener("change",actualizarTotal)
    })

})

function actualizarTotal(){
    let resumen = JSON.parse(localStorage.getItem("pro-resumen"));
    let metodoSeleccionado = document.querySelector("input[name='radio']:checked");
    let total = resumen.totalApagar;

    if (metodoSeleccionado) {
        if (metodoSeleccionado.value === "1") {
            total *= 1.05; // Aumento del 5%
        } else if (metodoSeleccionado.value === "2") {
            total *= 1.03; // Aumento del 3%
        }
    }
    
    resumenTotal.textContent = `$${total.toFixed(2)}`;  
}

    // Evento para procesar el pago
    btnPagar.addEventListener("click", () => {
        let nombre = document.querySelector("#nombre").value.trim();
        let direccion = document.querySelector("#direccion").value.trim();
        let metodoPagoSeleccionado = document.querySelector("input[name='radio']:checked");

        if (nombre === "" || direccion === "" || metodoPagoSeleccionado === "") {
            alert("Por favor, completa todos los campos antes de proceder con el pago.");
            return;
        }

        let metodoPago=metodoPagoSeleccionado.value
        // Guardar información del pedido finalizado
        let pedido = {
            nombre,
            direccion,
            metodoPago,
            resumen: JSON.parse(localStorage.getItem("pro-resumen"))
        };

        localStorage.setItem("pedido-finalizado", JSON.stringify(pedido));

        // Limpiar carrito y resumen del localStorage
        localStorage.removeItem("pro-carrito");
        localStorage.removeItem("pro-resumen");

        // Redirigir a la página de agradecimiento
        alert("Pago exitoso. Redirigiendo...");
        window.location.href = "thankyou.html";
    });
