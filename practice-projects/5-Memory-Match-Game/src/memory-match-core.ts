//* Memory Matching Game Core Logic

//* Game Over flag for UI
export let isGameOver: boolean = false;

// Array of cards Symboles
const cardSymbolesArray: string[] = [
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

// type
type Card = {
  cardId: string;
  symbole: string;
  status: "Hidden" | "Flipped" | "Matched";
};

//------------------------------------------------------------------------------------------------

//* resetCards function
function resetCards(cardsArray: Card[]): void {
  cardsArray.forEach((card) => {
    if (card.status !== "Matched") {
      card.status = "Hidden";
    }
  });
}

//* matchedCardStatus function
function matchedCardStatus(card1: Card, card2: Card, cardsArray: Card[]): void {
  cardsArray.forEach((card) => {
    // find these 2 cards
    if (card.cardId === card1.cardId || card.cardId === card2.cardId) {
      card.status = "Matched";
    }
  });

  return;
}

//* card Matcher function
function cardMatcher(flippedCardsArray: Card[], cardsArray: Card[]): void {
  // both cards
  let card1: Card | undefined = flippedCardsArray[0];
  let card2: Card | undefined = flippedCardsArray[1];

  // not get proper cards
  if (typeof card1 === "undefined" || typeof card2 === "undefined") {
    console.log(" Not get proper cards ");
    return;
  }

  // matching cards - checking
  if (card1.symbole !== card2.symbole) {
    console.log("both cards are different");
    resetCards(cardsArray);
    return;
  }

  console.log("Both cards are matched");
  matchedCardStatus(card1, card2, cardsArray);
}

//---------------------------------------------------------------------------

//! MISTAKE
//* Data type to store flipped card at once
// const flippedCardsArray: Card[] = [];

// this functions is attched to all cards on ui, as user click card this function will handle,
// as many tim user click on any card this function will execute

// flipped card function
function flippedCard(cardId: string, cardsArray: Card[]): void {
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

  // empty array first
  let flippedCardsArray: Card[] = [];

  flippedCardsArray = cardsArray.filter((card) => card.status === "Flipped");

  // check any card fillped
  if (flippedCardsArray.length === 0) {
    console.log(" No card is flipped, Please Flipped Card ");
    // here we can send message to Frontend also

    return;
  }

  //* TEST
  // console.log("flippedCardsArray ==>", flippedCardsArray);

  //TODO more than 2 cards flliped
  if (flippedCardsArray.length > 2) {
    console.log(" More than 2 cards are flipped, Flipp only 2 cards ");

    // reset function
    resetCards(cardsArray);
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
  cardMatcher(flippedCardsArray, cardsArray);
}

//--------------------------------------------------------------------------

// when user click card, we need to change that cards status from HIdden --> Filliped
export function flipCardStatus(Id: string, cardsArray: Card[]): void {
  cardsArray.forEach((card) => {
    if (card.cardId === Id) {
      card.status = "Flipped";
    }
  });

  // called flipped card ()
  flippedCard(Id, cardsArray);
}

//-----------------------------------------------------------------------------

//* time limit function

// keep it global because we are changing it continously and using in differnt fucntions , it new value
let countDown: number = 30; // (30 sec)

//* time formatter
function timeFormatter() {
  let min: string = String(Math.floor(countDown / 60)).padStart(2, "0");
  let sec: string = String(countDown % 60).padStart(2, "0");

  console.log(` Time : ${min} : ${sec} `);

  return {
    min: min,
    sec: sec,
  };
}

//* time tracker
export function timeTicker(cardsArray: Card[]) {
  // check time is zero
  if (countDown === 0) {
    gameOver(cardsArray);

    //! this is UI part donot mix which engin logic
    // clearInterval(ID);

    // show game over UI
    console.log("Time End! Game Over");
    return;
  }

  countDown = countDown - 1;

  //* HOW TO RETURN ANOTHER CALLED FUNC VALUE ...  means its return value
  //!  IMP POINT: if parent func have return type : void , then inside called function even if return some value , it cannot get out of parent function ... functions run inside each others contetx , child in parents

  //Example
  // timeFormatter();
  // we did not get -->   { min: min,sec: sec }
  // bcz timeTicker has :void return type

  //* give attension while writting logic , otherwise wont works
  //* SOLUTION
  return timeFormatter();
}

//------------------------------------------------------------------------------------------------

//TODO Reset Game
function resetWholeGame(cardsArray: Card[]): void {
  // empty array
  cardsArray = [];

  //TODO call start game func
  startGame();
}

//TODO gameOver
export function gameOver(cardsArray: Card[]): boolean {
  // game over flag
  isGameOver = true;

  let ID = setTimeout(() => {
    resetWholeGame(cardsArray);
    clearTimeout(ID);
  }, 1000);

  return isGameOver;
}

//---------------------------------------------------------------------------------

//TODO Start Game Func

export function startGame() {
  // vars
  isGameOver = false;
  countDown = 30;

  //* We need to shuffle our symbles indexes, to add randomes into games, other wise it becomes exact same

  //! Not Reliable
  //* #1 basic Quick way we are using
  // cardSymbolesArray.sort(() => 0.5 - Math.random());

  //TODO #2 Fisher-Yatches Shuffle Algorithm

  for (let index = (cardSymbolesArray.length-1); index > 0; index--) {
    // random number generate between 0 - T(idx)

    // let Ridx = Math.floor(Math.random() * cardSymbolesArray.length) + 10;
  let Ridx = Math.floor( Math.random() * (index + 1) )
    // temporarly Ridx symbole holder
    let Rsymbole: string | undefined = cardSymbolesArray[Ridx];

    // current target Index T(idx)
    // loop index is T (idx)
    let targetSymbole: string | undefined = cardSymbolesArray[index];

    /*
! ERRORS

 Type 'string | undefined' is not assignable to type 'string'.
 Type 'undefined' is not assignable to type 'string'.

  Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

 * - try to avoid
   as string (Type Assertion)
   Non-Null Assertion Operator (!)

*/

    // insted
    if (
      typeof Rsymbole === "undefined" ||
      typeof targetSymbole === "undefined"
    ) {
      console.log("Something went wrong ! Invalid Symbole");
      return;
    }

    // swap
    cardSymbolesArray[Ridx] = targetSymbole;
    cardSymbolesArray[index] = Rsymbole;
  }

  // Generate cards with ids and status (Objects)
  let cardsArray: Card[] = cardSymbolesArray.map((symbole) => {
    return {
      cardId: crypto.randomUUID(),
      symbole: symbole,
      status: "Hidden",
    };
  });

  // start func

  //! This handle on UI
  // setInterval call each secound func
  // let ID = setInterval(timeTicker, 1000, countDown);

  // Need to return
  // cardsArray
  return cardsArray;
}

startGame();

//TEST
// console.log("CardsArray :", cardsArray);
