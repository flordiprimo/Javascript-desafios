//CONTENEDOR PRODUCTOS
let contenedorProductos = document.getElementById("containerProductos");
let body = document.getElementsByTagName('body');

/////GENERACIÓN DE CONTENIDO DINÁMICO/////
// creo tarjetas y modal producto para esos productos
Funciones.crearTarjetasProducto(productos, contenedorProductos);
Funciones.crearModalProducto(productos, body[0])

// chequea stock para definir qué productos se muestran sin stock
Funciones.chequearStock(productos)

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
        Funciones.chequearStock(productos)
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
        let contenido = botonTarget.parentNode.parentNode
        let div = contenido.childNodes[3];
        let texto = div.childNodes[1].textContent;
        let encontrado = productos.find( elemento => elemento.nombreProducto === texto);
        encontrado.agregar();
        //muestra una alerta que confirma que el producto fue agregado
        let contenedor = document.getElementById(`alertAgregado_${encontrado.nombreProducto}`);
        $(`<div class="alert alert-success" role="alert" id="alert_${encontrado.nombreProducto}">Producto agregado al carrito.</div>`).appendTo(contenedor).fadeIn(200).delay(1000).fadeOut(500);
        Funciones.chequearStock(productos);
    })
}









