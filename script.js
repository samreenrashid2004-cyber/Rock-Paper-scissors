// Get HTML Elements
const choices = document.querySelectorAll(".choice");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");

// Initialize Scores
let user = 0;
let comp = 0;

// Computer Random Choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

// Play Sound Effect
const playSound = (frequency) => {
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.frequency.value = frequency;
    gain.gain.value = 0.08;

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.15);
    oscillator.onended = () => audio.close();
};

// Display Result Message
const showWinner = (userWin, userChoice, compChoice) => {

    if (userWin) {
        user++;
        userScore.innerText = user;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.background = "linear-gradient(90deg, #2e7d32, #43a047)";
        playSound(700);

    } else {
        comp++;
        compScore.innerText = comp;
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.background = "linear-gradient(90deg, #9b3932, #6b2525)";
        playSound(200);
    }
};

// Draw Game
const drawGame = () => {
    msg.innerText = "It's a Draw! Play Again.";
    msg.style.background = "linear-gradient(90deg, #956f3e, #c18a0a)";
    playSound(400);
};

// Main Game Logic
const playGame = (userChoice) => {

    const compChoice = genCompChoice();

    // Check for Draw
    if (userChoice === compChoice) {
        drawGame();
        return;
    }

    // Check Winning Conditions
    const userWin =
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper");

    showWinner(userWin, userChoice, compChoice);
};

// Add Click Events to Choices
choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userChoice = choice.getAttribute("id");

        // Play Game
        playGame(userChoice);

    });

});
 

// New Game Button
const newGameBtn = document.querySelector("#new-game-btn");

// Reset Game Function
const resetGame = () => {

    // Reset Scores
    user = 0;
    comp = 0;

    userScore.innerText = user;
    compScore.innerText = comp;

    // Reset Message
    msg.innerText = "Make your move!";
    msg.style.background =
        "linear-gradient(90deg, var(--red), var(--brown))";

};

// New Game Button Click Event
newGameBtn.addEventListener("click", resetGame);
