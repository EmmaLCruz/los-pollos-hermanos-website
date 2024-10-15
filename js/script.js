const menuBar = document.getElementById("menu-bar");
const menuPrincipal = document.querySelector(".main-nav__menu");
const menuEstilos = document.querySelector(".main-nav__menu-list");
const subMenues = document.querySelectorAll(".main-nav__sub-menu");

menuBar.addEventListener("click", (event) => {
  event.stopPropagation();

  menuPrincipal.classList.toggle("visible");
  menuEstilos.classList.toggle("active");

  document.addEventListener("click", handleClickOutside);

  function handleClickOutside(event) {
    if (
      !menuEstilos.contains(event.target) &&
      !menuBar.contains(event.target)
    ) {
      menuPrincipal.classList.remove("visible");
      menuEstilos.classList.remove("active");
      console.log("Click fuera del elemento");

      document.removeEventListener("click", handleClickOutside);
    }
  }

  if (menuPrincipal.style.display == "flex") {
    subMenues.forEach((subMenu) =>
      subMenu.classList.remove("sub-menu--active")
    );
  } else {
    subMenues.forEach((subMenu) => subMenu.classList.add("sub-menu--active"));

    let activeElements = document.querySelectorAll(
      ".active .main-nav__menu-list-item"
    );

    activeElements.forEach((item) => {
      item.addEventListener("click", () => {
        let subMenuesHidden = item.querySelector(".sub-menu--active");
        let arrows = item.querySelector(".material-symbols-outlined");
        let heightEl;

        if (subMenuesHidden.style.display == "flex") {
          subMenuesHidden.style.display = "none";
          item.style.height = "auto";
          arrows.style.transform = "rotate(-90deg)";
        } else {
          subMenuesHidden.style.display = "flex";
          heightEl = subMenuesHidden.scrollHeight;
          item.style.height = `${heightEl + 26}px`;
          arrows.style.transform = "rotate(0deg)";
        }
      });
    });
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
