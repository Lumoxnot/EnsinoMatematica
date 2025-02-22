const questions = [
    {
        question: "Quanto é 12 + 45?",
        options: ["57", "60", "50", "55"],
        answer: "57"
    },
    {
        question: "Qual é 25% de 400?",
        options: ["100", "90", "105", "110"],
        answer: "100"
    },
    {
        question: "Qual é 8²?",
        options: ["64", "62", "66", "60"],
        answer: "64"
    },
    {
        question: "Qual é a raiz quadrada de 144?",
        options: ["12", "14", "11", "13"],
        answer: "12"
    },
    {
        question: "Quanto é 25 × 15?",
        options: ["375", "350", "380", "360"],
        answer: "375"
    },
    {
        question: "Quanto é 720 ÷ 8?",
        options: ["90", "85", "100", "95"],
        answer: "90"
    },
    {
        question: "Quanto é 5% de 200?",
        options: ["10", "12", "15", "8"],
        answer: "10"
    },
    {
        question: "Quanto é 150 - 78?",
        options: ["72", "70", "75", "80"],
        answer: "72"
    },
    {
        question: "Qual é 3³?",
        options: ["27", "24", "20", "30"],
        answer: "27"
    },
    {
        question: "Qual é a raiz quadrada de 81?",
        options: ["9", "8", "7", "10"],
        answer: "9"
    },
    {
        question: "Quanto é 20 × 18?",
        options: ["360", "380", "340", "350"],
        answer: "360"
    },
    {
        question: "Qual é 15% de 300?",
        options: ["45", "40", "50", "35"],
        answer: "45"
    },
    {
        question: "Quanto é 56 ÷ 7?",
        options: ["7", "8", "9", "6"],
        answer: "8"
    },
    {
        question: "Quanto é 65 + 34?",
        options: ["99", "100", "105", "110"],
        answer: "99"
    },
    {
        question: "Quanto é 2000 - 875?",
        options: ["1125", "1150", "1000", "1100"],
        answer: "1125"
    },
    {
        question: "Quanto é 2⁵?",
        options: ["32", "35", "25", "40"],
        answer: "32"
    },
    {
        question: "Qual é a raiz quadrada de 256?",
        options: ["16", "15", "17", "14"],
        answer: "16"
    },
    {
        question: "Quanto é 120 ÷ 6?",
        options: ["20", "22", "18", "25"],
        answer: "20"
    },
    {
        question: "Qual é 35 × 8?",
        options: ["280", "275", "285", "290"],
        answer: "280"
    },
    {
        question: "Qual é 18% de 500?",
        options: ["90", "80", "85", "95"],
        answer: "90"
    },
    {
        question: "Quanto é 150 + 275?",
        options: ["425", "430", "400", "420"],
        answer: "425"
    },
    {
        question: "Qual é 9³?",
        options: ["729", "700", "720", "750"],
        answer: "729"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer = 60;
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
    timer = 60;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timer;
    timerElement.style.color = "#00ff4c"; // Reseta a cor do texto para verde
    timerElement.style.textAlign = "center";
    interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;

        if (timer === 30) {
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