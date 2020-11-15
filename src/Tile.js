import React, { useReducer } from 'react'

const Tile = (props) => {

    const { color, row, col, piece, selectPiece, movePiece, selectedPiece } = props;

    const tileState = {
        row: row,
        col: col,
        selected: false,
    };

    function stateReducer(state, newState) {
        return { ...state, ...newState }
    };

    const [tileInfo, setTileInfo] = useReducer(stateReducer, tileState)

    return (
        <div className={tileInfo.selected ? "tile tile-" + color + "-selected" : "tile tile-" + color}
             onClick={() => {
                             selectedPiece && movePiece(row, col)
                             selectPiece(piece)
                            }}
        >
            {piece && piece.render()}
        </div>
    );
}

export default Tile;
