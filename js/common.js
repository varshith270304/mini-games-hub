/**
 * MINI GAMES HUB - js/common.js
 * Shared helper functions loaded across all game pages.
 * 
 * Rules:
 * 1. Loaded BEFORE any game-specific script.
 * 2. Provides toggleRules() for the Rules & Regulations box.
 * 3. Provides addResult() and clearHistory() for the Result History list.
 */

/**
 * Toggles the visibility of the Rules and Regulations box.
 * Changes the button label between "Hide Rules" and "Show Rules".
 */
function toggleRules() {
  const box = document.getElementById("rules-box");
  const btn = document.getElementById("rules-btn");

  if (!box || !btn) return;

  // Check if box is currently hidden
  if (box.style.display === "none") {
    box.style.display = "block";
    btn.innerHTML = "Hide Rules";
  } else {
    box.style.display = "none";
    btn.innerHTML = "Show Rules";
  }
}

/**
 * Appends a new result message to the Result History list using DOM methods.
 * Requirement: Uses createElement, createTextNode, and appendChild.
 * @param {string} message - The result summary of the round or game.
 */
function addResult(message) {
  const historyList = document.getElementById("history-list");
  if (!historyList) return;

  // Create an <li> element
  const item = document.createElement("li");

  // Format timestamp for modern appeal
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Create text node with the result message
  const text = document.createTextNode(`[${timeString}] ${message}`);
  item.appendChild(text);

  // Prepend to show latest results first, or append to list
  historyList.prepend(item);
}

/**
 * Clears all entries from the Result History list.
 * Requirement: Uses remove() or innerHTML reset.
 */
function clearHistory() {
  const historyList = document.getElementById("history-list");
  if (!historyList) return;

  // Remove all child list items
  while (historyList.firstChild) {
    historyList.removeChild(historyList.firstChild);
  }
}
