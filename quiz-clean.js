// Quiz Application

// DOM Elements
let questionElement;
let optionsContainer;
let nextButton;
let quizContent;
let resultContainer;
let finalScoreElement;
let maxScoreElement;
let resultMessageElement;
let restartButton;

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedOption = null;
let isAnswered = false;

// Quiz questions
const quizQuestions = [
    // Science Questions
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Ag", "Au", "Gd"],
        correctAnswer: 2,
        subject: "Science",
        explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'. Gold is a chemical element with the atomic number 79 and is a soft, yellow, dense metal."
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: 1,
        subject: "Science",
        explanation: "Jupiter is the largest planet in our solar system, with a diameter of approximately 142,984 kilometers (88,846 miles). It's a gas giant, composed mainly of hydrogen and helium, and is known for its distinctive banded appearance."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        subject: "Science",
        explanation: "The Blue Whale is the largest animal known to have ever existed, reaching lengths of up to 100 feet (30 meters) and weights of up to 200 tons. Its heart alone can weigh as much as a car!"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2,
        subject: "Science",
        explanation: "Diamond is the hardest known natural material on Earth. It's an allotrope of carbon where the carbon atoms are arranged in a crystal structure called diamond cubic, which gives it exceptional hardness and thermal conductivity."
    },
    {
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        correctAnswer: 1,
        subject: "Science",
        explanation: "The chemical formula for water is H₂O, meaning each water molecule consists of two hydrogen atoms covalently bonded to one oxygen atom. This simple molecular structure is essential for all known forms of life."
    },

    // Geography Questions
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        subject: "Geography",
        explanation: "Paris is the capital and most populous city of France. It's known as the 'City of Light' and is famous for its art, fashion, gastronomy, and culture. The Eiffel Tower, one of the most recognizable landmarks in the world, is located in Paris."
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: 2,
        subject: "Geography",
        explanation: "Tokyo is the capital and largest city of Japan. It's a global hub for business, finance, culture, and technology, and is known for its vibrant atmosphere, rich history, and world-class cuisine."
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctAnswer: 1,
        subject: "Geography",
        explanation: "The Nile River is generally considered the longest river in the world, stretching about 6,650 kilometers (4,130 miles) long. It flows through northeastern Africa and is historically significant as the cradle of ancient Egyptian civilization."
    },
    {
        question: "Which country has the largest population in the world?",
        options: ["India", "United States", "China", "Indonesia"],
        correctAnswer: 2,
        subject: "Geography",
        explanation: "As of recent data, China has the largest population in the world, with over 1.4 billion people. However, India is projected to surpass China in the near future due to different population growth rates."
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
        correctAnswer: 3,
        subject: "Geography",
        explanation: "The Antarctic Desert is the largest desert in the world, covering about 14 million square kilometers. While we often associate deserts with hot, sandy environments, a desert is technically defined by its low precipitation levels."
    },

    // Mathematics Questions
    {
        question: "What is 5 x 7?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 2,
        subject: "Mathematics",
        explanation: "The product of 5 and 7 is 35. This is a basic arithmetic operation, where you multiply two numbers to get their product. The '*' symbol is called a multiplication sign and represents multiplication in mathematics."
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
        subject: "Mathematics",
        explanation: "The square root of 64 is 8 because 8 × 8 = 64. In mathematics, a square root of a number is a value that, when multiplied by itself, gives the original number. The square root symbol is √, so √64 = 8."
    },
    {
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        correctAnswer: 1,
        subject: "Mathematics",
        explanation: "The value of π (pi) to two decimal places is 3.14. Pi is a mathematical constant representing the ratio of a circle's circumference to its diameter. It's an irrational number, meaning its decimal representation goes on infinitely without repeating."
    },
    {
        question: "What is the sum of the angles in a triangle?",
        options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
        correctAnswer: 1,
        subject: "Mathematics",
        explanation: "The sum of the interior angles in any triangle is always 180 degrees. This is a fundamental property of Euclidean geometry. Whether the triangle is equilateral, isosceles, or scalene, the angles will always add up to 180 degrees."
    },
    {
        question: "What is 12 squared?",
        options: ["124", "136", "144", "156"],
        correctAnswer: 2,
        subject: "Mathematics",
        explanation: "12 squared (12²) equals 144. Squaring a number means multiplying it by itself. In this case, 12 × 12 = 144. Square numbers are called 'perfect squares' and are the squares of integers."
    },

    // Literature Questions
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        subject: "Literature",
        explanation: "William Shakespeare, the famous English playwright, wrote 'Romeo and Juliet' between 1591 and 1595. It's one of his most popular and frequently performed plays, telling the tragic story of two young star-crossed lovers."
    },
    {
        question: "Which novel begins with the line, 'It was the best of times, it was the worst of times'?",
        options: ["Moby Dick", "Pride and Prejudice", "A Tale of Two Cities", "Great Expectations"],
        correctAnswer: 2,
        subject: "Literature",
        explanation: "The opening line 'It was the best of times, it was the worst of times' is from Charles Dickens' 'A Tale of Two Cities' (1859). The novel is set in London and Paris before and during the French Revolution."
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.D. Salinger", "F. Scott Fitzgerald", "Ernest Hemingway"],
        correctAnswer: 0,
        subject: "Literature",
        explanation: "'To Kill a Mockingbird' was written by Harper Lee and published in 1960. It won the Pulitzer Prize and has become a classic of modern American literature, dealing with issues of racial injustice and moral growth."
    },
    {
        question: "Which of these is NOT a play by William Shakespeare?",
        options: ["Macbeth", "Hamlet", "The Tempest", "Frankenstein"],
        correctAnswer: 3,
        subject: "Literature",
        explanation: "'Frankenstein' is a novel written by Mary Shelley, not a play by William Shakespeare. It was first published in 1818 and is considered an early example of science fiction. The other options are all famous plays by Shakespeare."
    },
    {
        question: "Who wrote '1984'?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
        correctAnswer: 1,
        subject: "Literature",
        explanation: "'1984' was written by George Orwell and published in 1949. It's a dystopian novel set in a totalitarian society where the government exercises extreme control over all aspects of people's lives, including their thoughts."
    },

    // History Questions
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        subject: "History",
        explanation: "World War II ended in 1945. The war in Europe ended with Germany's surrender on May 8, 1945 (V-E Day), and the war in the Pacific ended with Japan's surrender on September 2, 1945 (V-J Day), after the atomic bombings of Hiroshima and Nagasaki."
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: 2,
        subject: "History",
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797. He previously led Patriot forces to victory in the American Revolutionary War and presided at the Constitutional Convention of 1787."
    },
    {
        question: "The Renaissance began in which country?",
        options: ["France", "England", "Italy", "Spain"],
        correctAnswer: 2,
        subject: "History",
        explanation: "The Renaissance began in Italy in the 14th century and later spread to the rest of Europe. It was a period of great cultural, artistic, political and economic 'rebirth' following the Middle Ages, marking the transition from medieval to modern times."
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Jane Addams"],
        correctAnswer: 0,
        subject: "History",
        explanation: "Marie Curie was the first woman to win a Nobel Prize and the only person to win in two different scientific fields (Physics in 1903 and Chemistry in 1911). She conducted pioneering research on radioactivity, a term she coined herself."
    },
    {
        question: "Which ancient civilization built the Great Pyramids of Giza?",
        options: ["Ancient Greeks", "Ancient Egyptians", "Mayans", "Ancient Chinese"],
        correctAnswer: 1,
        subject: "History",
        explanation: "The Great Pyramids of Giza were built by the Ancient Egyptians during the Old Kingdom period, around 2580–2560 BCE. The largest, the Great Pyramid of Khufu, is one of the Seven Wonders of the Ancient World and the only one still in existence."
    },

    // Art Questions
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        subject: "Art",
        explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. This iconic portrait, also known as 'La Gioconda', is famous for the subject's enigmatic smile and is considered an archetypal masterpiece of the Italian Renaissance. It's currently displayed at the Louvre Museum in Paris."
    },
    {
        question: "Which artist cut off part of his own ear?",
        options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dalí"],
        correctAnswer: 2,
        subject: "Art",
        explanation: "Vincent van Gogh famously cut off part of his own left ear in 1888 during a period of mental distress. This incident is one of the most famous events in art history and has been the subject of much analysis and speculation."
    },
    {
        question: "What art movement is Salvador Dalí associated with?",
        options: ["Impressionism", "Cubism", "Surrealism", "Expressionism"],
        correctAnswer: 2,
        subject: "Art",
        explanation: "Salvador Dalí was a prominent Spanish surrealist artist known for his striking and bizarre images. His most famous work is 'The Persistence of Memory' (1931), featuring melting clocks in a dreamlike landscape."
    },
    {
        question: "Which artist painted the ceiling of the Sistine Chapel?",
        options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
        correctAnswer: 2,
        subject: "Art",
        explanation: "Michelangelo painted the ceiling of the Sistine Chapel between 1508 and 1512. The work, which includes the famous 'Creation of Adam' scene, is considered a cornerstone work of High Renaissance art."
    },
    {
        question: "What is the name of Edvard Munch's most famous painting?",
        options: ["The Starry Night", "The Scream", "The Kiss", "American Gothic"],
        correctAnswer: 1,
        subject: "Art",
        explanation: "Edvard Munch's most famous painting is 'The Scream' (1893), which has become an icon of existential angst. The agonized face in the painting has become one of the most iconic images of art, seen as symbolizing the anxiety of the human condition."
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
    
    showQuestion();
}

