const menuBar = document.getElementById("menu-bar");
const subMenu = document.getElementById("sub-menu");
const menuPrincipal = document.querySelector(".main-nav__menu");

menuBar.addEventListener("click", () => {
  console.log("Menú bar");
  if (subMenu.style.display === "block") {
    subMenu.style.display = "none";
    menuPrincipal.style.display = "none";
  } else {
    subMenu.style.display = "block";
    menuPrincipal.style.display = "flex";
  }
});

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
