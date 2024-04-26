import { useNavigate, useParams } from "react-router-dom";
import { Page404 } from "pages/Page404";
import { useQuery } from "react-query";
import { GameApi } from "features/game";
import { LoadingScreen } from "shared/ui/LoadingScreen";
import { useEffect } from "react";
import { AuthApi, TokenStorage } from "entities/auth";
import {GameRoomWebSocket} from "../api/GameRoomWebSocket";

export const GameRoomPage = () => {
    let { roomId } = useParams();
    let navigate = useNavigate();

    let {isLoading, isError, data} = useQuery({
        queryFn: async () => {
            if (!roomId) {
                return false;
            }

            var doExist = await GameApi.doesGameRoomExist(Number(roomId));
            return {
                doExist
            };
        }
    });

    const onGameCreated = (gameId: number) => {
        navigate(`/chess-game/${gameId}/`);
    }

    useEffect(() => {
        if (!AuthApi.isAuthorizated()) {
            return;
        }

        var ws = new GameRoomWebSocket(Number(roomId), onGameCreated, TokenStorage.accessToken);
        return () => {
            ws.closeWS();
        }
    }, []);

    if (isLoading) {
        return <LoadingScreen loadingText="The room is loading" />
    }

    if (!data || !data.doExist) {
        return <Page404 />
    }

    return <LoadingScreen loadingText="awaiting a player to connect..." />
    
}