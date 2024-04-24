import { BaseFigure, BoardSquare, ElephantFigure, KingFigure, KnightFigure, PawnFigure, QueenFigure, RookFigure, SquareFigure, Team } from "entities/ChessFigures";
import { FigureParams, KingFigureParams, PawnFigureParams, RookFigureParams } from "./types";

export const ParamsToFigureFactory = (params: FigureParams, row: number, column: number): BaseFigure => {
    var boardSquare = new BoardSquare(row, column);
    var figureNumber = params.figureNumber;

    if (figureNumber === 0) {
        return new SquareFigure(boardSquare, Team.Neutral);
    }

    if (figureNumber % 6 === 1) {
        var pawnParams = params as PawnFigureParams;
        let pawn = new PawnFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black, pawnParams.turnsMade, pawnParams.canBeBeatenAsideWithinTurn);
        return pawn;
    }
    if (figureNumber % 6 === 2) {
        return new ElephantFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black);
    }
    if (figureNumber % 6 === 3) {
        return new KnightFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black);
    }
    if (figureNumber % 6 === 4) {
        var rookParams = params as RookFigureParams;
        return new RookFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black, rookParams.turnsMade);
    }
    if (figureNumber % 6 === 5) {
        return new QueenFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black);
    }
    if (figureNumber % 6 === 0) {
        var kingParams = params as KingFigureParams;
        return new KingFigure(boardSquare, figureNumber <= 6 ? Team.White : Team.Black, kingParams.turnsMade);
    }

    throw new Error(`such figure ${params} doesn't exist!`);
} 