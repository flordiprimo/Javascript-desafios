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
let envioElegido = 0;
let contenidoEnvios = document.getElementById("envios");
// setea por defecto el total en cero
let total = 0;
let totalCarrito = document.getElementById("total");
let contenidoTotal = document.createElement("h4");
contenidoTotal.classList = "mt-3";
contenidoTotal.textContent = `Total: $${total}`;
totalCarrito.appendChild(contenidoTotal);
// contenedor productos
let contenedorProductos = document.getElementById("containerProductos");
// contenedor envios
let contenedorEnvios = document.getElementById("containerEnvios");

//función para traer el carrito del local storage (la ejecuto al final del codigo)
const traerCarrito = () => {
    carritoGuardado = JSON.parse(localStorage.getItem("carritoUsuario"));
    if (carritoGuardado != null){ 
    // modificar el numero de items en el carrito en la barra de navegacion
    if (carritoGuardado.length > 0) {
    carritoGuardado.forEach (producto => {
        carrito.push(producto);
        let subtotalProd = producto.precio * producto.cantidad;
        producto.subtotalProducto = subtotalProd;
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
                                                <p id="subtotalProd_${producto.nombre}">$${subtotalProd}</p>
                                            </div>`
            subtotal += subtotalProd;
            total += subtotalProd;
            localStorage.setItem( "Total", total);
            contenedorCarrito.appendChild(productoenCarrito);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
        //Busca el nombre del producto en el carrito y descuenta stock en el array productos
        let encontrado = productos.find( elemento => elemento.nombreProducto === producto.nombre)
        encontrado.stockProducto -= encontrado.cantidad;
        encontrado.sinStock();
        //actualizo el carritoJSON y lo guardo en el local storage
        let carritoJSON = JSON.stringify( carrito );
        localStorage.setItem ("carritoUsuario", carritoJSON );
            }
        )
    // busca el envio elegido y lo selecciona, actualizando el total
    let envioGuardado = envios.find(elemento => elemento.precioEnvio === JSON.parse(localStorage.getItem("Envio")))
    if (envioGuardado != undefined) {
    let tarjeta = document.getElementById(envioGuardado.tipoEnvio);
            tarjeta.className = "card h-100 text-white bg-uno";
    total += envioGuardado.precioEnvio;
    localStorage.setItem( "Total", total);
    contenidoTotal.textContent = `Total: $${total}`;
    }

    // modificar el numero de items en el carrito en la barra de navegacion
    let badge = document.getElementById("itemCarrito");
    let span = badge.childNodes[0];
    span.nodeValue = carritoGuardado.reduce(function(anterior, actual){
        return anterior + actual.cantidad;}, 0);
    contenedorCarrito.removeChild(carritoVacio);
    for ( let boton of botonesEnvio){
           boton.disabled = false;
       }
        botonCompraCarrito.disabled = false;
    }
 }
}

//Función para crear objetos dentro del array productos y métodos del objeto producto.
function Productos (nombreProducto, precioProducto, stockProducto, imgProducto, descripcionProducto, releaseID) {
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.stockProducto = stockProducto;
    this.imgProducto = imgProducto;
    this.descripcionProducto = descripcionProducto;
    this.releaseID = releaseID;
    //funcion para agregar productos al carrito checkeando stock y descontando stock
    this.agregar = function() {
        if (this.stockProducto > 0){
            //actualizo el stock
            this.stockProducto -= 1;
            // Chequea si el producto ya existe en el carrito
            let encontrado = carrito.find(item => item.nombre === this.nombreProducto && item.cantidad >= 1)
            //Si el producto existe:
            if(encontrado != undefined){
                //actualizo la cantidad en el array carrito
                encontrado.cantidad += 1;
                let cantidadCarrito = document.getElementById(`cantidad_${this.nombreProducto}`);
                // actualizo cantidad en el modal carrito
                let span = cantidadCarrito.childNodes[0];
                span.nodeValue = encontrado.cantidad;
                // actualizo subtotal producto en el modal carrito
                let subtotalProducto = this.precioProducto * encontrado.cantidad;
                console.log(subtotalProducto)
                let actualizarSubtotal = document.getElementById(`subtotalProd_${this.nombreProducto}`);
                actualizarSubtotal.innerText = `$${subtotalProducto}`;
                //actualizo el carritoJSON y lo guardo en el local storage
                let carritoJSON = JSON.stringify( carrito );
                localStorage.setItem ("carritoUsuario", carritoJSON );
            }
            //Si el producto no existe
            else {
                let item = {
                    nombre: this.nombreProducto,
                    precio: this.precioProducto,
                    subtotalProducto: this.precioProducto,
                    imagen: this.imgProducto,
                    descripcion: this.descripcionProducto,
                    cantidad: 1
                }
                //si es el primer producto agregado, saco alerta en el modal carrito y habilito botones de envio y compra.
                if (carrito.length === 0) { 
                    contenedorCarrito.removeChild(carritoVacio);
                    for ( let boton of botonesEnvio){
                        boton.disabled = false;
                    }
                    botonCompraCarrito.disabled = false;
                    }
                //mando el producto al array carrito
                carrito.push(item);
                //guardo el carrito en el local storage
                let carritoJSON = JSON.stringify( carrito );
                localStorage.setItem ("carritoUsuario", carritoJSON );
                // crea y actualiza contenido dinámico en el modal de carrito
                let productoenCarrito = document.createElement("div");
                productoenCarrito.classList = "container-fluid";
                productoenCarrito.innerHTML = `<div class="row border-bottom" id="enCarrito_${this.nombreProducto}">
                                            <div class="col-3 mt-2 mb-2"><img src="${this.imgProducto}" alt="${this.nombreProducto}" class="img-fluid"></div>
                                            <div class="col-6">
                                                <h5>${this.nombreProducto}</h5>
                                                <p class="mb-1">${this.descripcionProducto}</p>
                                                <p class="mb-1">Cantidad: <span id="cantidad_${this.nombreProducto}">${item.cantidad}</span></p>
                                                <p class="mb-1">Precio: $${this.precioProducto}</p>
                                            </div>
                                            <div class="col-3 text-end">
                                                <p id="subtotalProd_${this.nombreProducto}">$${this.precioProducto}</p>
                                            </div>`
            contenedorCarrito.appendChild(productoenCarrito);
            }
            // actualizo subtotal y total de la compra y lo guardo en el local storage
            subtotal += this.precioProducto;
            total += this.precioProducto;
            console.log(total)
            localStorage.setItem( "Total", total);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            // si el stock del producto es 0 al finalizar el agregado, ejecuto el método sin stock
            if (this.stockProducto == 0) {
                this.sinStock();
            }
            // Modificar el numero de items en el carrito en la barra de navegacion
            itemsCarrito = carrito.reduce(function(anterior, actual){
                return anterior + actual.cantidad;}, 0);
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
                span.nodeValue = itemsCarrito;
            //muestra una alerta que confirma que el producto fue agregado
            let contenedor = document.getElementById(`cardBody_${this.nombreProducto}`);
            $(`<div class="alert alert-success" role="alert" id="alert_${this.nombreProducto}">Producto agregado al carrito.</div>`).appendTo(contenedor).fadeIn(200).delay(1000).fadeOut(500);
        }
    }
    //método que modifica el contenido de la tarjeta de producto cuando está sin stock y deshabilita el boton para agregarlo
    this.sinStock = function() {
        let imagenProducto = document.getElementById(`img_${this.nombreProducto}`);
        imagenProducto.style.opacity = "50%";
        let botonProducto = document.getElementById(`button_${this.nombreProducto}`);
        botonProducto.classList = "btn btn-outline-dark mt-auto botonComprar";
        botonProducto.disabled = "true";
        botonProducto.textContent = "SIN STOCK";
}
}

// Array de productos
const productos = [];
productos.push(new Productos("The Velvet Underground & Nico", 5200, 2, "../images/velvet_banana.png", "Descripción producto", "21428521"));
productos.push(new Productos("Blur - Blur", 5000, 1, "../images/Blur-blur.png", "Descripción producto", "15875347"));
productos.push(new Productos("The Stone Roses - The Stone Roses", 4500, 1, "../images/stone-roses.png", "Descripción producto", "11638787"));
productos.push(new Productos("Arcade Fire - Neon Bible", 5600, 1, "../images/arcade-fire-neon-bible.png", "Descripción producto", "11212072"));
productos.push(new Productos("Daft Punk - Random Access Memories", 6500, 1, "../images/daft-punk-ram.png", "Descripción producto", "19574308"));
productos.push(new Productos("DIIV - Is The Is Are", 5500, 1, "../images/diiv-is-the-is-are.png", "Descripción producto", "8040863"));
productos.push(new Productos("Black Marble - Fast Idol", 5800, 1, "../images/Black marble fast idol.png", "Descripción producto", "20690938"));
productos.push(new Productos("Daft Punk - Daft Club", 5600, 1, "../images/daft-club.png", "Descripción producto", "5904055"));
productos.push(new Productos("Dinosaur Jr. - Sweep it into Space", 6000, 1, "../images/dinosaur jr sweep it into space.png", "Descripción producto", "18280303"));
productos.push(new Productos("Molchat Doma - Etazhi", 5800, 1, "../images/molchat doma etazhi.png", "Descripción producto", "20103439"));
productos.push(new Productos("Pixies - Indie Cindy", 5400, 1, "../images/pixies.png", "Descripción producto", "5781271"));
productos.push(new Productos("Tame Impala - Currents", 5900, 1, "../images/tame-impala-currents.png", "Descripción producto", "7252111"));

//crea una tarjeta de producto por cada producto del array productos en el catálogo
productos.forEach( producto => {
        //Tarjeta de contenido producto
        
        $("#containerProductos").append(
            `<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2 mt-2">
                <div class="card h-100" id="${producto.nombreProducto}">
                    <img class="card-img-top" id="img_${producto.nombreProducto}" src="${producto.imgProducto}" alt="${producto.nombreProducto}">
                    <div class="card-body d-flex flex-column" id="cardBody_${producto.nombreProducto}">
                        <h5 class="card-title producto__nombre text-black mt-2">${producto.nombreProducto}</h5>
                        <p class="card-text mt-auto">${producto.descripcionProducto}</p>
                        <p class="w-bold mt-auto precio">$${producto.precioProducto}</p>
                            <button class="btn btn-secondary mt-auto botonInfo mb-2" id="masinfo_${producto.releaseID}" type="button" data-bs-toggle="modal" data-bs-target="#Modal${producto.releaseID}">MAS INFO</button>
                            <button class="btn btn-friki mt-auto botonComprar" id="button_${producto.nombreProducto}" type="button">LO QUIERO</button>
                    </div>
                </div>
            </div>`
        )
        //MODAL DE MAS INFO SOBRE EL PRODUCTO/EDICION
        $("body").append(
            `<div class="modal fade" id="Modal${producto.releaseID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Acerca de este disco</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>${producto.nombreProducto}</h3>
                        <img src="${producto.imgProducto}" class="img-fluid">
                        <h5 class="mt-3">Información sobre el disco</h5>
                        <div id="infoDisco_${producto.nombreProducto}">
                        </div>
                        <h5 class="mt-3">Información sobre esta edición</h5>
                        <div id="infoEdicion_${producto.nombreProducto}">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>`
        )

    });

// checkea el stock inicial de objetos producto y llama al método sinStock si algun producto no tiene
productos.forEach( producto => {
    if (producto.stockProducto == 0){
        producto.sinStock();
    }

});


// trackeo de botones de compra
let botonesComprar = document.querySelectorAll(".botonComprar");

for ( let boton of botonesComprar){
    boton.addEventListener( "click" , productoElegido )
}
//Función que determina cuál es el producto elegido y llama a la función elegir producto
function productoElegido (e){
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    let productoCarrito = padre.querySelector("h5").textContent;
    elegirProd(productoCarrito)
    }

// Función que comprueba el producto elegido en el array productos y ejecuta el método agregar
function elegirProd ( producto ){
    let encontrado = productos.find( elemento => elemento.nombreProducto === producto)
    let indexEncontrado = productos.indexOf(encontrado);
    productos[indexEncontrado].agregar(); 
}

// trackeo de botones info
let botonesInfo = document.querySelectorAll(".botonInfo");

for ( let boton of botonesInfo){
    boton.addEventListener( "click" , productoInfo )
}

function productoInfo(e){
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    let productoparaInfo = padre.querySelector("h5").textContent;
    let encontrado = productos.find( elemento => elemento.nombreProducto === productoparaInfo)
    let producto = encontrado.nombreProducto;
    let releaseID = encontrado.releaseID;
    //CONEXIÓN A LA API DE DISCOGS PARA BUSCAR LA INFO DE LA EDICIÓN
    let apiKey = "&token=BiFqmvtmZCztyNIOluyGTEuRUDrzsZXCBMyrvYUW";
    let url = "https://api.discogs.com//database/search?";
    let query = `release_id=${releaseID}`;
    let urlBusqueda = url+query+apiKey;
    $.get(urlBusqueda, function(release){
        console.log(release.results[0])
        let urlBusqueda2 = release.results[0].master_url;
        $.get(urlBusqueda2, function (masterRelease){
            console.log(masterRelease.artists[0].name);
            console.log(masterRelease.title);
            console.log(masterRelease.year);
            console.log(masterRelease.tracklist)
            let tablaInfo = document.createElement("table");
            tablaInfo.classList = "table"
            tablaInfo.innerHTML = `<tbody>
                <tr>
                    <th scope="row">Artista:</th>
                    <td>${masterRelease.artists[0].name}</td>
                </tr>
                <tr>
                    <th scope="row">Título:</th>
                    <td>${masterRelease.title}</td>
                </tr>
                <tr>
                    <th scope="row">Año de lanzamiento:</th>
                    <td>${masterRelease.year}</td>
                </tr>`
            let contenedorDisco = document.getElementById(`infoDisco_${producto}`)
            contenedorDisco.innerHTML = "";
            contenedorDisco.appendChild(tablaInfo);
        });
        let contenedorEdicion = document.getElementById(`infoEdicion_${producto}`)
        contenedorEdicion.innerHTML = "";
        console.log(release.results[0])
        let pais = release.results[0].country;
        let anio = release.results[0].year;
        let codigoBarras = release.results[0].barcode[0];
        let numeroCatalogo = release.results[0].catno;
        let sello = release.results[0].label[0];
        let link = "http://www.discogs.com" + release.results[0].uri;
        let tablaEdicion = document.createElement("table")
        tablaEdicion.classList = "table";
        tablaEdicion.innerHTML = `<tbody>
                <tr>
                    <th scope="row">Pais/Region:</th>
                    <td>${pais}</td>
                </tr>
                <tr>
                    <th scope="row">Año de la edición:</th>
                    <td>${anio}</td>
                </tr>
                <tr>
                    <th scope="row">Código de barras:</th>
                    <td>${codigoBarras}</td>
                </tr>
                <tr>
                    <th scope="row">Número de catálogo:</th>
                    <td>${numeroCatalogo}</td>
                </tr>
                <tr>
                    <th scope="row">Sello(s):</th>
                    <td>${sello}</td>
                </tr>
                <tr>
                    <th scope="row">Más información:</th>
                    <td><a href="${link}" target="_blank">Ver en Discogs</a></td>
                </tr>`
        contenedorEdicion.appendChild(tablaEdicion);
    });
    
}

// funcion para crear objetos dentro del array envios y métodos del objeto envio.
function Envio (tipoEnvio, precioEnvio , descripcionEnvio) {
    this.tipoEnvio = tipoEnvio;
    this.precioEnvio = precioEnvio;
    this.descripcionEnvio = descripcionEnvio;
    // elige un tipo de envío en particular
    this.agregar = function() {
        //actualiza totales en relacion al envio elegido
        total -= envioElegido;
        envioElegido = this.precioEnvio;
        total += envioElegido;
        contenidoTotal.textContent = `Total: $${total}`;
        //guarda info del envio elegido en el local storage
        localStorage.setItem( "Envio", envioElegido );
        localStorage.setItem( "Total", total);
        colorear();
    }
}


// Array de envios
const envios = [];
envios.push(new Envio("Retiro por el local", 0, "Pasá a retirar tu disco por el local."));
envios.push(new Envio("Envío Estándar", 300, "Envío a todo el país. Demora: 5-7 días hábiles."));
envios.push(new Envio("Envío Rápido", 600, "Envío a todo el país. Demora: 1-2 días hábiles."));

const enviosJSON = JSON.stringify(envios)
localStorage.setItem("OpcionesEnvio", enviosJSON);

//crea una tarjeta por cada tipo de envio del array envios y la inserta en el modal de carrito
envios.forEach( envio => {
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
    }
);
// trackeo de botones de envio
let botonesEnvio = $(".botonEnvio")

botonesEnvio.click( envioElegir );

for ( let boton of botonesEnvio){
    boton.disabled = true;
}

// trackeo de boton compra desde el carrito
let botonCompraCarrito = document.getElementById("botonCompraCarrito");
botonCompraCarrito.disabled = true;

//Función que determina cuál es el envío elegido y llama a la función elegir envio
function envioElegir (e){
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    let envioCarrito = padre.querySelector("h5").textContent;
    elegirEnvio(envioCarrito)
    }

// Función que comprueba el producto elegido en el array productos y ejecuta el método agregar
function elegirEnvio ( envio ){
    let encontrado = envios.find( elemento => elemento.tipoEnvio === envio)
    let indexEncontrado = envios.indexOf(encontrado);
    envios[indexEncontrado].agregar(); 
}

// recorre el arreglo para colorear la tarjeta del envio elegido y volver a gris las otras
function colorear(){
    envios.forEach( envio => {
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

traerCarrito();
itemsCarrito = carrito.reduce(function(anterior, actual){
    return anterior + actual.cantidad;}, 0);