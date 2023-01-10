function setPlayerChoice(event){
    return event.target.value
}


function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"]
    return choices[Math.floor(Math.random() * (choices.length))];
}

let playerScore = 0
let computerScore = 0

function playRound(playerSelection, computerSelection) {
    if(playerSelection == "rock"){
        if(computerSelection == "paper"){
            computerScore ++
            return `You lose! ${playerSelection} loses to ${computerSelection}`
        } else if(computerSelection == "scissors"){
            playerScore ++
            return `You win! ${playerSelection} beats ${computerSelection}`
        } else {
            return `Tie! You both chose ${playerSelection}`
        }
    } else if(playerSelection == "paper"){
        if(computerSelection == "paper"){
            return `Tie! You both chose ${playerSelection}`
        } else if(computerSelection == "scissors"){
            computerScore ++
            return `You lose! ${playerSelection} loses to ${computerSelection}`
        } else {
            playerScore ++
            return `You win! ${playerSelection} beats ${computerSelection}`
        }
    } else {
        if(computerSelection == "paper"){
            playerScore ++
            return `You win! ${playerSelection} beats ${computerSelection}`
        } else if(computerSelection == "scissors"){
            return `Tie! You both chose ${playerSelection}`
        } else {
            computerScore ++
            return `You lose! ${playerSelection} loses to ${computerSelection}`
        }
    }
}

function final(){
    if(playerScore == 5){
        return "You Won!"
    } else {
        return "You Lost!"
    }
}

function reset(){
    playerScore = 0;
    computerScore = 0;
    location.reload();
}

function game(event){
        let playerSelection = setPlayerChoice(event);
        let computerSelection = getComputerChoice()
        document.querySelector(".computerChoice").innerHTML = `Computer chose ${computerSelection}`
        document.querySelector(".playerChoice").innerHTML = `Player chose ${playerSelection}`
        document.querySelector(".result").innerHTML = `${playRound(playerSelection, computerSelection)}`
    if(playerScore == 5 || computerScore == 5){
        document.querySelector(".button-container").innerHTML = `${final()}`
    }
    return (document.querySelector(".final-result").innerHTML = `Player Score: ${playerScore}; Computer Score: ${computerScore}`)
}
