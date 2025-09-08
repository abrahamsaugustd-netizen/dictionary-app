// Quiz Application - Main JavaScript File

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const saveScoreBtn = document.getElementById('save-score-btn');
const usernameInput = document.getElementById('username');
const subjectSelect = document.getElementById('subject');
const difficultySelect = document.getElementById('difficulty');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const totalQuestionsElement = document.getElementById('total-questions');
const timeElement = document.getElementById('time');
const timeTakenElement = document.getElementById('time-taken');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const scoresList = document.getElementById('scores-list');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let startTime;
let questions = [];
let userAnswers = [];
let quizCompleted = false;

// Sample questions database (in a real app, this would come from a server)
const questionsDatabase = {
    math: {
        easy: [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "What is 5 × 6?",
                options: ["25", "30", "35", "40"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "What is the square root of 64?",
                options: ["6", "7", "8", "9"],
                correctAnswer: 2,
                points: 15
            },
            {
                question: "What is 15% of 200?",
                options: ["15", "20", "25", "30"],
                correctAnswer: 3,
                points: 15
            },
            {
                question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
                options: ["20", "24", "32", "64"],
                correctAnswer: 2,
                points: 20
            }
        ],
        medium: [
            {
                question: "Solve for x: 3x + 7 = 22",
                options: ["3", "4", "5", "6"],
                correctAnswer: 2,
                points: 15
            },
            {
                question: "What is the area of a circle with radius 5? (π ≈ 3.14)",
                options: ["15.7", "31.4", "78.5", "157"],
                correctAnswer: 2,
                points: 20
            },
            {
                question: "What is 7² + 3³?",
                options: ["58", "65", "76", "84"],
                correctAnswer: 2,
                points: 15
            },
            {
                question: "What is the slope of the line y = 2x + 3?",
                options: ["2", "3", "-2", "-3"],
                correctAnswer: 0,
                points: 20
            },
            {
                question: "If a triangle has angles of 90°, 45°, and 45°, what type of triangle is it?",
                options: ["Equilateral", "Isosceles", "Scalene", "Right"],
                correctAnswer: 1,
                points: 15
            }
        ],
        hard: [
            {
                question: "What is the derivative of x³ with respect to x?",
                options: ["2x²", "3x²", "3x", "x²"],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "What is the value of e^(iπ) + 1?",
                options: ["0", "1", "2", "-1"],
                correctAnswer: 0,
                points: 30
            },
            {
                question: "What is the integral of 1/x with respect to x?",
                options: ["ln|x| + C", "1/x² + C", "x ln(x) - x + C", "-1/x² + C"],
                correctAnswer: 0,
                points: 25
            },
            {
                question: "What is the sum of the interior angles of a hexagon?",
                options: ["540°", "720°", "900°", "1080°"],
                correctAnswer: 1,
                points: 20
            },
            {
                question: "What is the value of the golden ratio (φ)?",
                options: ["1.234...", "1.414...", "1.618...", "2.718..."],
                correctAnswer: 2,
                points: 25
            }
        ]
    },
    science: {
        easy: [
            {
                question: "What is the chemical symbol for water?",
                options: ["CO2", "H2O", "O2", "N2"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Platinum"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "What gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "What is the closest star to Earth?",
                options: ["Proxima Centauri", "Alpha Centauri A", "The Sun", "Sirius"],
                correctAnswer: 2,
                points: 10
            }
        ],
        medium: [
            {
                question: "What is the atomic number of Carbon?",
                options: ["4", "6", "8", "12"],
                correctAnswer: 1,
                points: 15
            },
            {
                question: "Which blood type is known as the universal donor?",
                options: ["A+", "B-", "AB+", "O-"],
                correctAnswer: 3,
                points: 15
            },
            {
                question: "What is the speed of light in a vacuum (approximately)?",
                options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
                correctAnswer: 0,
                points: 20
            },
            {
                question: "Which element has the chemical symbol 'Au'?",
                options: ["Silver", "Gold", "Aluminum", "Argon"],
                correctAnswer: 1,
                points: 15
            },
            {
                question: "What is the main component of the Sun?",
                options: ["Liquid Lava", "Hydrogen and Helium", "Oxygen and Nitrogen", "Carbon Dioxide"],
                correctAnswer: 1,
                points: 20
            }
        ],
        hard: [
            {
                question: "What is the Heisenberg Uncertainty Principle?",
                options: [
                    "The more precisely the position is determined, the less precisely the momentum is known",
                    "Energy cannot be created or destroyed, only transformed",
                    "For every action, there is an equal and opposite reaction",
                    "An object in motion stays in motion unless acted upon by an external force"
                ],
                correctAnswer: 0,
                points: 25
            },
            {
                question: "What is the approximate age of the universe in billions of years?",
                options: ["10.4", "13.8", "16.2", "19.5"],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "What is the function of the mitochondria in a cell?",
                options: [
                    "Protein synthesis",
                    "Cellular respiration and energy production",
                    "Waste removal",
                    "Cell division"
                ],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "What is the chemical formula for sulfuric acid?",
                options: ["HCl", "H2SO4", "HNO3", "H3PO4"],
                correctAnswer: 1,
                points: 20
            },
            {
                question: "What is the second law of thermodynamics?",
                options: [
                    "Energy cannot be created or destroyed",
                    "The entropy of an isolated system never decreases",
                    "For every action, there is an equal and opposite reaction",
                    "The speed of light is constant in a vacuum"
                ],
                correctAnswer: 1,
                points: 30
            }
        ]
    },
    history: {
        easy: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "Which ancient civilization built the Great Pyramids of Giza?",
                options: ["Greeks", "Romans", "Egyptians", "Mayans"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "During which century did the Renaissance begin?",
                options: ["13th century", "14th century", "15th century", "16th century"],
                correctAnswer: 1,
                points: 15
            },
            {
                question: "Who wrote the Declaration of Independence?",
                options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
                correctAnswer: 1,
                points: 10
            }
        ],
        medium: [
            {
                question: "What was the name of the ship that carried the Pilgrims to America in 1620?",
                options: ["Mayflower", "Santa Maria", "Nina", "Pinta"],
                correctAnswer: 0,
                points: 15
            },
            {
                question: "In which year did the Berlin Wall fall?",
                options: ["1987", "1989", "1991", "1993"],
                correctAnswer: 1,
                points: 15
            },
            {
                question: "Who was the first woman to win a Nobel Prize?",
                options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Jane Addams"],
                correctAnswer: 0,
                points: 15
            },
            {
                question: "Which empire was ruled by Genghis Khan?",
                options: ["Roman Empire", "Ottoman Empire", "Mongol Empire", "British Empire"],
                correctAnswer: 2,
                points: 15
            },
            {
                question: "What was the main cause of the American Civil War?",
                options: [
                    "Taxation without representation",
                    "Slavery",
                    "States' rights",
                    "Economic differences between the North and South"
                ],
                correctAnswer: 1,
                points: 20
            }
        ],
        hard: [
            {
                question: "Who was the Byzantine emperor who codified Roman law in the 6th century?",
                options: ["Constantine", "Justinian", "Theodora", "Heraclius"],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "What was the name of the treaty that ended the Thirty Years' War in 1648?",
                options: [
                    "Treaty of Versailles",
                    "Peace of Westphalia",
                    "Treaty of Tordesillas",
                    "Peace of Augsburg"
                ],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "Which ancient civilization developed the concept of zero?",
                options: ["Egyptians", "Greeks", "Mayans", "Indians"],
                correctAnswer: 3,
                points: 25
            },
            {
                question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
                options: [
                    "Joseph Stalin",
                    "Leonid Brezhnev",
                    "Nikita Khrushchev",
                    "Mikhail Gorbachev"
                ],
                correctAnswer: 2,
                points: 20
            },
            {
                question: "What was the main cause of the French Revolution?",
                options: [
                    "Religious conflicts",
                    "Economic hardship and social inequality",
                    "Foreign invasion",
                    "A pandemic"
                ],
                correctAnswer: 1,
                points: 25
            }
        ]
    },
    geography: {
        easy: [
            {
                question: "What is the largest continent by land area?",
                options: ["Africa", "North America", "Asia", "Antarctica"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "Which is the longest river in the world?",
                options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                correctAnswer: 1,
                points: 10
            },
            {
                question: "What is the capital of Japan?",
                options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
                correctAnswer: 2,
                points: 10
            },
            {
                question: "Which desert is the largest in the world?",
                options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
                correctAnswer: 0,
                points: 10
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
                correctAnswer: 2,
                points: 10
            }
        ],
        medium: [
            {
                question: "Which country has the most time zones?",
                options: ["Russia", "United States", "France", "China"],
                correctAnswer: 2,
                points: 15
            },
            {
                question: "What is the capital of Canada?",
                options: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
                correctAnswer: 1,
                points: 15
            },
            {
                question: "Which mountain range separates Europe from Asia?",
                options: ["Andes", "Himalayas", "Alps", "Ural"],
                correctAnswer: 3,
                points: 15
            },
            {
                question: "What is the only sea without any coasts?",
                options: [
                    "Sargasso Sea",
                    "Mediterranean Sea",
                    "Caribbean Sea",
                    "Red Sea"
                ],
                correctAnswer: 0,
                points: 20
            },
            {
                question: "Which country is both in Europe and Asia?",
                options: ["Greece", "Turkey", "Egypt", "Russia"],
                correctAnswer: 3,
                points: 15
            }
        ],
        hard: [
            {
                question: "What is the only country that borders both the Atlantic and Indian Oceans?",
                options: ["Brazil", "South Africa", "Australia", "India"],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "Which of these countries is NOT landlocked?",
                options: ["Nepal", "Bolivia", "Mongolia", "Laos"],
                correctAnswer: 1, // Bolivia has a navy despite being landlocked
                points: 25
            },
            {
                question: "What is the deepest known point in the world's oceans?",
                options: [
                    "Puerto Rico Trench",
                    "Mariana Trench",
                    "Tonga Trench",
                    "Philippine Trench"
                ],
                correctAnswer: 1,
                points: 25
            },
            {
                question: "Which country has the most islands?",
                options: ["Canada", "Indonesia", "Philippines", "Sweden"],
                correctAnswer: 0,
                points: 25
            },
            {
                question: "What is the only continent that lies in all four hemispheres?",
                options: ["Africa", "South America", "Australia", "Asia"],
                correctAnswer: 0,
                points: 30
            }
        ]
    }
};

// Initialize the application
function init() {
    loadScores();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Start button
    startBtn.addEventListener('click', startQuiz);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', showResults);
    
    // Results screen buttons
    retryBtn.addEventListener('click', retryQuiz);
    newQuizBtn.addEventListener('click', startNewQuiz);
    saveScoreBtn.addEventListener('click', saveScore);
    
    // Handle option selection
    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('option')) {
            const selectedOption = parseInt(e.target.dataset.option);
            selectOption(selectedOption);
        }
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (quizScreen.classList.contains('active')) {
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                if (optionIndex < questions[currentQuestionIndex].options.length) {
                    selectOption(optionIndex);
                }
            } else if (e.key === 'ArrowLeft') {
                showPreviousQuestion();
            } else if (e.key === 'ArrowRight' || e.key === ' ') {
                if (currentQuestionIndex < questions.length - 1) {
                    showNextQuestion();
                } else {
                    showResults();
                }
            } else if (e.key === 'Enter') {
                if (currentQuestionIndex < questions.length - 1) {
                    showNextQuestion();
                } else {
                    showResults();
                }
            }
        }
    });
}

