const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suites = ["Diamond", "Spades", "Heart", "Clover"];
const buttons = document.querySelectorAll('.card-button');

let cards = ArrayOfNumbers(values, suites);
let total_sum_of_cards = 0;
let score = 0;
let combo = 0;
// This value is passed from the rules.HTML page.
let lives = localStorage.getItem('selectedValue');

var display_score = document.getElementById("scores");
var display_lives = document.getElementById("lives");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        ValidateUserInput(buttons[i]);
    });
}

display_score.innerHTML = `${score}`;
display_lives.innerHTML = `${lives}`;

CreateButtons(values, suites);
CreateCards(cards);
SumOfTheCardValues(cards);

/*
Parameter: values and suites
values - This variable has card values of the playing cards (Ace, 2, 3,...Queen, King).
suites - This variable has card suites of the playing card (Diamond, Heart, Spades and Clover).
Function: This function will generate 52 cards dynamically, to avoid hard coding in HTML.
*/
function CreateButtons(values, suites) {
    const table = document.getElementById("card-table");

    const labelRow = document.createElement('tr');
    for (let suit of suites) {
        const labelData = document.createElement('td');
        labelData.textContent = suit;
        labelData.classList = `card-match-label-card-suite`;
        labelRow.appendChild(labelData);
    }
    table.appendChild(labelRow);

    for (let value of values) {
        const row = document.createElement('tr');
        for (let suit of suites) {
            const tabledata = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = value;
            button.classList.add("card-button");
            button.classList.add("btn");
            button.classList.add("btn-default");
            button.classList.add("card-number-btn");
            button.id = `${suit}_${value}`;
            button.addEventListener('click', () => ValidateUserInput(button));
            button.style.padding = '2%';
            if (suit === 'Diamond' || suit === 'Heart') {
                button.style.border = '2px solid red';
            } else if (suit === 'Spades' || suit === 'Clover') {
                button.style.border = '2px solid black';
            }
            tabledata.appendChild(button);
            tabledata.classList.add("card-number-td");
            row.appendChild(tabledata);
        }
        table.appendChild(row);
    }
}

/*
Parameter: cards
cards - This variable is considered as a card which has card value and suite.
Function: This function will generate the back of the card image dynamically, to avoid hard coding in HTML.
*/
function CreateCards(cards) {
    const gridContainer = document.querySelector('.card-match-card-grid-container');

    for (let card of cards) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const img = document.createElement('img');
        img.classList.add('image-style');
        img.id = `A${card.card_suite}${card.card_number}`;
        img.src = "css/back_of_card.png";
        img.alt = "back_of_card";

        gridItem.appendChild(img);
        gridContainer.appendChild(gridItem);
    }
}

/*
Parameter: numbers and kind
number - This variable has card values of the playing cards (Ace, 2, 3,...Queen, King).
kind - This variable has card suites of the playing card (Diamond, Heart, Spades and Clover). 
Function: This function will shuffle the whole card deck randomly and only take the first nine cards from the deck.
*/

function ArrayOfNumbers(numbers, kind) {
    let uniqueCards = [];
    const totalCards = numbers.length * kind.length;

    for (let suit of kind) {
        for (let number of numbers) {
            uniqueCards.push({ card_suite: suit, card_number: number, flag: false });
        }
    }

    for (let i = totalCards - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueCards[i], uniqueCards[j]] = [uniqueCards[j], uniqueCards[i]];
    }

    const seenNumbers = new Set();
    const filteredCards = [];
    for (let card of uniqueCards) {
        if (!seenNumbers.has(card.card_number)) {
            seenNumbers.add(card.card_number);
            filteredCards.push(card);
        }
    }

    return filteredCards.slice(0, 9);
}

/*
Parameter: cards
cards - This variable is considered as a card which has card value and suite.
Function: This function will calculate the sum of the card values from the nine cards.
*/
function SumOfTheCardValues(cards) {
    let sum = 0;
    for (let card of cards) {
        let card_value = values.indexOf(card.card_number) + 1;
        sum = sum + card_value;
    }
    document.getElementById("sum_of_cards").innerHTML = `${sum}`;
    total_sum_of_cards = sum;
    document.getElementById("total_sum_of_cards").innerHTML = `${total_sum_of_cards}`;
    return sum;
}

