import Action from "./models/Action/Action";
import TransformationAction from "./models/Action/TransformationAction";
import BaseFigure from "./models/Figure/BaseFigure";
import Team from ".//models/Team";
import DoesAnyProtectedActionExist from "./models/DoesAnyProtectedActionExist";
import BoardSquare from "./models/BoardSquare";
import isActionProtected from "./models/isActionProtected";
import TurnsCount from "./models/TurnsCount";
import setBeatenSquares from "./models/setBeatenSquares";
import clearBeatenSquares from "./models/clearBeatenSquares";
import Board from "./models/Board";

export { Board, TransformationAction, BaseFigure, Team, DoesAnyProtectedActionExist, BoardSquare, isActionProtected, TurnsCount, setBeatenSquares, clearBeatenSquares };
export type { Action };
