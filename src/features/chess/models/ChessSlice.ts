import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "entities/ChessFigures";
import { stateType } from "./types";

const initialState: stateType = {
    teamTurn: Team.White,
    winner: null,
    whiteSeconds: 0,
    blackSeconds: 0
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
        },
        setWhiteSeconds(state, action: PayloadAction<{whiteSeconds: number}>) {
            state.whiteSeconds = action.payload.whiteSeconds;
            return state;
        },
        setBlackSeconds(state, action: PayloadAction<{blackSeconds: number}>) {
            state.blackSeconds = action.payload.blackSeconds;
            return state;
        }
    }
});

export default chessSlice;