import { Team } from "entities/ChessFigures"
import { setWhiteSeconds, setBlackSeconds, setWinner, changeTeamTurn } from "features/chess"
import { LoadingScreen } from "shared/ui/LoadingScreen"
import { ChessBoard } from "widgets/ChessBoard"
import { PlayerCommunicationBlock } from "widgets/PlayerCommunicationBlock"

export const ChessPage = () => {

    const loadingDataMethod = async () => {
        
    }

    return (
        <div>
            <LoadingScreen 
                loadDataMethod={loadingDataMethod} 
            />

            <PlayerCommunicationBlock />
            <ChessBoard playerView={Team.White} winCallback={function (team: Team): void {
                throw new Error("Function not implemented.")
            } } drawCallback={function (team: Team): void {
                throw new Error("Function not implemented.")
            } } />
        </div>
    )
}