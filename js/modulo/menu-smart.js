export default function menuSmart(){
    
    const openSmart = document.querySelector('.menu-smarth');
    const menuSmart = document.querySelector('.container-menusmart');
    const closeSmart = document.querySelector('.close-btn');
    const smartItem = document.querySelectorAll('.resize .menu a');
    

    openSmart.addEventListener('click', function(){

        menuSmart.classList.add('active');
        this.style.visibility = 'hidden';

    });

    closeSmart.addEventListener('click', function(){

        menuSmart.classList.remove('active');
        openSmart.style.visibility = 'visible';

    });

    smartItem.forEach( item => {

        item.addEventListener('click', function(){
            
            openSmart.style.visibility = 'visible';
            menuSmart.classList.remove('active');

        });

    });

}