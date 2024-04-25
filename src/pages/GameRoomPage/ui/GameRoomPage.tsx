import { useParams } from "react-router-dom";
import { Header } from "widgets/Header";
import { Page404 } from "pages/Page404";
import { useQuery } from "react-query";
import { GameApi } from "features/game";
import styles from "./GameRoomPage.module.css";
import { LoadingScreen } from "shared/ui/LoadingScreen";

export const GameRoomPage = () => {
    let { roomId } = useParams();

    let {isLoading, isError, data} = useQuery({
        queryFn: async () => {
            if (!roomId) {
                return false;
            }

            var doExist = await GameApi.doesGameRoomExist(Number(roomId));
            return doExist;
        }
    });

    if (isLoading) {
        return <LoadingScreen loadingText="The room is loading" />
    }

    if (!data) {
        return <Page404 />
    }

    return (
        <div>{roomId}</div>
    )
}