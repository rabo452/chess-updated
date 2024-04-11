import Team from "./Team";
import Board from "./Board";
import isActionProtected from "./isActionProtected";

// protected actions are those after which the team's king doesn't get attacked/beaten 
const DoesAnyProtectedActionExist = (team: Team, board: Board): Boolean => {
    for (let figure of board) {
        if (figure.team !== team) continue;

        for (let action of figure.getActions(board)) {
            let copyBoard = board.copyBoard();
            if (isActionProtected(action, team, copyBoard)) {
                return true;
            }
        }
    }
    
    return false;
}

export default DoesAnyProtectedActionExist;