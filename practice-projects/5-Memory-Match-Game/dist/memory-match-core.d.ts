type Card = {
    cardId: string;
    symbole: string;
    status: "Hidden" | "Flipped" | "Matched";
};
export declare const cardsArray: Card[];
export declare function flipCardStatus(Id: string): void;
export {};
//# sourceMappingURL=memory-match-core.d.ts.map