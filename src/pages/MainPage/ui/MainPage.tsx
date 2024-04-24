import { GameApi, GameRoom } from "features/game"
import { useQuery } from "react-query"
import { LoadingScreen } from "shared/ui/LoadingScreen"
import { GameRoomList } from "widgets/GameRoomList"
import { Header } from "widgets/Header"

export const MainPage = () => {
    const { isError, data, isLoading } = useQuery({
        queryKey: ['main-page-loading'],
        queryFn: async (): Promise<{ rooms: GameRoom[] }> => {
           return {
                rooms: await GameApi.getGameRooms()
           }
        }
    });

    if (isLoading) {
        return <LoadingScreen loadingText={"page is loading"} />
    }

    if (!data || isError) {
        return <LoadingScreen loadingText="service doesn't work, please, try another time" />
    }

    console.log(data);

    return (
        <div>
            <Header />
            <GameRoomList rooms={data.rooms} />
        </div>
    )
}