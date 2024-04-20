import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";

export default class SquareFigure extends BaseFigure {
    public getActions(board: Board): Action[] {
        return [];
    }

    public getCopy(): BaseFigure {
        let square = new SquareFigure(this.boardSquare, this.team);
        square.isBeaten = this.isBeaten;
        return square;
    }
}