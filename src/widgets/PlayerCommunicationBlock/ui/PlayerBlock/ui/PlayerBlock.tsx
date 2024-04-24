import { FC } from "react"
import styles from "./PlayerBlock.module.css";

type PlayerBlockTypeProps = {
    playerNickname: string,
    time: string,
    avatar_src: string 
}

export const PlayerBlock: FC<PlayerBlockTypeProps> = ({playerNickname, time, avatar_src}) => {
    return (
        <div className={styles['player-block']}>
            <div className={styles['player-image']}>
                <img src={avatar_src} alt="" />
            </div>
            <div className={styles['player-nickname']}> {playerNickname} </div>
            <div className={styles['player-timer']}><p> {time} </p> </div>
        </div>
    )
}