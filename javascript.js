// sets player name if input is used
function setPlayerName(event){
    event.preventDefault()
    let player = document.getElementById("playerName").value;
    if(player == ""){
        player = "Player"
    }
    document.querySelector(".player-name").innerText = player
    document.getElementById("playerName").value = ""
}

// main function that runs the helper functions below once player choice is made
function game(event){
    let playerSelection = setPlayerChoice(event);
    let computerSelection = getComputerChoice();
    
    playRound(playerSelection, computerSelection);
    
    computerChoiceElement.innerHTML = `${computerSelection}`
    computerScoreElement.innerHTML = `Score: ${computerScore}`
    
    playerChoiceElement.innerHTML = `${playerSelection}`
    playerScoreElement.innerHTML = `Score: ${playerScore}`
    
    if(playerScore == 5 || computerScore == 5){
        final();
        document.querySelector(".reset").innerText = "Play Again"
    }
}

function setPlayerChoice(event){
    return event.target.value
}

function getComputerChoice() {
    let choices = ["✊", "🖐️", "✌️"]
    return choices[Math.floor(Math.random() * (choices.length))];
}

let playerScore = 0
let computerScore = 0

// setting up variables for use in subsequent functions
const winLoseElement = document.querySelector(".win-or-lose")
const beatsLosesElement = document.querySelector(".beats-or-losesTo")

function playRound(playerSelection, computerSelection) {
    if(playerSelection == "✊"){
        calculateResult("🖐️", "✌️", computerSelection)

    } else if(playerSelection == "🖐️"){
        calculateResult("✌️", "✊", computerSelection)

    } else {
        calculateResult("✊", "🖐️", computerSelection)
    }
    animateCSS('.win-or-lose', 'bounceIn');
}

function calculateResult(computerWinSymbol, computerLoseSymbol, computerSelection){
    if(computerSelection == computerLoseSymbol){
        playerScore ++
        winLoseElement.innerText = "You won!" 
        beatsLosesElement.innerText = "beats"
    } else if(computerSelection == computerWinSymbol){
        computerScore ++
        winLoseElement.innerText = "You lost!" 
        beatsLosesElement.innerText = "loses to" 
    } else {
        winLoseElement.innerText = "Tie!" 
        beatsLosesElement.innerText = " = " 
    }
}

// setting up variables for use in subsequent functions
const buttonContainerElement = document.querySelector(".button-container")

// Runs if 5 points reached by either player or computer
function final(){
    if(playerScore == 5){
        buttonContainerElement.innerText = "Game Won!"
        animateCSS('.button-container', 'zoomInDown');
    } else {
        buttonContainerElement.innerText = "Game Lost!"
        animateCSS('.button-container', 'slideInDown');
    }
}

// setting up variables for use in subsequent functions
const computerChoiceElement = document.querySelector(".computerChoice")
const computerScoreElement = document.querySelector(".computer-score")

const playerChoiceElement = document.querySelector(".playerChoice")
const playerScoreElement = document.querySelector(".player-score")

// function used to reset game 
function reset(){
    playerScore = 0;
    computerScore = 0;

    computerScoreElement.innerHTML = `Score: ${computerScore}`
    playerScoreElement.innerHTML = `Score: ${playerScore}`

    buttonContainerElement.innerHTML = buttons

    document.querySelector(".reset").innerText = "Start Over"

    winLoseElement.innerText = "" 
    beatsLosesElement.innerText = ""
    computerChoiceElement.innerHTML = `?`
    playerChoiceElement.innerHTML = `?`

    if(document.body.classList.contains("dark")){
        const btns = document.querySelectorAll("div > button")
        btns.forEach((node,idx) => node.classList.toggle("dark-button"))
    }
}
// variable used in reset function to recover choice buttons
const buttons =   '<button class="btn rock" value="✊" onclick="game(event)">✊</button>'+
                '<button class="btn paper" value="🖐️" onclick="game(event)">🖐️</button>'+
                '<button class="btn scissors"value="✌️" onclick="game(event)">✌️</button>'

function toggleDark(){
    document.body.classList.toggle("dark")

    const btns = document.querySelectorAll("button")
    btns.forEach((node,idx) => node.classList.toggle("dark-button"))

    const data = document.querySelectorAll(".player-data, .computer-data")
    data.forEach((node,idx) => node.classList.toggle("dark-data"))

    document.querySelector("input").classList.toggle("dark-input")
}

// Function from animateCSS library used to add and remove animate class after animation end
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    
    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});