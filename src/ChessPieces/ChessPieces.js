import Piece from "../Piece.js";

class ChessPiece {
    constructor(name, color, row, col) {
        this.name = name;
        this.row = row;
        this.col = col;
        this.selected = false;
        this.color = color;
        this.firstMove = true;
        this.taken = false;
        this.isChecked = false;
    }

    setPosition(row, col) {
        this.row = row;
        this.col = col;
    }

    setSelected() {
        this.selected = !this.selected;
    }

    setFirstMove() {
        this.firstMove = false;
    }

    setTaken(test) {
        this.taken = !test &&  true;
    }

    check() {
        this.isChecked = true;
    }

    unCheck() {
        this.isChecked = false;
    }

    returnChecked() {
        return this.isChecked;
    };

    testIsChecked(boardState) {
        if (boardState) {
            if (["\u2654", "\u265A"].includes(this.name)) {
                let otherPieces = boardState.filter(el => el.color !== this.color)
                otherPieces = otherPieces.filter(el => el.validSquares(this.row, this.col, boardState, true))
                if (otherPieces.length > 0) {
                    this.check()
                } else {
                    this.unCheck()
                }
            }
        }
    };

    rookBishopMove(row, col, boardState, isValid, test) {
        let target = { row: row, col: col }

        let isLessThan = (further, obj, closer) => (
            (Math.abs(further.row - obj.row) + Math.abs(further.col - obj.col)) >=
            (Math.abs(closer.row - obj.row) + Math.abs(closer.col - obj.col))
        );
        let boardCopy = [...boardState];
        let collides = boardCopy.filter(el => isValid(el, this));
        collides = collides.filter(el => isValid(target, el)); // checks if other pieces are a valid move to the target square

        let checks = collides.indexOf(el => this.color !== el.color && ["\u2654", "\u265A"].includes(el.name))
        checks.length > 0 && checks.check()
        let remove = collides.filter(el => isLessThan(this, target, el)); // checks if it is moving towards the piece
        remove = remove.filter(el => ((el.row !== this.row) || (el.col !== this.col)))

        // find closest collision piece
        let dists = remove.map(el => (Math.abs(el.row - this.row) + Math.abs(el.col - this.col)))
        let index = dists.indexOf(Math.min(...dists))
        remove = remove[index]


        if ((row === this.row && col === this.col)) {
            return false
        }

        if (isValid(target, this)) {
            if (remove === undefined) {
                return true
            }
            if (isLessThan(remove, this, target)) {
                if (remove.row === target.row && remove.col === target.col) {
                    if (remove.color === this.color) {
                        return false
                    }
                    remove.setTaken(test)
                    boardState.filter(el => !el.taken)
                }
                return true
            }
        }
        else return false
    };


    render() {
        return (
            <Piece row={this.row}
                col={this.col}
                pieceName={this.name}
                validSquares={this.validSquares}
                selected={this.selected}
                color={this.color}
            />
        )
    }
}

export default ChessPiece;
