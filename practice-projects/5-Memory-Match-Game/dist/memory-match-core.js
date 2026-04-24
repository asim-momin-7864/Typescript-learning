//* Memory Matching Game Core Logic
//TODO wrappe up everything into Start game function
// Array of cards Symboles
const cardSymbolesArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
];
//* We need to shuffle our symbles indexes, to add randomes into games, other wise it becomes exact same
//* basic Quick way we are using
cardSymbolesArray.sort(() => 0.5 - Math.random());
export const cardsArray = cardSymbolesArray.map((symbole) => {
    return {
        cardId: crypto.randomUUID(),
        symbole: symbole,
        status: "Hidden",
    };
});
//* resetCards function
function resetCards() {
    cardsArray.forEach((card) => {
        if (card.status !== "Matched") {
            card.status = "Hidden";
        }
    });
}
//* matchedCardStatus function
function matchedCardStatus(card1, card2) {
    cardsArray.forEach((card) => {
        // find these 2 cards
        if (card.cardId === card1.cardId || card.cardId === card2.cardId) {
            card.status = "Matched";
        }
    });
    return;
}
//* card Matcher function
function cardMatcher(flippedCardsArray) {
    // both cards
    let card1 = flippedCardsArray[0];
    let card2 = flippedCardsArray[1];
    // not get proper cards
    if (typeof card1 === "undefined" || typeof card2 === "undefined") {
        console.log(" Not get proper cards ");
        return;
    }
    // matching cards - checking
    if (card1.symbole !== card2.symbole) {
        console.log("both cards are different");
        resetCards();
        return;
    }
    console.log("Both cards are matched");
    matchedCardStatus(card1, card2);
}
//! MISTAKE
//* Data type to store flipped card at once
// const flippedCardsArray: Card[] = [];
// this functions is attched to all cards on ui, as user click card this function will handle,
// as many tim user click on any card this function will execute
// flipped card function
function flippedCard(cardId) {
    // ALL ONE LOOP
    //* Conditions
    //! MISTAKE - global var mutation
    // cardsArray.forEach((card) => {
    //   if (card.status === "Flipped") {
    //     // push card in to array
    //     flippedCardsArray.push(card);
    //     return;
    //   }
    // });
    const flippedCardsArray = cardsArray.filter((card) => card.status === "Flipped");
    // check any card fillped
    if (flippedCardsArray.length === 0) {
        console.log(" No card is flipped, Please Flipped Card ");
        // here we can send message to Frontend also
        return;
    }
    //* TEST
    console.log("flippedCardsArray ==>", flippedCardsArray);
    //TODO more than 2 cards flliped
    if (flippedCardsArray.length > 2) {
        console.log(" More than 2 cards are flipped, Flipp only 2 cards ");
        // reset function
        resetCards();
        return;
    }
    //   TODO Find this card exists ?
    //   Card is already flliped (twised)
    //? No needed to check again beacuse , we are finding from same array so they should be exists
    //TODO Only 2 cards flip
    if (flippedCardsArray.length < 2) {
        console.log(" Flipped one more card, you just now flipped one card only ");
        return;
    }
    //* only 2 cards exists
    // card Matcher
    cardMatcher(flippedCardsArray);
}
// when user click card, we need to change that cards status from HIdden --> Filliped
export function flipCardStatus(Id) {
    cardsArray.forEach((card) => {
        if (card.cardId === Id) {
            card.status = "Flipped";
        }
    });
    // called flipped card ()
    flippedCard(Id);
}
//TODO Reset Game
//* time limit function
//* time formatter
function timeFormatter(countDown) {
    let min = String(Math.floor(countDown / 60)).padStart(2, "0");
    let sec = String(countDown % 60);
    console.log(` Time : ${min} : ${sec} `);
    return {
        min: min,
        sec: sec,
    };
}
//* time tracker
let countDown = 60; // (1 min)
function timeTicker() {
    // check time is zero
    if (countDown === 0) {
        //TODO call reset game func
        clearInterval(ID);
        // show game over UI
        console.log("Time End! Game Over");
        return;
    }
    countDown = countDown - 1;
    timeFormatter(countDown);
}
//* setInterval call each secound func
let ID = setInterval(timeTicker, 1000);
//TEST
console.log("CardsArray :", cardsArray);
//# sourceMappingURL=memory-match-core.js.map