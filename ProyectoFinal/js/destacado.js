// DEFINO EL PRODUCTO DESTACADO
let idDestacado = 21428521;
let productoDestacado = productos.find( elemento => elemento.releaseID === idDestacado);
let destacado = [];
destacado = productoDestacado;

///// GENERO EL CONTENIDO DINAMICAMENTE
// modifico el titulo de la página dinámicamente
let titulo = document.getElementById("destacadoTitulo");
titulo.textContent = destacado.nombreProducto;
titulo.style.textTransform = "uppercase";
// modifico la imagen del producto
let imagen = document.getElementById("imagen__destacado");
imagen.src = `../${destacado.imagenProducto}`
// modifico el precio y trackeo el botón LO QUIERO
let precio = document.getElementsByClassName("precio")[0];
precio.textContent = `$${destacado.precioProducto}`;
let botonCompra = document.getElementById("btnComprarDestacado")
botonCompra.addEventListener("click", function(e){
    productoDestacado.agregar();
    stockDestacado(destacado)
})
// CONTENIDO GENERADO CON LA API DE DISCOGS
destacadoInfo()

// Chequea el stock para ver si habilita o no el botón LO QUIERO
stockDestacado(destacado)

/// FUNCIONES
function stockDestacado (producto){
    if (producto.stockProducto === 0) {
        botonCompra.classList = "btn btn-outline-dark mb-3";
        botonCompra.disabled = "true";
        botonCompra.textContent = "SIN STOCK";
    }
    if (producto.stockProducto > 0) {
        botonCompra.classList = "btn btn-friki mb-3";
        botonCompra.disabled = false;
        botonCompra.textContent = "LO QUIERO";
    }
}

function destacadoInfo(){
    let releaseID = destacado.releaseID;
    let producto = destacado;
    //CONEXIÓN A LA API DE DISCOGS PARA BUSCAR LA INFO DE LA EDICIÓN
    let apiKey = "&token=BiFqmvtmZCztyNIOluyGTEuRUDrzsZXCBMyrvYUW";
    let url = "https://api.discogs.com//database/search?";
    let query = `release_id=${releaseID}`;
    let urlBusqueda = url+query+apiKey;
    $.get(urlBusqueda, function(release){
        let urlBusqueda2 = release.results[0].master_url;
        $.get(urlBusqueda2, function (masterRelease){
            // creo una tabla para la info general
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
            // creo una tabla para los temas del disco
            let tablaTemas = document.createElement("table");
            tablaTemas.classList = "table table-striped";
            let thead = document.createElement("thead");
            let hPosition = document.createElement("th");
            hPosition.textContent = "#";
            let hTrackname = document.createElement("th");
            hTrackname.textContent = "Nombre";
            let hDuration = document.createElement("th");
            hDuration.textContent = "Duración"
            thead.appendChild(hPosition);
            thead.appendChild(hTrackname);
            thead.appendChild(hDuration);
            tablaTemas.appendChild(thead)
            let body = document.createElement("tbody")
            tablaTemas.append(body);
            // consigo la lista de temas
            let tracklist = masterRelease.tracklist
            // creo una fila por cada tema y la agrego a la tabla
            tracklist.forEach( track => {
                
                let tableRow = document.createElement("tr");
                let position = document.createElement("th");
                position.scope = "row";
                position.textContent = `${track.position}`
                let trackname = document.createElement("td");
                trackname.textContent = `${track.title}`;
                let duration = document.createElement("td");
                duration.textContent = `(${track.duration})`;
                tableRow.appendChild(position)
                tableRow.appendChild(trackname)
                tableRow.appendChild(duration)
                body.append(tableRow)
            })
            let contenedorDisco = document.getElementById("infoDisco_destacado")
            contenedorDisco.innerHTML = "";
            contenedorDisco.appendChild(tablaInfo);
            let listaTemas = document.createElement("h5");
            listaTemas.textContent = "Lista de temas";
            contenedorDisco.appendChild(listaTemas)
            contenedorDisco.appendChild(tablaTemas);
            })
            let contenedorEdicion = document.getElementById(`infoEdicion_destacado`)
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


    })
}
