let $choosePlanButtons = document.querySelectorAll('.plan-card .join-btn');

$choosePlanButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Lógica para manejar el clic en el botón "Unirse ahora"
    console.log('Unirse ahora');
    // Aquí puedes agregar la lógica para redirigir al usuario a la página de pago o mostrar un modal, etc.
  });
});
