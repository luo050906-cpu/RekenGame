let score = 0;
let correctAnswer = 0;
let timeoutId = null;
let lives = 3;

const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const answerInput = document.getElementById('answer-input');
const checkBtn = document.getElementById('check-btn');
const newProblemBtn = document.getElementById('new-problem-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const heartsEl = document.getElementById('hearts');

const inputSection = document.getElementById('input-section');
const buttonSection = document.getElementById('button-section');
const gameOverSection = document.getElementById('game-over-section');
const restartBtn = document.getElementById('restart-btn');

function updateHearts() {
    let heartsText = "";
    for (let i = 0; i < lives; i++) heartsText += "❤️";
    for (let i = lives; i < 3; i++) heartsText += "🤍";
    heartsEl.textContent = heartsText;
}

function resetGame() {
    lives = 3;
    score = 0;
    scoreEl.textContent = score;
    updateHearts();
    
    gameOverSection.style.display = 'none';
    inputSection.style.display = 'block';
    buttonSection.style.display = 'flex';
    
    generateProblem();
}

function generateProblem() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    
    answerInput.disabled = false;
    checkBtn.disabled = false;
    
    const num1 = Math.floor(Math.random() * 11);
    const num2 = Math.floor(Math.random() * 11);
    
    correctAnswer = num1 * num2;
    
    num1El.textContent = num1;
    num2El.textContent = num2;
    
    answerInput.value = '';
    feedbackEl.className = 'feedback';
    feedbackEl.textContent = '';
    
    answerInput.focus();
}

function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback show ${type}`;
}

function checkAnswer() {
    if (lives <= 0) return;

    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        showFeedback('Vul eerst een getal in!', 'incorrect');
        answerInput.focus();
        return;
    }

    answerInput.disabled = true;
    checkBtn.disabled = true;

    if (userAnswer === correctAnswer) {
        score++;
        scoreEl.textContent = score;
        showFeedback('Goed gedaan! ✅', 'correct');
        
        timeoutId = setTimeout(generateProblem, 1500);
    } else {
        lives--;
        updateHearts();
        
        if (lives > 0) {
            showFeedback(`Fout! ❌ Het antwoord was ${correctAnswer}.`, 'incorrect');
            timeoutId = setTimeout(generateProblem, 3500);
        } else {
            showFeedback(`Game Over! 💀 Jouw score: ${score}`, 'incorrect');
            
            inputSection.style.display = 'none';
            buttonSection.style.display = 'none';
            
            gameOverSection.style.display = 'block';
        }
    }
}

checkBtn.addEventListener('click', checkAnswer);
newProblemBtn.addEventListener('click', generateProblem);
restartBtn.addEventListener('click', resetGame);

answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

generateProblem();
