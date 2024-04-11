import Action from "./Action/Action";
import Board from "./Board";
import Team from "./Team";

const isActionProtected = (action: Action, team: Team, board: Board) => {
    let copiedBoard = board.copyBoard();
    action.doAction(copiedBoard);
    let king = copiedBoard.getKing(team);

    return !king.isBeaten;
}
export default isActionProtected;