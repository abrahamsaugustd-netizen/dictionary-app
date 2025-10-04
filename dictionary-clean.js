// Dictionary API configuration
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word';

// Cache for storing previously fetched words
const wordCache = new Map();

// Function to fetch with timeout
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

// Function to fetch word details from the dictionary API
async function fetchWordDetails(word) {
    const lowerWord = word.toLowerCase();
    
    // Check cache first
    const cachedWord = wordCache.get(lowerWord);
    if (cachedWord) return cachedWord;
    
    try {
        const response = await fetchWithTimeout(`${DICTIONARY_API}/${word}`, {
            timeout: 3000 // 3 second timeout
        });
        
        if (!response.ok) throw new Error(`Word not found: ${word}`);
        
        const data = await response.json();
        if (!data || !data[0]) throw new Error('Invalid data format');
        
        // Process the first meaning
        const entry = data[0];
        const meanings = entry.meanings || [];
        
        // Get the first part of speech and its first definition
        const firstMeaning = meanings[0];
        const partOfSpeech = firstMeaning?.partOfSpeech || 'word';
        const definition = firstMeaning?.definitions[0]?.definition || 'No definition available';
        const example = firstMeaning?.definitions[0]?.example;
        
        const wordData = {
            word: entry.word,
            partOfSpeech,
            meaning: definition,
            example
        };
        
        // Cache the result
        wordCache.set(lowerWord, wordData);
        
        return wordData;
    } catch (error) {
        console.error(`Error fetching details for word ${word}:`, error);
        throw error;
    }
}

// Function to search for a word
async function searchWord(term) {
    if (!term) return [];
    
    try {
        const wordData = await fetchWordDetails(term);
        return [wordData];
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

// Function to get a random word
async function getRandomWord() {
    try {
        // Try to get a word from the API
        const response = await fetchWithTimeout(RANDOM_WORD_API, {
            timeout: 5000 // 5 second timeout
        });
        
        if (!response.ok) {
            console.warn('Failed to fetch random word, using fallback');
            return getFallbackWord();
        }
        
        const word = await response.text();
        if (!word) {
            console.warn('No word returned from API, using fallback');
            return getFallbackWord();
        }
        
        // Get the word details
        try {
            return await fetchWordDetails(word);
        } catch (error) {
            console.warn(`Could not fetch details for word ${word}, using fallback`);
            return getFallbackWord();
        }
    } catch (error) {
        console.error('Error getting random word:', error);
        return getFallbackWord();
    }
}

// Fallback word data in case the API fails
function getFallbackWord() {
    return {
        word: 'dictionary',
        partOfSpeech: 'noun',
        meaning: 'a book or electronic resource that lists the words of a language and gives their meaning',
        example: 'I looked up the word in the dictionary.'
    };
}

// Export functions for use in other files
window.getRandomWord = getRandomWord;
window.searchWord = searchWord;
window.getFallbackWord = getFallbackWord;
