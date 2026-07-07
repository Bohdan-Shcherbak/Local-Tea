(() => {
  // src/js/modules.mjs
  var flsModules = {};
  var bodyLockStatus = true;
  var bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) {
      bodyUnlock(delay);
    } else {
      bodyLock(delay);
    }
  };
  var bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function() {
        bodyLockStatus = true;
      }, delay);
    }
  };
  var bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      }
      body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      document.documentElement.classList.add("lock");
      bodyLockStatus = false;
      setTimeout(function() {
        bodyLockStatus = true;
      }, delay);
    }
  };

  // src/js/functions/burger.mjs
  function menuInit() {
    if (document.querySelector(".icon-menu")) {
      document.addEventListener("click", function(e) {
        if (bodyLockStatus && e.target.closest(".icon-menu")) {
          bodyLockToggle();
          document.documentElement.classList.toggle("menu-open");
        }
      });
    }
    ;
  }

  // src/js/functions/parallax.mjs
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
  var parallaxParents = document.querySelectorAll("[data-prlx-parent]");
  if (parallaxParents.length) {
    const activeParents = Array.from(parallaxParents).filter((parent) => {
      if (!parent.dataset.prlxMedia) return true;
      const [breakpoint, type] = parent.dataset.prlxMedia.split(",");
      const mediaQueryString = `(${type.trim()}-width: ${breakpoint.trim()}px)`;
      return window.matchMedia(mediaQueryString).matches;
    });
    if (activeParents.length) {
      flsModules.parallax = new Parallax(activeParents);
    }
  }

  // src/js/app.js
  menuInit();
  var menuItem = document.querySelectorAll(".menu__item");
  var menu = document.querySelector(".menu");
  var itemContainer = document.querySelectorAll(".item-container");
  var search = document.querySelector(".search");
  var searchIcon = document.querySelector(".search__icon");
  var searchInput = document.querySelector(".search__input");
  function itemBlock() {
    menuItem.forEach((e) => {
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
