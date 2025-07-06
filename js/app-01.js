document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const nextButton = document.getElementById('nextBtn');
  const prevButton = document.getElementById('prevBtn');

  // Si no hay elementos, no hacer nada
  if (cards.length === 0) return;

  // Obtenemos el ancho de una tarjeta (incluyendo su margen)
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 20; // El mismo gap que en el CSS

  let currentIndex = 0;

  // Función para mover el carrusel
  const moveToCard = (targetIndex) => {
    // Calcula cuánto mover el track
    const amountToMove = (cardWidth + gap) * targetIndex;
    track.style.transform = `translateX(-${amountToMove}px)`;
    currentIndex = targetIndex;
  };

  // Evento para el botón "siguiente"
  nextButton.addEventListener('click', () => {
    // El número de tarjetas que se pueden ver a la vez
    const visibleCards = 5;

    // Si ya estamos al final, no hacemos nada
    if (currentIndex >= cards.length - visibleCards) {
      // Opcional: volver al inicio
      // moveToCard(0);
      return;
    }

    // Mueve al siguiente grupo de tarjetas
    moveToCard(currentIndex + 1);
  });

  // Evento para el botón "anterior"
  prevButton.addEventListener('click', () => {
    // Si ya estamos en el inicio, no hacemos nada
    if (currentIndex === 0) return;

    // Mueve al grupo anterior de tarjetas
    moveToCard(currentIndex - 1);
  });
});

/* * CAMBIO CLAVE: Usamos 'load' en lugar de 'DOMContentLoaded'.
 * 'load' espera a que todo (imágenes, fuentes, etc.) se cargue,
 * asegurando que los cálculos de tamaño sean correctos desde el inicio.
 */
// Usamos 'load' para asegurar que todo, incluyendo fuentes, esté listo.
window.addEventListener('load', () => {
  // --- LÓGICA PARA CAMBIAR EL CONTENIDO PRINCIPAL ---
  const allTabs = document.querySelectorAll('.tab-btn');
  const gameDetails = document.querySelectorAll('.game-detail');
  const gameVisuals = document.querySelectorAll('.game-visuals');

  const switchContent = (target) => {
    allTabs.forEach((t) =>
      t.classList.toggle('active', t.getAttribute('data-target') === target)
    );
    gameDetails.forEach((detail) =>
      detail.classList.toggle(
        'active',
        detail.getAttribute('data-game') === target
      )
    );
    gameVisuals.forEach((visual) =>
      visual.classList.toggle(
        'active',
        visual.getAttribute('data-game') === target
      )
    );
  };

  allTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');
      switchContent(target);
    });
  });

  // --- LÓGICA CORREGIDA Y ESTABLE PARA EL CARRUSEL DE TABS ---
  const tabsTrack = document.querySelector('.game-tabs');
  const tabPrevBtn = document.getElementById('tabPrevBtn');
  const tabNextBtn = document.getElementById('tabNextBtn');

  let currentIndex = 0;
  const totalTabs = allTabs.length;
  const tabsToShow = 3;

  function updateTabCarousel() {
    if (allTabs.length === 0) return;

    // **LA CORRECCIÓN**: En lugar de usar offsetLeft, que puede ser inestable al cargar,
    // calculamos el desplazamiento de una manera más predecible.
    let moveAmount = 0;
    for (let i = 0; i < currentIndex; i++) {
      // Sumamos el ancho de cada pestaña anterior más su espacio de 'gap'
      moveAmount += allTabs[i].offsetWidth + 24; // 24 es el 'gap' del CSS
    }

    tabsTrack.style.transform = `translateX(-${moveAmount}px)`;

    // Actualizar el estado de los botones
    tabPrevBtn.disabled = currentIndex === 0;
    tabNextBtn.disabled = currentIndex >= totalTabs - tabsToShow;
  }

  tabNextBtn.addEventListener('click', () => {
    if (currentIndex < totalTabs - tabsToShow) {
      currentIndex++;
      updateTabCarousel();
    }
  });

  tabPrevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateTabCarousel();
    }
  });

  // Llamada inicial para establecer la posición y estado correctos
  updateTabCarousel();
});

