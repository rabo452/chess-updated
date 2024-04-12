import React from "react";
import ChessBoard from "./Components/Chess/ChessBoard/ChessBoard";
import Team from "services/chess/Team";

const App = () => {
    return (
        <div>
            <ChessBoard playerView={Team.Black}/>
        </div>
    );
}

export default App;