/**
 * MINI GAMES HUB - js/index.js
 * Home page logic: Generates game cards from a JSON string using JSON.parse().
 * 
 * Requirements practiced:
 * - JSON string representation of game metadata
 * - JSON.parse()
 * - DOM element creation and manipulation
 * - Bootstrap responsive column classes (col-lg-4 col-md-6 col-12)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. JSON String containing all mini games (Exact requirement from Section 3.1)
  const gamesData = '{"games": [' +
    '{"name": "Number Guessing", "level": "Easy", "page": "games/number-guessing.html", "icon": "🔢", "desc": "Guess the computer\'s secret number between 1 and 100 in 7 attempts with smart hints."},' +
    '{"name": "Rock Paper Scissors", "level": "Easy", "page": "games/rock-paper-scissors.html", "icon": "✊✋✌️", "desc": "Battle the computer in the timeless classic. The first player to 5 points takes the crown!"},' +
    '{"name": "Memory Card Flip", "level": "Medium", "page": "games/memory-game.html", "icon": "🃏", "desc": "Test your visual memory! Flip 12 cards and match all 6 pairs in minimum moves."},' +
    '{"name": "Tic Tac Toe", "level": "Medium", "page": "games/tic-tac-toe.html", "icon": "❌⭕", "desc": "Bonus 2-player strategic showdown! Connect 3 symbols horizontally, vertically, or diagonally."}' +
  ']}';

  // 2. Parse the JSON string into a native JavaScript object
  const data = JSON.parse(gamesData);

  // 3. Select the games container element
  const container = document.getElementById("games-container");

  if (!container) return;

  // 4. Iterate through the games list and render cards into the DOM
  data.games.forEach((game) => {
    // Column wrapper with required responsive classes: col-lg-4 col-md-6 col-12
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 col-12 mb-4";

    // Determine badge color based on difficulty level
    const badgeClass = game.level.toLowerCase() === "easy" ? "badge-easy" : "badge-medium";

    // Build the Card HTML with hover effects and play button
    col.innerHTML = `
      <div class="game-card h-100">
        <div class="game-card-img-wrapper">
          <span class="game-card-icon">${game.icon}</span>
          <span class="badge-level ${badgeClass}">${game.level}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${game.name}</h3>
          <p class="card-text">${game.desc}</p>
          <a href="${game.page}" class="btn-play mt-auto">Play Now →</a>
        </div>
      </div>
    `;

    // Append to the games container
    container.appendChild(col);
  });
});
