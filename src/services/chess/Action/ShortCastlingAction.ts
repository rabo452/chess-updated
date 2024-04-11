import Board from "../Board";
import BoardSquare from "../BoardSquare";
import Action from "./Action";
import MoveAction from "./MoveAction";

export default class ShortCastlingAction implements Action {
    private castlingRow: number;

    constructor(castlingRow: number) {
        this.castlingRow = castlingRow;
    }
    setPossibleBeating(board: Board): void {
        board.getBoardFigure(new BoardSquare(this.castlingRow, 6)).isBeaten = true;
    }

    doAction(board: Board): void {
        let fromKingSquare = new BoardSquare(this.castlingRow, 4);
        let fromRookSquare = new BoardSquare(this.castlingRow, 7);
        let toKingSquare = new BoardSquare(this.castlingRow, 6);
        let toRookSquare = new BoardSquare(this.castlingRow, 5);

        new MoveAction(fromKingSquare, toKingSquare).doAction(board);
        new MoveAction(fromRookSquare, toRookSquare).doAction(board);
    }
}
    