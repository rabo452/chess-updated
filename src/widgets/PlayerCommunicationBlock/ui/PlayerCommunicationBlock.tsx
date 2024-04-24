import { useTranslation } from "react-i18next";
import styles from "./PlayerCommucationBlock.module.css"
import { FC, useEffect, useState } from "react";
import secondsToString from "../lib/secondsToString";
import { useAppDispatch, useAppSelector } from "app/store";
import { PlayerBlock } from "./PlayerBlock";
import { setWinner, setGameOver } from "features/game";
import { clearInterval } from "timers";

type PlayerCommunicationBlockPropsType = {
    player1Seconds: number, 
    player2Seconds: number,
    Player1Nickname: string,
    Player2Nickname: string
}

const PlayerCommunicationBlock: FC<PlayerCommunicationBlockPropsType> = ({player1Seconds, player2Seconds, Player1Nickname, Player2Nickname}) => {
    let [_player1Seconds, setPlayer1Seconds] = useState(player1Seconds);
    let [_player2Seconds, setPlayer2Seconds] = useState(player2Seconds);
    let playerTurn = useAppSelector((state) => state.game.playerTurn);
    let isGameOver = useAppSelector((state) => state.game.isGameOver);
    let dispatcher = useAppDispatch();
    const { t } = useTranslation("global");

    useEffect(() => {
        let interval = window.setInterval(() => {
            if (isGameOver) {
                window.clearInterval(interval);
                return;
            }

            let curry_fn = (won_player: string) => {
                return (prev: number) => {
                    if (prev <= 0 || prev - 1 === 0) {
                        window.clearInterval(interval);
                        dispatcher(setGameOver());
                        dispatcher(setWinner({
                            winner: won_player
                        }));
                        return 0;
                    }
                    return prev - 1;
                }
            }

            if (playerTurn === Player1Nickname) {
                setPlayer1Seconds(curry_fn(Player2Nickname));
            }else if (playerTurn === Player2Nickname) {
                setPlayer2Seconds(curry_fn(Player1Nickname));
            }else {
                throw new Error(`such player ${playerTurn} doesn't exist!`);
            }

        }, 1000);

        return () => {
            window.clearInterval(interval);
        }
    }, [playerTurn]);
    
    return (
        <div className={styles['comm-block-container']}>
            <div className={styles['players-block-wrap']}>
                <PlayerBlock 
                    playerNickname={Player1Nickname} 
                    time={secondsToString(_player1Seconds)} 
                    avatar_src={"https://img.icons8.com/?size=256&id=gOpi8LmH825f&format=png"}                
                />

                <PlayerBlock
                    playerNickname={Player2Nickname}
                    time={secondsToString(_player2Seconds)}
                    avatar_src="https://img.icons8.com/?size=256&id=gOpi8LmH825f&format=png"
                />
            </div>

            <div className={styles['buttons-wrap']}>
                <input type="button" value="surrender" className={styles['btn']} />
                <input type="button" value="propose a draw" className={styles['btn']} />
            </div>
        </div>
    )
}

export default PlayerCommunicationBlock;
