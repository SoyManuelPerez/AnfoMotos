function showFields() {
  const tipo = document.getElementById('Tipo').value;
  const llantasFields = document.getElementById('llantas-fields');
  const aceitesFields = document.getElementById('aceites-fields');
  
  // Reset fields visibility and required attribute
  llantasFields.style.display = 'none';
  aceitesFields.style.display = 'none';
  document.getElementById('Rin').required = false;
  document.getElementById('TipoAceite').required = false;
  document.getElementById('Viscosidad').required = false;
  
  if (tipo === 'Llantas') {
    llantasFields.style.display = 'block';
    document.getElementById('Rin').required = true;
  } else if (tipo === 'Aceites') {
    aceitesFields.style.display = 'block';
    document.getElementById('TipoAceite').required = true;
    document.getElementById('Viscosidad').required = true;
  }
}
  document.addEventListener('DOMContentLoaded', function() {
    showFields(); // Para que se ejecute al cargar la página
  });
  