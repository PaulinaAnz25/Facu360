document.addEventListener("DOMContentLoaded", () => {

  const selectorEdificio = document.getElementById("selector-edificio");
  const selectorEspacios = document.getElementById("selector-espacios");
  const resultado = document.getElementById("resultado");

  // bloquear selector de edificio hasta cargar datos
  selectorEdificio.disabled = true;
  selectorEspacios.disabled = true;

  let espacios = [];

  // cargar JSON
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      espacios = data.espacios;

      // habilitar selector de edificio cuando los datos ya estén cargados
      selectorEdificio.disabled = false;
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
      resultado.innerHTML =
        `<p class="mensaje-inicial">
          Error al cargar la información de los espacios.
        </p>`;
    });

  // al seleccionar edificio
  selectorEdificio.addEventListener("change", () => {
    const edificioSeleccionado = selectorEdificio.value;

    // reset
    selectorEspacios.innerHTML =
      `<option value="">-- Seleccione un espacio --</option>`;
    selectorEspacios.disabled = true;

    resultado.innerHTML =
      `<p class="mensaje-inicial">
        La información del espacio seleccionado aparecerá aquí.
      </p>`;

    if (!edificioSeleccionado) return;

    // filtrar por edificio
    const espaciosFiltrados = espacios.filter(
      espacio => espacio.edificio === edificioSeleccionado
    );

    // llenar selector de espacios
    espaciosFiltrados.forEach(espacio => {
      const option = document.createElement("option");
      option.value = espacio.id;
      option.textContent = espacio.nombre;
      selectorEspacios.appendChild(option);
    });

    selectorEspacios.disabled = false;
  });

  // al seleccionar espacio
  selectorEspacios.addEventListener("change", () => {
    const espacioSeleccionado = espacios.find(
      espacio => espacio.id === selectorEspacios.value
    );

    if (espacioSeleccionado) {
      resultado.innerHTML = `
        <h3>${espacioSeleccionado.nombre}</h3>
        <p><strong>Edificio:</strong> ${espacioSeleccionado.edificio}</p>
        <p><strong>Piso:</strong> ${espacioSeleccionado.piso}</p>
        <p><strong>Bloque:</strong> ${espacioSeleccionado.bloque}</p>
        <p><strong>Tipo:</strong> ${espacioSeleccionado.tipo}</p>
      `;
    } else {
      resultado.innerHTML =
        `<p class="mensaje-inicial">
          La información del espacio seleccionado aparecerá aquí.
        </p>`;
    }
  });

});

