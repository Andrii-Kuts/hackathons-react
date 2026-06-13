import { useState } from "react";
import { Grid } from "./Grid";
import { GameState } from "./logic";

export function App() {
    const [gameState, ] = useState<GameState>(new GameState());
    const [updateCounter, setUpdateCounter] = useState<number>(0);

    return (
        <div className="app">
            <h1>Connect 4</h1>
            <Grid
                gameState={gameState}
                onUpdate={() => setUpdateCounter(updateCounter + 1)}
            />
            <a className="player_move_text">Red's move</a>
        </div>
    );
}