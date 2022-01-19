const carrito = [];
let carritoGuardado = [];
let itemsCarrito = carrito.reduce(function(anterior, actual){
    return anterior + actual.cantidad;}, 0);
let contenedorCarrito = document.getElementById("productosCarrito");
let tituloCarrito = document.createElement("h4");
tituloCarrito.textContent ="Productos";
contenedorCarrito.appendChild(tituloCarrito);
// muestra una alerta que dice que no hay productos en el carrito
let carritoVacio = document.createElement("div");
carritoVacio.className = "alert alert-warning";
carritoVacio.role = "alert";
carritoVacio.textContent = "No hay productos agregados al carrito.";
contenedorCarrito.appendChild(carritoVacio);
//setea por defecto el subtotal en cero
let subtotal = 0;
let subtotalCarrito = document.getElementById("subtotal");
let contenidoSubtotal = document.createElement("h6");
contenidoSubtotal.classList = "mt-2";
contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
subtotalCarrito.appendChild(contenidoSubtotal)
// envio elegido
let envioElegido = JSON.parse(localStorage.getItem("Envio"));
let contenidoEnvios = document.getElementById("envios");
// tipos de envios
let enviosGuardados = [];
// setea por defecto el total en cero
let total = 0;
let totalCarrito = document.getElementById("total");
let contenidoTotal = document.createElement("h4");
contenidoTotal.classList = "mt-3";
contenidoTotal.textContent = `Total: $${total}`;
totalCarrito.appendChild(contenidoTotal);
//función para traer el carrito del local storage (la ejecuto al final del codigo)
const traerCarrito = () => {
    carritoGuardado = JSON.parse(localStorage.getItem("carritoUsuario"));
    if (carritoGuardado != null){ 
    // modificar el numero de items en el carrito en la barra de navegacion
    if (carritoGuardado.length > 0) {
    carritoGuardado.forEach (producto => {
        let item = {
            nombre: producto.nombre,
            precio: producto.precio,
            subtotalProducto: producto.subtotalProducto,
            imagen: producto.imagen,
            descripcion: producto.descripcion,
            cantidad: producto.cantidad
        }
        carrito.push(item);
        let productoenCarrito = document.createElement("div");
            productoenCarrito.classList = "container-fluid";
            productoenCarrito.innerHTML = `<div class="row border-bottom" id="enCarrito_${producto.nombre}">
                                            <div class="col-3 mt-2 mb-2"><img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid"></div>
                                            <div class="col-6">
                                                <h5>${producto.nombre}</h5>
                                                <p class="mb-1">${producto.descripcion}</p>
                                                <p class="mb-1">Cantidad: <span id="cantidad_${producto.nombre}">${producto.cantidad}</span></p>
                                                <p class="mb-1">Precio: $${producto.precio}</p>
                                            </div>
                                            <div class="col-3 text-end">
                                                <p id="subtotalProd_${producto.nombre}">$${producto.subtotalProducto}</p>
                                            </div>`
            subtotal += producto.subtotalProducto;
            total += producto.subtotalProducto;
            localStorage.setItem( "Total", total);
            contenedorCarrito.appendChild(productoenCarrito);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            }
        )
        total += envioElegido;
        localStorage.setItem( "Total", total);
        contenidoTotal.textContent = `Total: $${total}`;
    enviosGuardados = JSON.parse(localStorage.getItem("OpcionesEnvio"));
    enviosGuardados.forEach( envio => {
        $("#containerEnvios").append(
                `<div class="col">
                    <div class="card h-100 text-white bg-secondary" id="${envio.tipoEnvio}">
                        <div class="card-body d-flex flex-column" id="cardBody_${envio.tipoEnvio}">
                            <h5 class="card-title">${envio.tipoEnvio}</h5>
                            <p class="card-text mt-auto">${envio.descripcionEnvio}</p>
                            <p class="fw-bold mt-auto">Precio: $${envio.precioEnvio}</p>
                            <button class="btn btn-friki botonEnvio" id="button_${envio.tipoEnvio}">LO QUIERO</button>
                        </div>
                    </div>
                </div>`
            )
        if (envio.precioEnvio == envioElegido) {
            let tarjeta = document.getElementById(envio.tipoEnvio);
            tarjeta.className = "card h-100 text-white bg-uno";
            }
            else {
            let tarjeta = document.getElementById(envio.tipoEnvio);
            tarjeta.className = "card h-100 text-white bg-secondary";
            }
        }
    );
    // modificar el numero de items en el carrito en la barra de navegacion
    let badge = document.getElementById("itemCarrito");
    let span = badge.childNodes[0];
    span.nodeValue = carritoGuardado.reduce(function(anterior, actual){
        return anterior + actual.cantidad;}, 0);
    contenedorCarrito.removeChild(carritoVacio);
    }
 }
}
traerCarrito();
itemsCarrito = carrito.reduce(function(anterior, actual){
    return anterior + actual.cantidad;}, 0);

// elegir un envio si no está elegido o cambiar el envio en el modal carrito
let botonesEnvio = $(".botonEnvio")
botonesEnvio.click( envioElegir );

function envioElegir (e){
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    let envioCarrito = padre.querySelector("h5").textContent;
    let encontrado = enviosGuardados.find( elemento => elemento.tipoEnvio === envioCarrito)
    //actualiza totales en relacion al envio elegido
    total -= envioElegido;
    envioElegido = encontrado.precioEnvio;
    total += envioElegido;
    contenidoTotal.textContent = `Total: $${total}`;
    //guarda info del envio elegido en el local storage
    localStorage.setItem( "Envio", envioElegido );
    localStorage.setItem( "Total", total);
    colorear();
    }

// recorre el arreglo para colorear la tarjeta del envio elegido y volver a gris las otras
function colorear(){
    enviosGuardados.forEach( envio => {
        if (envio.precioEnvio == envioElegido) {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card h-100 text-white bg-uno";
        }
        else {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card h-100 text-white bg-secondary";
        }
    })
}