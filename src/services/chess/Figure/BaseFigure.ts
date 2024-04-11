import Action from "../Action/Action";
import Board from "../Board";
import BoardSquare from "../BoardSquare";
import Team from "../Team";


export default abstract class BaseFigure {
    public readonly team: Team;
    public boardSquare: BoardSquare;
    public isBeaten: Boolean;
    public readonly isAbleToBeTransformed: Boolean = false;

    constructor(boardSquare: BoardSquare, team: Team) {
        this.team = team;
        this.boardSquare = boardSquare;
        this.isBeaten = false;
    }

    public isAbleToMoveTo(figure: BaseFigure) {
        if (figure.team === Team.Neutral) {
            return true;
        }
        return this.team !== figure.team;
    }

    public abstract getActions(board: Board): Action[];
    // only a king returns false 
    public isAcceptibleToBeBeaten(): Boolean {
        return true;
    }

    public afterAction(action: Action): void {
        return;
    }

    public get transformFigures(): Function[] {
        return [];
    }

    public abstract getCopy(): BaseFigure;
}