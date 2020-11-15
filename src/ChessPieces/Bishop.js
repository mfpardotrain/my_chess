import ChessPiece from "./ChessPieces.js";

export class Bishop extends ChessPiece {

    validSquares(row, col, boardState, test=false) {
        let isValid = (target, start) => Math.abs(target.row - start.row) === Math.abs(target.col - start.col);
        return this.rookBishopMove(row, col, boardState, isValid, test)
    }
}