import React from "react";
import ChessBoard from "./Components/Chess/ChessBoard/ChessBoard";
import Team from "services/chess/Team";

const App = () => {
    return (
        <div>
            <ChessBoard 
                playerView={Team.Black} 
                winCallback={(team: Team) => {console.log(team + "win");}} 
                drawCallback={() => {console.log("it's a draw");}} 
            />
        </div>
    );
}

export default App;