$(document).ready(function () {
  $(".testimonials__carousel").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    speed: 500,
    arrows: false,
  });

  $(".gallery__content").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    dots: false,
    speed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Inicializar lightGallery en la galería
  const lightGalleryElement = document.getElementById("lightgallery");
  var lightGalleryInstance = lightGallery(lightGalleryElement, {
    plugins: [lgZoom, lgFullscreen, lgShare, lgThumbnail],
    speed: 600,
    download: false,
    fullscreen: true,
    zoom: true,
    share: true,
    mode: "lg-fade",
    thumbnail: true,
    selector: ".gallery__anchor", // Asegúrate de que el selector sea correcto
  });

  // Función para clonar y eliminar slides automáticamente
  function autoCloneRemove() {
    // Obtener el primer <a> sin eliminarlo
    var $firstAnchor = $(
      ".gallery__content .slick-list .slick-track a"
    ).first();

    // Verificar si se encontró el primer <a>
    if ($firstAnchor.length > 0) {
      // Clonar el <a> completo
      var $newSlide = $firstAnchor.clone();

      // Verificar si el nuevo slide tiene el atributo data-src
      var dataSrc = $newSlide.attr("data-src");

      if (dataSrc) {
        // Agregar el slide clonado
        $(".gallery__content").slick("slickAdd", $newSlide.prop("outerHTML")); // Usar outerHTML para agregar el HTML completo

        // Destruir la galería actual, si la instancia existe
        if (lightGalleryInstance) {
          lightGalleryInstance.destroy(true);
        }

        // Reinicializar lightGallery con los plugins y opciones
        setTimeout(function () {
          lightGalleryInstance = lightGallery(
            document.querySelector(".gallery__content"),
            {
              plugins: [lgZoom, lgFullscreen, lgShare, lgThumbnail], // Reaplicar plugins
              speed: 600,
              download: false, // Asegurarse de que la opción de descargar esté desactivada
              fullscreen: true,
              zoom: true,
              share: true,
              mode: "lg-fade",
              thumbnail: true,
              selector: ".gallery__anchor",
            }
          );
        }, 100);
      } else {
        console.error("data-src no está presente en el nuevo slide");
      }

      // Eliminar el primer slide visible
      var currentIndex = $(".gallery__content").slick("slickCurrentSlide");
      $(".gallery__content").slick("slickRemove", currentIndex);
    } else {
      console.error("No se encontró el slide actual para clonar.");
    }
  }

  // Configuración del setInterval
  var autoCloneInterval = setInterval(function () {
    // Verificar si la ventana es mayor a 1100px
    if ($(window).width() >= 1100) {
      autoCloneRemove(); // Solo llamar a autoCloneRemove si la pantalla es mayor o igual a 1100px
    }
  }, 10000);

  // Reiniciar el setInterval cuando se cierre la vista de la foto
  $(document).on("lg.afterClose", function () {
    // Reiniciar el intervalo
    clearInterval(autoCloneInterval);
    autoCloneInterval = setInterval(function () {
      if ($(window).width() >= 1100) {
        autoCloneRemove();
      }
    }, 10000);

    $(window).on("resize", function () {
      if ($(window).width() < 1100) {
        clearInterval(autoCloneInterval); // Detener el intervalo si la pantalla es menor a 1100px
      } else {
        // Reiniciar el intervalo solo si no está ya corriendo
        if (!autoCloneInterval) {
          autoCloneInterval = setInterval(function () {
            autoCloneRemove();
          }, 10000);
        }
      }
    });
  });
});
