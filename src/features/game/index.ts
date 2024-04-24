import GameSlice from "./models/GameSlice";

export {GameSlice}
export const {setWinner, changeTeamTurn, setGameOver} = GameSlice.actions;
export {GameApi} from "./api/GameApi";
export type {GameRoom} from "./api/types";