let usuario = prompt("Decime tu nombre");

let numeroA = parseInt(prompt("¡Hola " + usuario +"! Decime un número..."));

console.log(usuario + " eligió el número " + numeroA);

let iteraciones = parseInt(prompt("Elegí otro número"))

alert("Vamos a sumar el número " + numeroA + " esta cantidad de veces: " + iteraciones);

for (let i = 1; i <= iteraciones ; i++){
    let resultado = numeroA * i ;
    console.log(numeroA + " sumado " + i + " veces es:" + resultado)
}
alert (usuario + ": " + numeroA + " sumado " + iteraciones + " veces es: " + numeroA * iteraciones);