// Start the quiz
function startQuiz() {
    const username = usernameInput.value.trim();
    const subject = subjectSelect.value;
    const difficulty = difficultySelect.value;
    
    if (!username) {
        alert('Please enter your name');
        return;
    }
    
    if (!subject) {
        alert('Please select a subject');
        return;
    }
    
    // Set username in the UI
    document.querySelector('.user-score').textContent = `Player: ${username}`;
    
    // Get questions based on subject and difficulty
    questions = [...questionsDatabase[subject][difficulty]];
    
    // Shuffle questions
    shuffleArray(questions);
    
    // Initialize user answers array
    userAnswers = new Array(questions.length).fill(null);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    quizCompleted = false;
    
    // Update UI
    updateScore(0);
    updateProgress();
    showScreen('quiz-screen');
    
    // Start timer
    startTimer();
    
    // Show first question
    showQuestion();
}

// Show a specific question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.option = index;
        
        // Mark selected option if any
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Reset timer for this question
    resetTimer();
}

// Select an option
function selectOption(optionIndex) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    options[optionIndex].classList.add('selected');
    
    // Save user's answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Automatically move to next question if not the last one
    if (currentQuestionIndex < questions.length - 1) {
        setTimeout(showNextQuestion, 500);
    }
}

// Show next question
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

