type FigureParams = {
    figureNumber: number
}

type PawnFigureParams = FigureParams & {
    canBeBeatenAsideWithinTurn: number,
    turnsMade: number,
}

type RookFigureParams = FigureParams & {
    turnsMade: number,
}

type KingFigureParams = FigureParams & {
    turnsMade: number,
}

export type {FigureParams, PawnFigureParams, RookFigureParams, KingFigureParams}