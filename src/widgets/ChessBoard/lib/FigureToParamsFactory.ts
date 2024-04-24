import { BaseFigure, ElephantFigure, KingFigure, KnightFigure, PawnFigure, QueenFigure, RookFigure, SquareFigure, Team } from "entities/ChessFigures";
import { FigureParams, KingFigureParams, PawnFigureParams, RookFigureParams } from "./types";

export const FigureToParamsFactory = (figure: BaseFigure): (FigureParams | PawnFigureParams | RookFigureParams | KingFigureParams) => {
    var obj: any  = {}

    if (figure instanceof KingFigure) {
        obj.figureNumber = figure.team === Team.White ? 6 : 12;
        obj.turnsMade = figure.turnsMade;
        return obj as KingFigureParams;
    }else if (figure instanceof PawnFigure) {
        obj.figureNumber = figure.team === Team.White ? 1 : 7;
        obj.turnsMade = figure.turnsMade;
        obj.canBeBeatenAsideWithinTurn = figure.canBeBeatenAsideWithinTurn;
        return obj as PawnFigureParams;
    }else if (figure instanceof ElephantFigure) {
        obj.figureNumber = figure.team === Team.White ? 2 : 8;
        return obj as FigureParams;
    }else if (figure instanceof QueenFigure) {
        obj.figureNumber = figure.team === Team.White ? 5 : 11;
        return obj as FigureParams;
    }else if (figure instanceof KnightFigure) {
        obj.figureNumber = figure.team === Team.White ? 3 : 9;
        return obj as FigureParams;
    }else if (figure instanceof RookFigure) {
        obj.figureNumber = figure.team === Team.White ? 4 : 10;
        obj.turnsMade = figure.turnsMade;
        return obj as RookFigureParams;
    }else if (figure instanceof SquareFigure ) {
        obj.figureNumber = 0;
        return obj as FigureParams;
    }

    throw new Error(`such a figure ${figure} doesn't exist!`);
}