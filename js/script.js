window.onload = function () {
  setTimeout(function () {
    $("#onload").fadeOut();
    $("body").removeClass("body__hidden");
  }, 500);
};

const menuBar = document.getElementById("menu-bar");
const menuPrincipal = document.querySelector(".main-nav__menu");
const menuEstilos = document.querySelector(".main-nav__menu-list");
const subMenues = document.querySelectorAll(".main-nav__sub-menu");
const menuSecciones = document.querySelectorAll(".menu-handler");

const postTypes = document.getElementById("post-types");
const postSubMenu = document.querySelectorAll(".main-nav__sub-menu-item");
const postTypesList = document.querySelector(".post-types-list");
const blogItem = document.querySelector(".blog-item");
const postArrow = document.querySelector(
  ".main-nav__menu-list-item-list.post-types > span.material-symbols-outlined"
);

postTypes.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (postTypesList.style.display == "flex") {
    postTypesList.style.display = "none";
    postArrow.style.setProperty("transform", "rotate(0deg)", "important");
  } else {
    postTypesList.style.display = "flex";
    postTypesList.style.marginTop = "-40px";
    postTypesList.style.paddingLeft = "24px";
    postArrow.style.setProperty("transform", "rotate(90deg)", "important");
  }
});

menuSecciones.forEach((seccion) => {
  seccion.addEventListener("click", closeMenu);
});

function closeMenu() {
  menuPrincipal.classList.remove("visible");
  menuEstilos.classList.remove("active");
}

// Función para manejar el comportamiento de los submenús
function handleSubmenuClick(event) {
  event.stopPropagation(); // Evita que el clic en los submenús dispare handleClickOutside
  const item = event.currentTarget;

  let subMenu = item.querySelector(".sub-menu--active");
  let arrows = item.querySelector(".material-symbols-outlined");

  // Cerrar otros submenús abiertos
  subMenues.forEach((otherSubMenu) => {
    if (otherSubMenu !== subMenu) {
      otherSubMenu.style.display = "none"; // Cierra el submenú si no es el que se está abriendo
      otherSubMenu.parentNode.style.height = "auto"; // Resetea la altura del contenedor del submenú
      const otherArrows = otherSubMenu.parentNode.querySelector(
        ".material-symbols-outlined"
      );
      if (otherArrows) {
        otherArrows.style.transform = "rotate(-90deg)"; // Rota la flecha
      }
    }
  });

  if (!subMenu) console.log("No se encontró submenú"); // Si no hay submenú, no se hace nada

  if (subMenu.style.display === "flex") {
    subMenu.style.display = "none";
    item.style.height = "auto";
    arrows.style.transform = "rotate(-90deg)";
  } else {
    subMenu.style.display = "flex";
    let heightEl = subMenu.scrollHeight;
    item.style.height = `${heightEl + 40}px`;
    arrows.style.transform = "rotate(0deg)";
  }
}

// Función para manejar los clics fuera del menú
function handleClickOutside(event) {
  if (
    !menuEstilos.contains(event.target) && // Verifica que el clic no fue dentro del menú principal
    !menuBar.contains(event.target) // Verifica que el clic no fue en el botón del menú (menuBar)
  ) {
    // Cierra el menú si el clic es fuera del menú
    menuPrincipal.classList.remove("visible");
    menuEstilos.classList.remove("active");

    subMenues.forEach((subMenu) => {
      subMenu.classList.remove("sub-menu--active"); // Elimina clase active de los submenús
    });

    // Remover el listener para evitar que siga detectando clicks cuando el menú está cerrado
    document.removeEventListener("click", handleClickOutside);
  }
}

// Cuando se hace clic en el botón del menú (menuBar)
menuBar.addEventListener("click", (event) => {
  event.stopPropagation(); // Evita que el clic en el botón cierre el menú

  // Alternar la visibilidad del menú principal
  menuPrincipal.classList.toggle("visible");
  menuEstilos.classList.toggle("active");

  if (menuPrincipal.classList.contains("visible")) {
    // Al abrir el menú, activa los submenús
    subMenues.forEach((subMenu) => {
      subMenu.classList.add("sub-menu--active");
    });

    // Añadir event listener para detectar clics fuera del menú
    document.addEventListener("click", handleClickOutside);

    // Reasignar los event listeners para los submenús cada vez que se abre el menú
    let activeElements = document.querySelectorAll(
      ".active .main-nav__menu-list-item"
    );

    activeElements.forEach((item) => {
      // Elimina cualquier listener anterior para evitar duplicados
      item.removeEventListener("click", handleSubmenuClick);

      // Añade el event listener para desplegar o colapsar submenús
      item.addEventListener("click", handleSubmenuClick);
    });
  } else {
    // Al cerrar el menú, eliminar la clase de los submenús
    subMenues.forEach((subMenu) => {
      subMenu.classList.remove("sub-menu--active");
    });
  }
});

