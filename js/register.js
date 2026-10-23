/**
 * MINI GAMES HUB - js/register.js
 * Registration form validation and Player class handling.
 * 
 * Requirements practiced:
 * - JavaScript ES6 Class (Player)
 * - Regular Expressions (regex) for Name and Email
 * - Number range validation for Age (5 - 100)
 * - Form_Validate() function style
 * - Clear inline error messages rendered in the DOM
 * - DOM update to display "Welcome, [name]!" on success
 */

// 1. Player Class Definition (Requirement: Player class with name, score, wins)
class Player {
  /**
   * @param {string} name - Player name
   * @param {number} score - Current total score (defaults to 0)
   * @param {number} wins - Total games won (defaults to 0)
   */
  constructor(name, score = 0, wins = 0) {
    this.name = name;
    this.score = score;
    this.wins = wins;
  }

  // Helper method to display player profile
  getInfo() {
    return `Player: ${this.name} | Score: ${this.score} | Wins: ${this.wins}`;
  }
}

// Global variable to hold the instantiated Player object during the session
let currentPlayer = null;

/**
 * Validates the registration form inputs and handles successful submission.
 * Requirement: Function in the style of Form_Validate() from class.
 * @param {Event} event - The form submit event
 */
function Form_Validate(event) {
  // Prevent page refresh on form submission
  event.preventDefault();

  // Grab input elements
  const nameInput = document.getElementById("player-name");
  const emailInput = document.getElementById("player-email");
  const ageInput = document.getElementById("player-age");

  // Grab error display elements
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const ageError = document.getElementById("age-error");

  // Grab success welcome container
  const welcomeBanner = document.getElementById("welcome-banner");
  const playerProfileBox = document.getElementById("player-profile-box");

  // Clear all previous errors and messages
  nameError.textContent = "";
  emailError.textContent = "";
  ageError.textContent = "";
  welcomeBanner.style.display = "none";
  if (playerProfileBox) playerProfileBox.style.display = "none";

  let isValid = true;

  // 1. NAME VALIDATION
  // Rule: Required, letters and spaces only (regex), minimum 3 characters
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[A-Za-z\s]{3,}$/;

  if (nameValue === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    nameError.textContent = "Name must contain only letters and spaces, at least 3 characters long.";
    isValid = false;
  }

  // 2. EMAIL VALIDATION
  // Rule: Required, must match an email pattern (regex)
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = "Please enter a valid email address (e.g., player@example.com).";
    isValid = false;
  }

  // 3. AGE VALIDATION
  // Rule: Required, must be a number between 5 and 100
  const ageValue = ageInput.value.trim();
  const ageNumber = Number(ageValue);

  if (ageValue === "") {
    ageError.textContent = "Age is required.";
    isValid = false;
  } else if (isNaN(ageNumber) || !Number.isInteger(ageNumber) || ageNumber < 5 || ageNumber > 100) {
    ageError.textContent = "Age must be a whole number between 5 and 100.";
    isValid = false;
  }

  // If any validation failed, stop here
  if (!isValid) {
    return false;
  }

  // 4. ON SUCCESS: Create Player class instance (lives in memory for this session)
  currentPlayer = new Player(nameValue, 0, 0);

  // 5. Display "Welcome, name!" using the DOM
  welcomeBanner.textContent = `🎉 Welcome, ${currentPlayer.name}! You are now ready to play!`;
  welcomeBanner.style.display = "block";

  if (playerProfileBox) {
    playerProfileBox.innerHTML = `
      <div class="alert alert-info mt-3 text-start">
        <strong>Session Profile Created:</strong><br>
        👤 <strong>Name:</strong> ${currentPlayer.name}<br>
        📧 <strong>Email:</strong> ${emailValue}<br>
        🎂 <strong>Age:</strong> ${ageNumber}<br>
        🏆 <strong>Initial Score:</strong> ${currentPlayer.score} | <strong>Wins:</strong> ${currentPlayer.wins}
      </div>
    `;
    playerProfileBox.style.display = "block";
  }

  // Reset form inputs for clean UX
  nameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";

  return true;
}

// Attach the validation listener once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", Form_Validate);
  }
});
