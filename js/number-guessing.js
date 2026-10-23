/**
 * MINI GAMES HUB - js/number-guessing.js
 * Game 1: Number Guessing Logic
 * 
 * Practiced Concepts:
 * - Math.random() & Math.floor()
 * - try / catch / throw for robust input validation
 * - if / else condition structures
 * - DOM manipulation (updating text, styles, attributes)
 * - addResult() shared function integration from common.js
 */

// State variables for the game
let secretNumber;
let remainingAttempts;
const MAX_ATTEMPTS = 7;
let isGameOver = false;

// DOM Elements
let guessInput;
let guessBtn;
let playAgainBtn;
let attemptsBadge;
let feedbackBox;

/**
 * Validates the user's input using try / catch / throw.
 * Requirement: Empty input, text, or out-of-range numbers must throw an error 
 * and NOT consume an attempt.
 * @param {string} rawInput 
 * @returns {number} valid integer between 1 and 100
 */
function validateGuessInput(rawInput) {
  try {
    // 1. Check for empty or whitespace-only input
    if (rawInput === null || rawInput.trim() === "") {
      throw new Error("Input cannot be empty. Please enter a whole number.");
    }

    const parsedNumber = Number(rawInput.trim());

    // 2. Check if input is a valid number
    if (isNaN(parsedNumber)) {
      throw new Error("Text is not allowed. Please enter numbers only.");
    }

    // 3. Check if input is a whole integer
    if (!Number.isInteger(parsedNumber)) {
      throw new Error("Decimals are not accepted. Only whole numbers allowed.");
    }

    // 4. Check range (1 to 100)
    if (parsedNumber < 1 || parsedNumber > 100) {
      throw new Error("Number out of range! Enter a number from 1 to 100.");
    }

    return parsedNumber;
  } catch (error) {
    // Re-throw so caller can display error message without consuming attempts
    throw error;
  }
}

/**
 * Initializes a new round of Number Guessing.
 * Generates a fresh random secret number and resets UI state.
 */
function initGame() {
  // Pick random integer between 1 and 100
  secretNumber = Math.floor(Math.random() * 100) + 1;
  remainingAttempts = MAX_ATTEMPTS;
  isGameOver = false;

  // Update UI Elements
  if (attemptsBadge) {
    attemptsBadge.textContent = `${remainingAttempts} of ${MAX_ATTEMPTS} remaining`;
    attemptsBadge.className = "attempts-badge text-primary";
  }

  if (feedbackBox) {
    feedbackBox.innerHTML = `Enter your first guess between 1 and 100!`;
    feedbackBox.className = "feedback-alert alert alert-light text-muted border";
  }

  if (guessInput) {
    guessInput.value = "";
    guessInput.disabled = false;
    guessInput.focus();
  }

  if (guessBtn) {
    guessBtn.disabled = false;
  }

  if (playAgainBtn) {
    playAgainBtn.className = "btn btn-outline-secondary px-4 rounded-pill fw-semibold";
    playAgainBtn.innerHTML = "🔄 Play Again / Reset";
  }
}

/**
 * Handles the player's guess attempt.
 */
