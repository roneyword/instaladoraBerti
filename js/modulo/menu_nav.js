export default function hideMenu() {
    const menuNav = document.querySelector('.nav-fixed');
    const carrosel = document.querySelector('.banner');
    const imgNav = document.querySelector('.logo img');
    const meioBanner = carrosel.clientHeight * 0.4;
    
    let prevScrollpos = window.pageYOffset;

    window.onscroll = function () {

        let currentScrollpos = window.pageYOffset;

        if (prevScrollpos > currentScrollpos) {
            menuNav.style.top = "0px";
        } else {
            menuNav.style.top = "-100px";
        }

        prevScrollpos = currentScrollpos;
        
        if(currentScrollpos >= meioBanner){
            menuNav.classList.add('active');
            imgNav.src = 'img/img-logo/logo_preto.png';
        }else{
            menuNav.classList.remove('active');
            imgNav.src = 'img/img-logo/logo_branco.png';
            
            
        }

    }


}

