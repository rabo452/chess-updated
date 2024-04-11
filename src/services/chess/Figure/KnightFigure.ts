import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";
import MoveAction from "../Action/MoveAction";
import BoardSquare from "../BoardSquare";

export default class KnightFigure extends BaseFigure {
    public getActions(board: Board): Action[] {
        let actions: Action[] = [];
        let row = this.boardSquare.row;
        let column = this.boardSquare.column;

        // fields difference between current figure point and beaten field point
        var columns_values = [1, -1, 2, -2, 1, -1, 2, -2];
        var rows_values = [2, 2, 1, 1, -2, -2, -1, -1];

        for (var i = 0; i < rows_values.length; i++) {
            let temp_row = row + rows_values[i];
            let temp_column = column + columns_values[i];

            try {
                let toSquare = new BoardSquare(temp_row, temp_column);
                let toFigure = board.getBoardFigure(toSquare);
                if (!this.isAbleToMoveTo(toFigure)) {
                    continue;
                }
                actions.push(new MoveAction(this.boardSquare, toSquare));
            }catch(e) {
                continue;
            }
        }

        return actions;
    }
    
    public getCopy(): BaseFigure {
        let knight = new KnightFigure(this.boardSquare, this.team);
        knight.isBeaten = this.isBeaten;
        return knight;
    }
}