//el usu<rio ingresa su nombre 
let nombreUsuario = prompt("Por favor, ingresa tu nombre:");

let respuestaUsuario = prompt("Hola " + nombreUsuario + ", ¿eres profesor? (responde sí o no)");

if (respuestaUsuario.toLowerCase() === "sí") {
  console.log("¡Bienvenido, " + nombreUsuario + "! Ahora puedes corregir.");
} else {
  console.log("Lo siento, " + nombreUsuario + ", no puedes realizar la corrección.");
}

function obtenerPrecioAuto(marca, año) {
  // colocamos diferentes precios y años 
  let precios = {
    toyota: { 2022: 25000, 2023: 27000, 2024: 29000 },
    honda: { 2022: 23000, 2023: 25000, 2024: 27000 },
    ford: { 2022: 27000, 2023: 29000, 2024: 31000 }
  };

  // no fijamos si la marca y año colocada estan en la lista
  if (precios[marca] && precios[marca][año]) {
    return precios[marca][año];
  } else {
    return null; // nos avisa si la marca y el año no son encontrados 
  }
}

function solicitarInformacionAuto() {
  let marca = prompt("Ingresa la marca del auto (toyota, honda, ford):").toLowerCase();
  let año = parseInt(prompt("Ingresa el año del auto:"));

  return { marca, año };
}

function mostrarInformacionAuto(auto) {
  console.log("Información del auto:");
  console.log("Marca: " + auto.marca);
  console.log("Año: " + auto.año);
}

function simuladorCompraAuto() {
  let autoElegido = solicitarInformacionAuto();
  let precioAuto = obtenerPrecioAuto(autoElegido.marca, autoElegido.año);

  if (precioAuto !== null) {
    autoElegido.precio = precioAuto;
    mostrarInformacionAuto(autoElegido);

    let deseaComprar = confirm("¿Deseas comprar este auto por $" + precioAuto.toFixed(2) + "?");
    
    if (deseaComprar) {
      let presupuesto = parseFloat(prompt("Ingresa tu presupuesto para la compra:"));

      if (presupuesto >= precioAuto) {
        console.log("¡Felicidades! Has comprado el auto. ¡Disfrútalo!");
      } else {
        console.log("Lo siento, no tienes suficiente presupuesto para este auto.");
      }
    } else {
      console.log("Gracias por visitarnos. ¡Hasta luego!");
    }
  } else {
    console.log("Lo sentimos, no tenemos información para la marca o año especificados.");
  }
}

simuladorCompraAuto();
console.log("fin del proceso")