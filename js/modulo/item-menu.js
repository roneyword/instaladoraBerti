export default function itemMenu() {

    const menuNav = document.querySelectorAll('.js-menu-nav a span');
    const menuSmarth = document.querySelectorAll('.container-menusmart a');
    const sectionID = document.querySelectorAll('.js-menu');

    document.addEventListener('scroll', function () {

        sectionID.forEach((item, index) =>{

            let itemTopBot = item.getBoundingClientRect();

            if(itemTopBot.top <= 0 && itemTopBot.bottom >= 0){
                removeActive(menuNav);
                menuNav[index].classList.add('active');
                removeActive(menuSmarth);
                menuSmarth[index].classList.add('active');    
            }

        });

    });

    function removeActive(classe) {
        classe.forEach(item => {
            item.classList.remove('active');
        });
    };

};