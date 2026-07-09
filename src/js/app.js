import {menuInit} from'./functions/burger.mjs';
import *as modules from './modules.mjs';
import './functions/parallax2.mjs'
// import { spollers } from './functions/spoilers.mjs';
menuInit();


const menuItem = document.querySelectorAll('.menu__item');
const menu = document.querySelector('.menu');
const itemContainer = document.querySelectorAll('.item-container');
// const menuItemBefore = window.getComputedStyle(menuItem, '::before');
const search = document.querySelector('.search');
const searchIcon = document.querySelector('.search__icon');
const searchInput = document.querySelector('.search__input');
// let screen = ()=>{
//     return window.innerWidth > 991.68? 'mouseenter' : 'click'
// }
function screenF(event){
    return window.innerWidth > 991.68? event : 'click'

}
// function itemBlock(){
//     menuItem.forEach(e => {
//         e.addEventListener('click', ()=>{
//             e.children[0].classList.add('color');
//             e.children[1].classList.add('display');
//         })
//         e.addEventListener('click', ()=>{
//             e.children[1].classList.remove('display');
//             e.children[0].classList.remove('color');
//         })
//     })
// }
function itemBlock(){
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
itemBlock()

if(searchIcon){
    searchIcon.addEventListener('click', ()=>{
        search.classList.toggle('search-element')
        input.classList.toggle('width')
    })
}
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

// window.addEventListener("resize", () => {
//         if (window.innerWidth >= 991) {
//             window.addEventListener('scroll', imageDeg);
//         } else{
//             window.removeEventListener('scroll',imageDeg);
//             if(image_block){
//                 image_block.forEach(element => {
//                     element.style.setProperty('--scroll-y', '0deg');
//                 })
//             }
//         }
// })
screnCheck();
window.addEventListener("resize", screnCheck);



// function changeDeg(){
//     if (window.innerWidth >= 991) {
//         console.log('yes');
        
//         window.addEventListener('scroll', () => {
//         const image_block = document.querySelectorAll('[data-image-deg]');
        
//         if(image_block){
//             image_block.forEach(element => {
//                 const rect = element.getBoundingClientRect();
//                 const scrolledCalculated = (window.innerHeight - rect.top) * -0.03 + 25;
//                 element.style.setProperty('--scroll-y', `${scrolledCalculated}deg`);
//             })
//         }
//         })
//     }
// }
// Перевіряємо стан відразу при завантаженні
// changeDeg();
// window.addEventListener('change', changeDeg);


