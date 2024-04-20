import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";
import BoardSquare from "../BoardSquare";
import MoveAction from "../Action/MoveAction";
import Team from "../Team";

export default class RookFigure extends BaseFigure {
    private _turnsMade = 0;
    
    constructor(boardSquare: BoardSquare, team: Team, turnsMade: number = 0) {
        super(boardSquare, team);
        this._turnsMade = turnsMade;
    }

    public get turnsMade(): number {
        return this._turnsMade;
    }

    public afterAction(action: Action): void {
        this._turnsMade += 1;
    }

    public getActions(board: Board): Action[] {
        var actions: Action[] = [];
        var algoritms = [
            (row: number, column: number, i: number) => [row - i, column], // top side 
            (row: number, column: number, i: number) => [row + i, column], // bottom side
            (row: number, column: number, i: number) => [row, column - i], // left side
            (row: number, column: number, i: number) => [row, column + i]  // right side
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

    public getCopy(): BaseFigure {
        var rook = new RookFigure(this.boardSquare, this.team, this._turnsMade);
        rook.isBeaten = this.isBeaten;
        return rook;
    }
}