import React from "react";
const styles = require("./Square.module.css");

type SquareTextPropsType = {
    text: string
}

const SquareText = ({text}: SquareTextPropsType) => {
    return (
        <div className={`${styles.square}`} >
            {text}
        </div>
    );
}

export default SquareText;