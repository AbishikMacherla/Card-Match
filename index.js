function CreateButtons(values, suites) {
    const table = document.querySelector('table');

    for (let value of values) {
        const row = document.createElement('tr');
        for (let suit of suites) {
            const tabledata = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = value;
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
document.getElementById("lives").innerHTML = `${lives}`;

function ValidateUserInput(button) {
    const clicked_cardSuite = button.id.split('_')[0];
    const clicked_cardNumber = button.id.split('_')[1];
    console.log(clicked_cardSuite);
    console.log(clicked_cardNumber);
    const randomCard = cards.find(card => card.card_suite === clicked_cardSuite && card.card_number === clicked_cardNumber);

    if (randomCard) {
        alert("You clicked the right card");
        score = score + 100;
        document.getElementById("scores").innerHTML = `${score}`;
        button.disabled = true;

    } else {
        alert("You clicked the wrong card");
        button.disabled = true;
        lives = lives - 1;
        document.getElementById("lives").innerHTML = `${lives}`;
    }
    if (lives === 0) {
        alert("Game Over!");

    }
}

function SumOfTheCardValues(cards, cardValue, operation) {

}

function ReplaceCardImage () {
    
}

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
const suites = ["Diamond", "Heart", "Spades", "Clover"];

CreateButtons(values, suites);

let cards = ArrayOfNumbers(values, suites);
for (let card of cards) {
    console.log(card);
}

SumOfTheCardValues(cards);