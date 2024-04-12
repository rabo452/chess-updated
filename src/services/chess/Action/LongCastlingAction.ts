import Board from "../Board";
import BoardSquare from "../BoardSquare";
import Action from "./Action";
import MoveAction from "./MoveAction";

export default class LongCastlingAction implements Action {
    private castlingRow: number;

    constructor(castlingRow: number) {
        this.castlingRow = castlingRow;
    }
    getActionSquare(): BoardSquare {
        return new BoardSquare(this.castlingRow, 2);
    }
    setPossibleBeating(board: Board): void {
        board.getBoardFigure(new BoardSquare(this.castlingRow, 2)).isBeaten = true;
    }

    doAction(board: Board): void {
        let fromKingSquare = new BoardSquare(this.castlingRow, 4);
        let fromRookSquare = new BoardSquare(this.castlingRow, 0);
        let toKingSquare = new BoardSquare(this.castlingRow, 2);
        let toRookSquare = new BoardSquare(this.castlingRow, 3);

        new MoveAction(fromKingSquare, toKingSquare).doAction(board);
        new MoveAction(fromRookSquare, toRookSquare).doAction(board);
    }
}