// Función para controlar animación de elementos del DOM
document.addEventListener("DOMContentLoaded", () => {
  const fatherElements = document.querySelectorAll(".animation-item");

  const options = {
    threshold: 0.4, // Cuando el 40% del elemento esté visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const dataAnimation = entry.target.querySelector("div");
      const dataName = dataAnimation.getAttribute("data-animation");

      const addAnimation = (animationName) => {
        if (entry.isIntersecting) {
          dataAnimation.classList.add(`${animationName}`);
        }
      };

      switch (dataName) {
        case "fade":
          dataAnimation.classList.toggle(`${dataName}`, !entry.isIntersecting);
          break;
        case "show":
          addAnimation("show");
          break;
        case "slide":
          addAnimation("slide");
          break;
        case "unite":
          addAnimation("unite");
          break;
        case "up":
          addAnimation("up");
          break;
        default:
          break;
      }
    });
  }, options);

  fatherElements.forEach((box) => {
    observer.observe(box);
  });
});

// Renderizado de tarjetas de productos

const products = [
  {
    id: 1,
    name: "Big Crunch Sandwich",
    description:
      "Indulge in our crispy chicken burger, topped with cheese, fresh lettuce, tomato, onions and our special sauce. An irresistible explosion of flavor!",
    src: "img/cards/sandwich-crujiente-grande.avif",
    alt: "Sandwich de pollo con cebolla, lechuga y tomates",
    sale: 15,
    priceNow: 6.29,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Deli Daze",
    description:
      "A juicy, seasoned chicken patty, nestled in a soft bun, topped with fresh lettuce and ripe tomatoes",
    src: "img/cards/sandwich-queso-cheddar-lechuga-tomate.avif",
    alt: "Sandwich de pollo, incluye queso cheddar, cebolla morada, lechuga y tomates",
    priceNow: 5.99,
    rating: 3.5,
  },
  {
    id: 3,
    name: "Bite Brigade",
    description:
      "Savor the ultimate double delight with juicy grilled chicken, crispy bacon, fresh veggies, cheese and our signature sauce.",
    src: "img/cards/sandwich-doble-tocino-a-la-parrilla.avif",
    alt: "Sandwich doble de pollo a la parrilla con tocino, verduras frescas, queso y salsa exclusiva",
    sale: 23,
    priceNow: 6.75,
    rating: 5,
  },
  {
    id: 4,
    name: "Crispy Deluxe",
    description:
      "Experience crispy fried chicken, melted cheese, fresh lettuce, tomato, and creamy sauce in every delicious bite!",
    src: "img/cards/sandwich-pollo-frito-con-queso-derretido-salsa-cremosa.avif",
    alt: "Sandwich de pollo frito crujiente, queso derretido, lechuga fresca, tomate y salsa cremosa",
    priceNow: 5.99,
    rating: 4,
  },
];

const productsCardContainer = document.querySelector(".products__cards");

function starRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="material-symbols-outlined fill"> star </span>';
  }

  if (halfStar) {
    stars += '<span class="material-symbols-outlined"> star_half </span>';
  }

  for (let i = fullStars + halfStar; i < 5; i++) {
    stars += '<span class="material-symbols-outlined"> star </span>';
  }
  return stars;
}

function createProduct({
  id,
  sale,
  name,
  src,
  alt,
  description,
  priceNow,
  rating,
}) {
  const articleProducts = document.createElement("article");
  articleProducts.id = id;
  articleProducts.classList.add("card");
  articleProducts.innerHTML = `
  ${sale ? `<span class="card__sale">-${sale}%</span>` : "<span></span>"}
   <div class="card__image">
     <img
       loading="lazy"
       src="${src}"
       alt="${alt}"
       width="500"
       height="409"
     />
     <div class="card__links">
       <span class="material-symbols-outlined" title="More info">
         visibility
       </span>
       <span class="material-symbols-outlined" title="Like">
         favorite
       </span>
       <span class="material-symbols-outlined" title="Share">
         share
       </span>
     </div>
   </div>
   <div class="card__rating">
     ${starRating(rating)}
   </div>
   <div class="card__body">
     <h2 class="card__title">${name}</h2>
     <div class="card__prices">
       <span class="card__prices-now">$${priceNow}</span>
       ${sale ? `<span class="card__prices-before">$${(priceNow + (priceNow * sale / 100)).toFixed(2)}</span>` : ""}
     </div>
     <p class="card__copy">
       ${description}
   </p>
   </div>
   <button class="btn btn__add-to-cart">
     <span class="material-symbols-outlined"> shopping_cart </span>
     Add to Cart
   </button>
  `;
  productsCardContainer.appendChild(articleProducts);
}

products.forEach((product) => createProduct(product));

