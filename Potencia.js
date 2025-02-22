const questions = [
    {
        question: "Qual é 2^3?",
        options: ["6", "8", "10", "4"],
        answer: "8"
    },
    {
        question: "Qual é 3^4?",
        options: ["81", "27", "24", "12"],
        answer: "81"
    },
    {
        question: "Qual é 5^2?",
        options: ["25", "20", "15", "10"],
        answer: "25"
    },
    {
        question: "Qual é 4^3?",
        options: ["64", "48", "32", "16"],
        answer: "64"
    },
    {
        question: "Qual é 6^2?",
        options: ["36", "42", "30", "18"],
        answer: "36"
    },
    {
        question: "Qual é 7^3?",
        options: ["343", "336", "350", "324"],
        answer: "343"
    },
    {
        question: "Qual é 2^5?",
        options: ["32", "16", "64", "8"],
        answer: "32"
    },
    {
        question: "Qual é 10^3?",
        options: ["1000", "100", "10", "10000"],
        answer: "1000"
    },
    {
        question: "Qual é 8^2?",
        options: ["64", "32", "16", "128"],
        answer: "64"
    },
    {
        question: "Qual é 9^3?",
        options: ["729", "243", "324", "512"],
        answer: "729"
    },
    {
        question: "Qual é 2^4?",
        options: ["16", "8", "32", "4"],
        answer: "16"
    },
    {
        question: "Qual é 3^3?",
        options: ["27", "18", "9", "12"],
        answer: "27"
    },
    {
        question: "Qual é 5^3?",
        options: ["125", "150", "100", "75"],
        answer: "125"
    },
    {
        question: "Qual é 4^2?",
        options: ["16", "8", "4", "2"],
        answer: "16"
    },
    {
        question: "Qual é 6^3?",
        options: ["216", "108", "162", "256"],
        answer: "216"
    },
    {
        question: "Qual é 7^2?",
        options: ["49", "56", "35", "63"],
        answer: "49"
    },
    {
        question: "Qual é 3^2?",
        options: ["9", "6", "12", "15"],
        answer: "9"
    },
    {
        question: "Qual é 10^2?",
        options: ["100", "10", "1", "1000"],
        answer: "100"
    },
    {
        question: "Qual é 11^2?",
        options: ["121", "111", "100", "150"],
        answer: "121"
    },
    {
        question: "Qual é 12^2?",
        options: ["144", "120", "150", "160"],
        answer: "144"
    },
    {
        question: "Qual é 5^4?",
        options: ["625", "500", "1000", "250"],
        answer: "625"
    },
    {
        question: "Qual é 3^5?",
        options: ["243", "2430", "205", "125"],
        answer: "243"
    },
    {
        question: "Qual é 6^4?",
        options: ["1296", "1024", "64", "512"],
        answer: "1296"
    },
    {
        question: "Qual é 8^3?",
        options: ["512", "256", "128", "64"],
        answer: "512"
    },
    {
        question: "Qual é 2^6?",
        options: ["64", "32", "128", "256"],
        answer: "64"
    },
    {
        question: "Qual é 9^2?",
        options: ["81", "72", "90", "100"],
        answer: "81"
    },
    {
        question: "Qual é 7^4?",
        options: ["2401", "1681", "1400", "1500"],
        answer: "2401"
    },
    {
        question: "Qual é 2^7?",
        options: ["128", "64", "32", "16"],
        answer: "128"
    },
    {
        question: "Qual é 4^4?",
        options: ["256", "128", "64", "16"],
        answer: "256"
    },
    {
        question: "Qual é 5^5?",
        options: ["3125", "2560", "1500", "1024"],
        answer: "3125"
    },
    {
        question: "Qual é 3^6?",
        options: ["729", "7290", "756", "243"],
        answer: "729"
    },
    {
        question: "Qual é 10^4?",
        options: ["10000", "1000", "100", "10"],
        answer: "10000"
    },
    {
        question: "Qual é 4^5?",
        options: ["1024", "2048", "512", "256"],
        answer: "1024"
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