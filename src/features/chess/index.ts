import chessSlice from "./models/ChessSlice";

export {chessSlice}
export const {setBlackSeconds, setWhiteSeconds, setWinner, changeTeamTurn} = chessSlice.actions;