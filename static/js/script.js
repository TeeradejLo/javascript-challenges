//Challenge 1: Your Age in Days

function ageYearsToDaysConvert() {
    if (document.getElementById("flex-box-result").childElementCount > 0) {
        alert("Please click Reset first before using this function...");
    } else {
        var birthYear = prompt("What year were you born?");

        if (birthYear == null) {
            return;
        }

        var ageInDays = (2021 - birthYear) * 365;
        var h3 = document.createElement("h3");
        var answerText = document.createTextNode("You are " + ageInDays + " days old.");
        h3.setAttribute("id", "ageInDays");
        h3.appendChild(answerText);
        document.getElementById("flex-box-result").appendChild(h3); 
    } 
}

function resetAgeAnswerText(){
    document.getElementById("ageInDays").remove();
}

//Challenges 2: Cat Generator

function insertCatImage() {
    var img = document.createElement("img");
    img.src = "challenges_assets/cat.png";
    img.setAttribute("id", "catImage");
    document.getElementById("catImageContainer").appendChild(img);
}

//Challenges 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = convertNumberToChoice();
    var result = decideWinner(humanChoice, botChoice);
    var message = finalMessage(result[0]);
    // console.log(humanChoice);
    // console.log(botChoice);
    // console.log(result);
    // console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function convertNumberToChoice() {
    var choice = ["rock", "paper", "scissors"]
    return choice[Math.floor(Math.random() * 3)];
}

function decideWinner(humanChoice, botChoice) {
    var rpsDB = {
        "rock": {"scissors": 1, "rock": 0.5, "paper": 0},
        "paper": {"rock": 1, "paper": 0.5, "scissors": 0},
        "scissors": {"paper": 1, "scissors": 0.5, "rock": 0}
    };

    return new Array (rpsDB[humanChoice][botChoice], rpsDB[botChoice][humanChoice]);
}

function finalMessage(index) {
    var resultMessage = ["You lose!", "Tied!", "You win!"];
    var color = ["red", "rgb(189, 171, 13)", "green"]

    return {"message": resultMessage[index * 2], "color": color[index * 2]};
}

function rpsFrontEnd(humanChoice, botChoice, finalMessage) {
    var imgDB = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src,
    }

    console.log(finalMessage['message']);

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    humanDiv.setAttribute("style","width: 20%");
    var botDiv = document.createElement("div");
    botDiv.setAttribute("style", "width: 20%");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src = '" + imgDB[humanChoice] + "' width = 100% style = 'box-shadow: 0px 10px 50px rgba(17, 19, 180, 1)'>";
    document.getElementById("rps-game").appendChild(humanDiv);

    messageDiv.innerHTML = "<h2 style = 'color: " + finalMessage["color"] +"'>" + finalMessage["message"] + "</h2>";
    document.getElementById("rps-game").appendChild(messageDiv);

    botDiv.innerHTML = "<img src = '" + imgDB[botChoice] + "' width = 100% style = 'box-shadow: 0px 10px 50px rgba(192, 24, 24, 1)'>";
    document.getElementById("rps-game").appendChild(botDiv);
}

//Challenges 4: //Challenges 3: Rock, Paper, Scissors

var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[all_buttons[i].classList.length - 1]);
}

function buttonColorChange(formObject) {
    if (formObject.value === "red") {
        changeColor("btn-danger");
    } else if (formObject.value === "green") {
        changeColor("btn-success");
    } else if (formObject.value === "random") {
        randomColor();
    } else if (formObject.value === "reset") {
        resetColor();
    }
}

function changeColor(newButtonClass) {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[all_buttons[i].classList.length - 1]);
        all_buttons[i].classList.add(newButtonClass);
    }
}

