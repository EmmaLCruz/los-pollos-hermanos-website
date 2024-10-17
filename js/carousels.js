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

  // Inicializar slick para la galería
  initializeGalleryCarousel();

  // Forzar visibilidad después de la carga completa
  $(window).on("load", function () {
    // Asegurar que slick se reinicializa después de cargar
    setTimeout(function () {
      $(".gallery__content").slick("refresh"); // Forzar refresh de slick
      $(".gallery__content").css("visibility", "visible"); // Asegurarse de que la galería sea visible
      initGallery();
    }, 300);
  });

  // Pausar el autoplay después de cada cambio
  $(".gallery__content").on(
    "afterChange",
    function (event, slick, currentSlide) {
      $(".gallery__content").slick("slickPause");

      // Esperar 3 segundos adicionales antes de reanudar el autoplay
      setTimeout(function () {
        $(".gallery__content").slick("slickPlay");
      }, 5000);
    }
  );
});

function initializeGalleryCarousel() {
  $(".gallery__content").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
}

function initGallery() {
  const lightGalleryElement = document.getElementById("lightgallery");
  if (lightGalleryElement) {
    lightGallery(lightGalleryElement, {
      plugins: [lgZoom, lgFullscreen, lgShare, lgThumbnail],
      speed: 600,
      download: false,
      fullscreen: true,
      zoom: true,
      share: true,
      mode: "lg-fade",
      thumbnail: true,
      selector: ".gallery__anchor:not(.slick-cloned)", // Evitar seleccionar elementos clonados
    });
  }
}
