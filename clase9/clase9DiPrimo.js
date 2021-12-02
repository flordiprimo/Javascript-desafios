
let carrito = [];
let itemsCarrito = carrito.length;
//Información para modal carrito
let contenedorCarrito = document.getElementById("productosCarrito");
let tituloCarrito = document.createElement("h4");
tituloCarrito.textContent ="Productos";
contenedorCarrito.appendChild(tituloCarrito);
let listaCarrito = document.createElement("ul");
contenedorCarrito.appendChild(listaCarrito);
let subtotal = 0;
let subtotalCarrito = document.getElementById("subtotal");
let contenidoSubtotal = document.createElement("h6");
contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
subtotalCarrito.appendChild(contenidoSubtotal)
let contenidoEnvios = document.getElementById("envios");
// envio elegido
let envioElegido = 0;
// setea por defecto el total en cero
let total = 0;
let totalCarrito = document.getElementById("total");
let contenidoTotal = document.createElement("h4");
contenidoTotal.textContent = `Total: $${total}`;
totalCarrito.appendChild(contenidoTotal);
// contenedor productos
let contenedorProductos = document.getElementById("containerProductos");
// contenedor envios
let contenedorEnvios = document.getElementById("containerEnvios");

//Función para crear objetos dentro del array productos y métodos del objeto producto.
function Productos (nombreProducto, precioProducto, stockProducto, imgProducto, descripcionProducto) {
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.stockProducto = stockProducto;
    this.imgProducto = imgProducto;
    this.descripcionProducto = descripcionProducto;
    //funcion para agregar productos al carrito checkeando stock y descontando stock
    this.agregar = function() {
        if (this.stockProducto > 0){
            //creo un objeto y lo mando al array carrito
            let item = {
                nombre: this.nombreProducto,
                precio: this.precioProducto,
            }
            carrito.push(item);
            let carritoJSON = JSON.stringify( carrito );
            localStorage.setItem ("carritoUsuario", carritoJSON );
            //actualizo el stock
            this.stockProducto -= 1;
            // modificar el numero de items en el carrito en la barra de navegacion
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
            span.nodeValue = carrito.length;
            // muestra una alerta que confirma que el producto fue agregado
            let contenedor = document.getElementById(`cardBody_${this.nombreProducto}`);
            let alerta = document.createElement("div");
            alerta.className = "alert alert-success";
            alerta.role = "alert";
            alerta.textContent = "Producto agregado al carrito.";
            contenedor.insertBefore(alerta, contenedor.childNodes[3]);
            // crea y actualiza contenido dinámico en el modal de carrito
            let productoenCarrito = document.createElement("li");
            productoenCarrito.innerHTML = `${this.nombreProducto} - $${this.precioProducto}`;
            subtotal += this.precioProducto;
            total += this.precioProducto;
            localStorage.setItem( "Total", total);
            listaCarrito.appendChild(productoenCarrito);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            if (this.stockProducto == 0) {
                this.sinStock();
            }
        }
        else {
            console.log ("no hay stock");
        }
    }
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
productos.push(new Productos("The Velvet Underground & Nico", 5500, 2, "images/velvet_banana.png", "Descripción producto"));
productos.push(new Productos("Blur - Blur", 4500, 1, "images/Blur-blur.png", "Descripción producto"));
productos.push(new Productos("The Stone Roses - The Stone Roses", 4000, 1, "images/stone-roses.png", "Descripción producto"));
//crea una tarjeta de producto por cada producto del array productos
productos.forEach( producto => {
        let col = document.createElement("div");
        col.className = "col";
        contenedorProductos.appendChild(col);
        let card = document.createElement("div");
        card.className = "card h-100";
        card.id = producto.nombreProducto;
        col.appendChild(card);
        let cardImg = document.createElement("img");
        cardImg.className = "card-img-top";
        cardImg.id = `img_${producto.nombreProducto}`;
        cardImg.src = producto.imgProducto;
        cardImg.alt = producto.nombreProducto;
        card.appendChild(cardImg);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";
        cardBody.id = `cardBody_${producto.nombreProducto}`;
        card.appendChild(cardBody);
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = producto.nombreProducto;
        cardBody.appendChild(cardTitle);
        let cardText = document.createElement("p");
        cardText.className = "card-text mt-auto";
        cardText.textContent = producto.descripcionProducto;
        cardBody.appendChild(cardText);
        let cardPrice = document.createElement("p");
        cardPrice.className = "fw-bold mt-auto";
        cardPrice.textContent = `Precio: $${producto.precioProducto}`
        cardBody.appendChild(cardPrice);
        let cardButton = document.createElement("button");
        cardButton.className = "btn btn-dark mt-auto botonComprar";
        cardButton.id = `button_${producto.nombreProducto}`;
        cardButton.type = "button";
        cardButton.textContent = "LO QUIERO";
        cardBody.appendChild(cardButton);
        }
);

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

//crea una tarjeta por cada tipo de envio del array envios y la inserta en el modal de carrito
envios.forEach( envio => {
    let col = document.createElement("div");
    col.className = "col";
    contenedorEnvios.appendChild(col);
    let card = document.createElement("div");
    card.className = "card h-100 text-white bg-secondary";
    card.id = envio.tipoEnvio;
    col.appendChild(card);
    let cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";
    cardBody.id = `cardBody_${envio.tipoEnvio}`;
    card.appendChild(cardBody);
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = envio.tipoEnvio;
    cardBody.appendChild(cardTitle);
    let cardText = document.createElement("p");
    cardText.className = "card-text mt-auto";
    cardText.textContent = envio.descripcionEnvio;
    cardBody.appendChild(cardText);
    let cardPrice = document.createElement("p");
    cardPrice.className = "fw-bold mt-auto";
    cardPrice.textContent = `Precio: $${envio.precioEnvio}`
    cardBody.appendChild(cardPrice);
    let cardButton = document.createElement("button");
    cardButton.className = "btn btn-dark mt-auto botonEnvio";
    cardButton.id = `button_${envio.tipoEnvio}`;
    cardButton.type = "button";
    cardButton.textContent = "LO QUIERO";
    cardBody.appendChild(cardButton);
    }
);

// trackeo de botones de envio
let botonesEnvio = document.querySelectorAll(".botonEnvio");

for ( let boton of botonesEnvio){
    boton.addEventListener( "click" , envioElegir )
}

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
    for ( envio of envios ) {
        if (envio.precioEnvio == envioElegido) {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card h-100 text-white bg-primary";
        }
        else {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card h-100 text-white bg-secondary";
        }
    }
}

