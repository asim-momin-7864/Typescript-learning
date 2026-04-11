//* Memory Matching Game Core Logic
// imports
import { v4 as uuidv4 } from 'uuid';
// Array of cards Symboles
const cardSymbolesArray = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
const cardsArray = cardSymbolesArray.map((symbole) => {
    return {
        cardId: uuidv4(),
        symbole: symbole,
        status: "Hidden"
    };
});
//TEST
console.log("CardsArray :", cardsArray);
//# sourceMappingURL=memory-match-core.js.map