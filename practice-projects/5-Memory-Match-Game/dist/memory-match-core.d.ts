export declare let isGameOver: boolean;
type Card = {
    cardId: string;
    symbole: string;
    status: "Hidden" | "Flipped" | "Matched";
};
export declare function flipCardStatus(Id: string, cardsArray: Card[]): void;
export declare function timeTicker(cardsArray: Card[]): {
    min: string;
    sec: string;
} | undefined;
export declare function gameOver(cardsArray: Card[]): boolean;
export declare function startGame(): Card[];
export {};
//# sourceMappingURL=memory-match-core.d.ts.map