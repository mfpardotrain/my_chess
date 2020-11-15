import ChessPiece from "./ChessPieces.js";

export class Knight extends ChessPiece {

    validSquares(row, col, boardState, test=false) {
        let rowDiff = Math.abs(row - this.row);
        let colDiff = Math.abs(col - this.col);
        let collides = boardState.filter(el => el.col === col && el.row === row)
        if (row === this.row && col === this.col) {
            return false
        }
        if (((rowDiff === 1) && (colDiff === 2)) || ((rowDiff === 2) && (colDiff === 1))) {
            if (collides.length > 0) {
                if (collides[0].color === this.color) {
                    return false
                }
                else {
                    collides[0].setTaken(test)
                    boardState.filter(el => !el.taken)
                }
            }
            return true
        }
        else return false
    }
}