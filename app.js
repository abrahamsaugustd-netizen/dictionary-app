// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const wordDisplay = document.getElementById('wordDisplay');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial state
    showRandomWord();
    
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});

// Show a random word from the dictionary
async function showRandomWord() {
    try {
        wordDisplay.innerHTML = '<p>Loading a random word...</p>';
        
        // Try to get a random word with a timeout
        const word = await Promise.race([
            getRandomWord(),
            new Promise((_, reject) => setTimeout(
                () => reject(new Error('Word loading timeout')), 
                3000
            ))
        ]);
        
        // If we got a valid word, display it
        if (word && word.word) {
            displayWord(word);
            return;
        }
        
        // If we get here, use a fallback word
        throw new Error('No valid word received');
        
    } catch (error) {
        console.warn('Error loading random word, using fallback:', error);
        const fallbackWord = window.getFallbackWord ? 
            window.getFallbackWord() : 
            {
                word: 'dictionary',
                partOfSpeech: 'noun',
                meaning: 'a book containing words of a language with their meanings',
                example: 'I looked up the word in the dictionary.'
            };
            
        // Ensure the word is displayed even if displayWord fails
        try {
            displayWord(fallbackWord);
        } catch (displayError) {
            console.error('Error displaying fallback word:', displayError);
            wordDisplay.innerHTML = `
                <div class="word">
                    <h2>${fallbackWord.word}</h2>
                    <p class="part-of-speech">${fallbackWord.partOfSpeech}</p>
                    <p class="meaning">${fallbackWord.meaning}</p>
                    ${fallbackWord.example ? `<p class="example">Example: ${fallbackWord.example}</p>` : ''}
                    <button onclick="showRandomWord()" class="retry-btn">Show Another Word</button>
                </div>
            `;
        }
    }
}

// Handle search
async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;
    
    try {
        wordDisplay.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>Searching...</p></div>';
        const results = await searchWord(searchTerm);
        
        if (results && results.length > 0) {
            displayWord(results[0]);
        } else {
            wordDisplay.innerHTML = `
                <div class="no-results">
                    <h2>No results found for "${searchTerm}"</h2>
                    <p>Try searching for another word or check the spelling.</p>
                    <button onclick="showRandomWord()" class="retry-btn">Show Random Word</button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Search error:', error);
        wordDisplay.innerHTML = `
            <div class="error-message">
                <h3>Error searching for word</h3>
                <p>${error.message || 'Please try again later.'}</p>
                <button onclick="handleSearch()" class="retry-btn">Retry</button>
            </div>
        `;
    } finally {
        searchInput.value = '';
    }
}

// Display word in the UI
function displayWord(entry) {
    if (!entry) return;
    
    const { word, partOfSpeech, meaning, example } = entry;
    
    if (!entry) {
        wordDisplay.innerHTML = `
            <div class="error">
                <h2>No word data available</h2>
                <p>Please try another word.</p>
            </div>
        `;
        return;
    }

    wordDisplay.innerHTML = `
        <h2>${entry.word}</h2>
        ${entry.phonetics ? `<p class="phonetics">${entry.phonetics}</p>` : ''}
        <p class="part-of-speech">${entry.partOfSpeech || 'unknown'}</p>
        <div class="meaning">
            <strong>Meaning:</strong> ${entry.meaning}
        </div>
        ${entry.example ? `<div class="example"><strong>Example:</strong> ${entry.example}</div>` : ''}
    `;
}

// Quiz Functions
function startQuiz() {
    // Reset quiz state
    updateQuizUI();
    
    // Hide word display and show quiz container
    wordDisplay.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    // Hide the score display
    const scoreElement = document.getElementById('quizScore');
    if (scoreElement) {
        scoreElement.style.display = 'none';
    }
    
    // Load first question
    loadNextQuestion();
}

// Show loading state
function showLoadingState() {
    quizQuestion.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading your next question...</p>
        </div>
    `;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    nextQuestionBtn.classList.add('hidden');
}

// Show error state
function showErrorState(message) {
    quizQuestion.innerHTML = `
        <div class="error-state">
            <p>${message || 'Failed to load question'}</p>
            <button id="retryBtn" class="quiz-btn">Try Again</button>
        </div>
    `;
    document.getElementById('retryBtn')?.addEventListener('click', loadNextQuestion);
}

async function loadNextQuestion() {
    // Always continue to next question - infinite mode
    
    // Show loading state
    showLoadingState();
    
    try {
        // Clear previous options
        quizOptions.innerHTML = '';
        
        // Get new question with timeout
        currentQuestion = await Promise.race([
            getQuizQuestion(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Question loading timed out')), 5000)
            )
        ]);
        
        // Display question with fade-in animation and set question type
        quizQuestion.textContent = currentQuestion.question;
        quizQuestion.style.opacity = '0';
        quizQuestion.style.transition = 'opacity 0.3s ease';
        
        // Clear any previous feedback and hide next button
        quizFeedback.textContent = '';
        nextQuestionBtn.classList.add('hidden');
        
        // Create and display answer options with staggered animation
        const buttons = [];
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = index;
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
            button.style.transition = 'all 0.3s ease';
            button.addEventListener('click', handleAnswer);
            quizOptions.appendChild(button);
            buttons.push(button);
        });
        
        // Trigger animations
        setTimeout(() => {
            quizQuestion.style.opacity = '1';
            
            // Stagger button animations
            buttons.forEach((button, i) => {
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, i * 100); // 100ms delay between each button
            });
        }, 50);
        
        // Preload the next question in the background
        getQuizQuestion().catch(console.error);
    } catch (error) {
        console.error('Error loading quiz question:', error);
        showErrorState('Failed to load question. Please try again.');
    }
}

function handleAnswer(e) {
    const selectedButton = e.target;
    const selectedIndex = parseInt(selectedButton.dataset.index);
    
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        
        // Mark correct answer
        if (parseInt(btn.dataset.index) === currentQuestion.correctIndex) {
            btn.classList.add('correct');
        }
        
        // Mark incorrect selection
        if (btn === selectedButton && selectedIndex !== currentQuestion.correctIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    const feedback = selectedIndex === currentQuestion.correctIndex 
        ? 'Correct! 🎉' 
        : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`;
    
    quizFeedback.textContent = feedback;
    nextQuestionBtn.classList.remove('hidden');
}

function updateQuizUI() {
    quizFeedback.textContent = '';
    nextQuestionBtn.classList.add('hidden');
}

function endQuiz() {
    // No need for end quiz in infinite mode
    // Just load the next question
    loadNextQuestion();
}
