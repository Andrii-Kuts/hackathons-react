import type { GameState } from "./logic";

export function GameStatusText({ gameState }: { gameState: GameState }) {

    const gameStatus = gameState.getGameStatus();
    let text;
    let color;
    if(gameStatus == "redWon") {
        text = `${gameState.getRedPlayerName()} Won!`;
        color = "var(--red)";
    } else if(gameStatus == "yellowWon") {
        text = `${gameState.getYellowPlayerName()} Won!`;
        color = "var(--yellow)";
    } else if(gameStatus == "draw") {
        text = "Draw";
    } else if(gameState.getCurrentPlayer() == 'red') {
        text = `${gameState.getRedPlayerName()} to Move`;
        color = "var(--red)";
    } else {
        text = `${gameState.getYellowPlayerName()} to Move`;
        color = "var(--yellow)";
    }

    return (
        <a className="player_move_text" style={{ color }}>{text}</a>
    )
}