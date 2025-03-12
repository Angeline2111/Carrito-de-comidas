// Variables globales
let resumenSubtotal = document.querySelector(".sub-total");
let resumenDescuento = document.querySelector(".promo");
let resumenDomicilio = document.querySelector(".domicilio-pago");
let resumenCiudad = document.querySelector(".ciudadDomi");
let resumenTotal = document.querySelector(".total");
let metodoPagoRadios = document.querySelectorAll("input[name='radio']");

let btnPagar = document.querySelector(".btn-checkout");

// Cargar el resumen de la compra
document.addEventListener("DOMContentLoaded", () => {
    let resumen = JSON.parse(localStorage.getItem("pro-resumen"));

    if (!resumen) {
        alert("No hay productos en el carrito.");
        window.location.href = "index.html";
        return;
    }

    // Asegurar que los valores se mantienen con tres decimales
    let subtotal = parseFloat(resumen.subtotal).toFixed(3) || "0.000";
    let descuento = parseFloat(resumen.descuento).toFixed(3) || "0.000";
    let domicilio = parseFloat(resumen.domicilio).toFixed(3) || "0.000";
    let totalApagar = parseFloat(resumen.totalApagar).toFixed(3) || "0.000";
    let ciudad = resumen.destino || "No especificada";

    // Guardar el total base en localStorage para evitar acumulaciones
    resumen.totalBase = totalApagar;
    localStorage.setItem("pro-resumen", JSON.stringify(resumen));

    // Mostrar valores en la interfaz
    resumenSubtotal.textContent = `$${subtotal}`;
    resumenDescuento.textContent = `$${descuento}`;
    resumenDomicilio.textContent = `$${domicilio}`;
    resumenTotal.textContent = `$${totalApagar}`;
    resumenCiudad.textContent = ciudad;

    // Cargar datos de entrega si existen en localStorage
    let datosEntrega = JSON.parse(localStorage.getItem("datos-entrega"));
    if (datosEntrega) {
        document.querySelector("#nombres-input").value = datosEntrega.nombres || "";
        document.querySelector("#apellidos-input").value = datosEntrega.apellidos || "";
        document.querySelector("#email-input").value = datosEntrega.email || "";
        document.querySelector("#celular-input").value = datosEntrega.celular || "";
        document.querySelector("#direccion-input").value = datosEntrega.direccion || "";
        document.querySelector("#direccion-2-input").value = datosEntrega.direccion2 || "";
        document.querySelector("#additiona-note").value = datosEntrega.notas || "";
    }

    // Escuchar cambios en el método de pago
    metodoPagoRadios.forEach(radio => {
        radio.addEventListener("change", actualizarTotal);
    });
});

function actualizarTotal() {
    let resumen = JSON.parse(localStorage.getItem("pro-resumen"));
    let metodoSeleccionado = document.querySelector("input[name='radio']:checked");
    let total = parseFloat(resumen.totalBase) || 0; // Usamos el total base para evitar acumulaciones

    if (metodoSeleccionado) {
        if (metodoSeleccionado.value === "1") {
            total *= 1.05; // Aumento del 5%
        } else if (metodoSeleccionado.value === "2") {
            total *= 1.03; // Aumento del 3%
        }
    }

    total = total.toFixed(3);
    resumenTotal.textContent = `$${total}`;

    // Guardar el total actualizado en localStorage
    resumen.totalApagar = total;
    localStorage.setItem("pro-resumen", JSON.stringify(resumen));
}

// Guardar datos de entrega en localStorage
document.querySelectorAll("#nombres-input, #apellidos-input, #email-input, #celular-input, #direccion-input, #direccion-2-input, #additiona-note").forEach(input => {
    input.addEventListener("input", () => {
        let datosEntrega = {
            nombres: document.querySelector("#nombres-input").value,
            apellidos: document.querySelector("#apellidos-input").value,
            email: document.querySelector("#email-input").value,
            celular: document.querySelector("#celular-input").value,
            direccion: document.querySelector("#direccion-input").value,
            direccion2: document.querySelector("#direccion-2-input").value,
            notas: document.querySelector("#additiona-note").value
        };
        localStorage.setItem("datos-entrega", JSON.stringify(datosEntrega));
    });
});

// Evento para procesar el pago
btnPagar.addEventListener("click", () => {
    let nombre = document.querySelector("#nombres-input").value.trim();
    let apellidos = document.querySelector("#apellidos-input").value.trim();
    let direccion = document.querySelector("#direccion-input").value.trim();
    let email = document.querySelector ("#email-input").value.trim();
    let metodoPagoSeleccionado = document.querySelector("input[name='radio']:checked");
    

    if (!nombre || !direccion || !metodoPagoSeleccionado || !email || !apellidos) {
      
        alert("Por favor, completa todos los campos antes de proceder con el pago.");
        window.location.href = "checkout.html";
       
    } else {

        let metodoPago = metodoPagoSeleccionado.value;
        let resumen = JSON.parse(localStorage.getItem("pro-resumen"));
        let datosEntrega = JSON.parse(localStorage.getItem("datos-entrega"));

        // Guardar información del pedido finalizado
        let pedido = {
            datosEntrega,
            metodoPago,
            resumen
        };

        localStorage.setItem("pedido-finalizado", JSON.stringify(pedido));

        // Limpiar carrito y resumen del localStorage
        localStorage.removeItem("pro-carrito");
        localStorage.removeItem("pro-resumen");
        localStorage.removeItem("datos-entrega");

        // Redirigir a la página de agradecimiento
        alert("Pago exitoso. Redirigiendo...");
        window.location.href = "thankyou.html";
    }


});
