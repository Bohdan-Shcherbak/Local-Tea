import { bodyLock,bodyUnlock,bodyLockStatus, bodyLockToggle } from "../modules.mjs";

// Модуль роботи з меню (бургер) =======================================================================================================================================================================================================================
export function menuInit() {
    if (document.querySelector(".icon-menu")) {
        document.addEventListener("click", function (e) {
            const isMenuOpen = document.documentElement.classList.contains("menu-open");
            const menuItem = document.querySelectorAll('.menu__item');

            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }else if(bodyLockStatus && isMenuOpen && !e.target.closest('.menu')){
                bodyLockToggle();
                document.documentElement.classList.remove("menu-open");
                menuItem.forEach(e => {
                    e.children[0].classList.remove('color');
                e.children[1].classList.remove('display');
                e.classList.remove('beforeColor')
                });
            }
            });
}}
export function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
}
export function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
}
