/////GENERACIÓN DE CONTENIDO DINÁMICO/////
let contenedor = document.getElementById("novedades__productos");
let body = document.getElementsByTagName('body');
let novedades = [];
// chequeo qué productos son novedades en el array productos y los guardo en el array novedades
isNovedad();
// creo tarjetas y modal producto para esos productos
Funciones.crearTarjetasProducto(novedades, contenedor);
Funciones.crearModalProducto(novedades, body[0])


Funciones.chequearStock(novedades)

//BOTONES
//botones de compra
let botonesComprar = document.querySelectorAll(".botonComprar");

//Trackeo botón de compra
for ( let boton of botonesComprar){
    boton.addEventListener( "click" , function(e){
        let botonTarget = e.target;
        let textoTarget = botonTarget.parentNode.parentNode;
        let productoCarrito = textoTarget.querySelector("h5").textContent;
        let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
        encontrado.agregar();
        //muestra una alerta que confirma que el producto fue agregado
        let contenedor = document.getElementById(`cardBody_${encontrado.nombreProducto}`);
        $(`<div class="alert alert-success" role="alert" id="alert_${encontrado.nombreProducto}">Producto agregado al carrito.</div>`).appendTo(contenedor).fadeIn(200).delay(1000).fadeOut(500);
        // si el producto se queda sin stock deshabilitar botones y avisar al usuario
        Funciones.chequearStock(novedades)
    })
}
//botones info
let botonesInfo = document.querySelectorAll(".botonInfo");

///Trackeo botón MAS INFO
for ( let boton of botonesInfo){
    boton.addEventListener( "click" , function(e){
    //identifico de qué producto voy a solicitar info y lo paso a la función
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    let productoparaInfo = padre.querySelector("h5").textContent;
    let encontrado = productos.find( elemento => elemento.nombreProducto === productoparaInfo)
    let productoAPI = encontrado.nombreProducto
    let releaseID = encontrado.releaseID;
    Funciones.productoInfo(releaseID , productoAPI);
    } )
}

// botones comprar modal
let botonesComprarModal = document.querySelectorAll(".botonComprarModal");

//Trackeo botón de compra modal
for ( let boton of botonesComprarModal){
    boton.addEventListener( "click" , function(e){
        let botonTarget = e.target;
        console.log(botonTarget)
        let contenido = botonTarget.parentNode.parentNode
        let div = contenido.childNodes[3];
        let texto = div.childNodes[1].textContent;
        let encontrado = productos.find( elemento => elemento.nombreProducto === texto);
        console.log(encontrado)
        encontrado.agregar();
        //muestra una alerta que confirma que el producto fue agregado
        let contenedor = document.getElementById(`alertAgregado_${encontrado.nombreProducto}`);
        $(`<div class="alert alert-success" role="alert" id="alert_${encontrado.nombreProducto}">Producto agregado al carrito.</div>`).appendTo(contenedor).fadeIn(200).delay(1000).fadeOut(500);
        Funciones.chequearStock(novedades);
    })
}


// FUNCIONES
function isNovedad(){
    productos.forEach( producto => {
        if (producto.isNovedad === true) {
            novedades.push(producto)
        }
    })
}