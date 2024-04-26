import React, { useEffect, useRef, useState } from "react";
import {SquareText, Square} from "entities/Square";
import styles from "./ChessBoard.module.css";
import VisualElement from "../models/VisualElement";
import ChessColor from "../models/ChessColor";
import VisualBoard from "../models/VisualBoard";
import FigureCssClassFactory from "../lib/FigureCssClassFactory";
import { Action, BaseFigure, Board, BoardSquare, clearBeatenSquares, DoesAnyProtectedActionExist, isActionProtected, setBeatenSquares, Team, TransformationAction, TurnsCount } from "entities/ChessFigures";
import { TransformationBlock } from "./TransformationBlock";
import { ChessGameWebSocket } from "../api/ChessGameWebSocket";
import { GameParams } from "../api/types";

type ChessBoardPropsType = {
    winCallback: (team: Team) => void, 
    drawCallback: (team: Team) => void,
    gameId: number
}

const ChessBoard = ({winCallback, drawCallback, gameId}: ChessBoardPropsType) => {
    let ws: React.MutableRefObject<ChessGameWebSocket | undefined> = useRef();
    let [playerTeam, setPlayerTeam] = useState(Team.White);
    let [visualBoard, setVisualBoard] = useState(new VisualBoard());
    let [board, setBoard] = useState(new Board());
    let [teamTurn, SetTeamTurn] = useState(Team.White);
    let [boardActive, setBoardActive] = useState(true);
    let [transformationObject, setTransformationObject] = useState((): {column: number, onClick: null | ((figure: BaseFigure) => void), figures: BaseFigure[]} => {
        return {
            column: -1,
            onClick: null,
            figures: []
        };
    });
    let [isLoading, setLoading] = useState(true);

    const actionOnClickHandlerFactory = (action: Action, figure: BaseFigure, board: Board): (() => void) => {
        if (action instanceof TransformationAction) {
            return () => {
                action.doAction(board);
                figure.afterAction(action);
                TurnsCount.increase();
                setBoardActive(false);
                setVisualBoard(new VisualBoard());

                
                setTransformationObject({
                    column: action.getActionSquare().column,
                    onClick: (figure: BaseFigure) => {
                        (action as TransformationAction).makeTransformation(figure, board);
                        setBoardActive(true);
                        setTransformationObject({
                            column: -1,
                            onClick: null,
                            figures: []
                        });
                        
                        ws.current?.saveBoard(board.copyBoard());
                    },
                    figures: figure.transformFigures
                });
            }
        }

        // usual handler 
        return () => {
            
            action.doAction(board);
            figure.afterAction(action);
            TurnsCount.increase();

            ws.current?.saveBoard(board.copyBoard());
        }
    }

    // after turn logic
    useEffect(() => {
        if (isGameOver()) {
            clearBeatenSquares(board);
            setBoardActive(false);
            setVisualBoard(new VisualBoard());
            setBeatenSquares(getOppositeTeam(teamTurn), board);

            
            if (board.getKing(teamTurn).isBeaten) {
                winCallback(getOppositeTeam(teamTurn));
            }else{
                drawCallback(teamTurn);
            }
        }
    }, [teamTurn]);

    useEffect(() => {
        // highlight the king if it's beaten
        clearBeatenSquares(board);
        setBeatenSquares(getOppositeTeam(teamTurn), board);
        let king = board.getKing(teamTurn);
        if (king.isBeaten) {
            let kingVisualElement = visualBoard.getVisualElement(king.boardSquare);
            if (kingVisualElement.color !== ChessColor.selected && kingVisualElement.color !== ChessColor.checked) {
                let newVisualBoard = visualBoard.copyBoard();
                newVisualBoard.setVisualElement(king.boardSquare, new VisualElement(ChessColor.checked, kingVisualElement.onClick));
                setVisualBoard(newVisualBoard);
            }
        }
        clearBeatenSquares(board);
    }, [visualBoard]);

    // connection logic
    useEffect(() => {
        let updateParams = (params: GameParams) => {
            console.log(params);

            TurnsCount.turns = params.turnCount;
            setPlayerTeam(params.playerTeam);
            SetTeamTurn(params.playerTurn); 
            setLoading(false); 
            setBoard(params.board);
            setVisualBoard(new VisualBoard());
        }

        ws.current = new ChessGameWebSocket(gameId, updateParams);
        return () => {
            ws.current?.closeWS();
        }
    }, []);

    const isGameOver = () => {
        clearBeatenSquares(board);
        setBeatenSquares(getOppositeTeam(teamTurn), board);
        return !DoesAnyProtectedActionExist(teamTurn, board)
    }

    const getOppositeTeam = (team: Team): Team => {
        return team === Team.White ? Team.Black : Team.White;
    }

    const squareOnClickHandler = (figure: BaseFigure) => {
        let newVisualBoard = new VisualBoard();
        let selectedSquare = new VisualElement(ChessColor.selected);

        newVisualBoard.setVisualElement(figure.boardSquare, selectedSquare);
        // this line of code saves the visualization of king square
        // for example, if king is checked, then there would be a red square 
        // without this code, the red color of king square blinks
        if (figure !== board.getKing(teamTurn)) {
            let king = board.getKing(teamTurn);
            if (visualBoard.getVisualElement(king.boardSquare).color !== ChessColor.selected) {
                newVisualBoard.setVisualElement(board.getKing(teamTurn).boardSquare, visualBoard.getVisualElement(king.boardSquare));
            }   
        }

        if (teamTurn !== playerTeam || figure.team !== playerTeam) {
            setVisualBoard(newVisualBoard);
            return;
        }
        
        clearBeatenSquares(board);        
        setBeatenSquares(getOppositeTeam(teamTurn), board);
        for (let action of figure.getActions(board)) {
            if (!isActionProtected(action, figure.team, board)) {
                continue;
            }

            let visualElement = new VisualElement();
            // if you want custom colors for each action, then create color factory and depending on action itself return a color
            visualElement.color = (action.getActionSquare().column + action.getActionSquare().row) % 2 == 0 ? ChessColor.lightGreen : ChessColor.darkGreen;
            
            visualElement.onClick = actionOnClickHandlerFactory(action, figure, board);
            newVisualBoard.setVisualElement(action.getActionSquare(), visualElement);
        }

        setVisualBoard(newVisualBoard);
    } 

    var boardElements = [...visualBoard].map((visualElement, index) => {
        const row = Math.floor(index / 8);
        const column = index % 8; 
        const color = visualElement.color;
        const figure = board.getBoardFigure(new BoardSquare(row, column));

        return (
            <Square
                key={index}
                color={color}
                onClick={() => {
                    if (!boardActive) return;
                    visualElement.onClick ? visualElement.onClick() : squareOnClickHandler(figure); 
                }}
                className={FigureCssClassFactory(figure)}
            />
        );
    });

    let sideBarElements = [1,2,3,4,5,6,7,8].reverse().map((val: number) => {
        return (
            <SquareText
                key={val} 
                text={`${val}`}
            />
        )
    });

    let transformationElements = (transformationObject.column === -1 ? [] : new Array(8)).fill(null).map((_, column) => {
        if (transformationObject.column === column) {
            return (
                <TransformationBlock
                    key={column} 
                    figures={transformationObject.figures} 
                    onClick={(figure) => {
                        transformationObject.onClick!(figure);
                    }}                            
                />
            )
        }
        return (
            <SquareText
                key={column}
                text=""
            />
        )
    });

    if (isLoading) {
        return null;
    }

    return (
        <div className={styles['chess-board-box']}>
            <div className={styles['transformation-block-container']}>
                    {(playerTeam === Team.White) ? transformationElements : transformationElements.reverse()}
                </div>

            <div className={styles['chess-board-container']}>
                <div className={styles['column-rows-count']}>
                    {(playerTeam === Team.White) ? sideBarElements : sideBarElements.reverse()}
                </div>
                <div className={styles['chess-wrap']}>
                    <div className={styles['chess-board']}>
                        {(playerTeam === Team.White) ? boardElements : boardElements.reverse()}
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
            </div>
        </div>
    );
};

export default ChessBoard;
