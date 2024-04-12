import BaseFigure from "services/chess/Figure/BaseFigure";
import styles from "./TransformationBlock.module.css";
import Square from "Components/Chess/Square/Square";
import ChessColor from "Components/Chess/ChessBoard/ChessColor";

const TransofrmationBlock = ({figures, onClick}: {figures: BaseFigure[], onClick: ((figure: BaseFigure) => void)}) => {
    return (
        <div className={styles['transofrmation-block']}>
            {figures.map((figure, index) => {
                return (
                    <Square 
                        key={index}
                        color={ChessColor.white} 
                        onClick={() => {
                            onClick(figure);
                        }} 
                        figure={figure}
                    />
                )
            })}
        </div>
    );
}

export default TransofrmationBlock;