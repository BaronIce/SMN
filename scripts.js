let buttons = document.querySelectorAll('.game-button');
let timerElement = document.getElementById('timer');
let currentScoreElement = document.getElementById('current-score');
let highScoreElement = document.getElementById('high-score');
let gameOverElement = document.getElementById('game-over');

let interval;
let gameTime = 1.0000; // Pierwsze odliczanie zaczyna się od 1 sekundy
let currentScore = 0;
let highScore = 0;
let activeButton;
let previousButton = null; // Przechowuje poprzednio aktywny przycisk
let gameActive = true;

function startGame() {
    resetGame();
    nextRound();
    interval = setInterval(updateTimer, 10);
    gameOverElement.classList.add('hidden');
    gameActive = true;
}

function resetGame() {
    gameTime = 1.0000; // Pierwsze odliczanie zaczyna się od 1 sekundy
    currentScore = 0;
    updateScore();
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
                gameTime = 0.5000; // Kolejne odliczania zaczynają się od 0,5 sekundy
                updateScore();
                nextRound();
            } else {
                endGame();
            }
        }
    });
});

function endGame() {
    clearInterval(interval);
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    gameActive = false;
    updateScore();
    gameOverElement.classList.remove('hidden');
}

gameOverElement.addEventListener('click', startGame);

window.onload = startGame;
