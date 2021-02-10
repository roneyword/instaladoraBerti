export default function sectionContador() {

    let cont = 0;

    window.addEventListener('scroll', function () {

        const bgContador = document.querySelector('.bg-contador');
        const windowHeight = window.innerHeight * 0.6;
        const sectionTop =  bgContador.getBoundingClientRect().top
        

        if (sectionTop <= windowHeight) {

            if (cont == 0) {
                contadorTerminoIgual();
                cont = 1;
            }

        }

    });


    function contadorTerminoIgual() {

        const tempo_intervalo = 5;
        const tempo = 4000;

        const dataUP = document.querySelectorAll('.counter-up');


        dataUP.forEach((item) => {

            let count_to = parseInt(item.getAttribute("data-count-to"));
            let intervalos = tempo / tempo_intervalo;
            let incremento = count_to / intervalos;
            let valor = 0;
            let el = item;


            let timer = setInterval(function () {
                if (valor >= count_to) { //se já contou tudo tem de parar o timer
                    valor = count_to;
                    clearInterval(timer);
                }

                let texto = valor.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                el.textContent = texto;
                valor += incremento;
            }, tempo_intervalo);


        });
    }

};