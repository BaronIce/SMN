let buttons = document.querySelectorAll('.game-button');
let timerElement = document.getElementById('timer');
let currentScoreElement = document.getElementById('current-score');
let highScoreElement = document.getElementById('high-score');
let gameOverElement = document.getElementById('game-over');
let currentLevelElement = document.getElementById('current-level');
let nextThresholdElement = document.getElementById('next-threshold');

let interval;
let gameTime = 1.0000; // Pierwsze odliczanie zaczyna się od 1 sekundy
let currentScore = 0;
let highScore = 0;
let activeButton;
let previousButton = null; // Przechowuje poprzednio aktywny przycisk
let gameActive = true;
let currentLevel = 'easy'; // Startujemy od poziomu 'easy'

const levelSettings = {
    easy: {
        threshold: 30,
        initialTime: 1.0000,
        decrementTime: 0.5000,
        nextLevel: 'medium'
    },
    medium: {
        threshold: 30,
        initialTime: 1.0000,
        decrementTime: 0.4000,
        nextLevel: 'hard'
    },
    hard: {
        threshold: 30,
        initialTime: 1.0000,
        decrementTime: 0.3000,
        nextLevel: null // Ostatni poziom
    }
};

function startGame() {
    resetGame();
    nextRound();
    interval = setInterval(updateTimer, 10);
    gameOverElement.classList.add('hidden');
    gameActive = true;
}

function resetGame() {
    currentLevel = 'easy'; // Resetujemy do poziomu 'easy'
    setLevelSettings();
    currentScore = 0;
    updateScore();
    updateTimerDisplay();
    updateLevelDisplay();
}

function setLevelSettings() {
    gameTime = levelSettings[currentLevel].initialTime;
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
    currentLevelElement.textContent = `Level: ${capitalizeFirstLetter(currentLevel)}`;
    if (levelSettings[currentLevel].nextLevel) {
        nextThresholdElement.textContent = `Next Level at: ${levelSettings[currentLevel].threshold} points`;
    } else {
        nextThresholdElement.textContent = `Max Level Reached`;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkLevelUp() {
    if (currentScore >= levelSettings[currentLevel].threshold) {
        if (levelSettings[currentLevel].nextLevel) {
            currentLevel = levelSettings[currentLevel].nextLevel;
            setLevelSettings();
            updateLevelDisplay();
            alert(`Level Up! Welcome to ${currentLevel} level!`);
        }
    }
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
                gameTime = levelSettings[currentLevel].decrementTime;
                updateScore();
                checkLevelUp();
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
