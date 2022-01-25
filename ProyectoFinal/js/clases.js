// declaraciones
let productos = [];
let carrito = [];
let carritoJSON = [];
let subtotal = 0;
let total = 0;
let itemsCarrito = 0;
let envioElegido = 0;


/////MODAL CARRITO/////
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
    //subtotal
    let subtotalCarrito = document.getElementById("subtotal");
    let contenidoSubtotal = document.createElement("h6");
    contenidoSubtotal.classList = "mt-2";
    contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
    subtotalCarrito.appendChild(contenidoSubtotal)
    // envio elegido
    let contenidoEnvios = document.getElementById("envios");
    // total
    let totalCarrito = document.getElementById("total");
    let contenidoTotal = document.createElement("h4");
    contenidoTotal.classList = "mt-3";
    contenidoTotal.textContent = `Total: $${total}`;
    totalCarrito.appendChild(contenidoTotal);

// Función para traer el carrito del local storage (la ejecuto al final del código)
const traerCarrito = () => {
    // Trae el carrito
    carritoGuardado = Funciones.traerLocalStorage("carritoUsuario");
    if (carritoGuardado != null && carritoGuardado.length > 0){
            carritoGuardado.forEach (producto => {
            carrito.push(producto);
            let subtotalProd = producto.precioProducto * producto.cantidad;
            producto.subtotalProducto = subtotalProd;
            let productoenCarrito = document.createElement("div");
                productoenCarrito.classList = "container-fluid";
                productoenCarrito.id = `cont_${producto.nombreProducto}`;
                productoenCarrito.innerHTML = `<div class="row border-bottom" id="enCarrito_${producto.nombreProducto}">
                                                <div class="col-3 mt-2 mb-2"><img src="../${producto.imagenProducto}" alt="${producto.nombreProducto}" class="img-fluid"></div>
                                                <div class="col-6">
                                                    <h5>${producto.nombreProducto}</h5>
                                                    <p class="mb-1">${producto.descripcionProducto}</p>
                                                    <p class="mb-1">Cantidad:</p>
                                                        <div class="input-group col-2 mb-2">
                                                            <button class="btn btn-sm btn-outline-secondary btnMenos" type="button" id="btnMenos_${producto.nombreProducto}">-</button>
                                                            <input type="number" class="form-control form-control-sm col-1 cantidad" id="cantidad_${producto.nombreProducto}" value="${producto.cantidad}" width="10px;">
                                                            <button class="btn btn-sm btn-outline-secondary btnMas" type="button" id="btnMas_${producto.nombreProducto}">+</button>
                                                        </div>
                                                </div>
                                                <div class="col-3 text-end">
                                                    <p id="subtotalProd_${producto.nombreProducto}">$${producto.subtotalProducto}</p>
                                                    <button class="btn btn-outline-secondary btnQuitar" type="button" id="btnQuitar_${producto.nombreProducto}">Quitar</button>
                                                </div>`
                subtotal += parseInt(producto.subtotalProducto);
                total += parseInt(producto.subtotalProducto);
                Funciones.guardarLocalStorage("Total" , parseInt(total));
                contenedorCarrito.appendChild(productoenCarrito);
                contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
                contenidoTotal.textContent = `Total: $${total}`;
            //Busca el nombre del producto en el carrito y descuenta stock en el array productos
            let encontrado = productos.find( elemento => elemento.nombreProducto === producto.nombreProducto)
            encontrado.stockProducto -= producto.cantidad;
                })
            //saco la alerta de carrito vacio
            if (carrito.length > 0) { 
                contenedorCarrito.removeChild(carritoVacio);
                for ( let boton of botonesEnvio){
                    boton.disabled = false;
                }
                botonCompraCarrito.disabled = false;
                }
            //actualizo subtotal, total e items en carrito
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            itemsCarrito = carrito.reduce(function(anterior, actual){
                return anterior + actual.cantidad;}, 0);;
            // Modificar el numero de items en el carrito en la barra de navegacion
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
            span.nodeValue = itemsCarrito;
            // busca el envio elegido y lo selecciona, actualizando el total
            let envioGuardado = envios.find(elemento => elemento.precioEnvio === Funciones.traerLocalStorage("Envio"))
            if (envioGuardado != undefined) {
            let tarjeta = document.getElementById(envioGuardado.tipoEnvio);
                    tarjeta.className = "card h-100 text-white bg-uno";
            envioElegido = envioGuardado.precioEnvio;
            total += envioElegido;
            Funciones.guardarLocalStorage("Total" , total)
            contenidoTotal.textContent = `Total: $${total}`;
            }    
    }


    
}

