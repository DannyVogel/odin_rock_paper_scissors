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
            animateCSS('.win-or-lose', 'bounceIn');
        } else if(computerSelection == "✌️"){
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You won!" 
            document.querySelector(".beats-or-losesTo").innerText = "beats"
            animateCSS('.win-or-lose', 'bounceIn');
        } else {
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
            animateCSS('.win-or-lose', 'bounceIn');
        }
    } else if(playerSelection == "🖐️"){
        if(computerSelection == "🖐️"){
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
            animateCSS('.win-or-lose', 'bounceIn');
        } else if(computerSelection == "✌️"){
            computerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to" 
            animateCSS('.win-or-lose', 'bounceIn');
        } else {
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You won!" 
            document.querySelector(".beats-or-losesTo").innerText = "beats"           
            animateCSS('.win-or-lose', 'bounceIn');
        }
    } else {
        if(computerSelection == "🖐️"){
            playerScore ++
            document.querySelector(".win-or-lose").innerText = "You won!" 
            document.querySelector(".beats-or-losesTo").innerText = "beats"           
            animateCSS('.win-or-lose', 'bounceIn');
        } else if(computerSelection == "✌️"){
            document.querySelector(".win-or-lose").innerText = "Tie!" 
            document.querySelector(".beats-or-losesTo").innerText = " = " 
            animateCSS('.win-or-lose', 'bounceIn');
        } else {
            computerScore ++
            document.querySelector(".win-or-lose").innerText = "You lost!" 
            document.querySelector(".beats-or-losesTo").innerText = "loses to" 
            animateCSS('.win-or-lose', 'bounceIn');
        }
    }
}

function final(){
    if(playerScore == 5){
        document.querySelector(".button-container").innerText = "Game Won!"
        animateCSS('.button-container', 'zoomInDown');
    } else {
        document.querySelector(".button-container").innerText = "Game Lost!"
        animateCSS('.button-container', 'slideInDown');
    }
}

function reset(){
    playerScore = 0;
    computerScore = 0;
    document.querySelector(".computer-score").innerHTML = `Score: ${computerScore}`
    document.querySelector(".player-score").innerHTML = `Score: ${playerScore}`
    document.querySelector(".button-container").innerHTML = buttons
    document.querySelector(".reset").innerText = "Start Over"
    document.querySelector(".win-or-lose").innerText = "" 
    document.querySelector(".beats-or-losesTo").innerText = ""
    document.querySelector(".computerChoice").innerHTML = `?`
    document.querySelector(".playerChoice").innerHTML = `?`
    if(document.body.classList.contains("dark")){
        const btns = document.querySelectorAll("div > button")
        btns.forEach((node,idx) => node.classList.toggle("dark-button"))
    }
}

function game(event){
        let playerSelection = setPlayerChoice(event);
        let computerSelection = getComputerChoice();
        
        playRound(playerSelection, computerSelection);
        
        document.querySelector(".computerChoice").innerHTML = `${computerSelection}`
        document.querySelector(".computer-score").innerHTML = `Score: ${computerScore}`
        
        document.querySelector(".playerChoice").innerHTML = `${playerSelection}`
        document.querySelector(".player-score").innerHTML = `Score: ${playerScore}`
        
    if(playerScore == 5 || computerScore == 5){
        final();
        document.querySelector(".reset").innerText = "Play Again"
    }
}


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

function toggleDark(){
    document.body.classList.toggle("dark")
    const btns = document.querySelectorAll("button")
    btns.forEach((node,idx) => node.classList.toggle("dark-button"))
    const data = document.querySelectorAll(".player-data, .computer-data")
    data.forEach((node,idx) => node.classList.toggle("dark-data"))
}

let buttons =   '<button class="btn rock" value="✊" onclick="game(event)">✊</button>'+
                '<button class="btn paper" value="🖐️" onclick="game(event)">🖐️</button>'+
                '<button class="btn scissors"value="✌️" onclick="game(event)">✌️</button>'
