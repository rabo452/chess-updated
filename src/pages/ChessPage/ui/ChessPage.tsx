import { useAppDispatch } from "app/store"
import axios from "axios"
import { Team } from "entities/ChessFigures"
import { changeTeamTurn } from "features/game"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { AxiosClient } from "shared/api"
import { LoadingScreen } from "shared/ui/LoadingScreen"
import { ChessBoard } from "widgets/ChessBoard"
import { PlayerCommunicationBlock } from "widgets/PlayerCommunicationBlock"

export const ChessPage = () => {
    var dispatcher = useAppDispatch();
    const {t} = useTranslation("global");

    const {isLoading, isError, data} = useQuery({
        queryKey: "chess-page-loading",
        queryFn: async () => {
            dispatcher(changeTeamTurn({player: "player 1"}));

            setTimeout(() => {
                dispatcher(changeTeamTurn({player: "player 2"}));
            },2500)
        }
    });

    if (isError) {
        return (<LoadingScreen loadingText={t("ErrorUnableToConnectToServer")} />)
    }

    if (isLoading) {
        return (<LoadingScreen loadingText={t("LoadingScreen.wait")}/>);
    }

    return (
        <div>
            <ChessBoard playerView={Team.White} winCallback={function (team: Team): void {
                throw new Error("Function not implemented.")
            } } drawCallback={function (team: Team): void {
                throw new Error("Function not implemented.")
            } } />

            <PlayerCommunicationBlock player1Seconds={10} player2Seconds={1000} Player1Nickname={"player 1"} Player2Nickname={"player 2"} />
        </div>
    )
}