
const moves = ["Rock", "Paper", "Scissors"];
const playerMove = document.querySelector(".options");
const play = document.querySelector(".play");
const roundResult = document.querySelector(".roundResult");
const playerScore = document.querySelector(".playerScore");
const compScore = document.querySelector(".compScore");
const finalResult = document.querySelector(".finalResult");
const reset = document.querySelector(".reset");
let games = 0;
let cScore = 0;
let pScore = 0;
let resetButton;

function getComputerChoice() {
    return moves[Math.floor(Math.random()*3)];
}

function getWinner(computerChoice, playerChoice) {
    if (computerChoice === playerChoice) {
        roundResult.textContent = "It's a tie.";
        return 0;
    }
    for (let i = 0; i < 3; i++) {
        if (playerChoice == moves[i]) {
            if (computerChoice === moves[(i+1)%3]) {
                roundResult.textContent = `You lost :( ${computerChoice} beats ${playerChoice.toLowerCase()}.`
                return -1
            }
            roundResult.textContent = `You win! ${playerChoice} beats ${computerChoice.toLowerCase()}.`
            return 1
        }
    }
}

function playRound() {
    computerChoice = getComputerChoice();
    playerChoice = playerMove.value;
    let winner = getWinner(computerChoice, playerChoice);
    if (winner == 0) {
        return;
    }
    games++;
    if (winner == 1) {
        pScore++;
        playerScore.textContent = pScore;
    } else {
        cScore++;
        compScore.textContent = cScore;
    }
    if (games === 5) {
        gameOver()
    }
}

function startGame() {
    games = 0;
    cScore = 0;
    pScore = 0;
    playerScore.textContent = 0;
    compScore.textContent = 0;
    roundResult.textContent = "Played results are displayed here.";
    finalResult.textContent = "";
    play.disabled = false;
    if (reset.hasChildNodes()) {
        reset.removeChild(reset.firstChild);
    }
}

function gameOver() {
    play.disabled = true;
    if (pScore > cScore) {
        finalResult.textContent = "Game over! You win!!";
    } else {
        finalResult.textContent = "Game over! The computer wins :(";
    }
    resetButton = document.createElement("button")
    resetButton.innerHTML = "Play Again";
    reset.appendChild(resetButton)
    resetButton.addEventListener("click", startGame);
}

play.addEventListener("click", playRound);