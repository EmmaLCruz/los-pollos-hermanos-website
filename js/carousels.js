$(window).on("load", function () {
  $(".gallery__content").slick("refresh"); // Forzar el recalculo del layout de slick
});

// Inicializar lightGallery en la galería
$(window).on("load", function () {
  galleryInit();
});

function galleryInit() {
  const lightGalleryElement = document.getElementById("lightgallery");
  lightGallery(lightGalleryElement, {
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
}

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
});

setTimeout(galleryInit, 100);
