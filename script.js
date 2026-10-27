const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const input = document.getElementById('answer-input');
const checkBtn = document.getElementById('check-btn');
const newProblemBtn = document.getElementById('new-problem-btn');
const feedback = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const hearts = document.getElementById('hearts');
const timeEl = document.getElementById('time');

const inputSection = document.getElementById('input-section');
const buttonSection = document.getElementById('button-section');
const gameOverSection = document.getElementById('game-over-section');
const restartBtn = document.getElementById('restart-btn');

let lives = 3;
let score = 0;
let correctAnswer = 0;
let timeLeft = 30;
let gameActive = true;

setInterval(function() {
    if (gameActive === true && timeLeft > 0) {
        timeLeft--;
        timeEl.textContent = timeLeft;
        
        if (timeLeft === 0) {
            endGame("Tijd is om! ⏰");
        }
    }
}, 1000);

function updateHearts() {
    if (lives === 3) hearts.textContent = "❤️❤️❤️";
    if (lives === 2) hearts.textContent = "❤️❤️🤍";
    if (lives === 1) hearts.textContent = "❤️🤍🤍";
    if (lives === 0) hearts.textContent = "🤍🤍🤍";
}

function generateProblem() {
    timeLeft = 30;

    let getal1 = Math.floor(Math.random() * 10) + 1;
    let getal2 = Math.floor(Math.random() * 10) + 1;

    correctAnswer = getal1 * getal2;

    num1.innerText = getal1;
    num2.innerText = getal2;

    input.value = '';
    input.focus();
}

function checkAnswer() {
    if (gameActive === false) return; 

    if (input.value === "") {
        feedback.textContent = 'Vul eerst een getal in!';
        feedback.className = 'feedback show incorrect';
        return;
    }

    let userAnswer = Number(input.value);

    if (userAnswer === correctAnswer) {
        score++;
        scoreEl.textContent = score;
        
        feedback.textContent = 'Goed gedaan! ✅';
        feedback.className = 'feedback show correct';
        
        generateProblem();
    } else {
        lives--;
        updateHearts();

        if (lives > 0) {
            feedback.textContent = 'Fout! ❌ Het antwoord was ' + correctAnswer;
            feedback.className = 'feedback show incorrect';
            generateProblem();
        } else {
            endGame("Game Over! 💀");
        }
    }    
}

function endGame(reasonText) {
    gameActive = false;
    
    feedback.textContent = reasonText + ' Jouw score: ' + score;
    feedback.className = 'feedback show incorrect';

    inputSection.style.display = 'none';
    buttonSection.style.display = 'none';
    gameOverSection.style.display = 'block';
}

function resetGame() {
    lives = 3;
    score = 0;
    gameActive = true;

    scoreEl.textContent = score;
    updateHearts();
    feedback.textContent = '';
    feedback.className = 'feedback';

    gameOverSection.style.display = 'none';
    inputSection.style.display = 'block';
    buttonSection.style.display = 'flex';

    generateProblem();
}

checkBtn.addEventListener('click', checkAnswer);
newProblemBtn.addEventListener('click', generateProblem);
restartBtn.addEventListener('click', resetGame);

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

generateProblem();