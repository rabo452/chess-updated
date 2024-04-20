import React from "react";
import styles from "./Square.module.css";

type SquareProps = {
    color: string,
    onClick: () => void,
    className: string
}

const Square = ({color, onClick, className}: SquareProps) => {
    if (!(className in styles)) {
        throw new Error(`there is no such ${className} for Square component!`);
    }

    return (
        <div className={`${styles.square} ${styles[className]}`}
            onClick={onClick}
            style={{backgroundColor: color}} />
    );
};

export default Square;
export type { SquareProps };
