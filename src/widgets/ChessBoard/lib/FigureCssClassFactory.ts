import { BaseFigure, ElephantFigure, KingFigure, KnightFigure, PawnFigure, QueenFigure, RookFigure, SquareFigure, Team } from "entities/ChessFigures";


const FigureCssClassFactory = (figure: BaseFigure): string => {
    if (figure instanceof SquareFigure) {
        return "square";
    }

    let figureCss: string = "";
    let team = figure.team === Team.White ? "white" : "black";
    
    if (figure instanceof KingFigure) {
        figureCss = "king";
    }else if (figure instanceof PawnFigure) {
        figureCss = "pawn";
    }else if (figure instanceof ElephantFigure) {
        figureCss = "elephant";
    }else if (figure instanceof QueenFigure) {
        figureCss = "queen";
    }else if (figure instanceof KnightFigure) {
        figureCss = "knight";
    }else if (figure instanceof RookFigure) {
        figureCss = "rook";
    }else {
        throw new Error("such a figure doesn't exist!");
    }

    return `${team}-${figureCss}`;
}

export default FigureCssClassFactory