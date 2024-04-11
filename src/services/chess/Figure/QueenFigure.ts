import BaseFigure from "./BaseFigure";
import ElephantFigure from "./ElephantFigure";
import RookFigure from "./RookFigure";
import Board from "../Board";
import Action from "../Action/Action";

export default class QueenFigure extends BaseFigure {
    public getActions(board: Board): Action[] {
        var rookFigure = new RookFigure(this.boardSquare, this.team);
        var elephantFigure = new ElephantFigure(this.boardSquare, this.team);

        return [...rookFigure.getActions(board), ...elephantFigure.getActions(board)]; 
    }

    public getCopy(): BaseFigure {
        let queen = new QueenFigure(this.boardSquare, this.team);
        queen.isBeaten = this.isBeaten;
        return queen;
    }
}