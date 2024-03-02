// Inicialización de la bandera para seguir cotizando
let seguirCotizando = true;

// Definición de modelos de autos permitidos con algunos cambios
const modelosPermitidos = {
  toyota: ["corolla", "camry", "rav4", "hilux"],
  honda: ["civic", "accord", "cr-v"],
  ford: ["focus", "fusion", "escape"],
  chevrolet: ["malibu", "cruze", "equinox"],
  volkswagen: ["jetta", "passat", "tiguan"],
  bmw: ["3 series", "5 series", "x3"]
};

// Definición de opciones de seguros y descuentos
const seguros = {
  opciones: {
    basico: { nombre: "Básico", cobertura: "Responsabilidad civil", precio: 1200 },  // Se aumentó el precio base
    intermedio: { nombre: "Intermedio", cobertura: "Robo y daños parciales", precio: 1500 },  // Se aumentó el precio base
    completo: { nombre: "Completo", cobertura: "Cobertura completa", precio: 2000 },  // Se aumentó el precio base
    premium: { nombre: "Premium", cobertura: "Cobertura completa + Asistencia en carretera", precio: 2800 }  // Se aumentó el precio base
  },
  descuentoProfesor: 0.1,
  descuentoAnioAntiguedad: 0.05
};

// Función de validación de respuestas del usuario
function validarRespuesta(pregunta, opciones, callback) {
  let respuestaUsuario = prompt(pregunta).toLowerCase();

  if (opciones.includes(respuestaUsuario)) {
    callback(respuestaUsuario);
  } else {
    console.log("Respuesta no válida. Por favor, intenta de nuevo.");
    validarRespuesta(pregunta, opciones, callback);
  }
}

// Solicitud del nombre del usuario
let nombreUsuario = prompt("Por favor, ingresa tu nombre:");

// Bucle principal para cotizar seguros
while (seguirCotizando) {
  // Verificación si el usuario es profesor
  validarRespuesta("Hola " + nombreUsuario + ", ¿eres profesor?", ["si", "no"], (respuesta) => {
    let descuento = 0;

    if (respuesta === "si") {
      console.log("¡Bienvenido, " + nombreUsuario + "! Como profesor, obtienes un 10% de descuento.");
      descuento += seguros.descuentoProfesor;
    } else {
      console.log("Lo siento, " + nombreUsuario + ", no obtienes descuento como profesor.");
    }

    // Solicitud de información del auto y tipo de seguro
    let autoElegido = solicitarInformacionAuto();
    let tipoSeguroElegido = solicitarTipoSeguro();

    // Cálculo del precio del seguro y mostrar información al usuario
    let precioSeguro = calcularPrecioSeguro(autoElegido.marca, autoElegido.modelo, autoElegido.año, tipoSeguroElegido, descuento);

    if (precioSeguro !== null) {
      mostrarInformacionSeguro(autoElegido, tipoSeguroElegido, precioSeguro);

      // Preguntar al usuario si desea cotizar otro seguro
      let deseaCotizar = confirm("¿Quieres cotizar otro seguro?");
      seguirCotizando = deseaCotizar;
    } else {
      console.log("Lo sentimos, no tenemos información para la marca, modelo o año especificados.");
    }
  });
}

// Mensaje de fin del proceso de cotización de seguros
console.log("Fin del proceso de cotización de seguros");

// Función para calcular el precio del seguro
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

// Función para solicitar información sobre el auto al usuario
function solicitarInformacionAuto() {
  let marca = null;
  let modelo = null;

  // Validar la marca del auto
  validarRespuesta("Ingresa la marca del auto (toyota, honda, ford):", Object.keys(modelosPermitidos), (respuesta) => {
    marca = respuesta;

    // Validar el modelo del auto
    validarRespuesta("Ingresa el modelo del auto (" + modelosPermitidos[marca].join(", ") + "):", modelosPermitidos[marca], (respuestaModelo) => {
      modelo = respuestaModelo;
    });
  });

  // Obtener el año del auto
  let año = parseInt(prompt("Ingresa el año del auto:"));
  return { marca, modelo, año };
}

// Función para solicitar al usuario seleccionar el tipo de seguro
function solicitarTipoSeguro() {
  let opcionesSeguro = Object.keys(seguros.opciones);
  let mensajeOpciones = opcionesSeguro.map(opcion => `${opcion} - ${seguros.opciones[opcion].nombre}`).join("\n");
  let tipoSeguro = null;

  // Validar el tipo de seguro
  validarRespuesta("Selecciona el tipo de seguro:\n" + mensajeOpciones, opcionesSeguro, (respuestaTipoSeguro) => {
    tipoSeguro = respuestaTipoSeguro;
  });

  return tipoSeguro;
}

// Función para mostrar la información del seguro al usuario
function mostrarInformacionSeguro(auto, tipoSeguro, precioSeguro) {
  console.log("Información del seguro:");
  console.log("Marca: " + auto.marca);
  console.log("Modelo: " + auto.modelo);
  console.log("Año: " + auto.año);
  console.log("Tipo de seguro: " + seguros.opciones[tipoSeguro].nombre);
  console.log("Cobertura: " + seguros.opciones[tipoSeguro].cobertura);
  console.log("Precio del seguro: $" + precioSeguro.toFixed(2));
}
