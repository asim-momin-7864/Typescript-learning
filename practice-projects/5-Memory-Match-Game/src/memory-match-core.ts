//* Memory Matching Game Core Logic

// imports
import { v4 as uuidv4 } from 'uuid';

// Array of cards Symboles
const cardSymbolesArray: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];

// Generate cards with ids and status (Objects)

// type
type Card = {
    cardId: string;
    symbole: string;
    status: "Hidden" | "Flipped" | "Matched";
}

const cardsArray: Card[] = cardSymbolesArray.map(
    (symbole) => {
        return {
            cardId: uuidv4(),
            symbole: symbole,
            status: "Hidden"
        }
    }
)

// resetCards function

// card Matcher function

// matchedCardStatus function



// flipped card function
function flippedCard(cardId: string): void {
    
    //* Conditions 

    // ALL ONE LOOP

    //TODO more than 2 cards flliped
    // reset function
    
    //TODO Find this card exists ?
    // Card is already flliped (twised)
    
     //TODO Only 2 cards flip
     // card Matcher
}

//TEST
console.log("CardsArray :", cardsArray);


