document.addEventListener('DOMContentLoaded', function() {
  const tipoVehiculoSelect = document.getElementById('tipo');
  const marcaSelect = document.getElementById('marca');
  const modeloSelect = document.getElementById('modelo');
  const anioSelect = document.getElementById('anio');
  const seguroSelect = document.getElementById('seguro');
  const resultadoDiv = document.getElementById('resultado');
  const cotizacionResultado = document.getElementById('cotizacionResultado');
  const coberturaResultado = document.getElementById('coberturaResultado');

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

  const cargarOpciones = (opciones, select) => {
      select.innerHTML = '';
      opciones.forEach(opcion => {
          const nuevaOpcion = document.createElement('option');
          nuevaOpcion.text = opcion;
          nuevaOpcion.value = opcion;
          select.appendChild(nuevaOpcion);
      });
  };

  const calcularCotizacion = () => {
      // Lógica de cálculo de cotización aquí
      // En este ejemplo, simplemente se genera un número aleatorio entre 500 y 1500
      return Math.floor(Math.random() * 1000) + 500;
  };

  const obtenerCobertura = () => {
      const tipoSeguro = seguroSelect.value;
      if (tipoSeguro === 'basico') {
          return 'Cobertura Básica';
      } else if (tipoSeguro === 'completo') {
          return 'Cobertura Completa';
      }
      return 'Cobertura Desconocida';
  };

  const guardarCotizacionLocalStorage = (cotizacion, cobertura) => {
      localStorage.setItem('cotizacion', cotizacion);
      localStorage.setItem('cobertura', cobertura);
  };

  const cargarCotizacionDesdeLocalStorage = () => {
      const cotizacionGuardada = localStorage.getItem('cotizacion');
      const coberturaGuardada = localStorage.getItem('cobertura');
      if (cotizacionGuardada && coberturaGuardada) {
          cotizacionResultado.textContent = `La cotización para su seguro seleccionado es de $${cotizacionGuardada}`;
          coberturaResultado.textContent = `La cobertura seleccionada es: ${coberturaGuardada}`;
          resultadoDiv.style.display = 'block';
      }
  };

  const cargarAniosDisponibles = () => {
      const anioActual = new Date().getFullYear();
      const aniosDisponibles = [];
      for (let i = anioActual; i >= 2000; i--) {
          aniosDisponibles.push(i);
      }
      cargarOpciones(aniosDisponibles, anioSelect);
  };

  const inicializarFormulario = () => {
      cargarOpciones(marcasPorTipo['auto'], marcaSelect);
      cargarAniosDisponibles();
  };

  inicializarFormulario();

  tipoVehiculoSelect.addEventListener('change', function() {
      const tipoSeleccionado = tipoVehiculoSelect.value;
      cargarOpciones(marcasPorTipo[tipoSeleccionado], marcaSelect);
  });

  marcaSelect.addEventListener('change', function() {
      const marcaSeleccionada = marcaSelect.value;
      cargarOpciones(modelosPorMarca[marcaSeleccionada], modeloSelect);
  });

  formulario.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe

      const cotizacion = calcularCotizacion();
      const cobertura = obtenerCobertura();

      cotizacionResultado.textContent = `La cotización para su seguro seleccionado es de $${cotizacion}`;
      coberturaResultado.textContent = `La cobertura seleccionada es: ${cobertura}`;
      resultadoDiv.style.display = 'block';

      guardarCotizacionLocalStorage(cotizacion, cobertura);
  });

  cargarCotizacionDesdeLocalStorage();
});
