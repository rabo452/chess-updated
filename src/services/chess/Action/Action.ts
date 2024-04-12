import Board from "../Board";
import BoardSquare from "../BoardSquare";

export default interface Action {
    doAction(board: Board): void;
    setPossibleBeating(board: Board): void;
    // return position of square there should be handled action
    // to be used for visualizing 
    getActionSquare(): BoardSquare; 
}