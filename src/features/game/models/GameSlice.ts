import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "entities/ChessFigures";
import { stateType } from "./types";

const initialState: stateType = {
    playerTurn: "",
    winner: null,
    isGameOver: false
}

const GameSlice = createSlice({
    name: "chessSlice",
    initialState,
    reducers: {
        changeTeamTurn: (state, action: PayloadAction<{player: string}>) => {
            state.playerTurn = action.payload.player;
            return state; 
        },

        setWinner: (state, action: PayloadAction<{winner: string}>) => {
            state.winner = action.payload.winner;
            return state;
        },

        setGameOver: (state) => {
            state.isGameOver = true;
            return state;
        }
    }
});

export default GameSlice;