// Select the search button and relevant DOM elements for displaying word information
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-word input");
const searchedWordElement = document.querySelector(".word-search");
const wordTypeElement = document.querySelector(".word-type p");
const wordMeaningElement = document.querySelector(".meanings p");
const wordExampleElement = document.querySelector(".example p");
const audioElement = document.querySelector("audio");

// API URL for fetching word definitions
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Add event listener for the search button
searchButton.addEventListener('click', () => {
    const word = searchInput.value.trim() || null; // Get and trim the input value
    fetchWordData(word); // Fetch word data
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const word = searchInput.value.trim() || null; // Get and trim the input value
        fetchWordData(word); // Fetch word data
    }
});


// Async function to fetch word data from the dictionary API
async function fetchWordData(word) {
    try {
        // Check if the input field is empty
        if (!word) {
            throw new Error("You forgot to enter a word");
        }

        // Fetch data from the dictionary API
        const response = await fetch(apiUrl + word);

        // Check if the response is okay
        if (!response.ok) {
            throw new Error("Oops! I don't know this word");
        }

        const data = await response.json(); // Parse the JSON response

        // Update the DOM with the fetched word data
        updateWordDisplay(word, data);

        // Set up audio playback
        setupAudio(data);
    } catch (error) {
        // Display the error in the input field
        searchInput.value = error.message;
    }
}

// Function to update the displayed word information in the UI
function updateWordDisplay(word, data) {
    document.querySelector(".sub-container").innerHTML = `
        <div class="searched-word">
            <p class="word-search">${word}</p>
            <i class="fa-solid fa-volume-high"></i>
        </div>
        <div class="word-type">
            <p>${data[0].meanings[0].partOfSpeech}</p>
        </div>
        <div class="meanings">
            <p>${data[0].meanings[0].definitions[0].definition}</p>
        </div>
        <div class="example">
           <span></span> <p>${data[0].meanings[0].definitions[0].example || ""}</p>
        </div>
    `;
}

// Function to set up audio playback for the fetched word
function setupAudio(data) {
    const audioSource = data[0].phonetics[0]?.audio;

    if (audioSource) {
        audioElement.setAttribute("src", audioSource);
        document.querySelector(".fa-volume-high").addEventListener('click', () => {
            audioElement.play(); // Play audio
        });
    } else {
        // Do nothing if no audio is available
        console.log("No audio available"); // Optional: log to console if needed
    }
}


const themeBtn = document.querySelector("#change-theme");

themeBtn.addEventListener('click' , ()=> {
    
    document.body.classList.toggle("light-theme");   
})
