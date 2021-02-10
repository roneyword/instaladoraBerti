export default function closeModal() {
    const btnForm = document.querySelector('form button');

    console.log(btnForm);


    btnForm.addEventListener('click', function () {

        const btnClose = document.querySelector('.modal-email h1');
        const modalEmail = document.querySelector('.modal-email');

        btnClose.addEventListener('click', function () {
            modalEmail.style.display = 'none';
        });

    });

}