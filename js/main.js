// Codigo que se ejecuta cuando el contenido del DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // obtenemos referencias a los elementos del formulario y otros elementos 
    const tipoVehiculoSelect = document.getElementById('tipo');
    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const anioSelect = document.getElementById('anio');
    const seguroSelect = document.getElementById('seguro');
    const resultadoDiv = document.getElementById('resultado');
    const cotizacionResultado = document.getElementById('cotizacionResultado');
    const coberturaResultado = document.getElementById('coberturaResultado');

    // Definimos algunas opciones para tipos de vehículo y modelos por marca
    const marcasPorTipo = {
        auto: ["Toyota", "Honda", "Ford"],
        moto: ["Yamaha", "Suzuki", "Kawasaki"]
    };

    const modelosPorMarca = {
        Toyota: ["Corolla", "Yaris", "Camry"],
        Honda: ["Civic", "Accord", "CR-V"],
        Ford: ["Fiesta", "Focus", "Mustang"],
        Yamaha: ["YZF-R1", "MT-07", "FZ6R"],
        Suzuki: ["GSX-R750", "V-Strom 650", "Boulevard M109R"],
        Kawasaki: ["Ninja ZX-10R", "Versys 650", "Vulcan S"]
    };

    // Función para cargar opciones en un elemento select
    const cargarOpciones = (opciones, select) => {
        select.innerHTML = '';
        opciones.forEach(opcion => {
            const nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = opcion;
            nuevaOpcion.value = opcion;
            select.appendChild(nuevaOpcion);
        });
    };

    // Función para calcular la cotización del seguro, solo genera un numero aleatorio
    const calcularCotizacion = () => {
        return Math.floor(Math.random() * 1000) + 500;
    }

    // Función para obtener la cobertura elegida 
    const obtenerCobertura = () => {
        const tipoSeguro = seguroSelect.value;
        if (tipoSeguro === 'basico') {
            return 'Cobertura basica';
        } else if (tipoSeguro === 'completo') {
            return 'Cobertura Completa';
        }
        return 'Cobertura Desconocida';
    };

    // Función para guardar la cotización y cobertura en el almacenamiento local de nuestro navegador 
    const guardarCotizacionLocalStorage = (cotizacion, cobertura) => {
        localStorage.setItem('cotizacion', cotizacion);
        localStorage.setItem('cobertura', cobertura);
    };

    // Función para cargar la cotización y cobertura desde el almacenamiento local
    const cargarCotizacionDesdeLocalStorage = () => {
        const cotizacionGuardada = localStorage.getItem('cotizacion');
        const coberturaGuardada = localStorage.getItem('cobertura');
        if (cotizacionGuardada && coberturaGuardada) {
            cotizacionResultado.textContent = `La cotización para su seguro seleccionado es de $${cotizacionGuardada}`;
            coberturaResultado.textContent = `La cobertura seleccionada es: ${coberturaGuardada}`;
            resultadoDiv.style.display = 'block';
        }
    };

    // Función para cargar las opciones de años disponibles en el select de años
    const cargarAniosDisponibles = () => {
        const anioActual = new Date().getFullYear();
        const aniosDisponibles = [];
        for (let i = anioActual; i >= 2000; i--) {
            aniosDisponibles.push(i);
        }
        cargarOpciones(aniosDisponibles, anioSelect);
    };

    // Función para inicializar el formulario
    const inicializarFormulario = () => {
        cargarOpciones(marcasPorTipo['auto'], marcaSelect);
        cargarAniosDisponibles();
    };

    // Llamamos a la función para inicializar el formulario
    inicializarFormulario();

    // hacemos el cambio en el select de tipo de vehículo
    tipoVehiculoSelect.addEventListener('change', function() {
        const tipoSeleccionado = tipoVehiculoSelect.value;
        cargarOpciones(marcasPorTipo[tipoSeleccionado], marcaSelect);
    });

    // hacemos el cambio en el select de marca de vehículo
    marcaSelect.addEventListener('change', function() {
        const marcaSeleccionada = marcaSelect.value;
        cargarOpciones(modelosPorMarca[marcaSeleccionada], modeloSelect);
    });

    // hacemos el envío del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitamos que el formulario se envíe

        // Calculamos la cotización y obtenemos la cobertura seleccionada
        const cotizacion = calcularCotizacion();
        const cobertura = obtenerCobertura();

        // Mostramos la cotización y cobertura en la página
        cotizacionResultado.textContent = `La cotización para su seguro seleccionado es de $${cotizacion}`;
        coberturaResultado.textContent = `La cobertura seleccionada es: ${cobertura}`;
        resultadoDiv.style.display = 'block';

        // Guardamos la cotización y cobertura en el almacenamiento local
        guardarCotizacionLocalStorage(cotizacion, cobertura);
    });

    // Cargamos la cotización y cobertura desde el almacenamiento local al cargar la página
    cargarCotizacionDesdeLocalStorage();
});
