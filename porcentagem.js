const questions = [
    {
        question: "Qual é 15% de 200?",
        options: ["30", "35", "40", "25"],
        answer: "30"
    },
    {
        question: "Qual é 20% de 150?",
        options: ["30", "25", "20", "35"],
        answer: "30"
    },
    {
        question: "Qual é 10% de 500?",
        options: ["50", "45", "55", "60"],
        answer: "50"
    },
    {
        question: "Se um produto custa R$ 200 e tem um desconto de 25%, qual é o preço com desconto?",
        options: ["150", "175", "180", "145"],
        answer: "150"
    },
    {
        question: "Qual é 50% de 80?",
        options: ["40", "45", "30", "35"],
        answer: "40"
    },
    {
        question: "Qual é 30% de 250?",
        options: ["75", "80", "70", "85"],
        answer: "75"
    },
    {
        question: "Se você aumentar 15% de 600, qual será o valor final?",
        options: ["690", "650", "670", "620"],
        answer: "690"
    },
    {
        question: "Qual é 5% de 900?",
        options: ["45", "50", "55", "40"],
        answer: "45"
    },
    {
        question: "Se o salário de uma pessoa for R$ 2000 e ela receber um aumento de 10%, quanto será o aumento?",
        options: ["200", "250", "220", "300"],
        answer: "200"
    },
    {
        question: "Qual é 75% de 400?",
        options: ["300", "350", "375", "290"],
        answer: "300"
    },
    {
        question: "Qual é 60% de 750?",
        options: ["450", "500", "400", "420"],
        answer: "450"
    },
    {
        question: "Qual é 35% de 320?",
        options: ["112", "110", "115", "120"],
        answer: "112"
    },
    {
        question: "Se o preço de um produto subir 40%, de R$ 120 para quanto ele vai?",
        options: ["168", "170", "160", "180"],
        answer: "168"
    },
    {
        question: "Qual é 8% de 1250?",
        options: ["100", "110", "95", "90"],
        answer: "100"
    },
    {
        question: "Qual é 18% de 400?",
        options: ["72", "75", "80", "78"],
        answer: "72"
    },
    {
        question: "Qual é 12% de 800?",
        options: ["96", "100", "105", "90"],
        answer: "96"
    },
    {
        question: "Se um valor de R$ 150 aumentar 50%, qual será o novo valor?",
        options: ["225", "200", "210", "180"],
        answer: "225"
    },
    {
        question: "Qual é 25% de 600?",
        options: ["150", "160", "170", "175"],
        answer: "150"
    },
    {
        question: "Qual é 45% de 900?",
        options: ["400", "420", "430", "450"],
        answer: "405"
    },
    {
        question: "Qual é 30% de 550?",
        options: ["165", "175", "180", "190"],
        answer: "165"
    },
    {
        question: "Qual é 20% de 1800?",
        options: ["360", "380", "370", "350"],
        answer: "360"
    },
    {
        question: "Qual é 28% de 850?",
        options: ["238", "240", "250", "230"],
        answer: "238"
    },
    {
        question: "Qual é 50% de 300?",
        options: ["150", "140", "160", "130"],
        answer: "150"
    },
    {
        question: "Se um preço de R$ 500 sofrer um aumento de 10%, qual será o novo valor?",
        options: ["550", "530", "540", "520"],
        answer: "550"
    },
    {
        question: "Qual é 22% de 180?",
        options: ["39.6", "40", "38", "41"],
        answer: "39.6"
    },
    {
        question: "Qual é 16% de 125?",
        options: ["20", "22", "18", "21"],
        answer: "20"
    },
    {
        question: "Se um produto custa R$ 300 e recebe um desconto de 10%, qual é o valor do desconto?",
        options: ["30", "20", "25", "35"],
        answer: "30"
    },
    {
        question: "Qual é 2% de 4000?",
        options: ["80", "70", "90", "100"],
        answer: "80"
    },
    {
        question: "Qual é 90% de 700?",
        options: ["630", "625", "620", "635"],
        answer: "630"
    },
    {
        question: "Qual é 6% de 1200?",
        options: ["72", "75", "70", "80"],
        answer: "72"
    },
    {
        question: "Se o preço de um produto diminuir 30%, de R$ 500 para quanto ele vai?",
        options: ["350", "330", "375", "360"],
        answer: "350"
    },
    {
        question: "Qual é 14% de 600?",
        options: ["84", "85", "80", "90"],
        answer: "84"
    },
    {
        question: "Se o valor de um item aumentar 25% de R$ 400, qual será o valor final?",
        options: ["500", "450", "475", "460"],
        answer: "500"
    },
    {
        question: "Qual é 3% de 1500?",
        options: ["45", "48", "50", "55"],
        answer: "45"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer = 120;
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
    timer = 120;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timer;
    timerElement.style.color = "#00ff4c"; // Reseta a cor do texto para verde
    timerElement.style.textAlign = "center";
    interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;

        if (timer === 60) {
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