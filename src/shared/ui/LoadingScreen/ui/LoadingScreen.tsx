import { FC, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import styles from "./LoadingScreen.module.css";
import { useTranslation } from "react-i18next";

type LoadingScreenProps = {
    loadDataMethod: () => Promise<any>
}

export const LoadingScreen: FC<LoadingScreenProps> = ({loadDataMethod}) => {
    let [isLoading, setLoading] = useState(true);
    let [t] = useTranslation("global");
    
    useEffect(() => {
        new Promise(async (resolve) => {
            await loadDataMethod();
            resolve(null);
        }).then(() => setLoading(false));
    });

    if (isLoading) {
        return (
            <div className={styles['loading-screen-container']}>

                <div className={styles['loading-screen-wrapper']}>
                    <ReactLoading type="spokes" width={200} height={200} color="orange"/>
                    <p className={styles['loading-screen-wrapper p']}> {t("LoadingScreen.wait")} </p>
                </div>
            </div>
        )
    }

    return null;
}