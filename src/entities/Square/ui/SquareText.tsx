import React from "react";
import styles from "./Square.module.css";

type SquareTextPropsType = {
    text: string
}

const SquareText = ({text}: SquareTextPropsType) => {
    return (
        <div className={` ${styles.square} ${styles['square-text']}`} >
            {text}
        </div>
    );
}

export default SquareText;