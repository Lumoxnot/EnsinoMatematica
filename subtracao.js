const questions = [
    {
        question: "Qual é o resultado de 157 - 89?",
        options: ["72", "65", "68", "78"],
        answer: "68"
    },
    {
        question: "Qual é o resultado de 293 - 156?",
        options: ["133", "137", "143", "139"],
        answer: "137"
    },
    {
        question: "Qual é o resultado de 478 - 249?",
        options: ["229", "228", "231", "227"],
        answer: "229"
    },
    {
        question: "Qual é o resultado de 762 - 495?",
        options: ["266", "269", "267", "268"],
        answer: "267"
    },
    {
        question: "Qual é o resultado de 891 - 543?",
        options: ["347", "348", "349", "346"],
        answer: "348"
    },
    {
        question: "Qual é o resultado de 1254 - 678?",
        options: ["578", "555", "576", "577"],
        answer: "576"
    },
    {
        question: "Qual é o resultado de 1653 - 897?",
        options: ["759", "756", "757", "758"],
        answer: "756"
    },
    {
        question: "Qual é o resultado de 3247 - 1985?",
        options: ["1263", "1262", "1261", "1260"],
        answer: "1262"
    },
    {
        question: "Qual é o resultado de 4786 - 3219?",
        options: ["1566", "1569", "1568", "1567"],
        answer: "1567"
    },
    {
        question: "Qual é o resultado de 5934 - 4187?",
        options: ["1747", "1749", "1748", "1746"],
        answer: "1747"
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
<p>Você acertou ${correctAnswers} de ${totalQuestions} questões. Não deixe que os desafios o desanimem! Cada erro é uma chance de crescer e cada acerto é um passo rumo à grandeza.</p>
<p>Sua porcentagem de acertos foi de ${percentage.toFixed()}%. Acredite no seu potencial e continue se dedicando. O aprendizado é uma jornada e você está trilhando o caminho certo. Estou orgulhoso da sua persistência e determinação!</p>
<p>Assinado por: Luiz Augusto, Lucas Neves e Vinícius Maia.</p>


`;

    if (percentage >= 80) {
        resultHtml = `
   <h1>FANTÁSTICO! VOCÊ É UM VERDADEIRO CAMPEÃO! PARABÉNS! CONTINUE DESSA FORMA, SEU FUTURO É PROMISSOR! E LEMBRE-SE: A MATEMÁTICA ABRE PORTAS!</h1>
<p>Acertar ${correctAnswers} de ${totalQuestions} questões não é para qualquer um. Você está fazendo um excelente trabalho!</p>
      `;
    }

    document.querySelector('.question-container').innerHTML = resultHtml;
}


showQuestion();