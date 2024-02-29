let seguirCotizando = true;

const modelosPermitidos = {
  toyota: ["corolla", "camry", "rav4"],
  honda: ["civic", "accord", "cr-v"],
  ford: ["focus", "fusion", "escape"]
};

const seguros = {
  opciones: {
    basico: { nombre: "Básico", cobertura: "Responsabilidad civil", precio: 800 },
    intermedio: { nombre: "Intermedio", cobertura: "Robo y daños parciales", precio: 1200 },
    completo: { nombre: "Completo", cobertura: "Cobertura completa", precio: 1800 },
    premium: { nombre: "Premium", cobertura: "Cobertura completa + Asistencia en carretera", precio: 2500 }
  },
  descuentoProfesor: 0.1,
  descuentoAnioAntiguedad: 0.05
};

function validarRespuesta(pregunta, opciones, callback) {
  let respuestaUsuario = prompt(pregunta).toLowerCase();

  if (opciones.includes(respuestaUsuario)) {
    callback(respuestaUsuario);
  } else {
    console.log("Respuesta no válida. Por favor, intenta de nuevo.");
    validarRespuesta(pregunta, opciones, callback);
  }
}

let nombreUsuario = prompt("Por favor, ingresa tu nombre:");

while (seguirCotizando) {
  validarRespuesta("Hola " + nombreUsuario + ", ¿eres profesor?", ["si", "no"], (respuesta) => {
    let descuento = 0;

    if (respuesta === "si") {
      console.log("¡Bienvenido, " + nombreUsuario + "! Como profesor, obtienes un 10% de descuento.");
      descuento += seguros.descuentoProfesor;
    } else {
      console.log("Lo siento, " + nombreUsuario + ", no obtienes descuento como profesor.");
    }

    let autoElegido = solicitarInformacionAuto();
    let tipoSeguroElegido = solicitarTipoSeguro();

    let precioSeguro = calcularPrecioSeguro(autoElegido.marca, autoElegido.modelo, autoElegido.año, tipoSeguroElegido, descuento);

    if (precioSeguro !== null) {
      mostrarInformacionSeguro(autoElegido, tipoSeguroElegido, precioSeguro);

      let deseaCotizar = confirm("¿Quieres cotizar otro seguro?");
      seguirCotizando = deseaCotizar;
    } else {
      console.log("Lo sentimos, no tenemos información para la marca, modelo o año especificados.");
    }
  });
}

console.log("Fin del proceso de cotización de seguros");

function calcularPrecioSeguro(marca, modelo, año, tipoSeguro, descuento) {
  if (modelosPermitidos[marca] && modelosPermitidos[marca].includes(modelo) && seguros.opciones[tipoSeguro]) {
    let antiguedad = new Date().getFullYear() - año;
    let precioBase = seguros.opciones[tipoSeguro].precio;

    // Aplicar descuento por antigüedad
    let descuentoAntiguedad = antiguedad * seguros.descuentoAnioAntiguedad;
    let precioConDescuento = precioBase - (precioBase * descuentoAntiguedad);

    // Aplicar descuento adicional (si hay)
    let precioFinal = precioConDescuento - (precioConDescuento * descuento);

    return precioFinal;
  } else {
    return null;
  }
}

function solicitarInformacionAuto() {
  let marca = null;
  let modelo = null;

  validarRespuesta("Ingresa la marca del auto (toyota, honda, ford):", Object.keys(modelosPermitidos), (respuesta) => {
    marca = respuesta;

    validarRespuesta("Ingresa el modelo del auto (" + modelosPermitidos[marca].join(", ") + "):", modelosPermitidos[marca], (respuestaModelo) => {
      modelo = respuestaModelo;
    });
  });

  let año = parseInt(prompt("Ingresa el año del auto:"));
  return { marca, modelo, año };
}

function solicitarTipoSeguro() {
  let opcionesSeguro = Object.keys(seguros.opciones);
  let mensajeOpciones = opcionesSeguro.map(opcion => `${opcion} - ${seguros.opciones[opcion].nombre}`).join("\n");
  let tipoSeguro = null;

  validarRespuesta("Selecciona el tipo de seguro:\n" + mensajeOpciones, opcionesSeguro, (respuestaTipoSeguro) => {
    tipoSeguro = respuestaTipoSeguro;
  });

  return tipoSeguro;
}

function mostrarInformacionSeguro(auto, tipoSeguro, precioSeguro) {
  console.log("Información del seguro:");
  console.log("Marca: " + auto.marca);
  console.log("Modelo: " + auto.modelo);
  console.log("Año: " + auto.año);
  console.log("Tipo de seguro: " + seguros.opciones[tipoSeguro].nombre);
  console.log("Cobertura: " + seguros.opciones[tipoSeguro].cobertura);
  console.log("Precio del seguro: $" + precioSeguro.toFixed(2));
}
