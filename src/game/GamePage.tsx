import type React from "react";
import { Grid } from "../Grid";
import type { GameState } from "../logic";
import { GameStatusText } from "../GameStatusText";

export const GamePage: React.FC<{
    gameState: GameState,
    onUpdate: () => void,
}> = ({
    gameState,
    onUpdate,
}) => {
    return (
        <div className="game_page">
            <Grid
                gameState={gameState}
                onUpdate={onUpdate}
            />
            <GameStatusText gameState={gameState}/>
        </div>
    );
}