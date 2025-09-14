// Quiz Application

// DOM Elements
let questionElement;
let optionsContainer;
let nextButton;
let currentQuestionElement;
let totalQuestionsElement;
let scoreElement;
let quizContent;
let resultContainer;
let finalScoreElement;
let maxScoreElement;
let resultMessageElement;
let restartButton;
let progressBar;

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedOption = null;
let isAnswered = false;

// Quiz questions
const quizQuestions = [
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Ag", "Au", "Gd"],
        correctAnswer: 2,
        subject: "Science",
        explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'. Gold is a chemical element with the atomic number 79 and is a soft, yellow, dense metal."
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        subject: "Geography",
        explanation: "Paris is the capital and most populous city of France. It's known as the 'City of Light' and is famous for its art, fashion, gastronomy, and culture. The Eiffel Tower, one of the most recognizable landmarks in the world, is located in Paris."
    },
    {
        question: "What is 5 x 7?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 2,
        subject: "Mathematics",
        explanation: "The product of 5 and 7 is 35. This is a basic arithmetic operation, where you multiply two numbers to get their product. The '*' symbol is called a multiplication sign and represents multiplication in mathematics."
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        subject: "Literature",
        explanation: "William Shakespeare, the famous English playwright, wrote 'Romeo and Juliet' between 1591 and 1595. It's one of his most popular and frequently performed plays, telling the tragic story of two young star-crossed lovers."
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: 1,
        subject: "Science",
        explanation: "Jupiter is the largest planet in our solar system, with a diameter of approximately 142,984 kilometers (88,846 miles). It's a gas giant, composed mainly of hydrogen and helium, and is known for its distinctive banded appearance."
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        subject: "History",
        explanation: "World War II ended in 1945. The war in Europe ended with Germany's surrender on May 8, 1945 (V-E Day), and the war in the Pacific ended with Japan's surrender on September 2, 1945 (V-J Day), after the atomic bombings of Hiroshima and Nagasaki."
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: 2,
        subject: "Geography",
        explanation: "Tokyo is the capital and largest city of Japan. It's a global hub for business, finance, culture, and technology, and is known for its vibrant atmosphere, rich history, and world-class cuisine."
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
        subject: "Mathematics",
        explanation: "The square root of 64 is 8 because 8 × 8 = 64. In mathematics, a square root of a number is a value that, when multiplied by itself, gives the original number. The square root symbol is √, so √64 = 8."
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        subject: "Art",
        explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. This iconic portrait, also known as 'La Gioconda', is famous for the subject's enigmatic smile and is considered an archetypal masterpiece of the Italian Renaissance. It's currently displayed at the Louvre Museum in Paris."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        subject: "Science",
        explanation: "The Blue Whale is the largest animal known to have ever existed, reaching lengths of up to 100 feet (30 meters) and weights of up to 200 tons. Its heart alone can weigh as much as a car!"
    }
];

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the quiz
function initQuiz() {
    // Shuffle questions and select the first 10
    questions = shuffleArray([...quizQuestions]).slice(0, 10);
    totalQuestionsElement.textContent = questions.length;
    currentQuestionIndex = 0;
    score = 0;
    
    // Reset UI elements
    nextButton.style.display = 'none';
    quizContent.classList.remove('hidden');
    
    // Hide result container and clear its content
    if (resultContainer) {
        resultContainer.style.display = 'none';
        resultContainer.innerHTML = '';
    }
    
    updateScore();
    showQuestion();
}

// Display the current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update UI
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create and append option elements
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.setAttribute('data-index', index);
        
        optionElement.addEventListener('click', () => selectOption(optionElement, index));
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Reset state
    isAnswered = false;
    selectedOption = null;
    nextButton.disabled = true;
    
    // Update button text and hide it initially
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question';
    nextButton.style.display = 'none'; // Hide by default, will show when an option is selected
}

// Handle option selection
function selectOption(optionElement, optionIndex) {
    if (isAnswered) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    // Mark the selected option
    optionElement.classList.add('selected');
    selectedOption = optionElement;
    
    // Disable all options
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');
    
    // Show the Next/Finish button after an option is selected
    nextButton.style.display = 'block';
    
    // Mark correct and incorrect answers
    allOptions.forEach((option, index) => {
        if (index === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (option === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show explanation if available
    if (currentQuestion.explanation) {
        const explanation = document.createElement('div');
        explanation.className = 'explanation';
        explanation.innerHTML = `<strong>Explanation:</strong> ${currentQuestion.explanation}`;
        optionsContainer.appendChild(explanation);
    }
    
    // Update score if correct
    if (isCorrect) {
        score += 10;
        updateScore();
    }
    
    isAnswered = true;
    nextButton.disabled = false;
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
}

// Move to the next question or finish the quiz
function nextQuestion() {
    if (!isAnswered) return;
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else if (currentQuestionIndex === questions.length - 1) {
        // Only finish if we're on the last question and it's been answered
        if (isAnswered) {
            finishQuiz();
        }
    }
}

// Handle quiz completion
function finishQuiz() {
    // Hide quiz content and next button
    quizContent.classList.add('hidden');
    nextButton.style.display = 'none';
    
    // Show result container
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <div class="result-message">
            ${getResultMessage()}
        </div>
        <button id="restart-btn" class="restart-btn">Restart Quiz</button>
    `;
    
    // Add event listener to the new restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
        resultContainer.style.display = 'none';
        initQuiz();
    });
}

// Get the appropriate result message based on score
function getResultMessage() {
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) {
        return '🎉 Excellent! You really know your stuff!';
    } else if (percentage >= 70) {
        return '👍 Good job! You have a solid understanding.';
    } else if (percentage >= 50) {
        return '👏 Not bad! A little more practice and you\'ll be great!';
    } else {
        return '💪 Keep practicing! You\'ll get better with time!';
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Get all DOM elements after they're loaded
        questionElement = document.getElementById('question');
        optionsContainer = document.querySelector('.options-container');
        nextButton = document.getElementById('next-btn');
        currentQuestionElement = document.getElementById('current-question');
        totalQuestionsElement = document.getElementById('total-questions');
        scoreElement = document.getElementById('score');
        quizContent = document.querySelector('.quiz-content');
        resultContainer = document.querySelector('.result-container');
        finalScoreElement = document.getElementById('final-score');
        maxScoreElement = document.getElementById('max-score');
        resultMessageElement = document.getElementById('result-message');
        restartButton = document.getElementById('restart-btn');
        progressBar = document.querySelector('.progress');
        
        if (!questionElement || !optionsContainer || !nextButton) {
            console.error('Required DOM elements not found');
            return;
        }
        
        // Initialize the quiz
        initQuiz();
        
        // Add event listeners
        nextButton.addEventListener('click', nextQuestion);
        
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                // Show quiz content and hide results
                quizContent.classList.remove('hidden');
                resultContainer.classList.add('hidden');
                
                // Reset and restart the quiz
                initQuiz();
            });
        }
    } catch (error) {
        console.error('Error initializing quiz:', error);
    }
});

