
let carrito = [];

function Productos (nombreProducto, precioProducto) {
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.agregar = function() {
        if ((elegirProd( this.nombreProducto , this.precioProducto ) == true )){
            let item = {
                nombre: this.nombreProducto,
                precio: this.precioProducto,
            }
            carrito.push(item);
        }
        }
    };

const productos = [];
productos.push(new Productos("The Velvet Underground & Nico", 5500));
productos.push(new Productos("Blur - Blur", 4500));
productos.push(new Productos("The Stone Roses - The Stone Roses", 4000));

function Envio (tipoEnvio, precioEnvio) {
    this.tipoEnvio = tipoEnvio;
    this.precioEnvio = precioEnvio;
    this.agregar = function() {
        elegirEnvio( this.tipoEnvio, this.precioEnvio )
    }
}

const envios = [];
envios.push(new Envio("Retiro por el local", 0));
envios.push(new Envio("Envío Estándar", 300));
envios.push(new Envio("Envío Rápido", 600));


function elegirProd ( producto , precio ){
    if (confirm(`¿Estás seguro de agregar ${producto} por: $${precio}?`)) {
        alert("Producto agregado correctamente");
        console.log("Producto agregado: " + producto + "Precio: $" + precio);
        return true;
    }
    else {
        return false;
    }
}

function elegirProd1(){ productos[0].agregar()
}

function elegirProd2(){ productos[1].agregar()
}

function elegirProd3(){ productos[2].agregar()
}

let envioElegido = "ninguno";

function elegirEnvio( envio , precio){
    if (confirm(`¿Estás seguro de elegir ${envio}?`)){
        alert("Envío agregado correctamente");
        envioElegido = precio;
        console.log(`El envío elegido es: ${envio} - Precio: $${precio}`)
    }
    else {
        envioElegido = "ninguno";
    }
}
function elegirEnvio1(){
    envios[0].agregar()
}
function elegirEnvio2(){
    envios[1].agregar()
}
function elegirEnvio3(){
    envios[2].agregar()
}

function mostrarCarrito(){
    let mostrarData = `Productos: \n`;
    let total = 0;
    carrito.forEach(productos => {
        mostrarData += `${productos.nombre} - $${productos.precio} \n`;
        total += productos.precio
    })
    mostrarData += `Total Productos: $${total} \n`;
    mostrarData += `Costo Envío: $${envioElegido} \n`;
    total += envioElegido;
    mostrarData += `Total: $${total}`;
    alert(mostrarData);
}
function cotizar(){
    console.log(envioElegido);
    if( envioElegido == "ninguno" ){
        alert("Por favor elegir un método de envío antes de cotizar");
    }
    else{
        mostrarCarrito();
        }
    }
    