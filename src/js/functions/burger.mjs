const menuItem = document.querySelectorAll('.menu__item');
const iconMenu = document.querySelector('.icon-menu')
const headerMenu = document.querySelector('.header__menu')

function iconMenuReset(){
    if(menuItem){
        menuItem.forEach(e=>{
            e.classList.remove('beforeColor');
            e.children[0].classList.remove('color');
            e.children[1].classList.remove('display');
        })
    }
}

if(iconMenu){
    iconMenu.addEventListener('click', ()=>{
        iconMenu.classList.toggle('active');
        headerMenu.classList.toggle('active');
        document.body.classList.toggle('lock')
        iconMenuReset();
    })
}





document.addEventListener('click', (e)=>{
    if(!e.target.closest('.menu') && !e.target.closest('.item-container')  && !e.target.closest('.icon-menu')){
        iconMenuReset()
        iconMenu.classList.remove('active');
        headerMenu.classList.remove('active');
        document.body.classList.remove('lock');
    }
})