import { King, Rook, Bishop, Pawn, Knight, Queen } from "../ChessPieces";

class BoardClass {
    constructor() {
        this.isWhitesTurn = true;

        let buildPawns = [];
        for (let i = 0; i < 8; i++) {
            if (i < 8) {
                buildPawns.push(new Pawn("\u265F", "black", 1, i))
                buildPawns.push(new Pawn("\u2659", "white", 6, i))
            }
        };
        this.boardState = [
            new King("\u2654", "white", 7, 4),
            new King("\u265A", "black", 0, 4),
            new Queen("\u265B", "black", 0, 3),
            new Queen("\u2655", "white", 7, 3),
            new Rook("\u265C", "black", 0, 0),
            new Rook("\u265C", "black", 0, 7),
            new Rook("\u2656", "white", 7, 0),
            new Rook("\u2656", "white", 7, 7),
            new Bishop("\u265D", "black", 0, 2),
            new Bishop("\u265D", "black", 0, 5),
            new Bishop("\u2657", "white", 7, 2),
            new Bishop("\u2657", "white", 7, 5),
            new Knight("\u265E", "black", 0, 1),
            new Knight("\u265E", "black", 0, 6),
            new Knight("\u2658", "white", 7, 1),
            new Knight("\u2658", "white", 7, 6),
            ...buildPawns
        ]
        this.blackInCheck = this.boardState.filter(el => el.name === "\u265A")[0].isChecked;
        this.whiteInCheck = this.boardState.filter(el => el.name === "\u2654")[0].isChecked;
    };

    nextTurn() {
        this.isWhitesTurn = !this.isWhitesTurn
    };

    checkTurn(color) {
        return (this.isWhitesTurn && color === "white") || (!this.isWhitesTurn && color === "black")
    }

    inCheck() {
        let turn = this.isWhitesTurn ? "white" : "black"
        let curKing = this.boardState.filter(el => ["\u2654", "\u265A"].includes(el.name) && el.color === turn)
        return curKing.isChecked
    }

}

export default BoardClass;
