import React, { useReducer } from 'react';

const Piece = (props) => {

    const { row, col, pieceName, validSquares, selected, color } = props;

    const pieceState = {
        row: row,
        col: col,
        selected: false,
        validSquares: validSquares,
    };

    function stateReducer(state, newState) {
        return { ...state, ...newState }
    };

    const [pieceInfo, setPieceInfo] = useReducer(stateReducer, pieceState)

    return (
        <div className={selected ? "piece-wrapper" + " piece-selected" : "piece-wrapper"}>
            <span className={"piece-name piece-" + color}>{pieceName}</span>
        </div>
    );
}

export default Piece;