// Show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Update navigation buttons state
function updateNavigationButtons() {
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next button
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    
    // Submit button
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
}

// Start the timer
function startTimer() {
    startTime = new Date();
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Reset the timer for the current question
function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// Calculate and show results
function showResults() {
    clearInterval(timer);
    
    // Calculate score
    let correctCount = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correctCount++;
            score += question.points;
        }
    });
    
    // Update results screen
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = correctCount;
    totalQuestionsElement.textContent = questions.length;
    
    // Calculate time taken
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    timeTakenElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Show results screen
    showScreen('results-screen');
    
    // Mark quiz as completed
    quizCompleted = true;
}

// Retry the same quiz
function retryQuiz() {
    // Reset user answers
    userAnswers = new Array(questions.length).fill(null);
    
    // Reset score
    score = 0;
    updateScore(0);
    
    // Reset question index
    currentQuestionIndex = 0;
    
    // Show quiz screen
    showScreen('quiz-screen');
    
    // Start timer and show first question
    startTimer();
    showQuestion();
}

// Start a new quiz
function startNewQuiz() {
    showScreen('start-screen');
}

// Save score to local storage
function saveScore() {
    const username = usernameInput.value.trim();
    const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
    const difficulty = difficultySelect.value;
    const date = new Date().toLocaleDateString();
    
    if (!username) {
        alert('Please enter your name first');
        return;
    }
    
    // Get existing scores or initialize empty array
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    
    // Add new score
    scores.push({
        username,
        subject,
        difficulty,
        score,
        date,
        correct: document.getElementById('correct-answers').textContent,
        total: questions.length
    });
    
    // Save to local storage
    localStorage.setItem('quizScores', JSON.stringify(scores));
    
    // Update scores display
    loadScores();
    
    // Show success message
    alert('Score saved successfully!');
}

// Load and display saved scores
function loadScores() {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    const username = usernameInput.value.trim();
    
    // Filter scores for current user if username is provided
    const userScores = username 
        ? scores.filter(score => score.username.toLowerCase() === username.toLowerCase())
        : [];
    
    // Sort by score (descending)
    userScores.sort((a, b) => b.score - a.score);
    
    // Update scores list
    scoresList.innerHTML = '';
    
    if (userScores.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No saved scores yet';
        li.className = 'no-scores';
        scoresList.appendChild(li);
    } else {
        userScores.slice(0, 10).forEach((score, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="score-rank">${index + 1}.</span>
                <span class="score-subject">${score.subject} (${score.difficulty})</span>
                <span class="score-points">${score.score} pts</span>
                <span class="score-details">${score.correct}/${score.total} correct</span>
                <span class="score-date">${score.date}</span>
            `;
            scoresList.appendChild(li);
        });
    }
}

// Update score display
function updateScore(points) {
    score += points;
    scoreElement.textContent = score;
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.add('active');
    
    // Update progress if on quiz screen
    if (screenId === 'quiz-screen') {
        updateProgress();
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