// Display the current question
function showQuestion() {
    console.log('showQuestion called, current index:', currentQuestionIndex);
    console.log('Questions array:', questions);
    
    if (!questions || questions.length === 0) {
        console.error('No questions available');
        return;
    }
    
    if (currentQuestionIndex >= questions.length) {
        console.log('Quiz finished, showing results');
        finishQuiz();
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        console.error('Current question is undefined at index:', currentQuestionIndex);
        return;
    }
    
    console.log('Current question:', currentQuestion);
    
    // Update question text
    if (questionElement) {
        console.log('Updating question element with:', currentQuestion.question);
        questionElement.textContent = currentQuestion.question;
        
        // Force a reflow to ensure the element updates
        questionElement.style.display = 'none';
        questionElement.offsetHeight; // Trigger reflow
        questionElement.style.display = 'block';
    } else {
        console.error('Question element not found');
        return;
    }
    
    // Clear previous options and any existing explanation
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    } else {
        console.error('Options container not found');
        return;
    }
    
    // Create and append new options
    if (currentQuestion.options && Array.isArray(currentQuestion.options)) {
        currentQuestion.options.forEach((option, index) => {
            if (!option) return;
            
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.style.pointerEvents = 'auto'; // Ensure options are clickable
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            if (optionsContainer) optionsContainer.appendChild(optionElement);
        });
    } else {
        console.error('No options found for question:', currentQuestion);
        return;
    }
    
    // Reset quiz state
    selectedOption = null;
    isAnswered = false;
    
    // Update next button state
    if (nextButton) {
        nextButton.disabled = true;
        nextButton.style.display = 'none'; // Hide by default, shown when an option is selected
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question';
    } else {
        console.error('Next button not found');
    }
}

