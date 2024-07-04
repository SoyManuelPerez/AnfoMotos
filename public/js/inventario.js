function showFields() {
    const tipo = document.getElementById('Tipo').value;
    const llantasFields = document.getElementById('llantas-fields');
    const aceitesFields = document.getElementById('aceites-fields');

  
    llantasFields.style.display = 'none';
    aceitesFields.style.display = 'none';

  
    if (tipo === 'Llantas') {
      llantasFields.style.display = 'block';
    } else if (tipo === 'Aceites') {
      aceitesFields.style.display = 'block';
    } 
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    showFields(); // Para que se ejecute al cargar la página
  });
  