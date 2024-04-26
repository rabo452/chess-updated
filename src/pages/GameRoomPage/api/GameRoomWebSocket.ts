import { TokenStorage } from "entities/auth";
import { baseWS } from "shared/api";

export class GameRoomWebSocket {
    private ws: WebSocket;

    constructor(roomId: number, onGameCreated: (gameId: number) => void, access: string) {
        this.ws = new WebSocket(`${baseWS}/ws/chess/game-room/${roomId}/`);

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                access
            }));
        }

        this.ws.onmessage = (msg) => {
            try {
                var data = JSON.parse(msg.data);
                if (data['action'] === "game-created") {
                    onGameCreated(data['game_id'])
                }
            }catch (e) {}
        }
    }

    public closeWS() {
        this.ws.close();
    }
}