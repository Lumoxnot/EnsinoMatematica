const questions = [
    {
        question: "Qual é o resultado de 15 ÷ 3?",
        options: ["5", "3", "6", "4"],
        answer: "5"
    },
    {
        question: "Qual é o resultado de 40 ÷ 4?",
        options: ["10", "8", "12", "9"],
        answer: "10"
    },
    {
        question: "Qual é o resultado de 42 ÷ 6?",
        options: ["7", "6", "8", "5"],
        answer: "7"
    },
    {
        question: "Qual é o resultado de 150 ÷ 10?",
        options: ["15", "20", "10", "25"],
        answer: "15"
    },
    {
        question: "Qual é o resultado de 100 ÷ 5?",
        options: ["20", "15", "25", "10"],
        answer: "20"
    },
    {
        question: "Qual é o resultado de 72 ÷ 8?",
        options: ["9", "8", "10", "7"],
        answer: "9"
    },
    {
        question: "Qual é o resultado de 132 ÷ 11?",
        options: ["12", "10", "13", "11"],
        answer: "12"
    },
    {
        question: "Qual é o resultado de 21 ÷ 7?",
        options: ["3", "4", "5", "2"],
        answer: "3"
    },
    {
        question: "Qual é o resultado de 48 ÷ 6?",
        options: ["8", "7", "9", "6"],
        answer: "8"
    },
    {
        question: "Qual é o resultado de 20 ÷ 5?",
        options: ["4", "5", "3", "6"],
        answer: "4"
    },
    {
        question: "Qual é o resultado de 56 ÷ 7?",
        options: ["8", "7", "9", "6"],
        answer: "8"
    },
    {
        question: "Qual é o resultado de 70 ÷ 5?",
        options: ["14", "13", "15", "12"],
        answer: "14"
    },
    {
        question: "Qual é o resultado de 121 ÷ 11?",
        options: ["11", "12", "10", "13"],
        answer: "11"
    },
    {
        question: "Qual é o resultado de 52 ÷ 4?",
        options: ["13", "12", "14", "11"],
        answer: "13"
    },
    {
        question: "Qual é o resultado de 51 ÷ 3?",
        options: ["17", "16", "18", "15"],
        answer: "17"
    },
    {
        question: "Qual é o resultado de 38 ÷ 2?",
        options: ["19", "18", "20", "17"],
        answer: "19"
    },
    {
        question: "Qual é o resultado de 32 ÷ 2?",
        options: ["16", "15", "18", "14"],
        answer: "16"
    },
    {
        question: "Qual é o resultado de 108 ÷ 9?",
        options: ["12", "11", "10", "13"],
        answer: "12"
    },
    {
        question: "Qual é o resultado de 45 ÷ 5?",
        options: ["9", "8", "10", "7"],
        answer: "9"
    },
    {
        question: "Qual é o resultado de 54 ÷ 3?",
        options: ["18", "17", "20", "16"],
        answer: "18"
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
<h1>Ótimo Esforço!</h1>
<p>Você acertou ${correctAnswers} de ${totalQuestions} questões. Cada esforço é um passo adiante na sua jornada de aprendizado.</p>
<p>Sua porcentagem de acertos foi de ${percentage.toFixed()}%. Não se preocupe com os erros, eles são parte do processo de aprendizado. Continue se dedicando e você verá o progresso!</p>

<p>Assinado por: Luiz Augusto, Lucas Neves e Vinícius Maia.</p>

`;

    if (percentage >= 80) {
        resultHtml = `
  <h1>INCRÍVEL! VOCÊ É UM EXEMPLO DE DEDICAÇÃO! PARABÉNS! SIGA EM FRENTE, VOCÊ TEM UM GRANDE POTENCIAL! E NÃO SE ESQUEÇA: MATEMÁTICA É FUNDAMENTAL!</h1>
<p>Acertar ${correctAnswers} de ${totalQuestions} questões não é para qualquer um. Seu esforço está valendo a pena!</p>

    `;
    }

    document.querySelector('.question-container').innerHTML = resultHtml;
}


showQuestion();