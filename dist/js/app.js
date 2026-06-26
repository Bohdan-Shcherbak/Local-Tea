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

  // src/js/modules.js
  var flsModules = {};

  // src/js/functions/parallax.js
  var Parallax = class _Parallax {
    constructor(elements) {
      if (elements.length) {
        this.elements = Array.from(elements).map((el) => new _Parallax.Each(el, this.options));
      }
    }
    destroyEvents() {
      this.elements.forEach((el) => {
        el.destroyEvents();
      });
    }
    setEvents() {
      this.elements.forEach((el) => {
        el.setEvents();
      });
    }
  };
  Parallax.Each = class {
    constructor(parent) {
      this.parent = parent;
      this.elements = this.parent.querySelectorAll("[data-prlx]");
      this.animation = this.animationFrame.bind(this);
      this.offset = 0;
      this.value = 0;
      this.smooth = parent.dataset.prlxSmooth ? Number(parent.dataset.prlxSmooth) : 15;
      this.setEvents();
    }
    setEvents() {
      this.animationID = window.requestAnimationFrame(this.animation);
    }
    destroyEvents() {
      window.cancelAnimationFrame(this.animationID);
    }
    animationFrame() {
      const topToWindow = this.parent.getBoundingClientRect().top;
      const heightParent = this.parent.offsetHeight;
      const heightWindow = window.innerHeight;
      const positionParent = {
        top: topToWindow - heightWindow,
        bottom: topToWindow + heightParent
      };
      const centerPoint = this.parent.dataset.prlxCenter ? this.parent.dataset.prlxCenter : "center";
      if (positionParent.top < 30 && positionParent.bottom > -30) {
        switch (centerPoint) {
          // верхній точці (початок батька стикається верхнього краю екрану)
          case "top":
            this.offset = -1 * topToWindow;
            break;
          // центрі екрана (середина батька у середині екрана)
          case "center":
            this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
            break;
          // Початок: нижня частина екрана = верхня частина батька
          case "bottom":
            this.offset = heightWindow - (topToWindow + heightParent);
            break;
        }
      }
      this.value += (this.offset - this.value) / this.smooth;
      this.animationID = window.requestAnimationFrame(this.animation);
      this.elements.forEach((el) => {
        const parameters = {
          axis: el.dataset.axis ? el.dataset.axis : "v",
          direction: el.dataset.direction ? el.dataset.direction + "1" : "-1",
          coefficient: el.dataset.coefficient ? Number(el.dataset.coefficient) : 5,
          additionalProperties: el.dataset.properties ? el.dataset.properties : ""
        };
        this.parameters(el, parameters);
      });
    }
    parameters(el, parameters) {
      if (parameters.axis == "v") {
        el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`;
      } else if (parameters.axis == "h") {
        el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
      }
    }
  };
  if (document.querySelectorAll("[data-prlx-parent]")) {
    flsModules.parallax = new Parallax(document.querySelectorAll("[data-prlx-parent]"));
  }

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
