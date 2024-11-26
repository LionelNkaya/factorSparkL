let maxNumber;
let currentStreak = 0;
let highScore = localStorage.getItem('highScore') || 0; // Load high score from local storage
let correctAnswer;

// Update high score on page load
document.getElementById('highScore').innerText = highScore;

// Function to start the quiz
function startQuiz() {
    maxNumber = parseInt(document.getElementById('maxNumber').value);
    
    if (!maxNumber || maxNumber < 2) {
        alert('Please enter a valid maximum number (2 or higher).');
        return;
    }

    currentStreak = 0;
    document.getElementById('streak').innerText = currentStreak;
    openTab('quizTab'); // Automatically switch to the quiz tab
    generateQuestion();
}

// Function to generate a random multiplication question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    
    correctAnswer = num1 * num2;
    
    document.getElementById('question').innerText = `${num1} × ${num2}`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

// Function to check the user's answer
function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    
    if (userAnswer === correctAnswer) {
        document.getElementById('correctSound').play(); // Play correct answer sound
        currentStreak++;
        document.getElementById('feedback').innerText = 'Correct! 🎉';
        document.getElementById('feedback').style.color = '#008000';
        updateStreak();
        setTimeout(generateQuestion, 1000); // Delay for 1 second before next question
    } else {
        document.getElementById('wrongSound').play(); // Play wrong answer sound
        document.getElementById('feedback').innerText = `Incorrect! The correct answer was ${correctAnswer}.`;
        document.getElementById('feedback').style.color = '#ff0000';
        endQuiz();
    }
}

// Function to update the streak and check for new high score
function updateStreak() {
    document.getElementById('streak').innerText = currentStreak;
    
    if (currentStreak > highScore) {
        highScore = currentStreak;
        localStorage.setItem('highScore', highScore); // Save new high score
        document.getElementById('highScore').innerText = highScore;
    }
}

// Function to end the quiz
function endQuiz() {
    currentStreak = 0;
    setTimeout(() => {
        alert('Game over! Try again to beat your high score!');
        openTab('inputTab'); // Switch back to setup tab
    }, 1000);
}

// Function to switch between tabs
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });
    document.getElementById(tabName).classList.add('active');
    document.getElementById(tabName).classList.remove('hidden');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
}
