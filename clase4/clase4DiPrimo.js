const producto1 = "The Velvet Underground & Nico";
const producto2 = "Blur - Blur";
const producto3 = "The Stone Roses - The Stone Roses";
const precioProducto1 = 5500;
const precioProducto2 = 4500;
const precioProducto3 = 4000;
const envio1 = "Retiro por el local";
const envio2 = "Envio Estándar";
const envio3 = "Envio Rápido";
const precioEnvio1 = 0;
const precioEnvio2 = 300;
const precioEnvio3 = 600;


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

let producto1Agregado = 0;

function elegirProd1(){
    if ((elegirProd( producto1 , precioProducto1 ) == true )){
        producto1Agregado = precioProducto1;
    }
    else {
        producto1Agregado = 0;
    }
}

let producto2Agregado = 0;

function elegirProd2(){
    if ((elegirProd( producto2 , precioProducto2 ) == true )){
        producto2Agregado = precioProducto2;
    }
    else {
        producto2Agregado = 0;
    }
}

let producto3Agregado = 0;

function elegirProd3(){
    if ((elegirProd( producto3 , precioProducto3 ) == true )){
        producto3Agregado = precioProducto3;
    }
    else {
        producto3Agregado = 0;
    }
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
    elegirEnvio( envio1 , precioEnvio1 )
}
function elegirEnvio2(){
    elegirEnvio( envio2 , precioEnvio2 )
}
function elegirEnvio3(){
    elegirEnvio( envio3 , precioEnvio3 )
}

function cotizar(){
    console.log(envioElegido);
    if( envioElegido == "ninguno" ){
        alert("Por favor elegir un método de envío antes de cotizar");
    }
    else{
        let sumaProductos = producto1Agregado + producto2Agregado + producto3Agregado;
        let total = sumaProductos + envioElegido;
        console.log("Total: $" + total)
        alert("El total de su compra es " + "$" + total)
    }
    

}