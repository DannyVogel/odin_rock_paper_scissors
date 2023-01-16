function setPlayerChoice(event){
    return event.target.value
}


function getComputerChoice() {
    let choices = ["✊", "🖐️", "✌️"]
    return choices[Math.floor(Math.random() * (choices.length))];
}

let playerScore = 0
let computerScore = 0

function playRound(playerSelection, computerSelection) {
    if(playerSelection == "✊"){
        if(computerSelection == "🖐️"){
            computerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to" 
        } else if(computerSelection == "✌️"){
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You won!" 
            document.querySelector(".beats-or-losesTo").innerText = "beats"
        } else {
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
        }
    } else if(playerSelection == "🖐️"){
        if(computerSelection == "🖐️"){
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
        } else if(computerSelection == "✌️"){
            computerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to" 
        } else {
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to"             
        }
    } else {
        if(computerSelection == "🖐️"){
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to"             
        } else if(computerSelection == "✌️"){
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
        } else {
            computerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to" 
        }
    }
}

function final(){
    if(playerScore == 5){
        return "Game Won!"
    } else {
        return "Game Lost!"
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
        
        playRound(playerSelection, computerSelection)

        document.querySelector(".computerChoice").innerHTML = `${computerSelection}`
        document.querySelector(".computer-score").innerHTML = `Score: ${computerScore}`
        
        document.querySelector(".playerChoice").innerHTML = `${playerSelection}`
        document.querySelector(".player-score").innerHTML = `Score: ${playerScore}`
        
    if(playerScore == 5 || computerScore == 5){
        document.querySelector(".button-container").innerHTML = `${final()}`
    }
}
