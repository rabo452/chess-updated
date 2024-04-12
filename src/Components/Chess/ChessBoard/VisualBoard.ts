import BoardSquare from "services/chess/BoardSquare";
import ChessColor from "./ChessColor";
import VisualElement from "./VisualElement";

export default class VisualBoard {
    private visualElements: VisualElement[][]; 
    constructor() {
        this.visualElements = [];
        for (var row_i = 0; row_i <= 7; row_i++) {
            this.visualElements.push([]);
            for (var column_i = 0; column_i <= 7; column_i++) {
                let color = (row_i + column_i) % 2 == 0 ? ChessColor.white : ChessColor.black;
                let element = new VisualElement();
                element.color = color;
                this.visualElements[row_i].push(element);
            }
        }
    }

    setVisualElement(boardSquare: BoardSquare, visualElement: VisualElement) {
        this.visualElements[boardSquare.row][boardSquare.column] = visualElement;
    }

    getVisualElement(boardSquare: BoardSquare): VisualElement {
        return this.visualElements[boardSquare.row][boardSquare.column];
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.visualElements.length; i++) {
            for (let y = 0; y < this.visualElements[i].length; y++) {
                yield this.visualElements[i][y];
            }
        }
    }

    public copyBoard(): VisualBoard {
        let newVisualBoard = new VisualBoard();

        for (var row_i = 0; row_i <= 7; row_i++) {
            for (var column_i = 0; column_i <= 7; column_i++) {
                newVisualBoard.setVisualElement(new BoardSquare(row_i, column_i), this.getVisualElement(new BoardSquare(row_i, column_i)));
            }
        }
        return newVisualBoard;
    }
}