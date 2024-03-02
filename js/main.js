// iniciamos para que el usuario siga cotizando
let seguirCotizando = true;

// definimos las marcas y modelos de autos permitidos 
const modelosPermitidos = {
  toyota: ["corolla", "camry", "rav4", "hilux"],
  honda: ["civic", "accord", "cr-v"],
  ford: ["focus", "fusion", "escape"],
  chevrolet: ["malibu", "cruze", "equinox"],
  volkswagen: ["jetta", "passat", "tiguan"],
  bmw: ["3 series", "5 series", "x3"]
};

// definimos los diferentes seguros y los descuentos que se hacen 
const seguros = {
  opciones: {
    basico: { nombre: "Básico", cobertura: "Responsabilidad civil", precio: 12000 },  
    intermedio: { nombre: "Intermedio", cobertura: "Robo y daños parciales", precio: 15000 },  
    completo: { nombre: "Completo", cobertura: "Cobertura completa", precio: 20000 },  
    premium: { nombre: "Premium", cobertura: "Cobertura completa + Asistencia en carretera", precio: 28000 }  
  },
  descuentoProfesor: 0.1,
  descuentoAnioAntiguedad: 0.05
};

// funcion para validar la respuesta del usuario 
function validarRespuesta(pregunta, opciones, callback) {
  let respuestaUsuario = prompt(pregunta).toLowerCase();

  if (opciones.includes(respuestaUsuario)) {
    callback(respuestaUsuario);
  } else {
    console.log("Respuesta no válida. Por favor, intenta de nuevo.");
    validarRespuesta(pregunta, opciones, callback);
  }
}

// solicitamos el nombre del usuario 
let nombreUsuario = prompt("Por favor, ingresa tu nombre:");

// bucle principal para la cotizacion 
while (seguirCotizando) {
  // verificamos si el usuario es profesor o no 
  validarRespuesta("Hola " + nombreUsuario + ", ¿eres profesor?", ["si", "no"], (respuesta) => {
    let descuento = 0;

    if (respuesta === "si") {
      console.log("¡Bienvenido, " + nombreUsuario + "! Como profesor, obtienes un 10% de descuento.");
      descuento += seguros.descuentoProfesor;
    } else {
      console.log("Lo siento, " + nombreUsuario + ", no obtienes descuento como profesor.");
    }

    // solicitamos información del auto y tipo de seguro
    let autoElegido = solicitarInformacionAuto();
    let tipoSeguroElegido = solicitarTipoSeguro();

    // calculamos el precio del seguro y mostramos información al usuario
    let precioSeguro = calcularPrecioSeguro(autoElegido.marca, autoElegido.modelo, autoElegido.año, tipoSeguroElegido, descuento);

    if (precioSeguro !== null) {
      mostrarInformacionSeguro(autoElegido, tipoSeguroElegido, precioSeguro);

      // consulta al usuario si quiere cotizar otro seguro mas 
      let deseaCotizar = confirm("¿Quieres cotizar otro seguro?");
      seguirCotizando = deseaCotizar;
    } else {
      console.log("Lo sentimos, no tenemos información para la marca, modelo o año especificados.");
    }
  });
}

// mensaje para avisar de la finalizacion de la cotizacion 
console.log("Fin del proceso de cotización de seguros");

// calculamos el precio del seguro con una funcion 
function calcularPrecioSeguro(marca, modelo, año, tipoSeguro, descuento) {
  if (modelosPermitidos[marca] && modelosPermitidos[marca].includes(modelo) && seguros.opciones[tipoSeguro]) {
    let antiguedad = new Date().getFullYear() - año;
    let precioBase = seguros.opciones[tipoSeguro].precio;

    // aplicamos descuento por la antiguedad del auto 
    let descuentoAntiguedad = antiguedad * seguros.descuentoAnioAntiguedad;
    let precioConDescuento = precioBase - (precioBase * descuentoAntiguedad);

    // Aplicar descuento adicional 
    let precioFinal = precioConDescuento - (precioConDescuento * descuento);


    return precioFinal;
  } else {
    return null;
  }
}

// Funcion para solicitar información sobre el auto al usuario
function solicitarInformacionAuto() {
  let marca = null;
  let modelo = null;

  // Validamos la marca del auto
  validarRespuesta("Ingresa la marca del auto (toyota, honda, ford):", Object.keys(modelosPermitidos), (respuesta) => {
    marca = respuesta;

    // Validamos el modelo del auto
    validarRespuesta("Ingresa el modelo del auto (" + modelosPermitidos[marca].join(", ") + "):", modelosPermitidos[marca], (respuestaModelo) => {
      modelo = respuestaModelo;
    });
  });

  // obtenemos el año del auto 
  let año = parseInt(prompt("Ingresa el año del auto:"));
  return { marca, modelo, año };
}

// funcion para que el usuario elija el tipo de seguro 
function solicitarTipoSeguro() {
  let opcionesSeguro = Object.keys(seguros.opciones);
  let mensajeOpciones = opcionesSeguro.map(opcion => `${opcion} - ${seguros.opciones[opcion].nombre}`).join("\n");
  let tipoSeguro = null;

  // Validamos el tipo de seguro
  validarRespuesta("Selecciona el tipo de seguro:\n" + mensajeOpciones, opcionesSeguro, (respuestaTipoSeguro) => {
    tipoSeguro = respuestaTipoSeguro;
  });

  return tipoSeguro;
}

// mostramos los datos del seguro al usuario 
function mostrarInformacionSeguro(auto, tipoSeguro, precioSeguro) {
  console.log("Información del seguro:");
  console.log("Marca: " + auto.marca);
  console.log("Modelo: " + auto.modelo);
  console.log("Año: " + auto.año);
  console.log("Tipo de seguro: " + seguros.opciones[tipoSeguro].nombre);
  console.log("Cobertura: " + seguros.opciones[tipoSeguro].cobertura);
  console.log("Precio del seguro: $" + precioSeguro.toFixed(2));
}
