let buttons = document.querySelectorAll('.game-button');
let timerElement = document.getElementById('timer');
let currentScoreElement = document.getElementById('current-score');
let highScoreElement = document.getElementById('high-score');
let currentLevelElement = document.getElementById('current-level');
let nextLevelScoreElement = document.getElementById('next-level-score');
let gameOverElement = document.getElementById('game-over');

let interval;
let gameTime = 1.0000; // Initial countdown starts from 1 second
let currentScore = 0;
let highScore = 0;
let activeButton;
let previousButton = null; // Stores the previously active button
let gameActive = true;
let level = 'easy';
let nextLevelScore = 30;

function startGame() {
    resetGame();
    nextRound();
    interval = setInterval(updateTimer, 10);
    gameOverElement.classList.add('hidden');
    gameActive = true;
}

function resetGame() {
    gameTime = 1.0000; // Initial countdown starts from 1 second
    currentScore = 0;
    level = 'easy';
    nextLevelScore = 30;
    updateScore();
    updateLevelDisplay();
    updateTimerDisplay();
}

function updateTimer() {
    if (gameActive) {
        gameTime -= 0.01;
        if (gameTime <= 0) {
            endGame();
        } else {
            updateTimerDisplay();
        }
    }
}

function updateTimerDisplay() {
    timerElement.textContent = gameTime.toFixed(4);
}

function updateScore() {
    currentScoreElement.textContent = `Current Score: ${currentScore}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
}

function updateLevelDisplay() {
    currentLevelElement.textContent = `Level: ${capitalize(level)}`;
    nextLevelScoreElement.textContent = `Next Level: ${nextLevelScore}`;
}

function nextRound() {
    if (activeButton) {
        activeButton.classList.remove('active');
    }

    do {
        activeButton = buttons[Math.floor(Math.random() * buttons.length)];
    } while (activeButton === previousButton);

    activeButton.classList.add('active');
    previousButton = activeButton;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (gameActive) {
            if (button === activeButton) {
                currentScore++;
                updateScore();
                if (currentScore >= nextLevelScore) {
                    advanceLevel();
                } else {
                    adjustGameTime();
                    nextRound();
                }
            } else {
                endGame();
            }
        }
    });
});

function advanceLevel() {
    if (level === 'easy') {
        level = 'medium';
        nextLevelScore = 60;
        gameTime = 1.0000;
    } else if (level === 'medium') {
        level = 'hard';
        nextLevelScore = 90;
        gameTime = 1.0000;
    }
    updateLevelDisplay();
    nextRound();
}

function adjustGameTime() {
    if (level === 'easy') {
        gameTime = 0.5000;
    } else if (level === 'medium') {
        gameTime = 0.4000;
    } else if (level === 'hard') {
        gameTime = 0.3000;
    }
}

function endGame() {
    clearInterval(interval);
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    gameActive = false;
    updateScore();
    gameOverElement.classList.remove('hidden');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

gameOverElement.addEventListener('click', startGame);

window.onload = startGame;
