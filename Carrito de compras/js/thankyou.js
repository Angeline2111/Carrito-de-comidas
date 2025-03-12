document.addEventListener("DOMContentLoaded", () => {
    let pedido = JSON.parse(localStorage.getItem("pedido-finalizado"));
    console.log(pedido);
    if (!pedido) {
        alert("No hay un pedido registrado.");
        window.location.href = "index.html";
        return;
    }

    // Mostrar detalles del pedido en la página
    document.querySelector(".nombreCliente").textContent = pedido.datosEntrega.nombres + "! ";
    document.querySelector(".resumen-compra p").textContent = "Orden #" + Math.floor(Math.random() * 10000);

    let resumenProductosHTML = ``;
    for (let i = 0; i < pedido.resumen.productos.length; i++) {
        let producto = pedido.resumen.productos[i];

        resumenProductosHTML += `
            
            <p>Nombre producto:  ${producto.nombre} 
            Nombre producto: ${producto.precio} Cantidad:${producto.cantidad}</p>
        `;
    }


    let resumenHTML = `
        <p><strong>Nombre Completo:</strong> ${pedido.datosEntrega.nombres}  ${pedido.datosEntrega.apellidos}</p>
        <p><strong>Correo:</strong> ${pedido.datosEntrega.email}</p>
        <p><strong>Celular:</strong>${pedido.datosEntrega.celular} </p>
        <p><strong>Lugar:</strong> ${pedido.resumen.destino}</p>
        <p><strong>Dirección de entrega:</strong> ${pedido.datosEntrega.direccion}</p>
        <p><strong>Dirrección Opcional:</strong>${pedido.datosEntrega.direccion2 || "N/A"} </p>
        <p><strong>Nota Adicional:</strong> ${pedido.datosEntrega.notas || "N/A"}</p>

    `;

    let datosCompraHTML = `
    <p><strong>Productos:</strong>${resumenProductosHTML} </p>
    <p><strong>Costo Domicilio:</strong>$${pedido.resumen.domicilio} </p>
    <p><strong>Promoción:</strong> ${pedido.resumen.descuento} </p>
    <p><strong>Método de pago:</strong> ${pedido.metodoPago === "1" ? "Tarjeta de crédito (5% adicional)" : "Transferencia bancaria (3% adicional)"}</p>
    <p><strong>Total Pagar:</strong> $${pedido.resumen.totalApagar}</p>

`
    document.querySelector(".card-body").innerHTML = resumenHTML;
    document.querySelector(".card-body2").innerHTML = datosCompraHTML;


    // Evento para botón de nueva compra
    document.querySelector(".btn-gracias").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
