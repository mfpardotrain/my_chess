import ChessPiece from "./ChessPieces.js";
import { Queen } from "./Queen.js";

export class Pawn extends ChessPiece {

    queenMe(row, col, boardState) {
        if (this.color === "white") {
            if (row === 0) {
                this.setTaken()
                boardState.push(new Queen("\u2655", "white", row, col))
            }
        }
        else {
            if (row === 7) {
                this.setTaken()
                boardState.push(new Queen("\u265B", "black", row, col))
            }
        }
    }

    validSquares(row, col, boardState, test = false) {
        let rowDiff = row - this.row;
        let colDiff = col - this.col;
        let colTrue = Math.abs(col - this.col) === 0;
        if ((row === this.row && col === this.col)) {
            return false
        }
        let collides = (arr) => boardState.filter(el => el.col === col && arr.includes(row - el.row))

        let attacks = this.color === "white" ?
            boardState.filter(el => el.row === row && el.col === col && el.color !== this.color && el.row < this.row) :
            boardState.filter(el => el.row === row && el.col === col && el.color !== this.color && el.row > this.row)

        if ([1, -1].includes(colDiff) && [-1, 1].includes(rowDiff)) {
            if (attacks.length > 0) {
                if ([0, 7].includes(row) && !test) {
                    this.queenMe(row, col, boardState)
                }
                attacks[0].setTaken(test)
                boardState.filter(el => !el.taken)
                return true
            }
        }

        if ([-1, -2, 1, 2].includes(rowDiff) && colTrue) {
            if ([0, 7].includes(row) && !test && collides([0]).length === 0) {
                this.queenMe(row, col, boardState)
                return true
            }
            if (this.color === "white" && [-1].includes(rowDiff)) {
                if (collides([0]).length > 0) {
                    return false
                }
                return true
            }
            if (this.color === "black" && [1].includes(rowDiff)) {
                if (collides([0]).length > 0) {
                    return false
                }
                return true
            }
            if (this.firstMove) {
                if (this.color === "white" && [-1, -2].includes(rowDiff)) {
                    if (collides([0, -1]).length > 0) {
                        return false
                    }
                    return true
                }
                if (this.color === "black" && [1, 2].includes(rowDiff)) {
                    if (collides([0, 1]).length > 0) {
                        return false
                    }
                    return true
                }
            }

        }
        else return false
    }
}