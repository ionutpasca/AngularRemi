
function getJollyValue() {
    return {
        number: 'Jolly',
        points: 50,
        color: {
            jollyColor: '#123'
        }
    }
}

function getPossibleColor() {
    return [
        {'red' : '#FC0606'},
        {'blue' : '#0E37E0'},
        {'black': '#000000'},
        {'yellow': '#FFF700'}
    ];
}

function initializeCardsPoints(listOfNumbers) {
    listOfNumbers.forEach((no) => {
        no.points = no.number > 9 ? 10 : 5;
    });
    listOfNumbers[0].points = 25;
    return listOfNumbers;
}

function generateAllCards(listOfNumbers, listOfColors) {
    const allCards = [];
    var newCard;
    listOfColors.forEach((color) => {
        listOfNumbers.forEach((number) => {
            newCard = Object.assign({}, number);
            newCard.color = color;
            allCards.push(newCard, newCard);
        });
    });
    return allCards;
}

function initializeNumbers() {
    var numbers = Array.from(new Array(14), (x,i) => { return {'number': i}});
    numbers.splice(0,1);
    numbers = initializeCardsPoints(numbers);
    return numbers;
}

module.exports.initializeGameCards = function() {
    const possibleColors = getPossibleColor();
    var numbers = initializeNumbers();
    var allCards = generateAllCards(numbers, possibleColors);
    var jolly = getJollyValue();
    allCards.push(jolly, jolly);
    return allCards;
};