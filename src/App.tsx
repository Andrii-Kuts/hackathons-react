import { useState } from "react";
import { GameState } from "./logic";
import { GameStartMenu } from "./GameStartMenu";
import { GamePage } from "./game/GamePage";
import { LeaderboardPage } from "./leaderboard/LeaderboardPage";

export type Page = "menu" | "game" | "leaderboard";

export function App() {
    const [gameState, ] = useState<GameState>(new GameState());
    const [updateCounter, setUpdateCounter] = useState<number>(0);
    const onUpdate = () => {
        setUpdateCounter(updateCounter + 1);
    };
    const [page, setPage] = useState<Page>("menu");

    return (
        <div className="app">
            <div className="header">
                <h1 className="header__title">Connect 4</h1>
                <button className="header_button" onClick={() => setPage("menu")}>
                    <a>New Game</a>
                </button>
                <button className="header_button" onClick={() => setPage("game")}>
                    <a>Play</a>
                </button>
                <button className="header_button" onClick={() => setPage("leaderboard")}>
                    <a>Leaderboard</a>
                </button>
            </div>
            <div className="content">
                {   page === "menu" &&
                    <GameStartMenu startGame={(redPlayerName, yellowPlayerName) => {
                        gameState.startGame(redPlayerName, yellowPlayerName);
                        setPage("game");
                        onUpdate();
                    }}/>
                } { 
                    page === "game" && 
                    <GamePage gameState={gameState} onUpdate={onUpdate} />
                } {
                    page === "leaderboard" &&
                    <LeaderboardPage />
                }
            </div>
        </div>
    );
}