import Board from "../Board";
import BoardSquare from "../BoardSquare";
import BaseFigure from "../Figure/BaseFigure";
import Action from "./Action";
import MoveAction from "./MoveAction";

export default class TransformationAction extends MoveAction implements Action {
    makeTransformation(figure: BaseFigure, board: Board) {
        board.setBoardFigure(figure, figure.boardSquare);
    }
}