// Handle option selection
function selectOption(optionElement, optionIndex) {
    if (isAnswered || !questions || currentQuestionIndex >= questions.length) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !currentQuestion.options || !Array.isArray(currentQuestion.options)) {
        console.error('Invalid question data');
        return;
    }
    
    // Remove selected class from all options and disable them
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(opt => {
        if (opt) {
            opt.classList.remove('selected', 'correct', 'incorrect');
            opt.style.pointerEvents = 'none'; // Disable further clicks
        }
    });
    
    // Mark the selected option
    if (optionElement) {
        optionElement.classList.add('selected');
        
        // Check if the answer is correct
        const isCorrect = optionIndex === currentQuestion.correctAnswer;
        
        // Show visual feedback
        if (isCorrect) {
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
            // Show the correct answer
            const correctOption = allOptions[currentQuestion.correctAnswer];
            if (correctOption) correctOption.classList.add('correct');
        }
        
        // Show explanation if available
        const existingExplanation = optionsContainer.querySelector('.explanation');
        if (existingExplanation) {
            existingExplanation.remove();
        }
        
        if (currentQuestion.explanation) {
            const explanation = document.createElement('div');
            explanation.className = 'explanation';
            explanation.innerHTML = `<strong>Explanation:</strong> ${currentQuestion.explanation}`;
            optionsContainer.appendChild(explanation);
        }
        
        // Enable and show the next button
        isAnswered = true;
        nextButton.disabled = false;
        nextButton.style.display = 'block';
    }
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
}

