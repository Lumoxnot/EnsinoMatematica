const questions = [
    {
        question: "Qual é o resultado de 5 + 3?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        question: "Qual é o resultado de 10 + 4?",
        options: ["12", "14", "15", "13"],
        answer: "14"
    },
    {
        question: "Qual é o resultado de 7 + 6?",
        options: ["12", "13", "14", "11"],
        answer: "13"
    },
    {
        question: "Qual é o resultado de 15 + 10?",
        options: ["20", "24", "25", "23"],
        answer: "25"
    },
    {
        question: "Qual é o resultado de 20 + 5?",
        options: ["24", "25", "26", "27"],
        answer: "25"
    },
    {
        question: "Qual é o resultado de 9 + 8?",
        options: ["16", "17", "18", "19"],
        answer: "17"
    },
    {
        question: "Qual é o resultado de 12 + 11?",
        options: ["21", "22", "23", "24"],
        answer: "23"
    },
    {
        question: "Qual é o resultado de 3 + 7?",
        options: ["9", "10", "11", "8"],
        answer: "10"
    },
    {
        question: "Qual é o resultado de 6 + 8?",
        options: ["13", "14", "15", "16"],
        answer: "14"
    },
    {
        question: "Qual é o resultado de 4 + 5?",
        options: ["8", "9", "10", "7"],
        answer: "9"
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
      <p> Você acertou ${correctAnswers} de ${totalQuestions} questões, Não desanime! Cada tentativa é uma oportunidade de aprendizado e crescimento.</p>
      <p>Sua porcentagem de acertos foi de ${percentage.toFixed()}% Lembre-se, o mais importante é continuar se esforçando e nunca desistir. Grandes conquistas são construídas sobre os pequenos passos. Continue praticando e você verá seu progresso. Estou orgulhoso do seu esforço e determinação!.</p>
      <p>  Assinado por: Luiz Augusto, Lucas Neves e Vinícius Maia.</p>
  `;

    if (percentage >= 80) {
        resultHtml = `
            <h1>UAU! VOCÊ É O MELHOR ALUNO! PARABÉNS! CONTINUE ASSIM, CAMPEÃO! VOCÊ VAI LONGE! E LEMBRE-SE: MATEMÁTICA É IMPORTANTE!</h1>
            <p>Acertar ${correctAnswers} de ${totalQuestions} questões não é para qualquer um.</p>
        `;
    }

    document.querySelector('.question-container').innerHTML = resultHtml;
}


showQuestion();