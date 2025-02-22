const questions = [
    {
        question: "Qual é o resultado de 5 x 3?",
        options: ["15", "10", "20", "25"],
        answer: "15"
    },
    {
        question: "Qual é o resultado de 10 x 4?",
        options: ["40", "20", "30", "50"],
        answer: "40"
    },
    {
        question: "Qual é o resultado de 7 x 6?",
        options: ["42", "36", "48", "49"],
        answer: "42"
    },
    {
        question: "Qual é o resultado de 15 x 10?",
        options: ["100", "150", "200", "250"],
        answer: "150"
    },
    {
        question: "Qual é o resultado de 20 x 5?",
        options: ["100", "80", "60", "120"],
        answer: "100"
    },
    {
        question: "Qual é o resultado de 9 x 8?",
        options: ["72", "64", "81", "63"],
        answer: "72"
    },
    {
        question: "Qual é o resultado de 12 x 11?",
        options: ["132", "121", "110", "144"],
        answer: "132"
    },
    {
        question: "Qual é o resultado de 3 x 7?",
        options: ["21", "24", "18", "27"],
        answer: "21"
    },
    {
        question: "Qual é o resultado de 6 x 8?",
        options: ["48", "54", "42", "36"],
        answer: "48"
    },
    {
        question: "Qual é o resultado de 4 x 5?",
        options: ["20", "25", "15", "30"],
        answer: "20"
    },
    {
        question: "Qual é o resultado de 8 x 7?",
        options: ["56", "49", "64", "63"],
        answer: "56"
    },
    {
        question: "Qual é o resultado de 14 x 5?",
        options: ["70", "65", "75", "60"],
        answer: "70"
    },
    {
        question: "Qual é o resultado de 11 x 11?",
        options: ["121", "111", "131", "101"],
        answer: "121"
    },
    {
        question: "Qual é o resultado de 13 x 4?",
        options: ["52", "56", "48", "54"],
        answer: "52"
    },
    {
        question: "Qual é o resultado de 17 x 3?",
        options: ["51", "47", "54", "57"],
        answer: "51"
    },
    {
        question: "Qual é o resultado de 19 x 2?",
        options: ["38", "36", "40", "34"],
        answer: "38"
    },
    {
        question: "Qual é o resultado de 16 x 2?",
        options: ["32", "30", "28", "34"],
        answer: "32"
    },
    {
        question: "Qual é o resultado de 12 x 9?",
        options: ["108", "102", "98", "112"],
        answer: "108"
    },
    {
        question: "Qual é o resultado de 9 x 5?",
        options: ["45", "40", "50", "35"],
        answer: "45"
    },
    {
        question: "Qual é o resultado de 18 x 3?",
        options: ["54", "51", "57", "48"],
        answer: "54"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer = 30;
let interval;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.question-container').addEventListener('click', startQuiz);
});

function startQuiz() {
    document.querySelector('.question-container').removeEventListener('click', startQuiz);
    showQuestion();
}

function showQuestion() {
    clearInterval(interval);
    timer = 30;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timer;
    timerElement.style.color = "#00ff4c"; // Reseta a cor do texto para verde
    timerElement.style.textAlign = "center";
    interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;

        if (timer === 20) {
            timerElement.style.color = "yellow"; // Muda a cor do texto para amarelo
        }
        if (timer === 15) {
            timerElement.style.color = "red"; // Muda a cor do texto para vermelho
        }
        if (timer === 0) {
            const alertSound = document.getElementById('alert-sound');
            alertSound.play().catch((error) => {
                console.error('Erro ao tentar tocar o som:', error);
            });

            // Bloqueia as opções de resposta
            const optionsContainer = document.querySelector('.options');
            Array.from(optionsContainer.children).forEach(button => {
                button.disabled = true;
            });

            setTimeout(() => {
                checkAnswer(null);
            }, 5000);
        }
    }, 1000);

    const questionContainer = document.querySelector('.question-container');
    questionContainer.querySelector('.question').textContent = questions[currentQuestionIndex].question;
    const optionsContainer = questionContainer.querySelector('.options');
    optionsContainer.innerHTML = '';
    questions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    clearInterval(interval);
    if (answer === questions[currentQuestionIndex].answer) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    let resultHtml = `
    <h1>Resultado</h1>
<p>Você acertou ${correctAnswers} de ${totalQuestions} questões. Não se preocupe! Cada acerto conta e cada erro é uma oportunidade de aprender.</p>
<p>Sua porcentagem de acertos foi de ${percentage.toFixed()}%. Lembre-se de que a prática leva à perfeição. Continue esforçando-se e você verá melhorias constantes. Estamos confiantes no seu potencial!</p>
<p>Assinado por: Luiz Augusto, Lucas Neves e Vinícius Maia.</p>

`;

    if (percentage >= 80) {
        resultHtml = `
      <h1>EXCELENTE TRABALHO! VOCÊ ESTÁ ARRASANDO! PARABÉNS! CONTINUE NESSA DIREÇÃO, VOCÊ TEM UM FUTURO BRILHANTE! E LEMBRE-SE: A MATEMÁTICA É A BASE DE GRANDES CONQUISTAS!</h1>
<p>Acertar ${correctAnswers} de ${totalQuestions} questões não é para qualquer um. Você está mostrando um desempenho incrível!</p>
      `;
    }

    document.querySelector('.question-container').innerHTML = resultHtml;
}


showQuestion();