let numeroA = prompt("Elegí un número del 1 al 10");
numeroA = parseInt(numeroA)

if ( numeroA >= 1 && numeroA <= 10){

    alert("El número elegido es el: " + numeroA);

}
else {
    alert("ERROR: El numero elegido no está entre 1 y 10");
}

let color = prompt("Elegí cualquier color menos rojo");

if ( color == ("rojo" || "ROJO") ){

    alert ("¡Te dije que no eligieras rojo!");

}
else if ( color == ("amarillo" || "AMARILLO")){
    alert("No me gusta el amarillo.");
}
else {
    alert ("¡El " + color + " es un lindo color!");
}