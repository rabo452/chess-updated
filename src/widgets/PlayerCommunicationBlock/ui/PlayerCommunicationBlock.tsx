import { useTranslation } from "react-i18next";
import styles from "./PlayerCommucationBlock.module.css"
import { useEffect, useState } from "react";
import secondsToString from "../lib/secondsToString";
import { Button } from "shared/ui/Button";
import { useAppSelector } from "app/store";

const PlayerCommunicationBlock = () => {
    let whiteSeconds = useAppSelector((state) => state.chess.whiteSeconds);
    let blackSeconds = useAppSelector((state) => state.chess.blackSeconds);
    let winner = useAppSelector((state) => state.chess.winner);
    let teamTurn = useAppSelector((state) => state.chess.teamTurn);
    const { t } = useTranslation("global");

    if (blackSeconds === 0 && whiteSeconds === 0) {
        return null;
    }

    return (
        <div className={styles['comm-block-container']}>
            <div className={styles.timer}>{t('PlayerCommunicationBlock.time-left')}</div>
            <div className={styles['buttons-wrapper']}>
                <Button
                    text={t("PlayerCommunicationBlock.surrender")}
                    onClick={() => console.log("surrender")}
                />
                <Button
                    text={t("PlayerCommunicationBlock.draw")}
                    onClick={() => console.log("draw")}
                />
            </div>
        </div>
    )
}

export default PlayerCommunicationBlock;
