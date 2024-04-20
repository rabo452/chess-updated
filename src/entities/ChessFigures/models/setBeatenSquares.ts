import Board from "./Board";
import Team from "./Team";

const setBeatenSquares = (team: Team, board: Board) => {
    for (let figure of board) {
        if (figure.team !== team) {
            continue;
        }

        for (let action of figure.getActions(board)) {
            action.setPossibleBeating(board);
        }
    }
}

export default setBeatenSquares;