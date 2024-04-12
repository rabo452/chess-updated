import React from "react";
import BaseFigure from "services/chess/Figure/BaseFigure";
import ElephantFigure from "services/chess/Figure/ElephantFigure";
import KingFigure from "services/chess/Figure/KingFigure";
import KnightFigure from "services/chess/Figure/KnightFigure";
import PawnFigure from "services/chess/Figure/PawnFigure";
import QueenFigure from "services/chess/Figure/QueenFigure";
import RookFigure from "services/chess/Figure/RookFigure";
import SquareFigure from "services/chess/Figure/SquareFigure";
import Team from "services/chess/Team";
import styles from "./Square.module.css";

type SquareProps = {
    color: string,
    onClick: () => void,
    figure: BaseFigure,
}

const Square = ({color, onClick, figure}: SquareProps) => {
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

    return (
        <div className={`${styles.square} 
            ${styles[FigureCssClassFactory(figure)]}`} 
            onClick={onClick}
            style={{backgroundColor: color}}
        />
    );
};

export default Square;
export type { SquareProps };
