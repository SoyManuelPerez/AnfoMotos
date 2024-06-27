// Inicializar el mapa y establecer la vista a una ubicación y nivel de zoom específicos
var map = L.map("map").setView([6.440444, -75.329474], 16); // Coordenadas de París

// Cargar y mostrar las baldosas del mapa desde OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Añadir un marcador en la ubicación fija
L.marker([6.440444, -75.329474])
  .addTo(map)
  .bindPopup("Anfomotos Barbosa")
  .openPopup();