function randomColor() {
    var colorChoices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"];

    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[all_buttons[i].classList.length - 1]);
        all_buttons[i].classList.add(colorChoices[Math.floor(Math.random() * 4)]);
    }
}
function resetColor() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[all_buttons[i].classList.length - 1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

//Challenges 5: Blackjack

let blackjackGame = {
    "you": {"scoreSpan": "#your-score", "div": "#your-box", "score": 0},
    "dealer": {"scoreSpan": "#dealer-score", "div": "#dealer-box", "score": 0},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    "cardMap": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": [1,11]},
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "gameState": 1, //1 is "You" turn. -1 is "Dealer" turn. 0 is turn over (only dea; button is available).
}

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("blackjack_assets/sounds/swish.m4a");
const winSound = new Audio("blackjack_assets/sounds/cash.mp3");
const loseSound = new Audio("blackjack_assets/sounds/aww.mp3");

document.querySelector("#blackjack-hit").addEventListener("click", blackjackHit);
document.querySelector("#blackjack-deal").addEventListener("click", blackjackDeal);
document.querySelector("#blackjack-stand").addEventListener("click", dealerLogic);


function blackjackHit() {
    if (blackjackGame["gameState"] == 1) {
        let card = randomCard();
        if(YOU["score"] <= 21) {
            generateCard(YOU, card);
            updateScore(YOU, card);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    if (YOU["score"] > 0 && blackjackGame["gameState"] == 1) {
        blackjackGame["gameState"] = -1;
        while (DEALER["score"] <= 15) {
            let card = randomCard();
            generateCard(DEALER, card);
            updateScore(DEALER, card);
            await sleep(1000);
        }
        showResult(determineWinner());
        blackjackGame["gameState"] = 0;
    }
        
}

function generateCard(activePlayer, cardType) {
    let cardImg = document.createElement("img");
    cardImg.src = `blackjack_assets/images/${cardType}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImg);
    hitSound.play();
}

function randomCard() {
    let number = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][number];
}

function updateScore(activePlayer, cardType) {
    if (cardType === "A") {
        if (activePlayer["score"] + blackjackGame["cardMap"]["A"][1] <= 21) {
            activePlayer["score"] += blackjackGame["cardMap"]["A"][1];
        } else {
            activePlayer["score"] += blackjackGame["cardMap"]["A"][0];
        }
    } else {
        activePlayer["score"] += blackjackGame["cardMap"][cardType];
    }

    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
}

function blackjackDeal() {
    if (blackjackGame["gameState"] == 0) {
        let yourImages = document.querySelector(YOU["div"]).querySelectorAll("img");
        let dealerImages = document.querySelector(DEALER["div"]).querySelectorAll("img");

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();   
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU["score"] = 0;
        document.querySelector(YOU["scoreSpan"]).style.color = "white";
        document.querySelector(YOU["scoreSpan"]).textContent = YOU["score"];
        DEALER["score"] = 0;
        document.querySelector(DEALER["scoreSpan"]).style.color = "white";
        document.querySelector(DEALER["scoreSpan"]).textContent = DEALER["score"];

        document.querySelector("#blackjack-status").style.color = "black";
        document.querySelector("#blackjack-status").textContent = "Let's play";

        blackjackGame["gameState"] = 1;
    }
}

function determineWinner() {
    let winner;

    if (YOU["score"] <= 21) {
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            winner = YOU;
        } else if (YOU["score"] < DEALER["score"]) {
            winner = DEALER;
        } else {
            //if draw, do nothing, winner = undefined
        }
    } else {
        if (DEALER["score"] <= 21) {
            winner = DEALER;
        } else {
            //if draw, do nothing, winner = undefined
        }
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (winner === YOU) {
        message = "You win!";
        messageColor = "green";
        blackjackGame["wins"]++;
        document.querySelector("#table-wins").textContent = blackjackGame["wins"];
        winSound.play();
    } else if (winner === DEALER) {
        message = "You lose!";
        messageColor = "red";
        blackjackGame["losses"]++;
        document.querySelector("#table-losses").textContent = blackjackGame["losses"];
        loseSound.play();
    } else {
        message = "Draw!"
        messageColor = "rgb(189, 171, 13)";
        blackjackGame["draws"]++;
        document.querySelector("#table-draws").textContent = blackjackGame["draws"];
    }

    document.querySelector("#blackjack-status").textContent = message;
    document.querySelector("#blackjack-status").style.color = messageColor;
}