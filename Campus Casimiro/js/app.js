var map = L.map('map').setView([12.126539, -86.271311], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcadores de edificios
const destinos = {
  ingenieria: [12.1259, -86.2705],
  Biblioteca_Jose_Coronel_Urtecho: [12.126214, -86.269499],
  CanchaDeportiva_UCA: [12.126493, -86.270814],
  kiosko_cheguevara: [12.125687, -86.270226],
  Aula_Magna_UCA: [12.126486, -86.270281],
  Auditorio_Neysi_de_los_Angeles_Rios_Olivares: [12.125803, -86.269949],
  Food_Park: [12.125300, -86.272208],
  Edificio_N: [12.126212, -86.271257],
  Rectoria_UNCSM: [12.126503, -86.269727]
};

// Crear marcadores con popups
Object.entries(destinos).forEach(([nombre, coords]) => {
  L.marker(coords)
    .addTo(map)
    .bindPopup(nombre.replace(/_/g, ' '));
});

// Ruta desde la entrada principal (punto de partida)
const entradaPrincipal = [12.126539, -86.271311];

function mostrarRuta() {
  const destino = document.getElementById('destino').value;
  const destinoCoords = destinos[destino];

  if (!destinoCoords) {
    alert("Selecciona un destino válido");
    return;
  }

  // Elimina rutas anteriores (opcional)
  if (window.rutaActiva) {
    map.removeLayer(window.rutaActiva);
  }

  // Puedes agregar puntos intermedios si quieres simular un camino más real
  const puntosRuta = [
    entradaPrincipal,
    destinoCoords
  ];

  // Dibujar la línea
  window.rutaActiva = L.polyline(puntosRuta, { color: 'blue', weight: 5 }).addTo(map);

  // Centrar el mapa en la ruta
  map.fitBounds(window.rutaActiva.getBounds());
}

// Abrir y cerrar barra lateral
function openNav() {
  document.getElementById("mySidenav").style.width = "300px"; // ancho fijo
  document.getElementById("main").style.marginLeft = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}


function mostrarMapa() {
  const contenido = document.getElementById("contenido-proyecto");
  contenido.innerHTML = `
    <h2>Mapa del Campus</h2>
    <p>Interactúa con el mapa para ver senderos y ubicaciones.</p>
  `;
  closeNav();
}
