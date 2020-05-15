document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');//показать блок модалки
        playTest();
    })
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');//закрытие модалки
    })

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = 'Какого цвета бургер Вы хотите?';
            formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="./image/burger.png" alt="burger">
                  <span>Стандарт</span>
                </label>
              </div>
              
            `;
        }
        renderQuestions();
    }
})





