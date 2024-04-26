import { TokenStorage } from "entities/auth";
import { baseWS } from "shared/api";
import { GameParams, GameParamsJSON } from "./types";
import { FigureParams } from "../lib/types";
import { TransformParamsToBoard } from "../lib/TransformParamsToBoard";
import { Board, Team } from "entities/ChessFigures";
import { TransformBoardToParams } from "../lib/TransformBoardToParams";

export class ChessGameWebSocket {
    private ws: WebSocket;
   
    constructor(gameId: number, 
                updateBoardCallBack: (params: GameParams) => void) {
        this.ws = new WebSocket(`${baseWS}/ws/chess/game/${gameId}/`);

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                access_token: TokenStorage.accessToken,
                action: "connection"
            }));   
        }

        this.ws.onmessage = (ev) => {
            var data: GameParamsJSON = JSON.parse(ev.data);
            if (data.action === "game-info") {
                var newBoard = TransformParamsToBoard(JSON.parse(data.board));
                var playerTeam = data.player_team === "black" ? Team.Black : Team.White;
                var turnCount = data.turnCount;
                var playerTurn = data.playerTurn === "player_black" ? Team.Black : Team.White;

                updateBoardCallBack({
                    board: newBoard,
                    playerTeam,
                    turnCount,
                    playerTurn
                });
            }
        }
    }

    closeWS() {
        this.ws.close();
    }

    saveBoard(board: Board) {
        var message = {
            action: "makeTurn",
            board: JSON.stringify(TransformBoardToParams(board)),
            access_token: TokenStorage.accessToken
        }

        this.ws.send(JSON.stringify(message));
    }
}