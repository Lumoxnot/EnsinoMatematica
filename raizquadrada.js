const questions = [
    {
        question: "Qual é a raiz quadrada de 4?",
        options: ["5", "2", "3", "6"],
        answer: "2"
    },
    {
        question: "Qual é a raiz quadrada de 2209?",
        options: ["48", "35", "48", "46"],
        answer: "48"
    },
    {
        question: "Qual é a raiz quadrada de 81?",
        options: ["12", "10", "9", "8"],
        answer: "9"
    },
    {
        question: "Qual é a raiz quadrada de 144?",
        options: ["13", "11", "15", "12"],
        answer: "12"
    },
    {
        question: "Qual é a raiz quadrada de 256?",
        options: ["18", "17", "16", "15"],
        answer: "16"
    },
    {
        question: "Qual é a raiz quadrada de 324?",
        options: ["20", "19", "17", "18"],
        answer: "18"
    },
    {
        question: "Qual é a raiz quadrada de 676?",
        options: ["25", "26", "28", "27"],
        answer: "26"
    },
    {
        question: "Qual é a raiz quadrada de 900?",
        options: ["28", "30", "31", "27"],
        answer: "30"
    },
    {
        question: "Qual é a raiz quadrada de 729?",
        options: ["26", "27", "28", "29"],
        answer: "27"
    },
    {
        question: "Qual é a raiz quadrada de 625?",
        options: ["24", "27", "28", "25"],
        answer: "25"
    },
    {
        question: "Qual é a raiz quadrada de 529?",
        options: ["22", "25", "24", "23"],
        answer: "23"
    },
    {
        question: "Qual é a raiz quadrada de 400?",
        options: ["20", "25", "19", "18"],
        answer: "20"
    },
    {
        question: "Qual é a raiz quadrada de 1936?",
        options: ["44", "45", "46", "50"],
        answer: "44"
    },
    {
        question: "Qual é a raiz quadrada de 1024?",
        options: ["33", "30", "32", "34"],
        answer: "32"
    },
    {
        question: "Qual é a raiz quadrada de 1225 ?",
        options: ["32", "35", "54", "57"],
        answer: "35"
    },
    {
        question: "Qual é a raiz quadrada de 1444?",
        options: ["38", "36", "40", "34"],
        answer: "38"
    },
    {
        question: "Qual é a raiz quadradad de 1600?",
        options: ["32", "30", "40", "34"],
        answer: "40"
    },
    {
        question: "Qual é a raiz quadrada de 2500?",
        options: ["40", "50", "58", "45"],
        answer: "50"
    },
    {
        question: "Qual é a raiz quadrada de 196?",
        options: ["16", "15", "13", "14"],
        answer: "14"
    },
    {
        question: "Qual é a raiz quadrada de 289?",
        options: ["54", "51", "57", "48"],
        answer: "54"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer = 150;
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
    timer = 150;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timer;
    timerElement.style.color = "#00ff4c"; // Reseta a cor do texto para verde
    timerElement.style.textAlign = "center";
    interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;

        if (timer === 75) {
            timerElement.style.color = "yellow"; // Muda a cor do texto para amarelo
        }
        if (timer === 30) {
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