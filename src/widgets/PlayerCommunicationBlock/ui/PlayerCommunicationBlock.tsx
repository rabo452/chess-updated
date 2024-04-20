import { useTranslation } from "react-i18next";
import styles from "./PlayerCommucationBlock.module.css"
import { useEffect, useState } from "react";
import secondsToString from "../lib/secondsToString";
import { Button } from "shared/ui/Button";

const PlayerCommunicationBlock = () => {
    let [seconds, setSeconds] = useState(10);
    const { t } = useTranslation("global");

    useEffect(() => {
        if (seconds === 0) return;
        setTimeout(() => setSeconds(seconds - 1), 1000);
    });

    useEffect(() => {
        
    }, [seconds])

    return (
        <div className={styles['comm-block-container']}>
            <div className={styles.timer}>{t('PlayerCommunicationBlock.time-left')}  {secondsToString(seconds)}</div>
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
