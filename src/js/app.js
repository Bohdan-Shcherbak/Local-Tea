import {menuInit} from'./functions/burger.mjs';
import './functions/parallax.mjs'
menuInit();

const menuItem = document.querySelectorAll('.menu__item');
const search = document.querySelector('.search');
const searchIcon = document.querySelector('.search__icon');


/* Відкривання підменю для header__menu =======================================================================*/
function itemBlock(){
    if(menuItem){
        menuItem.forEach(e => {
            if(window.innerWidth > 991.68){
                e.addEventListener('mouseenter', ()=>{
                    e.children[0].classList.add('color');
                    e.children[1].classList.add('display');
                })
                e.addEventListener('mouseleave', ()=>{
                    e.children[1].classList.remove('display');
                    e.children[0].classList.remove('color');
                })
            } else{
                e.addEventListener('click', ()=>{
                    const active = e.parentElement.querySelector('.color')?.parentElement;
                    if (active && active !== e) {
                        active.children[0].classList.remove('color');
                        active.children[1].classList.remove('display');
                        active.classList.remove('beforeColor');
                    }
                    e.children[1].classList.toggle('display');
                    e.children[0].classList.toggle('color');
                    e.classList.toggle('beforeColor');
                })
            }
        })
    }
}
itemBlock()

// натискання на кнопку пошуку =======================================================================
if(searchIcon){
    searchIcon.addEventListener('click', ()=>{
        search.classList.toggle('search-element')
        input.classList.toggle('width')
    })
}
// атрибут для зміщення іконок по градусам ======================================================
const image_block = document.querySelectorAll('[data-image-deg]');

function imageDeg(){
    if(image_block){
        image_block.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrolledCalculated = (window.innerHeight - rect.top) * -0.03 + 25;
            element.style.setProperty('--scroll-y', `${scrolledCalculated}deg`);
        })
    }
}
function screnCheck(){
    if (window.innerWidth >= 991) {
            window.addEventListener('scroll', imageDeg);
        } else{
            window.removeEventListener('scroll',imageDeg);
            if(image_block){
                image_block.forEach(element => {
                    element.style.setProperty('--scroll-y', '0deg');
                })
            }
        }
}

screnCheck();
window.addEventListener("resize", screnCheck);
// =======================================================================


