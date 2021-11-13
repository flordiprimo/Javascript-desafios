function productos (nombreProducto, precioProducto) {
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.agregado = 0;
    this.agregar = function() {
        if ((elegirProd( this.nombreProducto , this.precioProducto ) == true )){
            this.agregado = this.precioProducto;
        }
        else {
            this.agregado = 0;
        }
    }
}

const producto1 = new productos ("The Velvet Underground & Nico", 5500);
const producto2 = new productos ("Blur - Blur", 4500);
const producto3 = new productos ("The Stone Roses - The Stone Roses", 4000);

function envios (tipoEnvio, precioEnvio) {
    this.tipoEnvio = tipoEnvio;
    this.precioEnvio = precioEnvio;
    this.agregar = function() {
        elegirEnvio( this.tipoEnvio, this.precioEnvio )
    }
}

const envio1 = new envios ("Retiro por el local", 0);
const envio2 = new envios ("Envio Estándar", 300);
const envio3 = new envios ("Envío Rápido", 600);

function elegirProd ( producto , precio ){
    if (confirm("¿Estás seguro de agregar " + producto + " por: $" + precio + "?" )) {
        alert("Producto agregado correctamente");
        console.log("Producto agregado: " + producto + "Precio: $" + precio);
        return true;
    }
    else {
        return false;
    }
}

function elegirProd1(){ producto1.agregar()
}

function elegirProd2(){ producto2.agregar()
}

function elegirProd3(){ producto3.agregar()
}

let envioElegido = "ninguno";

function elegirEnvio( envio , precio){
    if (confirm("¿Estás seguro de elegir " + envio + "?")){
        alert("Envío agregado correctamente");
        envioElegido = precio;
        console.log("El envío elegido es: " + envio + ": $" + precio)
    }
    else {
        envioElegido = "ninguno";
    }
}
function elegirEnvio1(){
    envio1.agregar()
}
function elegirEnvio2(){
    envio2.agregar()
}
function elegirEnvio3(){
    envio3.agregar()
}

function cotizar(){
    console.log(envioElegido);
    if( envioElegido == "ninguno" ){
        alert("Por favor elegir un método de envío antes de cotizar");
    }
    else{
        let sumaProductos = producto1.agregado + producto2.agregado + producto3.agregado;
        let total = sumaProductos + envioElegido;
        console.log("Total: $" + total)
        alert("El total de su compra es " + "$" + total)
    }
    

}