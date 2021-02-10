export default function animaModal(){
    const btnAjuda = document.querySelector('.btn-ajuda');
    const modalAjuda = document.querySelector('.modal-ajuda');
    const closeModal = document.querySelector('.close');

    btnAjuda.addEventListener('click', function(e){

        e.preventDefault();
        modalAjuda.classList.toggle('active');


    });

    closeModal.addEventListener('click', function(){
        
        modalAjuda.classList.remove('active');

    });
};