//Producto y métodos objeto producto
class Productos {

    constructor(nombreProducto, descripcionProducto, imagenProducto, releaseID, precioProducto, stockProducto, isNovedad){
        this.nombreProducto = nombreProducto;
        this.descripcionProducto = descripcionProducto;
        this.imagenProducto = imagenProducto;
        this.releaseID = releaseID;
        this.precioProducto = precioProducto;
        this.stockProducto = stockProducto;
        this.isNovedad = isNovedad;
    };
    agregar() {
        if (this.stockProducto > 0){
            // Actualizo el stock
            this.stockProducto -= 1;
            // Chequea si el producto ya existe en el carrito
            let encontrado = carrito.find(item => item.nombreProducto === this.nombreProducto && item.cantidad >= 1);
            //Si el producto existe:
            if(encontrado != undefined){
                //actualizo la cantidad en el array carrito
                encontrado.cantidad += 1;
                // actualizo subtotalProducto en el array carrito
                encontrado.subtotalProducto += this.precioProducto;
                //actualizo el carritoJSON y lo guardo en el local storage
                carritoJSON = Funciones.guardarLocalStorage("carritoUsuario", carrito)
                // cambio la cantidad en el modal carrito
                let cantidadCarrito = document.getElementById(`cantidad_${this.nombreProducto}`);
                cantidadCarrito.value = encontrado.cantidad;
                // actualizo el subtotal producto en el modal carrito
                let actualizarSubtotal = document.getElementById(`subtotalProd_${this.nombreProducto}`);
                actualizarSubtotal.innerText = `$${encontrado.subtotalProducto}`;
            }
            // Si el producto no existe:
            else {
                let item = {
                    nombreProducto: this.nombreProducto,
                    descripcionProducto: this.descripcionProducto,
                    imagenProducto: this.imagenProducto,
                    releaseID: this.releaseID,
                    precioProducto: this.precioProducto,
                    subtotalProducto: this.precioProducto,
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
                carritoJSON = Funciones.guardarLocalStorage("carritoUsuario", carrito)
                // crea y actualiza contenido dinámico en el modal de carrito
                let productoenCarrito = document.createElement("div");
                productoenCarrito.classList = "container-fluid";
                productoenCarrito.id = `cont_${this.nombreProducto}`;
                productoenCarrito.innerHTML = `<div class="row border-bottom" id="enCarrito_${this.nombreProducto}">
                                                    <div class="col-3 mt-2 mb-2"><img src="../${this.imagenProducto}" alt="${this.nombreProducto}" class="img-fluid"></div>
                                                    <div class="col-6">
                                                        <h5>${this.nombreProducto}</h5>
                                                        <p class="mb-1">${this.descripcionProducto}</p>
                                                        <p class="mb-1">Cantidad:</p>
                                                            <div class="input-group col-2 mb-2">
                                                                <button class="btn btn-sm btn-outline-secondary btnMenos" type="button" id="btnMenos_${this.nombreProducto}">-</button>
                                                                <input type="number" class="form-control form-control-sm col-1 cantidad" id="cantidad_${this.nombreProducto}" value="${item.cantidad}" width="10px;">
                                                                <button class="btn btn-sm btn-outline-secondary btnMas" type="button" id="btnMas_${this.nombreProducto}">+</button>
                                                            </div>
                                                    </div>
                                                    <div class="col-3 text-end">
                                                        <p id="subtotalProd_${this.nombreProducto}">$${item.subtotalProducto}</p>
                                                        <button class="btn btn-outline-secondary btnQuitar" type="button" id="btnQuitar_${this.nombreProducto}">Quitar</button>
                                                </div>`
                contenedorCarrito.appendChild(productoenCarrito);
                    // Agrego event handler para escuchar si se agregan, restan o quitan productos
                    let botonesMas = document.querySelectorAll(".btnMas")
                    let botonesMenos = document.querySelectorAll(".btnMenos")
                    let botonesQuitar = document.querySelectorAll(".btnQuitar")
                    // trackeo
                    for (let boton of botonesMas) {
                        boton.addEventListener( "click" , function(e){
                            let div = e.target.parentNode.parentNode
                            let productoCarrito = div.childNodes[1].textContent
                            let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
                            encontrado.agregar();
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
                                Funciones.chequearStock(productos);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
                                Funciones.chequearStock(novedades);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
                                stockDestacado(destacado);
                            }
                            if (this.stockProducto === 0 ) {
                                boton.disabled = true;
                                }
                        } );
                    }
                    for (let boton of botonesMenos) {
                        boton.addEventListener( "click" , function(e){
                            let div = e.target.parentNode.parentNode
                            let productoCarrito = div.childNodes[1].textContent
                            let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
                            encontrado.descontar()
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
                                Funciones.chequearStock(productos);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
                                Funciones.chequearStock(novedades);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
                                stockDestacado(destacado);
                            }
                        } );
                    }
                    // Boton Quitar
                    for (let boton of botonesQuitar) {
                        boton.addEventListener( "click" , function(e){
                            let div = e.target.parentNode.parentNode;
                            let divHijo = div.childNodes[3];
                            let productoCarrito = divHijo.childNodes[1].textContent;
                            let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
                            encontrado.quitar()
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
                                Funciones.chequearStock(productos);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
                                Funciones.chequearStock(novedades);
                            }
                            if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
                                stockDestacado(destacado);
                            }
                        } );
                    }
            }
            //actualizo subtotal, total e items en carrito
            subtotal += parseInt(this.precioProducto);
            total += parseInt(this.precioProducto);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            itemsCarrito += 1;
            // Modificar el numero de items en el carrito en la barra de navegacion
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
            span.nodeValue = itemsCarrito;
            // guardo en local storage
            Funciones.guardarLocalStorage("Subtotal", parseInt(subtotal));
            Funciones.guardarLocalStorage("Total", parseInt(total));
            
     }
     else {
         let cantidad = document.getElementById(`cantidad_${this.nombreProducto}`);
         let div = cantidad.parentNode.parentNode
         $(`<div class="alert alert-danger" role="alert" id="alert_${this.nombreProducto}">Máxima cantidad agregada</div>`).appendTo(div).fadeIn(200).delay(1000).fadeOut(500);
     }
};
    descontar() {
        // busco el producto en el carrito
        let encontrado = carrito.find(item => item.nombreProducto === this.nombreProducto && item.cantidad >= 1);
        //Si el producto existe:
        if(encontrado != undefined && encontrado.cantidad > 1){
            // Actualizo el stock
            this.stockProducto += 1;
            //actualizo la cantidad en el array carrito
            encontrado.cantidad -= 1;
            // cambio la cantidad en el modal carrito
            let cantidadCarrito = document.getElementById(`cantidad_${this.nombreProducto}`);
            cantidadCarrito.value = encontrado.cantidad;
            // actualizo subtotalProducto en el array carrito
            encontrado.subtotalProducto -= parseInt(this.precioProducto) ;
            let actualizarSubtotal = document.getElementById(`subtotalProd_${this.nombreProducto}`);
            actualizarSubtotal.innerText = `$${encontrado.subtotalProducto}`;
            // actualizo la cantida de items del carrito
            itemsCarrito -= 1;
            // actualizo el subtotal y total
            subtotal -= parseInt(this.precioProducto);
            total -= parseInt(this.precioProducto);
            contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
            contenidoTotal.textContent = `Total: $${total}`;
            //actualizo el carritoJSON y guardo todo en el local storage
            carritoJSON = Funciones.guardarLocalStorage("carritoUsuario", carrito)
            // guardo en local storage
            Funciones.guardarLocalStorage("Subtotal", parseInt(subtotal));
            Funciones.guardarLocalStorage("Total", parseInt(total));
            // Modificar el numero de items en el carrito en la barra de navegacion
            let badge = document.getElementById("itemCarrito");
            let span = badge.childNodes[0];
            span.nodeValue = itemsCarrito;   
            
        }
        else if(encontrado.cantidad = 1){
            let cantidad = document.getElementById(`cantidad_${this.nombreProducto}`);
            let div = cantidad.parentNode.parentNode;
         $(`<div class="alert alert-danger" role="alert" id="alert_${this.nombreProducto}">Utilice el botón Quitar</div>`).appendTo(div).fadeIn(200).delay(1000).fadeOut(500);
            let boton = document.getElementById(`btnMenos_${this.nombreProducto}`);
            boton.disabled = true;
        }
    }

    quitar() {
        // encontrar producto en el array carrito
        let encontrado = carrito.find(item => item.nombreProducto === this.nombreProducto);
        let encontradoIndex = carrito.indexOf(encontrado);
        let encontradoCantidad = encontrado.cantidad
        let encontradoSubtotal = encontrado.subtotalProducto
        // borro el producto del array carrito
        carrito.splice(encontradoIndex,1)
        itemsCarrito = carrito.reduce(function(anterior, actual){
            return anterior + actual.cantidad;}, 0);
        // devuelvo las cantidades al stock de producto
        this.stockProducto += encontradoCantidad;
        // actualizo subtotal y total
        subtotal -= encontradoSubtotal
        total -= encontradoSubtotal
        contenidoSubtotal.textContent =`Subtotal: $${subtotal}`;
        contenidoTotal.textContent = `Total: $${total}`;
        Funciones.guardarLocalStorage("Subtotal", parseInt(subtotal));
        Funciones.guardarLocalStorage("Total", parseInt(total));
        //guardo el carrito en el local storage
        carritoJSON = Funciones.guardarLocalStorage("carritoUsuario", carrito)
        // borro el producto del modal carrito
        let div = document.getElementById(`cont_${this.nombreProducto}`)
        div.parentNode.removeChild(div);
        // Modificar el numero de items en el carrito en la barra de navegacion
        let badge = document.getElementById("itemCarrito");
        let span = badge.childNodes[0];
        span.nodeValue = itemsCarrito; 
        // chequear si el carrito queda en cero
        if (carrito.length === 0) { 
            // vuelve a crear alerta de carrito vacio
            contenedorCarrito.appendChild(carritoVacio);
            // actualiza el total, devuelve el envio elegido a cero y deselecciona las tarjetas 
            total -= parseInt(envioElegido);
            envioElegido = 0;
            let tarjetas = document.getElementsByClassName("enviosCard");
            for (let tarjeta of tarjetas){
                tarjeta.className = "card enviosCard h-100 text-white bg-secondary";
            }
            contenidoTotal.textContent = `Total: $${total}`;
            Funciones.guardarLocalStorage("Total", parseInt(total));
            Funciones.guardarLocalStorage("Envio" , envioElegido)
            // deshabilita los botones de envio y de comprar
            for ( let boton of botonesEnvio){
                boton.disabled = true;
            }
            botonCompraCarrito.disabled = true;
            }
    }

};
class Funciones {

