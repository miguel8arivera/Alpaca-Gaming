document.addEventListener('DOMContentLoaded', function () {
  // 2. Seleccionar el primer botón con clase "active"
  const activeBtn = document.querySelector('button.active');

  // 3. Si existe, registrar el evento de clic
  if (activeBtn) {
    activeBtn.addEventListener('click', function () {
      // Leer la URL de destino; usa una por defecto si no existe
      const targetUrl =
        activeBtn.getAttribute('data-url') || 'https://www.google.com';

      // Abrir en una nueva pestaña ("_blank") y sin devolver control a la página
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  } else {
    console.warn('No se encontró ningún <button class="active"> en la página.');
  }
});
