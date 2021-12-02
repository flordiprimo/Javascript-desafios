
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
// setea por defecto el envio elegido en ninguno
let envioElegido = "ninguno";
let total = 0;
let totalCarrito = document.getElementById("total");
let contenidoTotal = document.createElement("h4");
contenidoTotal.textContent = `Total: $${total}`;
totalCarrito.appendChild(contenidoTotal);


//Función para crear objetos dentro del array productos y métodos del objeto producto.
function Productos (nombreProducto, precioProducto, stockProducto) {
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.stockProducto = stockProducto;
    // chequea stock del producto seleccionado, si no hay, muestra alerta al usuario y si hay, agrega al array carrito y descuenta del stock.
    this.agregar = function() {
        if ((elegirProd( this.nombreProducto , this.precioProducto , this.stockProducto ) == true && this.stockProducto > 0)){
            let item = {
                nombre: this.nombreProducto,
                precio: this.precioProducto,
            }
            carrito.push(item);
            let carritoJSON = JSON.stringify( carrito )
            localStorage.setItem ("carritoUsuario", carritoJSON )
            this.stockProducto -= 1;
            // modificar el numero de items en el carrito en la barra de navegacion
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
            span.nodeValue = carrito.length;
            // crea y actualiza contenido dinámico en el modal de carrito
            let productoCarrito = document.createElement("li");
            productoCarrito.innerHTML = `${this.nombreProducto} - $${this.precioProducto}`;
            subtotal += this.precioProducto;
            total += this.precioProducto;
            listaCarrito.appendChild(productoCarrito);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            
            }
            

        }
}

// Array de productos
const productos = [];
productos.push(new Productos("The Velvet Underground & Nico", 5500, 1));
productos.push(new Productos("Blur - Blur", 4500, 1));
productos.push(new Productos("The Stone Roses - The Stone Roses", 4000, 1));

// funcion para crear objetos dentro del array envios y métodos del objeto envio.
function Envio (tipoEnvio, precioEnvio) {
    this.tipoEnvio = tipoEnvio;
    this.precioEnvio = precioEnvio;
    // elige un tipo de envío en particular
    this.agregar = function() {
        elegirEnvio( this.tipoEnvio, this.precioEnvio )
    }
}

// Array de envios
const envios = [];
envios.push(new Envio("Retiro por el local", 0));
envios.push(new Envio("Envío Estándar", 300));
envios.push(new Envio("Envío Rápido", 600));

// Función que elige productos, pide confirmación del usuario
function elegirProd ( producto , precio , stock ){
    if ( stock > 0 ) {
        if (confirm(`¿Estás seguro de agregar ${producto} por: $${precio}?`)) {
            alert("Producto agregado correctamente");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        alert("El producto seleccionado se encuentra sin stock.");
    }
}
// funciones para elegir productos
function elegirProd1(){ productos[0].agregar()
}

function elegirProd2(){ productos[1].agregar()
}

function elegirProd3(){ productos[2].agregar()
}



// función para elegir el envío
function elegirEnvio( envio , precio){
    if (confirm(`¿Estás seguro de elegir ${envio}?`)){
        alert("Envío agregado correctamente");
        envioElegido = precio;
        total += precio;
        contenidoTotal.textContent = `Total: $${total}`;

    }
    else {
        envioElegido = "ninguno";
    }
    localStorage.setItem( "Envio", envioElegido );
}
// funciones para elegir envio
let envioUno = document.getElementById("envioUno")
let envioDos = document.getElementById("envioDos")
let envioTres = document.getElementById("envioTres")

function elegirEnvio1(){
    envios[0].agregar()
    envioUno.classList.replace("bg-secondary", "bg-primary");
    envioDos.className = "card text-white bg-secondary";
    envioTres.className = "card text-white bg-secondary";
}
function elegirEnvio2(){
    envios[1].agregar()
    envioUno.className = "card text-white bg-secondary";
    envioDos.classList.replace("bg-secondary", "bg-primary");
    envioTres.className = "card text-white bg-secondary";
}
function elegirEnvio3(){
    envios[2].agregar()
    envioUno.className = "card text-white bg-secondary";
    envioDos.className = "card text-white bg-secondary";
    envioTres.classList.replace("bg-secondary", "bg-primary");
}