    static traerLocalStorage(key){
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    }

    static guardarLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    static calcularItems(carrito){
        carrito.reduce(function(anterior, actual){
            return anterior + actual.cantidad;}, 0);
    }

    static crearTarjetasProducto( array , contenedor) {
        array.forEach( producto => {
            let contenido = document.createElement("div")
            contenido.classList = "col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-2 mt-2"
            contenido.innerHTML =
            `<div class="card h-100" id="${producto.nombreProducto}">
                <img class="card-img-top" id="img_${producto.nombreProducto}" src="../${producto.imagenProducto}" alt="${producto.nombreProducto}">
                <div class="card-body d-flex flex-column" id="cardBody_${producto.nombreProducto}">
                    <h5 class="card-title producto__nombre text-black mt-2">${producto.nombreProducto}</h5>
                    <p class="card-text mt-auto">${producto.descripcionProducto}</p>
                    <p class="w-bold mt-auto precio">$${producto.precioProducto}</p>
                        <button class="btn btn-secondary mt-auto botonInfo mb-2" id="masinfo_${producto.releaseID}" type="button" data-bs-toggle="modal" data-bs-target="#Modal${producto.releaseID}">MAS INFO</button>
                        <button class="btn btn-friki mt-auto botonComprar" id="button_${producto.nombreProducto}" type="button">LO QUIERO</button>
                </div>
            </div>
        </div>`
            contenedor.appendChild(contenido)
        })
    }

