/**
 * MINI GAMES HUB - js/memory-game.js
 * Game 3: Memory Card Flip Logic
 * 
 * Practiced Concepts:
 * - Array operations & Fisher-Yates array shuffling
 * - ES6 Set to track matched cards (Mandatory Requirement)
 * - setTimeout for asynchronous 1-second card flip reset
 * - Move counter & DOM event listeners
 * - addResult() from common.js for game history
 */

// 6 Unique card symbols (will be duplicated to make 12 cards / 6 pairs)
const CARD_SYMBOLS = ["🚀", "🌟", "💎", "🔥", "🎯", "🍀"];

// ES6 Set to track matched card indices (Mandatory Requirement)
const matchedCardIndices = new Set();

// Game State
let activeCards = [];          // Holds up to 2 currently open cards
let movesCount = 0;           // Tracks number of turns
let isBoardLocked = false;     // Prevents clicking during the 1-second delay
let totalPairs = CARD_SYMBOLS.length;

// DOM Elements
let memoryGridEl;
let movesCounterEl;
let matchedCounterEl;
let memoryStatusEl;
let resetGameBtn;

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm.
 * @param {Array} array 
 * @returns {Array} shuffled array
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

/**
 * Builds the 12-card grid with 3D flip card elements.
 */
function setupGameBoard() {
  if (!memoryGridEl) return;

  // Clear previous grid and reset state
  memoryGridEl.innerHTML = "";
  matchedCardIndices.clear();
  activeCards = [];
  movesCount = 0;
  isBoardLocked = false;

  // Update DOM displays
  if (movesCounterEl) movesCounterEl.textContent = movesCount;
  if (matchedCounterEl) matchedCounterEl.textContent = `0 / ${totalPairs}`;
  if (memoryStatusEl) {
    memoryStatusEl.innerHTML = `Click any two cards to find matching pairs!`;
    memoryStatusEl.className = "alert alert-light text-muted border text-center";
  }

  // Duplicate the 6 symbols into a 12-item array and shuffle them
  const cardDeck = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
  shuffleArray(cardDeck);

  // Generate 12 card elements inside the CSS Grid
  cardDeck.forEach((symbol, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "memory-card";
    cardEl.setAttribute("data-index", index.toString());
    cardEl.setAttribute("data-symbol", symbol);

    // 3D Flip Card Faces: Front (Symbol) & Back (Cover)
    cardEl.innerHTML = `
      <div class="memory-card-face memory-card-front">${symbol}</div>
      <div class="memory-card-face memory-card-back">❓</div>
    `;

    // Attach click event listener
    cardEl.addEventListener("click", () => handleCardClick(cardEl));

    // Append to CSS Grid container
    memoryGridEl.appendChild(cardEl);
  });
}

/**
 * Handles the logic when a card is clicked.
 * Enforces all game regulations.
 * @param {HTMLElement} cardEl 
 */
function handleCardClick(cardEl) {
  const cardIndex = cardEl.getAttribute("data-index");

  // Regulation 1: Board is locked while unmatched cards are flipping back
  if (isBoardLocked) return;

  // Regulation 2: A card that is already matched cannot be clicked again (Checked with Set)
  if (matchedCardIndices.has(cardIndex)) return;

  // Regulation 3: You cannot click the same card twice in one turn
  if (activeCards.length === 1 && activeCards[0] === cardEl) return;

  // Regulation 4: Only two cards can be open at a time
  if (activeCards.length >= 2) return;

  // Flip the clicked card face-up (Triggers CSS 3D rotateY transform)
  cardEl.classList.add("flipped");
  activeCards.push(cardEl);

  // When 2 cards are open, check for a match
  if (activeCards.length === 2) {
    evaluateTurn();
  }
}

/**
 * Evaluates the two flipped cards for match or mismatch.
 */
function evaluateTurn() {
  // Increment moves counter
  movesCount++;
  if (movesCounterEl) movesCounterEl.textContent = movesCount;

  const [card1, card2] = activeCards;
  const symbol1 = card1.getAttribute("data-symbol");
  const symbol2 = card2.getAttribute("data-symbol");
  const index1 = card1.getAttribute("data-index");
  const index2 = card2.getAttribute("data-index");

  if (symbol1 === symbol2) {
    // MATCH FOUND!
    // Store matched card indices inside the Set (Mandatory Requirement)
    matchedCardIndices.add(index1);
    matchedCardIndices.add(index2);

    card1.classList.add("matched");
    card2.classList.add("matched");

    // Update matched count in UI
    const pairsFound = matchedCardIndices.size / 2;
    if (matchedCounterEl) matchedCounterEl.textContent = `${pairsFound} / ${totalPairs}`;

    memoryStatusEl.innerHTML = `🎯 <strong>Match found!</strong> Keep going!`;
    memoryStatusEl.className = "alert alert-success text-center";

    // Reset active cards for next turn
    activeCards = [];

    // Check if all pairs are matched (Win Condition)
    if (matchedCardIndices.size === CARD_SYMBOLS.length * 2) {
      handleGameWin();
    }
  } else {
    // MISMATCH: Lock board and flip back after 1 second (Mandatory Requirement: setTimeout)
    isBoardLocked = true;
    memoryStatusEl.innerHTML = `❌ No match. Flipping back in 1 second...`;
    memoryStatusEl.className = "alert alert-warning text-center";

    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      // Unlock board and reset active cards
      activeCards = [];
      isBoardLocked = false;
      memoryStatusEl.innerHTML = `Pick two cards to find a match.`;
      memoryStatusEl.className = "alert alert-light text-muted border text-center";
    }, 1000); // 1000ms = 1 second
  }
}

/**
 * Celebrates player victory when all 6 pairs have been uncovered.
 */
function handleGameWin() {
  memoryStatusEl.innerHTML = `
    <div class="h5 fw-bold mb-1">🎉 Outstanding! You matched all pairs!</div>
    <div>Total Moves: <strong>${movesCount}</strong> (Fewer moves is better!)</div>
  `;
  memoryStatusEl.className = "alert alert-success text-center py-3";

  // Record win in Result History (shared function from common.js)
  if (typeof addResult === "function") {
    addResult(`Memory Flip Won: All 6 pairs cleared in ${movesCount} moves!`);
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  memoryGridEl = document.getElementById("memory-grid");
  movesCounterEl = document.getElementById("moves-counter");
  matchedCounterEl = document.getElementById("matched-counter");
  memoryStatusEl = document.getElementById("memory-status");
  resetGameBtn = document.getElementById("reset-game-btn");

  if (resetGameBtn) {
    resetGameBtn.addEventListener("click", setupGameBoard);
  }

  // Setup the initial game
  setupGameBoard();
});
