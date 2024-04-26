import { Board, Team } from "entities/ChessFigures"

type GameParamsJSON = {
    action: string,
    board: string,
    player_team: string,
    playerTurn: string,
    turnCount: number
}

type GameParams = {
    board: Board,
    playerTeam: Team,
    playerTurn: Team,
    turnCount: number
}

export type {GameParams, GameParamsJSON}