    static crearModalProducto ( array , contenedor ){
        array.forEach( producto => {
            let contenido = document.createElement("div")
            contenido.innerHTML =
            `<div class="modal fade" id="Modal${producto.releaseID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Acerca de este disco</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>${producto.nombreProducto}</h3>
                    <img src="../${producto.imagenProducto}" class="img-fluid" id="imgModal_${producto.nombreProducto}">
                    <h5 class="mt-3">Información sobre el disco</h5>
                    <div id="infoDisco_${producto.nombreProducto}">
                    </div>
                    <h5 class="mt-3">Información sobre esta edición</h5>
                    <div id="infoEdicion_${producto.nombreProducto}">
                    </div>
                </div>
                <div class="modal-footer">
                    <div id="alertAgregado_${producto.nombreProducto}"></div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button class="btn btn-friki mt-auto botonComprarModal" type="button" id="comprarModal_${producto.nombreProducto}">LO QUIERO</button>
                </div>
                </div>
            </div>
        </div>`;
            contenedor.appendChild(contenido)
        })
    }
    static chequearStock( array ){
        for (let producto of array){
            if (producto.stockProducto === 0) {
                let imagenProducto = document.getElementById(`img_${producto.nombreProducto}`);
                imagenProducto.style.opacity = "50%";
                let imagenProductoModal = document.getElementById(`imgModal_${producto.nombreProducto}`)
                imagenProductoModal.style.opacity = "50%";
                let botonProducto = document.getElementById(`button_${producto.nombreProducto}`);
                botonProducto.classList = "btn btn-outline-dark mt-auto botonComprar";
                botonProducto.disabled = "true";
                botonProducto.textContent = "SIN STOCK";
                let botonProductoModal = document.getElementById(`comprarModal_${producto.nombreProducto}`)
                botonProductoModal.classList = "btn btn-outline-dark mt-auto botonComprarModal";
                botonProductoModal.disabled = "true";
                botonProductoModal.textContent = "SIN STOCK";
            }
            if (producto.stockProducto > 0) {
                let imagenProducto = document.getElementById(`img_${producto.nombreProducto}`);
                imagenProducto.style.opacity = "100%";
                let imagenProductoModal = document.getElementById(`imgModal_${producto.nombreProducto}`)
                imagenProductoModal.style.opacity = "100%";
                let botonProducto = document.getElementById(`button_${producto.nombreProducto}`);
                botonProducto.classList = "btn btn-friki mt-auto botonComprar";
                botonProducto.disabled = false;
                botonProducto.textContent = "LO QUIERO";
                let botonProductoModal = document.getElementById(`comprarModal_${producto.nombreProducto}`)
                botonProductoModal.classList = "btn btn-friki mt-auto botonComprarModal";
                botonProductoModal.disabled = false;
                botonProductoModal.textContent = "LO QUIERO";
            }
        }
    }

