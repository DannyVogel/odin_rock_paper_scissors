"use strict";
// setting up variables for use in subsequent functions
const playerNameInputElement = document.getElementById("playerName");
const playerNameHeadingElement = document.querySelector(".player-name");
const winLoseElement = document.querySelector(".win-or-lose");
const beatsLosesElement = document.querySelector(".beats-or-losesTo");
const buttonContainerElement = document.querySelector(".button-container");
const computerChoiceElement = document.querySelector(".computerChoice");
const computerScoreElement = document.querySelector(".computer-score");
const playerChoiceElement = document.querySelector(".playerChoice");
const playerScoreElement = document.querySelector(".player-score");
const resetElement = document.querySelector(".reset");
const choices = ["✊", "🖐️", "✌️"];
var Hand;
(function (Hand) {
    Hand["Rock"] = "\u270A";
    Hand["Paper"] = "\uD83D\uDD90\uFE0F";
    Hand["Scissors"] = "\u270C\uFE0F";
})(Hand || (Hand = {}));
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getScore() {
        return this.score;
    }
    winsRound() {
        this.score += 1;
    }
    reset() {
        this.score = 0;
    }
}
const humanPlayer = new Player("Player");
const computerPlayer = new Player("Computer");
// variable used in reset function to recover choice buttons
const buttons = '<button class="btn rock" value="✊" onclick="game(event)">✊</button>' +
    '<button class="btn paper" value="🖐️" onclick="game(event)">🖐️</button>' +
    '<button class="btn scissors"value="✌️" onclick="game(event)">✌️</button>';
// sets player name if input is used
function setPlayerName(event) {
    event.preventDefault();
    const playerName = playerNameInputElement.value;
    playerName && humanPlayer.setName(playerName);
    playerNameHeadingElement.innerText = humanPlayer.getName();
    playerNameInputElement.value = "";
}
// main function that runs the helper functions below once player choice is made
function game(event) {
    const playerSelection = setPlayerChoice(event);
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    computerChoiceElement.innerHTML = `${computerSelection}`;
    computerScoreElement.innerHTML = `Score: ${computerPlayer.getScore()}`;
    playerChoiceElement.innerHTML = `${playerSelection}`;
    playerScoreElement.innerHTML = `Score: ${humanPlayer.getScore()}`;
    if (humanPlayer.getScore() == 5 || computerPlayer.getScore() == 5) {
        final();
        resetElement.innerText = "Play Again";
    }
}
function setPlayerChoice(event) {
    return event.target.value;
}
function getComputerChoice() {
    console.log(Object.values(Hand));
    return choices[Math.floor(Math.random() * (choices.length))];
}
function playRound(playerSelection, computerSelection) {
    if (playerSelection == "✊") {
        calculateResult("🖐️", "✌️", computerSelection);
    }
    else if (playerSelection == "🖐️") {
        calculateResult("✌️", "✊", computerSelection);
    }
    else {
        calculateResult("✊", "🖐️", computerSelection);
    }
    animateCSS('.win-or-lose', 'bounceIn');
}
function calculateResult(computerWinSymbol, computerLoseSymbol, computerSelection) {
    if (computerSelection == computerLoseSymbol) {
        humanPlayer.winsRound();
        winLoseElement.innerText = "You won!";
        beatsLosesElement.innerText = "beats";
    }
    else if (computerSelection == computerWinSymbol) {
        computerPlayer.winsRound();
        winLoseElement.innerText = "You lost!";
        beatsLosesElement.innerText = "loses to";
    }
    else {
        winLoseElement.innerText = "Tie!";
        beatsLosesElement.innerText = " = ";
    }
}
// Runs if 5 points reached by either player or computer
function final() {
    if (humanPlayer.getScore() == 5) {
        buttonContainerElement.innerText = "Game Won!";
        animateCSS('.button-container', 'zoomInDown');
    }
    else {
        buttonContainerElement.innerText = "Game Lost!";
        animateCSS('.button-container', 'slideInDown');
    }
}
// function used to reset game 
function reset() {
    humanPlayer.reset();
    computerPlayer.reset();
    computerScoreElement.innerHTML = `Score: ${computerPlayer.getScore()}`;
    playerScoreElement.innerHTML = `Score: ${humanPlayer.getScore()}`;
    buttonContainerElement.innerHTML = buttons;
    resetElement.innerText = "Start Over";
    winLoseElement.innerText = "";
    beatsLosesElement.innerText = "";
    computerChoiceElement.innerHTML = `?`;
    playerChoiceElement.innerHTML = `?`;
    if (document.body.classList.contains("dark")) {
        const btns = document.querySelectorAll("div > button");
        btns.forEach((node, idx) => node.classList.toggle("dark-button"));
    }
}
function toggleDark() {
    document.body.classList.toggle("dark");
    const btns = document.querySelectorAll("button");
    btns.forEach((node, idx) => node.classList.toggle("dark-button"));
    const data = document.querySelectorAll('.player-data, .computer-data');
    [...data].forEach((node, idx) => node.classList.toggle('dark-data'));
    document.querySelector("input").classList.toggle("dark-input");
}
// Function from animateCSS library used to add and remove animate class after animation end
const animateCSS = (element, animation, prefix = 'animate__') => new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    node?.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
        event.stopPropagation();
        node?.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }
    node?.addEventListener('animationend', handleAnimationEnd, { once: true });
});
//# sourceMappingURL=javascript.js.map