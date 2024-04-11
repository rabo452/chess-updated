import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";
import BoardSquare from "../BoardSquare";
import MoveAction from "../Action/MoveAction";
import Team from "../Team";
import RookFigure from "./RookFigure";
import LongCastlingAction from "../Action/LongCastlingAction";
import ShortCastlingAction from "../Action/ShortCastlingAction";

export default class KingFigure extends BaseFigure {
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
        var row = this.boardSquare.row;
        var column = this.boardSquare.column;

        for (let i = -1; i <= 1; i++) {
            for (let y = -1; y <= 1; y++) {
                if (y == 0 && i == 0) {
                    continue;
                }
                try {
                    let toSquare = new BoardSquare(row + i, column + y);
                    let toFigure = board.getBoardFigure(toSquare);
                    if (this.isAbleToMoveTo(toFigure)) {
                        actions.push(new MoveAction(this.boardSquare, toSquare));
                    }
                }catch(e) {
                    continue;
                }
            }
        }

        // castling logic
        if (this._turnsMade !== 0 || this.isBeaten) {
            return actions;
        }
        
        let castlingRow = this.team === Team.White ? 7 : 0;

        // check rooks
        let longCastlingFigure = board.getBoardFigure(new BoardSquare(castlingRow, 0));
        let shortCastlingFigure = board.getBoardFigure(new BoardSquare(castlingRow, 7));
        
        for (let figure of [longCastlingFigure, shortCastlingFigure]) {
            if (!(figure instanceof RookFigure)) {
                continue;
            }

            let rook = figure as RookFigure;
            if (rook.turnsMade !== 0) {
                continue;
            }

            // are the squares between king and rook empty?
            let isLongCastling = rook.boardSquare.column === 0;
            let isAbleToMakeCastling = true;
            for (var i = column + (isLongCastling ? -1 : 1); i != (isLongCastling ? 0 : 7); (isLongCastling ? i-- : i++)) {
                figure = board.getBoardFigure(new BoardSquare(castlingRow, i));
                if (figure.team !== Team.Neutral) {
                    isAbleToMakeCastling = false;
                    break;
                }
            }

            // are the 2 squares, through those the king goes, under attack?
            for (var i = 1; i <= 2; i++) {
                figure = board.getBoardFigure(new BoardSquare(castlingRow, column + (isLongCastling ? -i : i)));
                if (figure.isBeaten) {
                    isAbleToMakeCastling = false;
                    break;
                }
            }


            if (!isAbleToMakeCastling) {
                continue;
            }

            actions.push(isLongCastling ? new LongCastlingAction(castlingRow) : new ShortCastlingAction(castlingRow));
        }

        return actions;
    }

    public getCopy(): BaseFigure {
        let king = new KingFigure(this.boardSquare, this.team, this._turnsMade);
        king.isBeaten = this.isBeaten;
        return king; 
    }

    public isAcceptibleToBeBeaten(): Boolean {
        return false;
    }
}