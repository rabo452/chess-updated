import { AxiosClient } from "entities/auth";
import { GameRoom } from "./types";

export class GameApi {
    static async createGameRoom(game_name: string): Promise<{ id: number; }> {
        var data = {
            name: game_name
        }

        var response = await AxiosClient.post('api/chess/create-game-room', data);
        return {
            id: response.data.id
        }
    }
    
    static async getGameRooms(): Promise<GameRoom[]> {
        var response = await AxiosClient.get("api/chess/get-rooms");
        return JSON.parse(response.data);
    }

    static async doesGameRoomExist(roomId: number): Promise<boolean> {
        var response = await AxiosClient.get(`api/chess/does-room-exist?roomId=${roomId}`);
        return response.data.exist;
    }

}