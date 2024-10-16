$(document).ready(function () {
  // Inicialización del carrusel de testimonios
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
    $(".gallery__content").css("visibility", "hidden"); // Ocultar temporalmente
    setTimeout(function () {
      $(".gallery__content").slick("setPosition"); // Forzar recalculo de slick
      $(".gallery__content").css("visibility", "visible"); // Mostrar galería de nuevo
      initGallery(); // Inicializar lightGallery
    }, 300); // Dar tiempo a que el DOM se ajuste
  });
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
