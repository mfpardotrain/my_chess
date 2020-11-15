import ChessPiece from "./ChessPieces.js";

export class Rook extends ChessPiece {
    
    validSquares(row, col, boardState, test=false) {
        let isValid = (target, start) => (target.row === start.row || target.col === start.col);
        return this.rookBishopMove(row, col, boardState, isValid, test)
    }
}