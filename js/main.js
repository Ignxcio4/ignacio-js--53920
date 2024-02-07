// Definir opciones de automóviles con sus precios
const opcionesAutomoviles = [
    { nombre: "Automóvil Económico", precio: 10000 },
    { nombre: "Automóvil Estándar", precio: 20000 },
    { nombre: "Automóvil de Lujo", precio: 30000 }
];

function calcularCompra() {
    // Obtener el presupuesto del usuario
    const presupuesto = parseFloat(document.getElementById('budget').value);

    // Limpiar el resultado anterior
    document.getElementById('resultado').innerHTML = "";

    // Verificar si se ingresó un monto válido
    if (isNaN(presupuesto) || presupuesto <= 0) {
        mostrarResultado("Por favor, ingrese un monto válido.");
        return;
    }

    // Mostrar opciones de automóviles disponibles
    mostrarResultado("Opciones de Automóviles Disponibles:");
    opcionesAutomoviles.forEach((opcion, index) => {
        mostrarResultado(`<input type="radio" name="opcion" value="${index}"> ${opcion.nombre} - $${opcion.precio}`);
    });

    // Mostrar el botón para seleccionar
    mostrarResultado(`<button onclick="seleccionarAutomovil()">Seleccionar Automóvil</button>`);
}

function seleccionarAutomovil() {
    // Obtener la opción seleccionada por el usuario
    const seleccion = document.querySelector('input[name="opcion"]:checked');

    // Verificar si se seleccionó una opción
    if (!seleccion) {
        mostrarResultado("Por favor, seleccione un automóvil.");
        return;
    }

    // Obtener la información del automóvil seleccionado
    const opcionSeleccionada = opcionesAutomoviles[parseInt(seleccion.value)];

    // Mostrar el resultado detallado
    mostrarResultado(`<p>¡Felicidades! Puedes comprar un ${opcionSeleccionada.nombre} por $${opcionSeleccionada.precio}.</p>`);
    mostrarResultado("<p>Detalles del Automóvil:</p>");
    mostrarResultado(`<ul><li>Nombre: ${opcionSeleccionada.nombre}</li><li>Precio: $${opcionSeleccionada.precio}</li></ul>`);
}

function mostrarResultado(mensaje) {
    // Mostrar el resultado en el elemento con id 'resultado'
    document.getElementById('resultado').innerHTML += mensaje + "<br>";
}