// --- LÓGICA PARA EL CARRUSEL 'DISFRUTA AÚN MÁS' ---

// Asegúrate de que este código se ejecute después del DOM o la ventana esté cargada
// Espera a que la ventana se cargue para asegurar que todo está listo.
window.addEventListener('load', () => {
  // --- CÓDIGO DE SECCIONES ANTERIORES ---
  // (Tu código anterior aquí)

  // ==============================================================
  // --- LÓGICA DEFINITIVA (MÉTODO DE REJILLA) PARA 'DISFRUTA AÚN MÁS' ---
  // ==============================================================
  const enjoySection = document.querySelector('.enjoy-more-section');
  if (!enjoySection) return; // Si la sección no existe, no hacer nada

  // Celdas visibles en el escenario
  const leftCell = enjoySection.querySelector('#left-peek');
  const centerCell = enjoySection.querySelector('#center-stage');
  const rightCell = enjoySection.querySelector('#right-peek');

  // Botones
  const nextBtn = enjoySection.querySelector('#enjoyNextBtn');
  const prevBtn = enjoySection.querySelector('#enjoyPrevBtn');

  // Obtenemos las plantillas de contenido y las guardamos en un array
  const slideTemplates = Array.from(
    enjoySection.querySelectorAll('.slide-templates .slide-content-wrapper')
  );

  if (slideTemplates.length < 3) {
    console.error('Se necesitan al menos 3 diapositivas para este carrusel.');
    return;
  }

  // El índice de la diapositiva que está en el CENTRO
  let currentIndex = 1;

  // Función principal para dibujar el carrusel
  function drawCarousel() {
    // Determinamos qué diapositiva va en cada celda
    const prevIndex =
      (currentIndex - 1 + slideTemplates.length) % slideTemplates.length;
    const centerIndex = currentIndex;
    const nextIndex = (currentIndex + 1) % slideTemplates.length;

    // Limpiamos las celdas y metemos el contenido nuevo
    // Usamos .cloneNode(true) para no mover el original de las plantillas
    leftCell.innerHTML = '';
    leftCell.appendChild(slideTemplates[prevIndex].cloneNode(true));

    centerCell.innerHTML = '';
    centerCell.appendChild(slideTemplates[centerIndex].cloneNode(true));

    rightCell.innerHTML = '';
    rightCell.appendChild(slideTemplates[nextIndex].cloneNode(true));

    // Actualizamos la visibilidad de los botones
    prevBtn.classList.toggle('is-hidden', currentIndex === 0);
    nextBtn.classList.toggle(
      'is-hidden',
      currentIndex === slideTemplates.length - 1
    );
  }

  // Eventos de los botones
  nextBtn.addEventListener('click', () => {
    if (currentIndex < slideTemplates.length - 1) {
      currentIndex++;
      drawCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      drawCarousel();
    }
  });

  // Dibujamos el estado inicial del carrusel al cargar la página
  drawCarousel();
});

// HEADER LOGIC

window.addEventListener('load', () => {
  // --- LÓGICA PARA EL MENÚ FIJO (STICKY HEADER) ---
  const header = document.getElementById('siteHeader');
  if (header) {
    // Obtenemos la posición inicial del header
    const stickyPoint = header.offsetTop;

    window.addEventListener('scroll', () => {
      // Si el scroll vertical de la página es mayor que la posición inicial del header
      if (window.scrollY > stickyPoint) {
        // Añadimos la clase para hacerlo fijo
        header.classList.add('is-sticky');
      } else {
        // La quitamos si volvemos arriba
        header.classList.remove('is-sticky');
      }
    });
  }

  // --- LÓGICA PARA OCULTAR/MOSTRAR EL SUBMENÚ ---
  const dismissButton = document.getElementById('dismissBtn');
  if (dismissButton) {
    dismissButton.addEventListener('click', () => {
      // Al hacer clic, simplemente añadimos o quitamos la clase 'submenu-hidden' del header.
      // El CSS se encarga del resto (la animación y de ocultar la barra).
      header.classList.toggle('submenu-hidden');
    });
  }

  // --- CÓDIGO DE TUS OTRAS SECCIONES (SI LO HAY) ---
  // (Pega aquí el código JS para los otros carruseles)
});
