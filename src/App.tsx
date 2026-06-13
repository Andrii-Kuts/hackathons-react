import { useState } from "react";
import { Grid } from "./Grid";
import { GameState } from "./logic";
import { GameStatusText } from "./GameStatusText";

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
            <GameStatusText gameState={gameState}/>
        </div>
    );
}