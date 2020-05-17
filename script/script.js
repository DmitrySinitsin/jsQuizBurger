//по загрузке документа
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const modalDialog = document.querySelector('.modal-dialog');
    const sendButton = document.querySelector('#send');

    //вопросы с ответами квиза
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    let count = -100;
    let interval;
    modalDialog.style.top = '-100%';
    //анимация появления модалки сверху
    const animateModal = () => {
        modalDialog.style.top = count + "%";
        count += 3;
        interval = requestAnimationFrame(animateModal);
        if (count >= 0) {
            cancelAnimationFrame(interval);
            count = -100;
        }
        // if (count >= 0) {
        //     clearInterval(interval);
        //     count = -100; //возврат на старт если повтор без перезагрузки страницы
        // }
    }

    //изменение кнопки прохождения квиза вместо бутстрапа
    let clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    window.addEventListener('resize', function () {
        clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 768) {
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    })

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.add('active');

        modalBlock.classList.add('d-block');//показать блок модалки
        playTest();
    })

    // открытие модального окна
    btnOpenModal.addEventListener('click', () => {
        //interval = setInterval(animateModal, 10);
        interval = requestAnimationFrame(animateModal);
        modalBlock.classList.add('d-block');//показать блок модалки
        playTest();
    })
    //закрытие
    closeModal.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        modalBlock.classList.remove('d-block');//закрытие модалки
    })

    //закрыть модалку кликом мимо нее
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.modal-dialog') &&
            !event.target.closest('.openModalButton') &&
            !event.target.closest('.burger')
        ) {
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    })

    const playTest = () => {
        const finalAnswers = [];
        let numberQuestion = 0;// номер вопроса из опросника
        const renderAnswers = (index) => {//динамический вывод ответов опроса
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}" alt="burger">
                  <span>${answer.title}</span>
                </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestion) => {//отрисовка вопросов и ответов
            formAnswers.innerHTML = '';//очистка

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;//отрисовать вопрос
                renderAnswers(indexQuestion);//отрисовать ответы на опрос
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }

            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');

                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Enter your number</label>
                    <input type="phone" class="form-control" id="numberPhone" placeholder="Phone">
                </div>
                `;
            }
            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Thank you for quiz!';
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
        }

        renderQuestions(numberQuestion);//запуск опроса

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            inputs.forEach((input, index) => {
                //obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            })
            finalAnswers.push(obj);
        }

        nextButton.onclick = () => {//перейти к следующему вопросу
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {//вернуться к предыдущему вопросу
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {//отправить телефон
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
    };

    // setInterval(function () {
    //     console.log('This is timeout');
    // }, 1000);

});





