function arrayOfNumbers(numbers, kind) {
for (let index = 0; index < 9; index++)
{
    var random = Math.random();
    let numbers_array = numbers[(Math.floor(random * numbers.length))];
    let kind_array = kind[(Math.floor(random * kind.length))];
    let random_deck = {numbers_array:kind_array};
    console.log(random_deck);
}
}

//let user_input = prompt("Please enter the any card value:");

let card_values = ["A","2","3","4","5","6","7","8","9","10","J","K","Q"];
let suites = ["Diamond","Heart","Spades","Clover"];

arrayOfNumbers(card_values, suites);