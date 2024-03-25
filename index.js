function CreateButtons(values, suites) {
    const table = document.querySelector('table');

    for (let value of values) {
        const row = document.createElement('tr');
        for (let suit of suites) {
            const tabledata = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = value;
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

function ArrayOfNumbers(numbers, kind) {
    let cards = [];
    let card = new Set();

    while (card.size < 9) {
        var random = Math.random();
        var index = Math.floor(random * numbers.length);
        if (!card.has(index)) {
            card.add(index);
            var number = numbers[index];
            var suite = kind[Math.floor(random * kind.length)];
            cards.push({ card_suite: suite, card_number: number });
        }
    }

    return cards;
}

function SumOfTheCardValues(cards) {
    let sum = 0;
    for (let card of cards) {
        let card_value = values.indexOf(card.card_number) + 1;
        sum = sum + card_value;
    }
    document.getElementById("sum_of_cards").innerHTML = `${sum}`;
    return sum;
}
const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        ValidateUserInput(buttons[i]);
    });
}

let score = 0;
let lives = 15;
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
        alert("You clicked the right card");
        score = score + 100;
        display_score.innerHTML = `${score}`;
        button.classList.add("disabled");
        button.style.backgroundColor = "green";
        ReplaceCardImage(newSource, cards.indexOf(randomCard));

        let cardValue = values.indexOf(randomCard.card_number) + 1;
        let totalSum = document.getElementById("sum_of_cards").textContent;
        totalSum = totalSum - cardValue;
        document.getElementById("sum_of_cards").textContent = totalSum;
        if (totalSum === 0 ) {
            alert("Congratulations, you have won the game");
            DisableAllCards();
        }

    } else {
        alert("You clicked the wrong card");
        lives = lives - 1;
        button.style.backgroundColor = "red";
        display_lives.innerHTML = `${lives}`;
        button.classList.add("disabled");
    }
    if (lives === 0) {
        alert("Game Over!");
        DisableAllCards();
    }
}

function DisableAllCards() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function ReplaceCardImage(newSource, cardIndex) {
    const matrix = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
    let image_reveal = [];

    for (let position = 0; position < matrix.length; position++) {
        var image_id = "A" + matrix[position];
        image_reveal.push({ image_position: image_id, isopen: false });
    }

    let imageId = image_reveal[cardIndex].image_position;
    var imageElement = document.getElementById(imageId);

    if (image_reveal[cardIndex].isopen === false) {
        imageElement.src = newSource;
        image_reveal[cardIndex].isopen = true;
    }
}

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
const suites = ["Diamond", "Heart", "Spades", "Clover"];

CreateButtons(values, suites);

let cards = ArrayOfNumbers(values, suites);
for (let card of cards) {
    console.log(card);
}

SumOfTheCardValues(cards);