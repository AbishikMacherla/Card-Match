function CreateButtons(values, suites) {
    const table = document.querySelector('table');

    const labelRow = document.createElement('tr');
    for (let suit of suites) {
        const labelData = document.createElement('td');
        labelData.textContent = suit;
        labelData.classList = `label-${suit.toLowerCase()}`;
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
            button.classList.add("btn-primary");
            button.classList.add("card-number-btn");
            button.id = `${suit}_${value}`;
            button.addEventListener('click', () => ValidateUserInput(button));
            tabledata.appendChild(button);
            tabledata.classList.add("card-number-td");
            row.appendChild(tabledata);
        }
        table.appendChild(row);
    }
}

function CreateCards(cards) {
    const gridContainer = document.querySelector('.grid-container');

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

let total_sum_of_cards = 0;
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

const buttons = document.querySelectorAll('.card-button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        ValidateUserInput(buttons[i]);
    });
}

let score = 0;
let combo = 0;
let lives = localStorage.getItem('selectedValue');
var display_score = document.getElementById("scores");
var display_lives = document.getElementById("lives");

display_score.innerHTML = `${score}`;
display_lives.innerHTML = `${lives}`;

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

function DisableAllCards() {
    const buttons = document.querySelectorAll('.card-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

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

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suites = ["Diamond", "Heart", "Spades", "Clover"];

CreateButtons(values, suites);

let cards = ArrayOfNumbers(values, suites);
for (let card of cards) {
    console.log(card);
}

CreateCards(cards);
SumOfTheCardValues(cards);

function DisplayGameResultModal(result, score) {
    let message = '';
    if (result === 'win') {
        message = 'Congratulations, you have won the game!';
    } else {
        message = 'Game Over. You have lost the game.';
    }

    let lives_score = lives * 100;
    let finalScore = score + lives_score

    document.getElementById('gameScore').textContent = score;
    document.getElementById('liveScore').textContent = lives_score;
    document.getElementById('finalScore').textContent = finalScore;
    document.getElementById('modalTitle').textContent = message;

    var myModal = new bootstrap.Modal(document.getElementById('myModal'));

    myModal.show();

    document.getElementById('revealCards').addEventListener('click', () => {
        RevealAllCards();
    });

    document.getElementById('exitGame').addEventListener('click', () => {
        window.location.href = "index.html";
    });

    document.getElementById('playAgain').addEventListener('click', () => {
        location.reload();
    });
}

function RevealAllCards() {
    for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        var image_id = `A${card.card_suite}${card.card_number}`;
        var imageElement = document.getElementById(image_id);
        let newSource = "card-assets/" + `${card.card_suite}_${card.card_number}` + ".svg";
        imageElement.src = newSource;
    }
}