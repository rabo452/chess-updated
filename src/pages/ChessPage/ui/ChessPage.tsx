import { useAppDispatch } from "app/store"
import { Board, Team } from "entities/ChessFigures"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { LoadingScreen } from "shared/ui/LoadingScreen"
import { ChessBoard, ChessGameWebSocket } from "widgets/ChessBoard"

export const ChessPage = () => {
    var {gameId} = useParams();
    const {t} = useTranslation("global");

    return (
        <div>
            <ChessBoard
                winCallback={() => {}} 
                drawCallback={() => {}} 
                gameId={Number(gameId)} 
            />
        </div>
    )
}