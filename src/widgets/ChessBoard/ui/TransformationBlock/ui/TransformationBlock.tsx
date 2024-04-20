import styles from "./TransformationBlock.module.css";
import Square from "entities/Square/ui/Square";
import ChessColor from "widgets/ChessBoard/ui/ChessColor";
import FigureCssClassFactory from "widgets/ChessBoard/lib/FigureCssClassFactory";
import { BaseFigure } from "entities/ChessFigures";

const TransformationBlock = ({figures, onClick}: {figures: BaseFigure[], onClick: ((figure: BaseFigure) => void)}) => {
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
                        className={FigureCssClassFactory(figure)}
                    />
                )
            })}
        </div>
    );
}

export default TransformationBlock;