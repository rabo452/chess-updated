import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";
import BoardSquare from "../BoardSquare";
import MoveAction from "../Action/MoveAction";
import Team from "../Team";

export default class ElephantFigure extends BaseFigure {
    public getCopy(): BaseFigure {
        var elephant = new ElephantFigure(this.boardSquare, this.team);
        elephant.isBeaten = this.isBeaten;
        return elephant;
    }
    
    public getActions(board: Board): Action[] {
        var actions: Action[] = [];
        var algoritms = [
            (row: number, column: number, i: number) => [row - i, column + i], // left-top 
            (row: number, column: number, i: number) => [row - i, column - i], // right-top
            (row: number, column: number, i: number) => [row + i, column + i], // left-bottom
            (row: number, column: number, i: number) => [row + i, column - i]  // right-bottom
        ]; // the algoritms for search of beaten fields 

        var row = this.boardSquare.row;
        var column = this.boardSquare.column;

        for (var i = 0; i < algoritms.length; i++) {
            var algorithm: Function = algoritms[i];

            for (var y = 1; y < 8; y++) {
                var temp_row: number, temp_column: number;
                [temp_row, temp_column] = algorithm(row, column, y);
                try {
                    var toSquare = new BoardSquare(temp_row, temp_column);
                    var toFigure = board.getBoardFigure(toSquare);

                    if (!this.isAbleToMoveTo(toFigure)) {
                        break;
                    }

                    actions.push(new MoveAction(this.boardSquare, toSquare));
                    
                    if (toFigure.team !== Team.Neutral) {
                        break;
                    }
                }catch(e) {
                    break;
                }
            }
        }

        return actions;
    }
}