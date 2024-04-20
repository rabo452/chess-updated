import { ChessPage } from "pages/ChessPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ChessPage />} />
            </Routes>
	    </BrowserRouter>
    )
}