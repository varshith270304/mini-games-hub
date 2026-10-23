/**
 * MINI GAMES HUB - js/tic-tac-toe.js
 * Game 4 (Bonus): Tic-Tac-Toe Logic
 * 
 * Practiced Concepts:
 * - 2D matrix / winning combinations array
 * - Loops & conditions for checking 3-in-a-row
 * - DOM manipulation & board state locking
 * - CSS Grid and @keyframes animation on winning squares
 * - addResult() from common.js for game history
 */

// 1. Array of all 8 winning combinations (Mandatory Requirement)
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Game State
let boardState = ["", "", "", "", "", "", "", "", ""]; // 9 board squares
let activePlayer = "X";                                // X always starts (Player 1)
let isBoardLocked = false;                             // Board locked on game end

// DOM Elements
let tttStatusEl;
let tttCells;
let newGameBtn;

/**
 * Initializes or resets the Tic-Tac-Toe board.
 */
function initTicTacToe() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  activePlayer = "X";
  isBoardLocked = false;

  // Update status message
  if (tttStatusEl) {
    tttStatusEl.innerHTML = `Player 1 (<span class="text-danger fw-bold">X</span>)'s turn to move`;
    tttStatusEl.className = "ttt-status";
  }

  // Reset all 9 cells in the DOM
  if (tttCells) {
    tttCells.forEach((cell) => {
      cell.textContent = "";
      cell.className = "ttt-cell";
    });
  }

  if (newGameBtn) {
    newGameBtn.classList.remove("btn-success");
    newGameBtn.classList.add("btn-outline-secondary");
  }
}

/**
 * Handles cell click events and enforces game regulations.
 * @param {HTMLElement} cellEl 
 * @param {number} cellIndex 
 */
function handleCellClick(cellEl, cellIndex) {
  // Regulation 1: Board is locked once someone wins until "New Game" is clicked
  if (isBoardLocked) return;

  // Regulation 2: A square that is already filled cannot be changed
  if (boardState[cellIndex] !== "") return;

  // Place current player's mark in boardState array
  boardState[cellIndex] = activePlayer;

  // Render mark and classes in the DOM
  cellEl.textContent = activePlayer;
  cellEl.classList.add(activePlayer.toLowerCase(), "occupied");

  // Check if this move triggers a win or a draw
  checkGameStatus();
}

/**
 * Checks for a win across all 8 combinations, or a draw if all squares are filled.
 */
function checkGameStatus() {
  let isWin = false;
  let winningCombo = null;

  // Loop through winning combinations array (Mandatory Requirement)
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      isWin = true;
      winningCombo = [a, b, c];
      break;
    }
  }

  if (isWin) {
    // A player achieved 3-in-a-row!
    isBoardLocked = true;
    const winnerName = (activePlayer === "X") ? "Player 1 (X)" : "Player 2 (O)";

    // Apply keyframe animation to the 3 winning squares (Mandatory Requirement)
    winningCombo.forEach((index) => {
      tttCells[index].classList.add("winner");
    });

    tttStatusEl.innerHTML = `🏆 <strong>${winnerName} Wins!</strong> Congratulations!`;
    tttStatusEl.className = "ttt-status text-success";

    if (newGameBtn) {
      newGameBtn.classList.remove("btn-outline-secondary");
      newGameBtn.classList.add("btn-success", "fw-bold");
      newGameBtn.focus();
    }

    // Record win in Result History (shared function from common.js)
    if (typeof addResult === "function") {
      addResult(`Tic-Tac-Toe: ${winnerName} won the match!`);
    }
    return;
  }

  // Check for Draw (all 9 squares filled with no winner)
  if (!boardState.includes("")) {
    isBoardLocked = true;
    tttStatusEl.innerHTML = `🤝 <strong>It's a Draw!</strong> Neither player got 3 in a row.`;
    tttStatusEl.className = "ttt-status text-warning";

    // Record draw in Result History
    if (typeof addResult === "function") {
      addResult(`Tic-Tac-Toe: Match ended in a draw.`);
    }
    return;
  }

  // Regulation: Players must alternate turns
  activePlayer = (activePlayer === "X") ? "O" : "X";
  const nextPlayerLabel = (activePlayer === "X") 
    ? `Player 1 (<span class="text-danger fw-bold">X</span>)` 
    : `Player 2 (<span class="text-info fw-bold">O</span>)`;

  tttStatusEl.innerHTML = `${nextPlayerLabel}'s turn to move`;
}

// Bind event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  tttStatusEl = document.getElementById("ttt-status");
  tttCells = document.querySelectorAll(".ttt-cell");
  newGameBtn = document.getElementById("new-game-btn");

  // Attach click listener to each square
  tttCells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });

  if (newGameBtn) {
    newGameBtn.addEventListener("click", initTicTacToe);
  }

  // Start initial game
  initTicTacToe();
});
