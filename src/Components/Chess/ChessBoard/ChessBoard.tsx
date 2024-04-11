import React, { useState } from "react";
import Square, { SquareColor } from "../Square/Square";
import SquareText from "../Square/SquareText";

import Board from "services/chess/Board";
const styles = require("./ChessBoard.module.css");

const ChessBoard = () => {
    let [board, setBoard] = useState(new Board());

    const SquareOnClickHandler = (row: number, column: number) => {
        console.log(row, column);
    };

    return (
        <div className={styles['chess-board-box']}>
            <div className="column-rows-count">
                {[1,2,3,4,5,6,7,8].reverse().map((val: number) => {
                    return (
                        <SquareText
                            key={val} 
                            text={`${val}`}                          
                        />
                    )
                })}
            </div>

            <div className={styles['chess-board']}>
                {[...board].map((figure, index) => {
                    const row = Math.floor(index / 8); // Calculate the row number
                    const column = index % 8; // Calculate the column number
                    const color = (row + column) % 2 == 0 ? SquareColor.White : SquareColor.Black; // Calculate the square color based on row and column

                    return (
                        <Square
                            key={index}
                            color={color}
                            onClick={() => {
                                SquareOnClickHandler(row, column);
                            }}
                            figure={figure}
                        />
                    );
                })}
            </div>

            <div className={styles['row-rows-letters']}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((val: string, index) => {
                    return (
                        <SquareText
                            key={index}
                            text={val}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default ChessBoard;