/*
Parameter: button
button - This is the user response from the card match game.
Function: This function validate the user input which is the clicked card and do actions to the buttons based on the selection.
Also, does some styling, for changing the colour and calculate the combo and score of the game.
*/
function ValidateUserInput(button) {
    const clicked_cardSuite = button.id.split('_')[0];
    const clicked_cardNumber = button.id.split('_')[1];
    const randomCard = cards.find(card => card.card_suite === clicked_cardSuite && card.card_number === clicked_cardNumber);
    var newSource = "card-assets/" + `${button.id}` + ".svg";

    if (randomCard) {
        randomCard.flag = true;
        combo = combo + 1;
        score = score + 100 * combo;
        display_score.innerHTML = `${score}`;
        button.classList.add("disabled");
        button.blur();
        button.style.backgroundColor = "green";
        ReplaceCardImage(newSource, cards.indexOf(randomCard));

        let cardValue = values.indexOf(randomCard.card_number) + 1;
        let totalSum = document.getElementById("sum_of_cards").textContent;
        totalSum = totalSum - cardValue;
        document.getElementById("sum_of_cards").textContent = totalSum;
        if (totalSum === 0) {
            DisplayGameResultModal("win", score);
            DisableAllCards();
        }

    } else {
        combo = 0;
        const sameNumberCard = cards.find(card => card.card_number === clicked_cardNumber);
        if (sameNumberCard) {
            if (sameNumberCard.flag) {
                lives = lives - 1;
                button.classList.add("disabled");
                button.blur();
                button.style.backgroundColor = "red";
            } else {
                lives = lives - 1;
                button.classList.add("disabled");
                button.blur();
                button.style.backgroundColor = "yellow";
            }

        } else {
            lives = lives - 1;
            button.classList.add("disabled");
            button.blur();
            button.style.backgroundColor = "red";
        }
        if (lives === 0) {
            DisplayGameResultModal("lose", score);
            DisableAllCards();
        }
        display_lives.innerHTML = `${lives}`;
    }
}

/*
Function: This function will disable all the button in buttons grid to avoid any complication after the end of the game.
Called inside ValidateUserInput function.
*/
function DisableAllCards() {
    const buttons = document.querySelectorAll('.card-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

/*
Parameter: newSource and cardIndex
newSorce - This variable has the location of the card image from card assets
cardIndex - This variable has the position of the image in the image grid
Function: This function will replace the back of the card image to the actual card image based on the card position.
Called inside ValidateUserInput function.
*/
function ReplaceCardImage(newSource, cardIndex) {
    let image_reveal = cards.map((card, index) => {
        return { image_position: `A${card.card_suite}${card.card_number}`, isopen: false };
    });

    let imageId = image_reveal[cardIndex].image_position;
    var imageElement = document.getElementById(imageId);

    if (image_reveal[cardIndex].isopen === false) {
        imageElement.classList.add('flip');
        setTimeout(function () {
            imageElement.src = newSource;
            imageElement.classList.remove('flip');
        }, 100);
        image_reveal[cardIndex].isopen = true;
    }
}

/*
Parameter: result and score
result - This is the result of the game which is passed from ValidateUserInput function.
score - This is score of the player which is passed from ValidateUserInput function.
Function: This function is basically for the modal, calculates final score.
Also, this will display the modal and have feature such as reveal cards, exit game and play again.
*/

function DisplayGameResultModal(result, score) {
    let message = '';
    if (result === 'win') {
        message = 'Congratulations, you have won the game!';
        document.getElementById('revealCards').style.display = 'none';
    } else {
        message = 'Game Over. You have lost the game.';
        document.getElementById('revealCards').style.display = 'block';
    }

    let lives_score = lives * 100;
    let finalScore = score + lives_score;

    document.getElementById('gameScore').textContent = score;
    document.getElementById('liveScore').textContent = lives_score;
    document.getElementById('finalScore').textContent = finalScore;
    document.getElementById('scores').textContent = finalScore;
    document.getElementById('modalTitle').textContent = message;

    var myModal = new bootstrap.Modal(document.getElementById('myModal'));

    myModal.show();

    document.getElementById('revealCards').addEventListener('click', () => {
        RevealAllCards();
        myModal.hide();
    });

    document.getElementById('exitGame').addEventListener('click', () => {
        window.location.href = "index.html";
    });

    document.getElementById('playAgain').addEventListener('click', () => {
        location.reload();
    });
}

/*
Function: This function will reveal all the cards which has not been revealed by the player.
This function is called inside DisplayGameResultModal function.
*/

function RevealAllCards() {
    for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        var image_id = `A${card.card_suite}${card.card_number}`;
        var imageElement = document.getElementById(image_id);
        let newSource = "card-assets/" + `${card.card_suite}_${card.card_number}` + ".svg";
        imageElement.src = newSource;
    }
}