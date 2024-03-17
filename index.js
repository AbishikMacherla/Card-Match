function arrayOfNumbers(numbers, kind) {
    let cards = [];
    for (let index = 0; index < 9; index++) {
        var random = Math.random();
        var number = numbers[(Math.floor(random * numbers.length))];
        var suite = kind[(Math.floor(random * kind.length))];
        cards.push({card_number:number,card_suite:suite});
    }
    return cards;
}

let card_values = ["A","2","3","4","5","6","7","8","9","10","J","K","Q"];
let suites = ["Diamond","Heart","Spades","Clover"];

let cards = arrayOfNumbers(card_values, suites);

for (let index = 0; index < cards.length; index++) {
    console.log(cards[index]);
}