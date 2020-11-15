import ChessPiece from "./ChessPieces.js";

export class Queen extends ChessPiece {

    validSquares(row, col, boardState, test=false) {
        let isRook = (row === this.row || col === this.col);
        let isBishop =  (Math.abs(row - this.row) === Math.abs(col - this.col))
        if (isRook) {
            let isValid = (target, start) => (target.row === start.row || target.col === start.col);
            return this.rookBishopMove(row, col, boardState, isValid, test)
        }
        if (isBishop) {
            let isValid = (target, start) => Math.abs(target.row - start.row) === Math.abs(target.col - start.col);
            return this.rookBishopMove(row, col, boardState, isValid, test)
        }
        else return false
    }
}