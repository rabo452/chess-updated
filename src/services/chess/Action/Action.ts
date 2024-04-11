import Board from "../Board";

export default interface Action {
    doAction(board: Board): void;
    setPossibleBeating(board: Board): void;
}