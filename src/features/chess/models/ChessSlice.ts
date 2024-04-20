import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "entities/ChessFigures";


type stateType = {
    teamTurn: Team,
    winner: null | string 
}
const initialState: stateType = {
    teamTurn: Team.White,
    winner: null  
}

const chessSlice = createSlice({
    name: "chessSlice",
    initialState,
    reducers: {
        changeTeamTurn: (state) => {
            state.teamTurn = state.teamTurn == Team.White ? Team.Black : Team.White;
            return state; 
        },

        setWinner: (state, action: PayloadAction<{winner: string}>) => {
            state.winner = action.payload.winner;
            return state;
        }
    }
});

export default chessSlice;