    static productoInfo(id , producto){
    let releaseID = id;
    //CONEXIÓN A LA API DE DISCOGS PARA BUSCAR LA INFO DE LA EDICIÓN
    let apiKey = "&token=BiFqmvtmZCztyNIOluyGTEuRUDrzsZXCBMyrvYUW";
    let url = "https://api.discogs.com//database/search?";
    let query = `release_id=${releaseID}`;
    let urlBusqueda = url+query+apiKey;
    $.get(urlBusqueda, function(release){
        let urlBusqueda2 = release.results[0].master_url;
        $.get(urlBusqueda2, function (masterRelease){
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
}


productos.push(new Productos("The Velvet Underground & Nico","Vinilo 12 pulg.","images/velvet_banana.png",21428521,5200,2,false))
productos.push(new Productos("Blur - Blur","Vinilo 12 pulg.","images/Blur-blur.png",15875347,5000,1,true))
productos.push(new Productos("The Stone Roses - The Stone Roses","Vinilo 12 pulg.","images/stone-roses.png",11638787,4500,1,false))
productos.push(new Productos("Arcade Fire - Neon Bible","Vinilo 12 pulg. doble","images/arcade-fire-neon-bible.png",11212072,5600,1,true))
productos.push(new Productos("Daft Punk - Random Access Memories","Vinilo 12 pulg. doble","images/daft-punk-ram.png",19574308,6500,1,false))
productos.push(new Productos("DIIV - Is The Is Are","Vinilo 12 pulg. doble","images/diiv-is-the-is-are.png",8040863,5500,1,true))
productos.push(new Productos("Black Marble - Fast Idol","Vinilo 12 pulg.","images/Black marble fast idol.png",20690938,5800,1,true))
productos.push(new Productos("Daft Punk - Daft Club","Vinilo 12 pulg. doble","images/daft-club.png",5904055,5600,1,false))
productos.push(new Productos("Dinosaur Jr. - Sweep it into Space","Vinilo 12 pulg. color","images/dinosaur jr sweep it into space.png",18280303,6000,1,false))
productos.push(new Productos("Molchat Doma - Etazhi","Vinilo 12 pulg. color","images/molchat doma etazhi.png",20103439,5800,1,false))
productos.push(new Productos("Pixies - Indie Cindy","Vinilo 12 pulg.","images/pixies.png",5781271,5400,1,false))
productos.push(new Productos("Tame Impala - Currents","Vinilo 12 pulg. doble","images/tame-impala-currents.png",7252111,5900,1,false))


class Envio {
    
    constructor(tipoEnvio, precioEnvio , descripcionEnvio){
        this.tipoEnvio = tipoEnvio;
        this.precioEnvio = precioEnvio;
        this.descripcionEnvio = descripcionEnvio;
    };

    agregar() {
        //actualiza totales en relacion al envio elegido
        total -= envioElegido;
        envioElegido = this.precioEnvio;
        total += envioElegido;
        contenidoTotal.textContent = `Total: $${total}`;
        Funciones.guardarLocalStorage("Envio", parseInt(envioElegido));
        Funciones.guardarLocalStorage("Total", parseInt(total));
        colorear();
    }
}

// Array de envios
const envios = [];
envios.push(new Envio("Retiro por el local", 0, "Pasá a retirar tu disco por el local."));
envios.push(new Envio("Envío Estándar", 300, "Envío a todo el país. Demora: 5-7 días hábiles."));
envios.push(new Envio("Envío Rápido", 600, "Envío a todo el país. Demora: 1-2 días hábiles."));

///// CONTENIDO ENVIOS DENTRO DE MODAL CARRITO /////
//crea una tarjeta por cada tipo de envio del array envios y la inserta en el modal de carrito
envios.forEach( envio => {
    $("#containerEnvios").append(
            `<div class="col">
                <div class="card enviosCard h-100 text-white bg-secondary" id="${envio.tipoEnvio}">
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

    // botones de envio
    let botonesEnvio = $(".botonEnvio")
    // deshabilitar los botones si no hay productos elegidos
    for ( let boton of botonesEnvio){
        boton.disabled = true;
    }
    // trackeo de botones envio
    botonesEnvio.click(function(e){
        let botonTarget = e.target;
        let textoTarget = botonTarget.parentNode.parentNode;
        let envioCarrito = textoTarget.querySelector("h5").textContent;
        let encontrado = envios.find( elemento => elemento.tipoEnvio === envioCarrito );
        encontrado.agregar();
    });


// recorre el arreglo para colorear la tarjeta del envio elegido y volver a gris las otras
function colorear(){
    envios.forEach( envio => {
        if (envio.precioEnvio == envioElegido) {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card enviosCard h-100 text-white bg-uno";
        }
        else {
        let tarjeta = document.getElementById(envio.tipoEnvio);
        tarjeta.className = "card enviosCard h-100 text-white bg-secondary";
        }
    })
}


traerCarrito();


///// BOTONES +, - y "Quitar" en el carrito ///

// Boton +
let botonesMas = document.querySelectorAll(".btnMas")
// trackeo
for (let boton of botonesMas) {
    boton.addEventListener( "click" , function(e){
        let div = e.target.parentNode.parentNode
        let productoCarrito = div.childNodes[1].textContent
        let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
        encontrado.agregar()
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
            Funciones.chequearStock(productos);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
            Funciones.chequearStock(novedades);
        }
        if (encontrado.stockProducto === 0 ) {
        boton.disabled = true;
        }
    } );
}
// Boton -
let botonesMenos = document.querySelectorAll(".btnMenos")
// trackeo botón -
for (let boton of botonesMenos) {
    boton.addEventListener( "click" , function(e){
        let div = e.target.parentNode.parentNode;
        let productoCarrito = div.childNodes[1].textContent;
        let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
        encontrado.descontar()
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
            Funciones.chequearStock(productos);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
            Funciones.chequearStock(novedades);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
            Funciones.chequearStock(novedades);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
            stockDestacado(destacado);
        }
    } );
}
// Boton Quitar
let botonesQuitar = document.querySelectorAll(".btnQuitar")
// trackeo botón -
for (let boton of botonesQuitar) {
    boton.addEventListener( "click" , function(e){
        let div = e.target.parentNode.parentNode;
        let divHijo = div.childNodes[3];
        productoCarrito = divHijo.childNodes[1].textContent;
        console.log(productoCarrito)
        let encontrado = productos.find( elemento => elemento.nombreProducto === productoCarrito);
        encontrado.quitar()
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
            Funciones.chequearStock(productos);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
            Funciones.chequearStock(novedades);
        }
        if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
            stockDestacado(destacado);
        }
    } );
}
//// Boton Quitar
let botonVaciar = document.getElementById("vaciar")
// trackeo botón vaciar
botonVaciar.addEventListener( "click" , function(){
    carrito.forEach( producto => {
        // identifico cantidad
        let cantidad = producto.cantidad
        // encontrar producto en el array productos y devolver stock
        let encontrado = productos.find(item => item.nombreProducto === producto.nombreProducto);
        encontrado.stockProducto += cantidad
        // borro el div del producto en el modal
        let div = document.getElementById(`cont_${producto.nombreProducto}`)
        div.remove();
    })
    // vacío el array carrito
    carrito = []
    // vuelvo todo a cero
    itemsCarrito = 0;
    subtotal = 0;
    total = 0;
    envioElegido = 0;
    // guardo todo en el localStorage
    Funciones.guardarLocalStorage("Subtotal", 0);
    Funciones.guardarLocalStorage("Total", 0);
    Funciones.guardarLocalStorage("Envio" , envioElegido);
    Funciones.guardarLocalStorage("carritoUsuario" , carrito);
    // actualizo total ys subtotal
    contenidoSubtotal.textContent = `Subtotal: $0`;
    contenidoTotal.textContent = `Total: $0`;
    // vuelve a crear alerta de carrito vacio
    contenedorCarrito.appendChild(carritoVacio);
    // deshabilita los botones de envio y de comprar
    let tarjetas = document.getElementsByClassName("enviosCard");
            for (let tarjeta of tarjetas){
                tarjeta.className = "card enviosCard h-100 text-white bg-secondary";
            }
    for ( let boton of botonesEnvio){
        boton.disabled = true;
    }
    botonCompraCarrito.disabled = true;
    if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Catálogo de discos"){
        Funciones.chequearStock(productos);
    }
    if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Tienda de Música Independiente"){
        Funciones.chequearStock(novedades);
    }
    if ( document.getElementsByTagName("title")[0].innerText === "Friki Discos - Destacado"){
        stockDestacado(destacado);
    }
    // Modificar el numero de items en el carrito en la barra de navegacion
    let badge = document.getElementById("itemCarrito");
    let span = badge.childNodes[0];
    span.nodeValue = itemsCarrito; 
});
