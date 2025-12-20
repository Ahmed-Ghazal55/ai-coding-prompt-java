let player = {
    name: "per",
    chips: 145 
}
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");



let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;


console.log(cards);

function startGame(){
    hasBlackJack = false;
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    return randomNumber;
}


function renderGame() {
    // sumEl.textContent = `Sum: ${sum}` || "Sum: " + sum;
    cardsEl.textContent = 'Cards: '
    for (let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = `Sum: ${sum} `;
    if (sum <= 20){
        message = "Do you want to draw a new card?";
    }
    else if(sum === 21){
        message = "You have got Blackjack!";
        hasBlackJack = true;
    }
    else {
        message = "You are out of the game!";
        isAlive = false;
    }
    
    messageEl.textContent = message;
}

function newCard(){
    if(isAlive === true && hasBlackJack === false){
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
    }
    
}












// let age = 22;
// if (age >= 21){
//     console.log("welcome")
// }
// else {
//     console.log("You can not enter the club!")
// }



// let mi = {
//     name: "Ahmed",
//     age: 25 +" years old",
//     country: "egypt"
// }
// function logData () {
//     console.log(mi.name + " is " + mi.age + " and live in " + mi.country);
// }
// logData();