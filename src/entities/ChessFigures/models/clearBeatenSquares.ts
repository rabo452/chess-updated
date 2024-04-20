import Board from "./Board";

const clearBeatenSquares = (board: Board) => {
    for (let figure of board) {
        figure.isBeaten = false;
    }
}

export default clearBeatenSquares;