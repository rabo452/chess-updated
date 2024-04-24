import { ChessPage } from "pages/ChessPage"
import { MainPage } from "pages/MainPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
	    </BrowserRouter>
    )
}