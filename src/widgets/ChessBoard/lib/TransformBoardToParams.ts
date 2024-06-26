import { BaseFigure, Board } from "entities/ChessFigures";
import { FigureParams } from "./types";
import { FigureToParamsFactory } from "./FigureToParamsFactory";

export const TransformBoardToParams = (board: Board): FigureParams[][] => {
    let result: FigureParams[][] = [];
    const iterator = board[Symbol.iterator]();

    for (var row_i = 0; row_i < 8; row_i++) {
        let row = [];
        for (var column_y = 0; column_y < 8; column_y++) {
            row.push(FigureToParamsFactory(iterator.next().value as BaseFigure));
        }
        result.push(row);
    }

    return result;
}