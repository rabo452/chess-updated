import { GameRoom } from "features/game"
import { FC, useEffect } from "react"
import styles from "./GameRoomList.module.css";
import { Button } from "shared/ui/Button";
import { Link } from "react-router-dom";
import { AuthApi } from "entities/auth";

type GameRoomListPropsType = {
    rooms: GameRoom[]
}

export const GameRoomList: FC<GameRoomListPropsType> = ({rooms}) => {
    return (
        <div className={styles['rooms-wrapper']}>
            <h1>Game room list:</h1>
            {rooms.map((room) => {
                return (
                    <div key={room.id} className={styles['room-block']}>
                        <div>Room: {room.name}</div>
                        <div>player: {room.player}</div>
                        {AuthApi.isAuthorizated() ? 
                        <div><Link to={`/game-room/${room.id}`}> <Button text="join room" /></Link> </div> 
                        : <div> authorizate to join</div>}
                    </div>
                )
            })}
        </div>
    )
}