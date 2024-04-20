import Action from "./Action/Action";
import Board from "./Board";
import clearBeatenSquares from "./clearBeatenSquares";
import setBeatenSquares from "./setBeatenSquares";
import Team from "./Team";

const isActionProtected = (action: Action, team: Team, board: Board) => {
    let copiedBoard = board.copyBoard();
    clearBeatenSquares(copiedBoard);
    action.doAction(copiedBoard);
    // TODO: optimize the code if possible
    setBeatenSquares(team === Team.Black ? Team.White : Team.Black, copiedBoard);
    let king = copiedBoard.getKing(team);

    return !king.isBeaten;
}
export default isActionProtected;