function handleGuess() {
  if (isGameOver) return;

  const rawValue = guessInput.value;
  let userGuess;

  // Use try / catch to enforce input regulations
  try {
    userGuess = validateGuessInput(rawValue);
  } catch (validationError) {
    // Show error message on the page; DO NOT consume an attempt
    feedbackBox.innerHTML = `⚠️ <strong>Validation Error:</strong> ${validationError.message}`;
    feedbackBox.className = "feedback-alert alert alert-warning text-dark";
    guessInput.select();
    return;
  }

  // Valid guess: Deduct an attempt
  remainingAttempts--;
  attemptsBadge.textContent = `${remainingAttempts} of ${MAX_ATTEMPTS} remaining`;

  // Check conditions
  if (userGuess === secretNumber) {
    // Player Won! (Win celebration with animated badge & styling)
    isGameOver = true;
    const attemptsUsed = MAX_ATTEMPTS - remainingAttempts;
    attemptsBadge.textContent = `Solved in ${attemptsUsed} attempt(s)!`;
    attemptsBadge.className = "attempts-badge text-success fw-bold";

    feedbackBox.className = "win-banner-container text-center";
    feedbackBox.innerHTML = `
      <div class="h3 fw-bold text-success mb-1">🎉 BINGO! YOU GUESSED IT!</div>
      <div class="win-number-badge">${secretNumber}</div>
      <p class="fs-5 text-dark mb-1">
        Awesome job! You found the secret number in <strong>${attemptsUsed}</strong> attempt(s)!
      </p>
      <div class="badge bg-success-subtle text-success fs-6 px-3 py-2 mt-2">
        Attempts Saved: ${remainingAttempts} / ${MAX_ATTEMPTS}
      </div>
    `;

    // Record in Result History (shared function from common.js)
    if (typeof addResult === "function") {
      addResult(`Won! Guessed secret ${secretNumber} in ${attemptsUsed} try(ies).`);
    }

    endRound(true);
  } else if (remainingAttempts <= 0) {
    // Player Lost!
    isGameOver = true;
    attemptsBadge.textContent = `0 of ${MAX_ATTEMPTS} remaining`;
    attemptsBadge.className = "attempts-badge text-danger";
    
    feedbackBox.className = "alert alert-danger text-center py-4";
    feedbackBox.innerHTML = `
      <div class="h4 fw-bold mb-2">💀 Out of attempts!</div>
      <p class="mb-1">The secret number was <span class="badge bg-danger fs-5 px-3 py-1">${secretNumber}</span></p>
      <div class="small text-muted mt-2">Better luck next time! Click below to try another round.</div>
    `;

    // Record in Result History
    if (typeof addResult === "function") {
      addResult(`Lost! The secret number was ${secretNumber}.`);
    }

    endRound(false);
  } else {
    // Clue: Too High or Too Low
    if (userGuess > secretNumber) {
      feedbackBox.innerHTML = `📉 <strong>${userGuess} is Too High!</strong> Try a lower number.`;
      feedbackBox.className = "feedback-alert alert alert-info";
    } else {
      feedbackBox.innerHTML = `📈 <strong>${userGuess} is Too Low!</strong> Try a higher number.`;
      feedbackBox.className = "feedback-alert alert alert-info";
    }

    // Change badge color as attempts dwindle
    if (remainingAttempts <= 2) {
      attemptsBadge.className = "attempts-badge text-danger fw-bold";
    }
    
    guessInput.value = "";
    guessInput.focus();
  }
}

/**
 * Disables guess controls when round concludes.
 * Prevents accidental restart when pressing Enter.
 * @param {boolean} isWin 
 */
function endRound(isWin) {
  if (guessInput) {
    guessInput.disabled = true;
    guessInput.blur(); // Remove focus so pressing Enter won't trigger any other button
  }
  if (guessBtn) guessBtn.disabled = true;

  if (playAgainBtn) {
    playAgainBtn.classList.remove("btn-outline-secondary");
    if (isWin) {
      playAgainBtn.classList.add("btn-success", "btn-pulse");
      playAgainBtn.innerHTML = "🎮 Play Another Round";
    } else {
      playAgainBtn.classList.add("btn-warning", "fw-bold");
      playAgainBtn.innerHTML = "🔄 Try Again";
    }
  }
}

// Set up event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  guessInput = document.getElementById("guess-input");
  guessBtn = document.getElementById("guess-btn");
  playAgainBtn = document.getElementById("play-again-btn");
  attemptsBadge = document.getElementById("attempts-badge");
  feedbackBox = document.getElementById("feedback-box");

  if (guessBtn) {
    guessBtn.addEventListener("click", handleGuess);
  }

  // Allow pressing Enter key to submit guess safely
  if (guessInput) {
    guessInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // CRITICAL: Prevents default action and premature restart
        handleGuess();
      }
    });
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", initGame);
  }

  // Start the first game
  initGame();
});
