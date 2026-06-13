import type { GameState } from "./logic";

export function GameStatusText({ gameState }: { gameState: GameState }) {

    const gameStatus = gameState.getGameStatus();
    let text;
    let color;
    if(gameStatus == "redWon") {
        text = "Red Won!";
        color = "var(--red)";
    } else if(gameStatus == "yellowWon") {
        text = "Yellow Won!";
        color = "var(--yellow)";
    } else if(gameStatus == "draw") {
        text = "Draw";
    } else if(gameState.getCurrentPlayer() == 'red') {
        text = "Red to Move";
        color = "var(--red)";
    } else {
        text = "Yellow to Move";
        color = "var(--yellow)";
    }

    return (
        <a className="player_move_text" style={{ color }}>{text}</a>
    )
}