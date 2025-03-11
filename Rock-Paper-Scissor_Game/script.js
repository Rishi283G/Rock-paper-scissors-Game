// Game elements
const rockButton = document.querySelector(".rock-btn");
const paperButton = document.querySelector(".paper-btn");
const scissorsButton = document.querySelector(".scissors-btn");
const userHandIcon = document.querySelector(".user-hand-icon");
const computerHandIcon = document.querySelector(".computer-hand-icon");
const userScore = document.querySelector(".user-score-value");
const computerScore = document.querySelector(".computer-score-value");
const result = document.querySelector(".result");
const allButtons = document.querySelectorAll(".choice-btn");

// Game data
const iconMap = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

const winMap = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Sound effects (optional - uncomment if you want to add sounds)
/*
const sounds = {
  click: new Audio('click.mp3'),
  win: new Audio('win.mp3'),
  lose: new Audio('lose.mp3'),
  tie: new Audio('tie.mp3'),
}
*/

// Add event listeners to all buttons
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playGame(playerChoice);

    // Optional: add click sound
    // sounds.click.play();
  });
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    playGame("rock");
  } else if (e.key === "p" || e.key === "P") {
    playGame("paper");
  } else if (e.key === "s" || e.key === "S") {
    playGame("scissors");
  }
});

/**
 * Main game function
 * @param {string} playerChoice - The player's choice (rock, paper, or scissors)
 */
function playGame(playerChoice) {
  // Prevent clicking while animation is running
  if (userHandIcon.classList.contains("shakeUserHands")) {
    return;
  }

  // Reset result styling
  result.className = "result";
  result.innerText = "Playing...";

  // Set initial hand positions and start animation
  userHandIcon.innerText = "🤜";
  computerHandIcon.innerText = "🤛";

  userHandIcon.classList.add("shakeUserHands");
  computerHandIcon.classList.add("shakeComputerHands");

  // Disable buttons during animation
  toggleButtons(false);

  // Wait for animation to complete
  setTimeout(() => {
    // Stop animation
    userHandIcon.classList.remove("shakeUserHands");
    computerHandIcon.classList.remove("shakeComputerHands");

    // Get computer's choice
    const computerChoice = getComputerChoice();

    // Update hand icons
    userHandIcon.innerText = iconMap[playerChoice];
    computerHandIcon.innerText = iconMap[computerChoice];

    // Determine winner and update score
    const gameResult = determineWinner(playerChoice, computerChoice);
    updateResult(gameResult);

    // Re-enable buttons
    toggleButtons(true);
  }, 1000);
}

/**
 * Generate computer's choice
 * @return {string} Computer's choice (rock, paper, or scissors)
 */
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

/**
 * Determine the winner
 * @param {string} playerChoice - The player's choice
 * @param {string} computerChoice - The computer's choice
 * @return {string} Result: 'win', 'lose', or 'tie'
 */
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (winMap[playerChoice] === computerChoice) {
    return "win";
  } else {
    return "lose";
  }
}

/**
 * Update the game result display and scores
 * @param {string} gameResult - Result of the game: 'win', 'lose', or 'tie'
 */
function updateResult(gameResult) {
  // Add appropriate class and text
  result.classList.add(gameResult);

  if (gameResult === "win") {
    result.innerText = "You win!";
    userScore.innerText = parseInt(userScore.innerText) + 1;
    userHandIcon.classList.add("pulse");
    setTimeout(() => userHandIcon.classList.remove("pulse"), 1000);

    // Optional: play win sound
    // sounds.win.play();
  } else if (gameResult === "lose") {
    result.innerText = "Computer wins!";
    computerScore.innerText = parseInt(computerScore.innerText) + 1;
    computerHandIcon.classList.add("pulse");
    setTimeout(() => computerHandIcon.classList.remove("pulse"), 1000);

    // Optional: play lose sound
    // sounds.lose.play();
  } else {
    result.innerText = "It's a tie!";

    // Optional: play tie sound
    // sounds.tie.play();
  }
}

/**
 * Enable or disable all choice buttons
 * @param {boolean} enabled - Whether buttons should be enabled
 */
function toggleButtons(enabled) {
  allButtons.forEach((button) => {
    button.disabled = !enabled;
    if (!enabled) {
      button.style.pointerEvents = "none";
      button.style.opacity = "0.7";
    } else {
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
    }
  });
}
