import BoardSquare from "./BoardSquare";
import BaseFigure from "./Figure/BaseFigure";
import SquareFigure from "./Figure/SquareFigure";
import PawnFigure from "./Figure/PawnFigure";
import Team from "./Team";
import RookFigure from "./Figure/RookFigure";
import ElephantFigure from "./Figure/ElephantFigure";
import KnightFigure from "./Figure/KnightFigure";
import QueenFigure from "./Figure/QueenFigure";
import KingFigure from "./Figure/KingFigure";

export default class Board {
    private boardFigures: BaseFigure[][];
    private blackKing: BaseFigure;
    private whiteKing: BaseFigure;

    constructor(board: BaseFigure[][] = []) {
        this.boardFigures = board;
        if (board.length === 0) {
            this.initBoard();
        }
        let blackKing: BaseFigure | undefined = undefined;
        let whiteKing: BaseFigure | undefined = undefined;

        for (let figure of this) {
            if (!figure.isAcceptibleToBeBeaten()) {
                if (figure.team === Team.Black) {
                    blackKing = figure;
                }else {
                    whiteKing = figure;
                }
            }
        }

        if (!whiteKing) {
            throw new Error(`there is no black king`);
        }

        if (!blackKing) {
            throw new Error('there is no white king');
        }

        this.whiteKing = whiteKing as BaseFigure;
        this.blackKing = blackKing as BaseFigure;
    }

    public initBoard() {
        this.boardFigures = [];
        for (var row_i = 0; row_i <= 7; row_i++) {
            this.boardFigures.push([]);
            for (var column_i = 0; column_i <= 7; column_i++) {
                this.boardFigures[row_i].push(new SquareFigure(new BoardSquare(row_i, column_i), Team.Neutral));
            }
        }
        
        for (var column_count = 0; column_count <= 7; column_count++) {
            let square_black = new BoardSquare(1, column_count);
            let square_white = new BoardSquare(6, column_count);
            this.setBoardFigure(new PawnFigure(square_black, Team.Black), square_black);
            this.setBoardFigure(new PawnFigure(square_white, Team.White), square_white);
        } 
        
        // Set up rooks
        this.setBoardFigure(new RookFigure(new BoardSquare(0, 0), Team.Black), new BoardSquare(0, 0));
        this.setBoardFigure(new RookFigure(new BoardSquare(0, 7), Team.Black), new BoardSquare(0, 7));
        this.setBoardFigure(new RookFigure(new BoardSquare(7, 0), Team.White), new BoardSquare(7, 0));
        this.setBoardFigure(new RookFigure(new BoardSquare(7, 7), Team.White), new BoardSquare(7, 7));

        // Set up elephants
        this.setBoardFigure(new ElephantFigure(new BoardSquare(0, 2), Team.Black), new BoardSquare(0, 2));
        this.setBoardFigure(new ElephantFigure(new BoardSquare(0, 5), Team.Black), new BoardSquare(0, 5));
        this.setBoardFigure(new ElephantFigure(new BoardSquare(7, 2), Team.White), new BoardSquare(7, 2));
        this.setBoardFigure(new ElephantFigure(new BoardSquare(7, 5), Team.White), new BoardSquare(7, 5));

        // Set up knights
        this.setBoardFigure(new KnightFigure(new BoardSquare(0, 1), Team.Black), new BoardSquare(0, 1));
        this.setBoardFigure(new KnightFigure(new BoardSquare(0, 6), Team.Black), new BoardSquare(0, 6));
        this.setBoardFigure(new KnightFigure(new BoardSquare(7, 1), Team.White), new BoardSquare(7, 1));
        this.setBoardFigure(new KnightFigure(new BoardSquare(7, 6), Team.White), new BoardSquare(7, 6));

        // Set up queens
        this.setBoardFigure(new QueenFigure(new BoardSquare(0, 3), Team.Black), new BoardSquare(0, 3));
        this.setBoardFigure(new QueenFigure(new BoardSquare(7, 3), Team.White), new BoardSquare(7, 3));

        // Set up kings
        this.setBoardFigure(new KingFigure(new BoardSquare(0, 4), Team.Black), new BoardSquare(0, 4));
        this.setBoardFigure(new KingFigure(new BoardSquare(7, 4), Team.White), new BoardSquare(7, 4));
    }

    public setBoardFigure(figure: BaseFigure, boardSquare: BoardSquare): void {
        this.boardFigures[boardSquare.row][boardSquare.column] = figure;
    }

    public getBoardFigure(boardSquare: BoardSquare): BaseFigure {
        return this.boardFigures[boardSquare.row][boardSquare.column];
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.boardFigures.length; i++) {
            for (let y = 0; y < this.boardFigures[i].length; y++) {
                yield this.boardFigures[i][y];
            }
        }
    }

    public getKing(team: Team): BaseFigure {
        if (team === Team.Black) {
            return this.blackKing;
        }
        return this.whiteKing;
    }

    public copyBoard(): Board {
        var newboardFigures: BaseFigure[][] = [];
        for (var row_i = 0; row_i < this.boardFigures.length; row_i++) {
            newboardFigures.push([]);
            for (var column_i = 0; column_i < this.boardFigures.length; column_i++) {
                newboardFigures[row_i][column_i] = this.boardFigures[row_i][column_i].getCopy();
            }
        }

        return new Board(newboardFigures);
    }
}