// Move to the next question or finish the quiz
function nextQuestion() {
    if (!isAnswered) return;
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}
function finishQuiz() {
    if (!quizContent || !resultContainer) return;
    
    // Hide quiz content
    if (quizContent) quizContent.style.display = 'none';
    
    // Show results
    if (resultContainer) {
        resultContainer.style.display = 'block';
        if (finalScoreElement) finalScoreElement.textContent = 'Quiz Completed!';
        if (maxScoreElement) maxScoreElement.textContent = '';
        
        // Set a generic completion message
        if (resultMessageElement) {
            resultMessageElement.textContent = 'Thank you for completing the quiz!';
        }
    }
    
    // Hide the next button
    if (nextButton) nextButton.style.display = 'none';
}

// Show subject selection
function showSubjectSelection() {
    console.log('showSubjectSelection called');
    
    // Hide quiz content and results
    if (quizContent) {
        console.log('Hiding quiz content');
        quizContent.style.display = 'none';
    } else {
        console.error('quizContent is not defined');
    }
    
    if (resultContainer) {
        console.log('Hiding result container');
        resultContainer.style.display = 'none';
    } else {
        console.error('resultContainer is not defined');
    }
    
    // Create subject selection HTML
    console.log('Creating subject selection UI');
    const subjectSelection = document.createElement('div');
    subjectSelection.className = 'subject-selection';
    subjectSelection.innerHTML = `
        <h2>Select a Subject</h2>
        <div class="subject-options">
            <button class="subject-btn" data-subject="all">All Subjects</button>
            <button class="subject-btn" data-subject="Science">Science</button>
            <button class="subject-btn" data-subject="Geography">Geography</button>
            <button class="subject-btn" data-subject="Mathematics">Mathematics</button>
            <button class="subject-btn" data-subject="Literature">Literature</button>
            <button class="subject-btn" data-subject="History">History</button>
            <button class="subject-btn" data-subject="Art">Art</button>
        </div>
    `;
    
    // Get the quiz container
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) {
        console.error('Quiz container not found');
        return;
    }
    
    console.log('Found quiz container:', quizContainer);
    
    // Clear any existing subject selection
    const existingSelection = document.querySelector('.subject-selection');
    if (existingSelection) {
        console.log('Removing existing subject selection');
        existingSelection.remove();
    }
    
    // Add to the DOM
    console.log('Adding subject selection to DOM');
    quizContainer.insertBefore(subjectSelection, quizContainer.firstChild);
    
    // Add event listeners to subject buttons
    const subjectButtons = subjectSelection.querySelectorAll('.subject-btn');
    console.log(`Found ${subjectButtons.length} subject buttons`);
    
    subjectButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            const subject = e.target.dataset.subject;
            console.log(`Subject selected: ${subject}`);
            startQuiz(subject);
        });
        console.log(`Added click listener to button ${index + 1}: ${button.textContent}`);
    });
    
    console.log('Subject selection UI ready');
}

