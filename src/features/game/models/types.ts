import { Team } from "entities/ChessFigures"

type stateType = {
    playerTurn: string,
    winner: null | string,
    isGameOver: boolean
}

export type {stateType}