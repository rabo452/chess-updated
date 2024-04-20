import BaseFigure from "./BaseFigure";
import Board from "../Board";
import Action from "../Action/Action";
import KnightFigure from "./KnightFigure";
import RookFigure from "./RookFigure";
import QueenFigure from "./QueenFigure";
import ElephantFigure from "./ElephantFigure";
import PawnDoubleMoveAction from "../Action/PawnDoubleMoveAction";
import Team from "../Team";
import TurnsCount from "../TurnsCount";
import BoardSquare from "../BoardSquare";
import MoveAction from "../Action/MoveAction";
import PawnBeatAsideAction from "../Action/PawnBeatAsideAction";
import TransformationAction from "../Action/TransformationAction";

export default class PawnFigure extends BaseFigure {
    isAbleToBeTransformed = true;
    private _turnsMade: number = 0;
    private _canBeBeatenAsideWithinTurn: number = 0;

    constructor(boardSquare: BoardSquare, team: Team, turnsMade: number = 0, canBeBeatenAsideWithinTurn: number = 0) {
        super(boardSquare, team);
        this._turnsMade = turnsMade;
        this._canBeBeatenAsideWithinTurn = canBeBeatenAsideWithinTurn;
    }

    public getActions(board: Board): Action[] {
        let forwardMoveNumber = this.team === Team.White ? -1 : 1;
        let transformationRow = this.team === Team.Black ? 7 : 0;
        let row = this.boardSquare.row;
        let column = this.boardSquare.column;
        let actions: Action[] = [];

        if (row === transformationRow) {
            return actions;
        }
        
        let nextFigure = board.getBoardFigure(new BoardSquare(row + forwardMoveNumber, column));
        if (nextFigure.team === Team.Neutral) {
            // field there transofrmation can be made
            actions.push(new MoveAction(this.boardSquare, new BoardSquare(row + forwardMoveNumber, column)));

            if (this._turnsMade == 0) {
                nextFigure = board.getBoardFigure(new BoardSquare(row + forwardMoveNumber * 2, column));
                if (nextFigure.team === Team.Neutral) {
                    actions.push(new PawnDoubleMoveAction(this.boardSquare, new BoardSquare(row + forwardMoveNumber * 2, column)));
                }
            }
        }

        for (let column_i of [-1, 1]) {
            try {
                nextFigure = board.getBoardFigure(new BoardSquare(row + forwardMoveNumber, column + column_i));
                if (this.isAbleToMoveTo(nextFigure) && nextFigure.team !== Team.Neutral) {
                    actions.push(new MoveAction(this.boardSquare, new BoardSquare(row + forwardMoveNumber, column + column_i)));
                }
            }catch(e) {
                continue;
            }
            
        }

        for (let column_i of [-1, 1]) {
            try {
                nextFigure = board.getBoardFigure(new BoardSquare(row, column + column_i));
                if (this.isAbleToMoveTo(nextFigure) && nextFigure.team !== Team.Neutral && nextFigure instanceof PawnFigure) {
                    let pawn = nextFigure as PawnFigure;
                    if (pawn._canBeBeatenAsideWithinTurn === TurnsCount.turns) {
                        actions.push(new PawnBeatAsideAction(this.boardSquare, new BoardSquare(row + forwardMoveNumber, column + column_i), pawn.boardSquare));
                    }
                }
            }catch(e) {
                continue;
            }
        }

        let _actions = actions;
        actions = [];
        for (let action of _actions) {
            actions.push(action.getActionSquare().row === transformationRow ? new TransformationAction(this.boardSquare, action.getActionSquare()) : action);
        }

        return actions;
    }

    get transformFigures(): BaseFigure[] {
        return [ new KnightFigure(this.boardSquare, this.team), new RookFigure(this.boardSquare, this.team),
                 new ElephantFigure(this.boardSquare, this.team), new QueenFigure(this.boardSquare, this.team)];
    }

    afterAction(action: Action) {
        this._turnsMade += 1;
        if (action instanceof PawnDoubleMoveAction) {
            this._canBeBeatenAsideWithinTurn = TurnsCount.turns + 1;
        }
    }

    public get turnsMade(): number {
        return this._turnsMade;
    }

    public get canBeBeatenAsideWithinTurn(): number {
        return this._canBeBeatenAsideWithinTurn;
    }

    public getCopy(): BaseFigure {
        let pawn = new PawnFigure(this.boardSquare, this.team, this._turnsMade, this._canBeBeatenAsideWithinTurn);
        pawn.isBeaten = this.isBeaten;
        return pawn;
    }
}