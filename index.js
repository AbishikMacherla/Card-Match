const suits = ["Diamond", "Heart", "Spades", "Clover"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];

const table = document.querySelector('table');

for (let value of values) {
    const row = document.createElement('tr');

    for (let suit of suits) {
        const button = document.createElement('button');
        button.textContent = value;
        button.id = `${suit}_${value}`;
        button.addEventListener('click', () => ValidateUserInput(button.value));
        row.appendChild(button);
    }
    table.appendChild(row);
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
    for (let i = 0; i < cards.length; i++) {
        let card_value = card_values.indexOf(cards[i].card_number) + 1;
        sum = sum + card_value;
    }
    document.getElementById("sum_of_cards").innerHTML = `${sum}`;
    return sum;
}

function ValidateUserInput(buttonValue) {
    console.log(buttonValue);
    let [suite, number] = buttonValue.split("_");
    console.log(suite);
    console.log(number);
}

let card_values = ["A","2","3","4","5","6","7","8","9","10","J","K","Q"];
let suites = ["Diamond","Heart","Spades","Clover"];

let cards = ArrayOfNumbers(card_values, suites);
for (let index = 0; index < cards.length; index++) {
    console.log(cards[index]);
}

SumOfTheCardValues(cards);

const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        console.log(buttons[i].id);
    });
}