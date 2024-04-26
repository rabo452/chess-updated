import { ChessPage } from "pages/ChessPage"
import { GameRoomPage } from "pages/GameRoomPage"
import { LoginPage } from "pages/LoginPage"
import { MainPage } from "pages/MainPage"
import { Page404 } from "pages/Page404"
import { SignUpPage } from "pages/SignUpPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/game-room/:roomId" element={<GameRoomPage />}/>
                <Route path="/chess-game/:gameId" element={<ChessPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
	    </BrowserRouter>
    )
}