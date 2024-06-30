const words = [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "grape", "honeydew",
    "kiwi", "lemon", "mango", "Nectarine", "Orange", "Papaya", "Quince", "raspberry",
    "strawberry", "tangerine", "watermelon", "name", "happy", "love", "India", "Capital", "cool", "unique", "and", "beautiful", "Bumblebee", "Heaven", "Although", "Wonder", "Discombobulate", "Belly", "button" , "Fluffy",  "Silky", "Friends", "Vikram", "Buddy", "Relax", "Meditation", "Yoga", "America...!"
];

let score = 0;
let wordIndex = 0;
let time = 120; // 2 minutes in seconds
let timerInterval;
let attempts = 0;
let correctAttempts = 0;

const wordDisplay = document.getElementById('wordDisplay');
const typedWordInput = document.getElementById('typedWordInput');
const scoreDisplay = document.getElementById('score');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Initialize game
function init() {
    showWord(words[wordIndex]);
    typedWordInput.addEventListener('input', startMatch);
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
}

// Start game
function startGame() {
    score = 0;
    wordIndex = 0;
    time = 120;
    attempts = 0;
    correctAttempts = 0;
    updateScore();
    updateAccuracy();
    showWord(words[wordIndex]);
    typedWordInput.value = '';
    typedWordInput.focus();
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none'; // Hide restart button initially
    typedWordInput.addEventListener('input', startMatch);
    startTimer();
}

// Restart game
function restartGame() {
    clearInterval(timerInterval);
    score = 0;
    wordIndex = 0;
    time = 120;
    attempts = 0;
    correctAttempts = 0;
    updateScore();
    updateAccuracy();
    showWord(words[wordIndex]);
    typedWordInput.value = '';
    typedWordInput.focus();
    restartBtn.style.display = 'none'; // Hide restart button
    typedWordInput.addEventListener('input', startMatch);
    startTimer();
}

// Show random word
function showWord(word) {
    wordDisplay.textContent = word;
}

// Start matching
function startMatch() {
    attempts++;
    if (matchWords()) {
        correctAttempts++;
        wordIndex++;
        score++;
        updateScore();
        updateAccuracy();
        showWord(words[wordIndex]);
        typedWordInput.value = '';
    }
}

// Match typed word with displayed word
function matchWords() {
    if (typedWordInput.value === wordDisplay.textContent) {
        return true;
    } else {
        return false;
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = score;
}

// Update accuracy
function updateAccuracy() {
    if (attempts > 0) {
        let accuracy = Math.round((correctAttempts / attempts) * 100);
        accuracyDisplay.textContent = `${accuracy}%`;
    } else {
        accuracyDisplay.textContent = '0%';
    }
}

// Start timer
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// Update timer display
function updateTimer() {
    if (time > 0) {
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

// End game
function endGame() {
    typedWordInput.removeEventListener('input', startMatch);
    typedWordInput.disabled = true;
    alert(`Game over! Your score is ${score}. Accuracy: ${accuracyDisplay.textContent}`);
    restartBtn.style.display = 'inline-block'; // Show restart button
}

// Start game on page load
init();
