import Board from "../Board";
import BoardSquare from "../BoardSquare";
import SquareFigure from "../Figure/SquareFigure";
import Team from "../Team";
import Action from "./Action";

class MoveAction implements Action {
    private fromSquare: BoardSquare;
    private toSquare: BoardSquare;

    constructor(fromSquare: BoardSquare, toSquare: BoardSquare) {
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
    }
    getActionSquare(): BoardSquare {
        return this.toSquare;
    }

    setPossibleBeating(board: Board): void {
        var toFigure = board.getBoardFigure(this.toSquare);
        toFigure.isBeaten = true;
    }

    doAction(board: Board): void {
        var fromFigure = board.getBoardFigure(this.fromSquare);
        board.setBoardFigure(fromFigure, this.toSquare);
        fromFigure.boardSquare = this.toSquare;
        board.setBoardFigure(new SquareFigure(this.fromSquare, Team.Neutral), this.fromSquare);
    }
}

export default MoveAction;