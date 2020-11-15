import ChessPiece from "./ChessPieces.js";

export class King extends ChessPiece {

    canCastle(row, col, boardState) {
        if (![0, 7].includes(row) && !(2 > col || col > 5)) {
            return false
        }

        if (this.firstMove && ["\u2654", "\u265A"].includes(this.name)) {
            // let noKings = boardState.filter(el => !["\u2654", "\u265A"].includes(el.name))
            let whitePieces = boardState.filter(el => el.color === "white")
            let blackPieces = boardState.filter(el => el.color === "black")

            let blocked = []
            let side = ["castle"]
            for (let i = 0; i < 4; i++) {
                if (row === 0 && this.name === "\u265A") {
                    if (col < 2) {
                        let test = whitePieces.filter(el => el.validSquares(0, i, boardState, true))
                        let path = blackPieces.filter(el => el.row === 0 && el.col === i && el.name !== "\u265C")
                        console.log(test)
                        console.log(path)
                        if (test.length > 0 || path.length > 0) {
                            blocked.push(false)
                        } else {
                            i === 3 && side.push([{ row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 0 }])
                        }
                    }
                    if (col > 5) {
                        let test = whitePieces.filter(el => el.validSquares(0, i + 5, boardState, true))
                        let path = blackPieces.filter(el => el.row === 0 && el.col === i + 5 && el.name !== "\u265C")
                        console.log(path)
                        console.log(test)
                        if (test.length > 0 || path.length > 0) {
                            blocked.push(false)
                        } else {
                            i === 3 && side.push([{ row: 0, col: 6 }, { row: 0, col: 5 }, { row: 0, col: 7 }])
                        }

                    }
                }
                if (row === 7 && this.name === "\u2654") {
                    if (col < 2) {
                        let test = blackPieces.filter(el => el.validSquares(7, i, boardState, true))
                        let path = whitePieces.filter(el => el.row === 7 && el.col === i && el.name !== "\u2656")
                        if (test.length > 0 || path.length > 0) {
                            blocked.push(false)
                        } else {
                            i === 3 && side.push([{ row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 0 }])
                        }
                    }
                    if (col > 5) {
                        let test = blackPieces.filter(el => el.validSquares(7, i + 5, boardState, true))
                        let path = whitePieces.filter(el => el.row === 7 && el.col === i + 5 && el.name !== "\u2656")
                        console.log(test)
                        console.log(path)
                        if (test.length > 0 || path.length > 0) {
                            blocked.push(false)
                        } else {
                            i === 3 && side.push([{ row: 7, col: 6 }, { row: 7, col: 5 }, { row: 7, col: 7 }])
                        }
                    }
                }
            }
            console.log(side)
            if (blocked.length === 0 && side.length === 2) {
                return side
            }
            else return false
        }
        else return false
    }

    validSquares(row, col, boardState, test = false) {
        if ([7, 0].includes(row) && (2 > col || col > 5)) {
            let canCastleTo = this.canCastle(row, col, boardState)
            if (canCastleTo) {
                return canCastleTo // this.Castle(row, col, boardState)
            }
        }

        let rowDiff = Math.abs(row - this.row);
        let colDiff = Math.abs(col - this.col);
        let collides = boardState.filter(el => el.col === col && el.row === row)
        if ((row === this.row && col === this.col)) {
            return false
        }
        if ([0, 1].includes(rowDiff) && [0, 1].includes(colDiff)) {
            if (collides.length > 0) {
                if (collides[0].color === this.color) {
                    return false
                }
                else {
                    console.log(collides)
                    collides[0].setTaken(test)
                    boardState.filter(el => !el.taken)
                }
            }
            return true
        }
        else return false
    }
}