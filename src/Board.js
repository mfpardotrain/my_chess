import React, { useReducer } from 'react';
import Tile from "./Tile.js";
import BoardClass from "./BoardFolder/BoardClass.js";

const Board = (props) => {

    const { } = props;

    let Board = new BoardClass()

    const boardState = {
        pieces: Board.boardState.filter(el => !el.taken),
        boardObj: Board,
        selectedPiece: false,
    };

    function stateReducer(state, newState) {
        return { ...state, ...newState }
    };

    const [boardInfo, setBoardInfo] = useReducer(stateReducer, boardState);

    let { boardObj } = boardInfo;

    const selectPiece = (piece) => {
        if (boardInfo.selectedPiece) {
            boardInfo.selectedPiece.setSelected()
            setBoardInfo({ selectedPiece: false })
        } else {
            if ((piece.color === "white" && boardObj.isWhitesTurn) || (piece.color === "black" && !boardObj.isWhitesTurn)) {
                setBoardInfo({ selectedPiece: piece })
                piece && piece.setSelected()
            }
        }
    };

    const movePiece = (row, col) => {
        if (boardInfo.selectedPiece) {
            let prevSquare = { row: boardInfo.selectedPiece.row, col: boardInfo.selectedPiece.col }

            let validSquares = boardInfo.selectedPiece.validSquares(row, col, boardInfo.pieces)
            // handle castling
            if (["\u2654", "\u265A"].includes(boardInfo.selectedPiece.name) && validSquares &&
                validSquares !== true && validSquares.includes("castle")) {
                let pieceInfo = validSquares[1]
                let kingPos = pieceInfo[0]
                let rookPos = pieceInfo[1]
                console.log(boardInfo.pieces)
                let rook = boardInfo.pieces.filter(el =>
                    ["\u265C", "\u2656"].includes(el.name) &&
                    el.row === pieceInfo[2].row &&
                    el.col === pieceInfo[2].col)[0]
                console.log(rook)
                boardInfo.selectedPiece.setPosition(kingPos.row, kingPos.col)
                rook.setPosition(rookPos.row, rookPos.col)
                boardInfo.pieces.map(el => el.testIsChecked(boardInfo.pieces.filter(el => !el.taken)))
                setBoardInfo({ pieces: boardInfo.pieces.filter(el => !el.taken) })
                boardInfo.boardObj.nextTurn()
                boardInfo.selectedPiece.setFirstMove()
            }

            else if (validSquares) {

                // check if is in check or still in check
                let isInCheck = boardObj.boardState.filter(el => (el.returnChecked() && boardObj.checkTurn(el.color)))
                if (isInCheck.length > 0) {
                    boardInfo.selectedPiece.setPosition(row, col)
                    boardInfo.pieces.map(el => el.testIsChecked(boardInfo.pieces.filter(el => !el.taken)))
                    let stillInCheck = boardObj.boardState.filter(el => (el.returnChecked() && boardObj.checkTurn(el.color)))

                    if (stillInCheck.length > 0) {
                        boardInfo.selectedPiece.setPosition(prevSquare.row, prevSquare.col)
                    } else {
                        setBoardInfo({ pieces: boardInfo.pieces.filter(el => !el.taken) })
                        boardInfo.boardObj.nextTurn()
                        boardInfo.selectedPiece.setFirstMove()
                    }

                } else {
                    // if not in check move
                    boardInfo.selectedPiece.setPosition(row, col)
                    boardInfo.pieces.map(el => el.testIsChecked(boardInfo.pieces))

                    // test if new move puts you in check
                    let movedToCheck = boardObj.boardState.filter(el => (el.returnChecked() && boardObj.checkTurn(el.color)))
                    if (movedToCheck.length > 0) {
                        boardInfo.selectedPiece.setPosition(prevSquare.row, prevSquare.col)
                    } else {
                        setBoardInfo({ pieces: boardInfo.pieces.filter(el => !el.taken) })
                        boardInfo.boardObj.nextTurn()
                        boardInfo.selectedPiece.setFirstMove()
                    }
                    setBoardInfo({ selectedPiece: false })
                }
            } else {
                setBoardInfo({ selectedPiece: false })
            }
        }
    };

    const checkPieceOnTile = (row, col) => {
        let pieceArray = (
            boardInfo.pieces.map((piece) => {
                if (piece['row'] === row && piece['col'] === col)
                    return [true, piece]
                else
                    return [false, false]
            })
        )
        if (pieceArray.filter(el => el[0]).length > 0) {
            return pieceArray.filter(el => el[0])[0]
        } else {
            return [false, false]
        }
    };

    const tile = (color, row, col, piece) =>
        <Tile color={color}
            row={row}
            col={col}
            piece={piece}
            movePiece={movePiece}
            selectPiece={selectPiece}
            selectedPiece={boardInfo.selectedPiece}
        />

    const row = (startColor, endColor, rowName) => {
        let tiles = []

        for (let i = 0; i < 8; i++) {
            let [hasPiece, piece] = checkPieceOnTile(rowName, i);
            if (i % 2 === 0) {
                hasPiece ? tiles.push(tile(startColor, rowName, i, piece)) :
                    tiles.push(tile(startColor, rowName, i, false))
            } else {
                hasPiece ? tiles.push(tile(endColor, rowName, i, piece)) :
                    tiles.push(tile(endColor, rowName, i, false))
            }
        }
        return (
            <div className="row">{tiles}</div>
        )
    };

    const board = () => {
        let rows = []
        for (let i = 0; i < 8; i++) {
            if (i % 2 === 0) {
                rows.push(row("white", "black", i))
            } else {
                rows.push(row("black", "white", i))
            }
        }
        return (
            <div className="board">
                {rows}
            </div>
        )
    };


    return (
        <div className="board-wrapper">
            {board()}
        </div>
    );
};

export default Board;


