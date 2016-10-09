var CardsInitialization = require('./CardsInitialization.js');

function shuffleCardsList(cardsList) {
    var arrayLength = cardsList.length;
    for(var i = arrayLength-1; i > 0; i--) {
        var rndNo = Math.floor(Math.random() * (i + 1));
        var aux = cardsList[i];
        cardsList[i] = cardsList[rndNo];
        cardsList[rndNo] = aux;
    }
};

function divideCardsInBatches(cards, elementsOnBatch) {
    var elIndex = 0;
    var batchesList = [];
    const noOfBatches = Math.ceil(cards.length / elementsOnBatch);
    while(batchesList.length < noOfBatches - 1) {
        var batch = {};
        if(elIndex === 0){
            batch.cards = cards.slice(elIndex, elIndex + elementsOnBatch + 1);
            elIndex = elIndex + elementsOnBatch + 1;
        } else {
            batch.cards = cards.slice(elIndex, elIndex + elementsOnBatch);
            elIndex = elIndex + elementsOnBatch;
        }
        batchesList.push(batch);
    }
    return batchesList;
}

function divideCardsToPlayers(cards, noOfPlayers) {
    var dividedCards = {};
    for(var i = 0; i<noOfPlayers; i++){
        if(i === 0){
            dividedCards['Player' + i] = {};
            dividedCards['Player' + i].cards = cards.slice(i, 2).map((card) => card.cards);
            cards = cards.slice(2, cards.length);
        } else {
            dividedCards['Player' + i] = {};
            dividedCards['Player' + i].cards = cards.slice(i + 1, 2);
            cards = cards.slice(2, cards.length);
        }
    }
    dividedCards.atuu = cards[cards.length - 1].cards[0];
    cards.pop();
    dividedCards.publicCards = cards;
    return dividedCards;
}


module.exports = {
    getCardsBatches: function () {
        var batches = {};
        var cards = CardsInitialization.initializeGameCards();
        shuffleCardsList(cards);
        batches.cards = divideCardsInBatches(cards, 7);
        batches.Atuu = cards[cards.length - 1];
        return batches;
    }
    // getDividedCards : function(noOfPlayers){
    //     var cards = getCardsBatches();
    //     return divideCardsToPlayers(cards, noOfPlayers);
    // }
}