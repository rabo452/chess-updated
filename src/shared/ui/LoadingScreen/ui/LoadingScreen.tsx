import { FC, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import styles from "./LoadingScreen.module.css";
import { useTranslation } from "react-i18next";

type LoadingScreenPropsType = {loadingText: string}

export const LoadingScreen= ({loadingText}: LoadingScreenPropsType) => {
    return (
        <div className={styles['loading-screen-container']}>
            <div className={styles['loading-screen-wrapper']}>
                <ReactLoading type="spokes" width={200} height={200} color="orange"/>
                <p className={styles['loading-screen-wrapper p']}> {loadingText} </p>
            </div>
        </div>
    )
}