import { useState } from "react";
import styles from "./GameRoomCreator.module.css";
import { Button } from "shared/ui/Button";
import { GameApi } from "features/game";
import { useNavigate } from "react-router-dom";

export const GameRoomCreator = () => {
    let [gameName, setGameName] = useState("");
    let [error, setError] = useState("");
    let navigation = useNavigate();

    const createNewGameRoom = () => {
        if (gameName.replace(" ", "").length < 5 || gameName.length > 100) {
            setError("invalid game name value, choose another one");
        }

        new Promise(async (resolve) => {
            try {
                let id = (await GameApi.createGameRoom(gameName)).id;
                navigation(`/game-room/${id}`);
            }catch(e) {
                setError("unable to create a new game room, you need to close your game room firstly");
            }
        });
    }

    return (
        <div className={styles["game-room-creator-contrainer"]}>
            <h1>Create a new game room:</h1>
            <input 
                onChange={(event) => setGameName(event.target.value)} 
                type="text" 
                className="input-block" 
                placeholder="game room name"
                value={gameName} 
            />

            <Button text="create a new room" onClick={createNewGameRoom}/>
            <div className="error-block">{error}</div>
        </div>
    )
}