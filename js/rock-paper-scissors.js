/**
 * MINI GAMES HUB - js/rock-paper-scissors.js
 * Game 2: Rock-Paper-Scissors Logic
 * 
 * Practiced Concepts:
 * - Array of choices: ['rock', 'paper', 'scissors']
 * - ES6 Map storing winning combinations:
 *   rock -> scissors, paper -> rock, scissors -> paper
 * - switch statement for result resolution
 * - Ternary operators for concise status checks
 * - Flexbox layout & hover animations
 * - addResult() from common.js for match history
 */

// 1. Array of choices
const CHOICES = ["rock", "paper", "scissors"];

// 2. ES6 Map storing winning rules (Mandatory Requirement)
const winningRules = new Map([
  ["rock", "scissors"],     // Rock beats Scissors
  ["paper", "rock"],        // Paper beats Rock
  ["scissors", "paper"]     // Scissors beats Paper
]);

// Icons lookup object
const CHOICE_ICONS = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

// Match State
const TARGET_POINTS = 5;
let playerScore = 0;
let computerScore = 0;
let isMatchOver = false;

// DOM Elements
let playerScoreEl;
let computerScoreEl;
let playerFighterEl;
let computerFighterEl;
let roundResultEl;
let choiceButtons;
let restartBtn;

/**
 * Initializes or restarts a Rock-Paper-Scissors match.
 */
function restartMatch() {
  playerScore = 0;
  computerScore = 0;
  isMatchOver = false;

  // Update UI scores
  if (playerScoreEl) playerScoreEl.textContent = playerScore;
  if (computerScoreEl) computerScoreEl.textContent = computerScore;

  // Reset Arena
  if (playerFighterEl) playerFighterEl.textContent = "❔";
  if (computerFighterEl) computerFighterEl.textContent = "❔";

  if (roundResultEl) {
    roundResultEl.innerHTML = `First to 5 points wins the match! Make your move.`;
    roundResultEl.className = "alert alert-light text-muted border text-center";
  }

  // Re-enable choice buttons
  if (choiceButtons) {
    choiceButtons.forEach((btn) => {
      btn.disabled = false;
    });
  }

  if (restartBtn) {
    restartBtn.classList.add("btn-outline-secondary");
    restartBtn.classList.remove("btn-warning", "fw-bold");
  }
}

/**
 * Executes a single round of Rock-Paper-Scissors.
 * @param {string} playerChoice - 'rock', 'paper', or 'scissors'
 */
function playRound(playerChoice) {
  // Regulation: Cannot play if match has concluded
  if (isMatchOver) return;

  // 1. Computer randomly picks from the CHOICES array
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  const computerChoice = CHOICES[randomIndex];

  // 2. Reveal choices in the arena
  playerFighterEl.textContent = CHOICE_ICONS[playerChoice];
  computerFighterEl.textContent = CHOICE_ICONS[computerChoice];

  // 3. Determine round outcome
  let outcome = "";
  if (playerChoice === computerChoice) {
    outcome = "draw";
  } else if (winningRules.get(playerChoice) === computerChoice) {
    // Condition using the Map lookup:
    outcome = "win";
  } else {
    outcome = "lose";
  }

  // 4. Use switch statement to handle outcome and points (Mandatory Requirement)
  let roundMessage = "";
  switch (outcome) {
    case "win":
      playerScore++;
      roundMessage = `🎉 Round Won! Your <strong>${playerChoice}</strong> beats computer's <strong>${computerChoice}</strong>.`;
      roundResultEl.className = "alert alert-success text-center";
      break;

    case "lose":
      computerScore++;
      roundMessage = `🤖 Round Lost! Computer's <strong>${computerChoice}</strong> beats your <strong>${playerChoice}</strong>.`;
      roundResultEl.className = "alert alert-danger text-center";
      break;

    case "draw":
      roundMessage = `🤝 It's a Draw! Both picked <strong>${playerChoice}</strong>. No points awarded.`;
      roundResultEl.className = "alert alert-warning text-center";
      break;

    default:
      roundMessage = "Unknown round state.";
  }

  // Update score elements in DOM
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  // 5. Use Ternary Operator to assess match lead status (Mandatory Requirement)
  const currentLeader = (playerScore === computerScore)
    ? "Match is tied"
    : (playerScore > computerScore ? "Player leads" : "Computer leads");

  roundResultEl.innerHTML = `${roundMessage} <div class="small text-muted mt-1">Status: ${currentLeader}</div>`;

  // 6. Check if either player reached 5 points
  if (playerScore >= TARGET_POINTS || computerScore >= TARGET_POINTS) {
    isMatchOver = true;

    // Ternary operator to format winner announcement
    const finalWinner = (playerScore >= TARGET_POINTS) ? "🏆 You Won the Match!" : "🤖 Computer Won the Match!";
    
    roundResultEl.innerHTML = `
      <div class="h5 fw-bold mb-1">${finalWinner}</div>
      <div>Final Score: Player ${playerScore} - ${computerScore} Computer</div>
    `;
    roundResultEl.className = (playerScore >= TARGET_POINTS) 
      ? "alert alert-success text-center py-3" 
      : "alert alert-danger text-center py-3";

    // Regulation: After match ends, buttons are disabled until "Restart" is clicked
    choiceButtons.forEach((btn) => {
      btn.disabled = true;
    });

    if (restartBtn) {
      restartBtn.classList.remove("btn-outline-secondary");
      restartBtn.classList.add("btn-warning", "fw-bold");
      restartBtn.focus();
    }

    // Record complete match in Result History
    if (typeof addResult === "function") {
      addResult(`Match Finished: ${finalWinner} (${playerScore} vs ${computerScore})`);
    }
  } else {
    // Record round result in history
    if (typeof addResult === "function") {
      addResult(`Round: Player (${playerChoice}) vs Computer (${computerChoice}) → ${outcome.toUpperCase()}`);
    }
  }
}

// Bind event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  playerScoreEl = document.getElementById("player-score");
  computerScoreEl = document.getElementById("computer-score");
  playerFighterEl = document.getElementById("player-fighter");
  computerFighterEl = document.getElementById("computer-fighter");
  roundResultEl = document.getElementById("round-result");
  choiceButtons = document.querySelectorAll(".rps-btn");
  restartBtn = document.getElementById("restart-btn");

  // Attach click listener to Rock, Paper, Scissors buttons
  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const choice = btn.getAttribute("data-choice");
      playRound(choice);
    });
  });

  // Attach restart listener
  if (restartBtn) {
    restartBtn.addEventListener("click", restartMatch);
  }

  // Start fresh match
  restartMatch();
});
