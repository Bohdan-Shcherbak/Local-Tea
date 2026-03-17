(() => {
  // src/js/functions/burger.mjs
  var menuItem = document.querySelectorAll(".menu__item");
  var iconMenu = document.querySelector(".icon-menu");
  var headerMenu = document.querySelector(".header__menu");
  function iconMenuReset() {
    if (menuItem) {
      menuItem.forEach((e) => {
        e.classList.remove("beforeColor");
        e.children[0].classList.remove("color");
        e.children[1].classList.remove("display");
      });
    }
  }
  if (iconMenu) {
    iconMenu.addEventListener("click", () => {
      iconMenu.classList.toggle("active");
      headerMenu.classList.toggle("active");
      document.body.classList.toggle("lock");
      iconMenuReset();
    });
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu") && !e.target.closest(".item-container") && !e.target.closest(".icon-menu")) {
      iconMenuReset();
      iconMenu.classList.remove("active");
      headerMenu.classList.remove("active");
      document.body.classList.remove("lock");
    }
  });

  // src/js/app.js
  var menuItem2 = document.querySelectorAll(".menu__item");
  var menu = document.querySelector(".menu");
  var itemContainer = document.querySelectorAll(".item-container");
  var search = document.querySelector(".search");
  var searchIcon = document.querySelector(".search__icon");
  var searchInput = document.querySelector(".search__input");
  function itemBlock() {
    menuItem2.forEach((e) => {
      if (window.innerWidth > 991.68) {
        e.addEventListener("mouseenter", () => {
          e.children[0].classList.add("color");
          e.children[1].classList.add("display");
        });
        e.addEventListener("mouseleave", () => {
          e.children[1].classList.remove("display");
          e.children[0].classList.remove("color");
        });
      } else {
        e.addEventListener("click", () => {
          const active = e.parentElement.querySelector(".color")?.parentElement;
          if (active && active !== e) {
            active.children[0].classList.remove("color");
            active.children[1].classList.remove("display");
            active.classList.remove("beforeColor");
          }
          e.children[1].classList.toggle("display");
          e.children[0].classList.toggle("color");
          e.classList.toggle("beforeColor");
        });
      }
    });
  }
  itemBlock();
  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      search.classList.toggle("search-element");
      input.classList.toggle("width");
    });
  }
})();
//# sourceMappingURL=app.js.map
