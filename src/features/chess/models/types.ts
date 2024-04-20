import { Team } from "entities/ChessFigures"

type stateType = {
    teamTurn: Team,
    winner: null | string,
    whiteSeconds: number,
    blackSeconds: number
}

export type {stateType}