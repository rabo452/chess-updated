import Board from "../Board";
import Action from "./Action";
import MoveAction from "./MoveAction";

export default class PawnDoubleMoveAction extends MoveAction implements Action {
    doAction(board: Board): void {
        super.doAction(board);
    }
}