// Renderizado de combo fliers

const fliers = [
  {
    id: 1,
    name: "Special Angus Burger",
    src: "img/fliers/clasic-burger-combo.webp",
    alt: "Hamburguesa sobre una tabla acompañada de salsa y papas fritas.",
    description:
      "The real Juicy Burger, tender Angus beef patty with fresh lettuce, tomato, and special sauce. A premium burger experience every bite.",
    price: 6.99,
  },
  {
    id: 2,
    name: "Grand Spicy Burger",
    src: "img/fliers/burger-split.webp",
    alt: "Una hamburguesa dividida al medio, acompañada de queso cheddar derretido y papas fritas.",
    description:
      "Introducing our Grand Spicy: a juicy beef patty, melted cheese, fresh veggies, and a fiery sauce, served with crispy fries for an unforgettable meal.",
    price: 7.99,
  },
  {
    id: 3,
    name: "Mega Cheese Burger",
    src: "img/fliers/burger-soda-french-fries.webp",
    alt: "Hamburguesa doble carne sobre una tabla, con papas fritas y un vaso grande de refresco de cola.",
    description:
      "Savor the Mega Cheese double beef patties, layers of melted cheese, tangy BBQ sauce, sesame bun, served with crispy fries and a refreshing drink.",
    price: 8.99,
  },
  {
    id: 4,
    name: "Veg Cheese Burger",
    src: "img/fliers/black-burger-and-regular-burger.webp",
    alt: "Dos hamburguesas con lechuga y tomates, acompañadas de una salsa, tomates cherry y papas fritas, servidas sobre una tabla.",
    description:
      "Enjoy our delicious vegetarian burger, a plant-based patty, fresh lettuce, tomatoes, onions, and creamy cheese, all in a soft, sesame-topped bun.",
    price: 5.99,
  },
];

const combosCardsContainer = document.querySelector(".combos__cards");

function createFlierCombos ({id, name, src, alt, description, price}) {
  const articleCombo = document.createElement("article")
  articleCombo.classList.add("flier", "animation-item");
  articleCombo.id = id;
  articleCombo.innerHTML = `
  <div class="flier__details" data-animation="show">
                <h2 class="flier__title">${name}</h2>
                <p class="flier__paragraph">
                  ${description}
                </p>
                <span class="flier__price">$${price}</span>
                <button class="btn btn--yellow">ORDER NOW</button>
              </div>
              <picture class="flier__image">
                <img
                  loading="lazy"
                  src="${src}"
                  alt="${alt}"
                  width="400"
                  height="400"
                />
              </picture>
              <div class="flier__side-board">
                <h3 class="flier__subtitle">NEW</h3>
              </div>
  `;
  combosCardsContainer.appendChild(articleCombo)
}

fliers.forEach((flier) => createFlierCombos(flier))

// Renderizado de tarjetas Newsletter

const drawnCards = [
  {
    id: 1,
    src: "img/newsletter/hamburger_free.avif",
    alt: "Icono paquete de hamburguesa.",
    title: "Free Shipping on First Order",
    description:
      "Sign up for latest updates and get free shipping and fast delivery.",
  },
  {
    id: 2,
    src: "img/newsletter/best-taste.avif",
    alt: "Icono bandeja de plata cubierta, acompañada de tres estrellas doradas.",
    title: "Best Taste Guarantee",
    description:
      "We use high-quality ingredients to create food with exceptional flavor.",
  },
  {
    id: 3,
    src: "img/newsletter/food-cellphone.avif",
    alt: "Icono de manos sosteniendo un celular donde se ve una bandeja de plata.",
    title: "Variety of Dishes",
    description:
      "We give variety of dishes, desserts, drinks and much more.",
  },
  {
    id: 4,
    src: "img/newsletter/moto.avif",
    alt: "Icono motocicleta de delivery con un reloj de aguja detras.",
    title: "25 Minutes Delivery",
    description:
      "We deliver your food at the doorstep within an hour.",
  },
];

const newsletterCardsContainer = document.querySelector(".newsletter__cards");

function createNewsletterCards({
  id,
  src,
  alt,
  title,
  description,
}) {
  const articleNewsletter = document.createElement("article");
  articleNewsletter.id = id;
  articleNewsletter.classList.add("newsletter__cards--content", "animation-item");
  articleNewsletter.innerHTML = `
  <div class="drawn-card" data-animation="up">
    <figure class="drawn-card__image">
      <img
        loading="lazy"
        src="${src}"
        alt="${alt}"
        width="512"
        height="512"
      />
    </figure>
    <h2 class="drawn-card__title">${title}</h2>
    <p class="drawn-card__paragraph">
      ${description}
    </p>
  </div>
  `;
  newsletterCardsContainer.appendChild(articleNewsletter);
}

drawnCards.forEach((card) => createNewsletterCards(card));