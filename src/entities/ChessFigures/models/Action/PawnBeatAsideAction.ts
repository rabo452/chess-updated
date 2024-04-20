import Board from "../Board";
import BoardSquare from "../BoardSquare";
import Action from "./Action";
import MoveAction from "./MoveAction";

export default class PawnBeatAsideAction extends MoveAction implements Action {
    private pawnBeatenField: BoardSquare;
    private _fromSquare: BoardSquare;
    constructor(fromSquare: BoardSquare, toSquare: BoardSquare, pawnBeatenField: BoardSquare) {
        super(fromSquare, toSquare);
        this.pawnBeatenField = pawnBeatenField;
        this._fromSquare = fromSquare;
    }
    
    doAction(board: Board): void {
        super.doAction(board);

        new MoveAction(this._fromSquare, this.pawnBeatenField).doAction(board); // deletes the pawn
    }
    
}