// Start the quiz with selected subject
function startQuiz(subject) {
    console.log('startQuiz called with subject:', subject);
    
    if (!subject) {
        console.error('No subject provided');
        return;
    }
    
    console.log('Starting quiz with subject:', subject);
    
    // Filter questions by subject if not 'all'
    if (subject === 'all') {
        questions = [...quizQuestions];
        console.log('Using all questions, count:', questions.length);
    } else {
        questions = quizQuestions.filter(q => q && q.subject === subject);
        console.log(`Filtered questions for ${subject}, count:`, questions.length);
    }
    
    if (questions.length === 0) {
        console.error('No questions found for subject:', subject);
        alert('No questions found for the selected subject. Please try another subject.');
        return;
    }
    
    // Shuffle the questions
    questions = shuffleArray(questions);
    console.log('Shuffled questions:', questions);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    selectedOption = null;
    isAnswered = false;
    
    // Remove subject selection
    const subjectSelection = document.querySelector('.subject-selection');
    if (subjectSelection) {
        console.log('Removing subject selection');
        subjectSelection.remove();
    } else {
        console.log('No subject selection element found to remove');
    }
    
    // Show quiz content
    if (quizContent) {
        console.log('Showing quiz content');
        quizContent.style.display = 'block';
    } else {
        console.error('Quiz content element not found');
        return;
    }
    
    // Initialize the quiz
    console.log('Calling showQuestion');
    showQuestion();
}

// Initialize the quiz
function initQuiz() {
    // Update the UI
    updateScore();
    showQuestion();
    
    // Hide the next button initially
    nextButton.disabled = true;
    
    // Update progress
    if (currentQuestionElement && totalQuestionsElement) {
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        totalQuestionsElement.textContent = questions.length;
    }
    
    // Update progress bar
    if (progressBar) {
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Function to initialize the quiz after DOM is fully loaded
function initializeQuiz() {
    console.log('Initializing quiz...');
    
    // Get all DOM elements
    questionElement = document.getElementById('question');
    optionsContainer = document.querySelector('.options-container');
    nextButton = document.getElementById('next-btn');
    quizContent = document.querySelector('.quiz-content');
    resultContainer = document.querySelector('.result-container');
    finalScoreElement = document.getElementById('final-score');
    maxScoreElement = document.getElementById('max-score');
    resultMessageElement = document.getElementById('result-message');
    restartButton = document.getElementById('restart-btn');
    
    console.log('DOM elements loaded:', {
        questionElement: !!questionElement,
        optionsContainer: !!optionsContainer,
        nextButton: !!nextButton,
        quizContent: !!quizContent,
        resultContainer: !!resultContainer
    });
    
    // Hide quiz content initially
    if (quizContent) {
        console.log('Hiding quiz content');
        quizContent.style.display = 'none';
    } else {
        console.error('Quiz content element not found!');
    }
    
    if (resultContainer) {
        console.log('Hiding result container');
        resultContainer.style.display = 'none';
    } else {
        console.error('Result container not found!');
    }
    
    // Show subject selection first
    console.log('Showing subject selection');
    showSubjectSelection();
    
    // Add event listeners
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    } else {
        console.error('Next button not found');
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            console.log('Restart button clicked');
            // Reset quiz state
            currentQuestionIndex = 0;
            selectedOption = null;
            isAnswered = false;
            
            // Hide result container
            if (resultContainer) resultContainer.style.display = 'none';
            
            // Show subject selection
            showSubjectSelection();
        });
    } else {
        console.log('Restart button not found (this is okay if not on results page)');
    }
    
    console.log('Quiz initialization complete');
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Add a small delay to ensure all elements are available
    setTimeout(() => {
        try {
            initializeQuiz();
        } catch (error) {
            console.error('Error initializing quiz:', error);
        }
    }, 100);
});
