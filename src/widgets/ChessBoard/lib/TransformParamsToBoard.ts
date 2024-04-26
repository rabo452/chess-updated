import { Board } from "entities/ChessFigures";
import { FigureParams } from "./types";
import { ParamsToFigureFactory } from "./ParamsToFigureFactory";

export const TransformParamsToBoard = (params: FigureParams[][]): Board => {
    var new_board = [];

    for (var row_i = 0; row_i < 8; row_i++) {
        let row = [];
        for (var column_y = 0; column_y < 8; column_y++) {
            var figure_params: FigureParams = params[row_i][column_y];
            row.push(ParamsToFigureFactory(figure_params, row_i, column_y));
        }
        new_board.push(row);
    }

    return new Board(new_board);
}