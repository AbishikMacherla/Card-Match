//function array_of_numbers(numbers, kind) {
//    let cards = [];
//    for (let index = 0; index < 9; index++) {
//        var random = Math.random();
//        var number = numbers[(Math.floor(random * numbers.length))];
//        var suite = kind[(Math.floor(random * kind.length))];
//        cards.push({card_suite:suite,card_number:number});
//    }
//    return cards;
//}
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
    const buttons = document.querySelectorAll('button');
    console.log(buttonValue);
    let [suite, number] = buttonValue.split("_");
    console.log(suite);
    console.log(number);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            //console.log(buttons[i].id);
        });
    }
}

let card_values = ["A","2","3","4","5","6","7","8","9","10","J","K","Q"];
let suites = ["Diamond","Heart","Spades","Clover"];

let cards = ArrayOfNumbers(card_values, suites);
SumOfTheCardValues(cards);
ValidateUserInput();

for (let index = 0; index < cards.length; index++) {
    console.log(cards[index]);
}