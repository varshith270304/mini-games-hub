# 🎮 Mini Games Hub

> **Course**: Front-End Web Development (HTML, CSS, JavaScript, Bootstrap)  
> **Project Type**: Individual Practice Project  
> **Deliverable**: Interactive, Responsive Multi-Page Web Gaming Hub

A fully responsive, client-side gaming hub built with semantic HTML5, modern CSS3 styling, Vanilla JavaScript ES6+, and Bootstrap 5.

---

## 📁 Project Structure

```text
mini-games-hub/
├── index.html                   # Home page: hero banner, navbar, dynamic game cards
├── register.html                # Player registration form with regex validation & Player class
├── about.html                   # About & contact page: project info, table & tech stack
├── games/
│   ├── number-guessing.html     # Game 1: Secret number (1-100), 7 attempts, try/catch
│   ├── rock-paper-scissors.html # Game 2: Rock-Paper-Scissors vs Computer, ES6 Map
│   ├── memory-game.html         # Game 3: 12-card 3D flip game, ES6 Set & setTimeout
│   └── tic-tac-toe.html         # Game 4 (Bonus): 2-Player strategy, winning keyframe glow
├── css/
│   └── styles.css               # Shared stylesheet with animations, 3D flip & media queries
├── js/
│   ├── common.js                # Shared functions: toggleRules() and addResult()
│   ├── index.js                 # JSON string parsing & dynamic card rendering
│   ├── register.js              # Form_Validate(), regex checking, Player class instantiation
│   ├── number-guessing.js       # Game 1 logic & error handling
│   ├── rock-paper-scissors.js   # Game 2 logic (using JavaScript Map)
│   ├── memory-game.js           # Game 3 logic (using JavaScript Set & setTimeout)
│   └── tic-tac-toe.js           # Game 4 logic (matrix/combo checking, DOM locking)
├── assets/                      # Project icons, badges, and media
└── README.md                    # Project documentation & deployment guide
```

---

## 🎯 Features & Game Rules

### 1. Home Page (`index.html` & `js/index.js`)
* **Dynamic Card Rendering**: Game cards are generated using `JSON.parse()` from a serialized JSON string.
* **Bootstrap Grid**: Uses `col-lg-4 col-md-6 col-12` (3 cards per row on desktop, 2 on tablet, 1 on mobile).
* **Hover Micro-interactions**: Smooth card translation, border highlight, and box shadow.

### 2. Player Registration (`register.html` & `js/register.js`)
* **Input Validation**: Uses `Form_Validate()` style with inline error feedback.
  * **Name**: Required, letters and spaces only (`/^[A-Za-z\s]{3,}$/`), minimum 3 characters.
  * **Email**: Required, valid email format regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  * **Age**: Required, integer between 5 and 100.
* **`Player` Class**: Creates an active player object holding `name`, `score`, and `wins` during the session.
* **DOM Welcome**: Displays `"Welcome, [name]!"` immediately upon valid submission.

### 3. About Page (`about.html`)
* **Semantic Layout**: Structured with `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.
* **Comparison Table**: Responsive Bootstrap table detailing all games, difficulties, and player counts.
* **Tech Stack**: Lists frontend foundations and JavaScript features implemented across the application.

### 4. Game 1: Number Guessing (`games/number-guessing.html`)
* Secret random number between 1 and 100 with a 7-attempt limit.
* `try / catch / throw` input validation prevents invalid or empty entries from deducting attempts.
* Real-time "Too High" / "Too Low" guidance and Result History logging.

### 5. Game 2: Rock-Paper-Scissors (`games/rock-paper-scissors.html`)
* First player to reach 5 points wins the match.
* Winning combinations managed with an **ES6 `Map`** (`rock -> scissors`, `paper -> rock`, `scissors -> paper`).
* Round outcome parsed using `switch` statements and `ternary` operators.
* Choice buttons disable automatically upon match completion until "Restart".

### 6. Game 3: Memory Card Flip (`games/memory-game.html`)
* 12 cards (6 pairs) shuffled dynamically via Fisher-Yates algorithm.
* **CSS 3D perspective flips** utilizing `transform-style: preserve-3d` and `rotateY(180deg)`.
* **ES6 `Set`** tracks matched card indices.
* `setTimeout` executes a clean 1-second delay before flipping mismatched cards back face down.

### 7. Game 4: Tic-Tac-Toe Bonus (`games/tic-tac-toe.html`)
* Local 2-player mode (Player 1 = X, Player 2 = O).
* Checks all 8 winning rows, columns, and diagonals using matrix loops.
* **CSS `@keyframes` winning glow** highlights the 3 winning tiles.
* Board locks automatically until "New Game" is clicked.

---

## 🛠️ Technical Checklist Compliance

- [x] **HTML**: Proper doctype, `lang`, `charset`, responsive viewport, semantic tags (`header`, `nav`, `main`, `section`, `footer`), form, table, list, meaningful `<title>` on all pages.
- [x] **Bootstrap 5**: Loaded via CDN, navbar with mobile collapse, container and grid (`col-lg-4 col-md-6 col-12`), Bootstrap cards.
- [x] **CSS**:
  - Hover effects & smooth transitions
  - Keyframe animations (`@keyframes winningCellGlow`, `@keyframes fadeIn`)
  - Linear and radial gradients
  - 2D & 3D transforms (`perspective: 1000px`, `transform-style: preserve-3d`, `rotateY(180deg)`)
  - Box shadows and text shadows
  - Pseudo-classes & pseudo-elements (`:nth-child`, `::before`, `::first-letter`, `:hover`)
  - Flexbox and CSS Grid
  - Custom Google Font (*Poppins*)
  - 2+ custom media queries (`max-width: 768px` and `max-width: 480px`)
- [x] **JavaScript**:
  - `let` and `const` throughout
  - Functions, loops, conditions
  - At least one `Set` (matched cards tracker in `memory-game.js`)
  - At least one `Map` (winning rules in `rock-paper-scissors.js`)
  - One class (`Player` class in `register.js`)
  - Regular expressions for form validation
  - `JSON.parse()` for dynamic home page cards
  - `try / catch / throw` error handling in `number-guessing.js`
  - `setTimeout` for card flip delay in `memory-game.js`
  - DOM methods: `getElementById`, `createElement`, `createTextNode`, `appendChild`, `remove`, class & style changes
  - Shared functions `toggleRules()` and `addResult()` in `js/common.js`

---

## 🚀 How to Run Locally

Because this project relies strictly on vanilla web technologies, you can run it without any build tools or dependencies:

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/mini-games-hub.git
   ```
2. Open `index.html` directly in your web browser (Chrome, Firefox, Edge, Safari), or use VS Code's **Live Server** extension.

---

## 🌐 Deployment Instructions

### Option A: GitHub Pages (Recommended)
1. Push this repository to your GitHub account (named `mini-games-hub`).
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/(root)`, then click **Save**.
4. In 1 to 2 minutes, your project will be live at:
   `https://<your-username>.github.io/mini-games-hub/`

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `MiniGameHub` folder directly into the Netlify Sites dashboard.
3. Your live URL will generate within seconds.
