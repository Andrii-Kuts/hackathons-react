import type React from "react";
import { useState } from "react";

export const GameStartMenu: React.FC<{
    startGame: (redPlayerName: string, yellowPlayerName: string) => void
}> = ({
    startGame
}) => {
    const [redPlayerName, setRedPlayerName] = useState<string>("");
    const [yellowPlayerName, setYellowPlayerName] = useState<string>("");

    return (
        <div className="game-start-menu">
            <a>Welcome to Connect 4!</a>

            <a>Red player name:</a>
            <input
                value={redPlayerName}
                onChange={(e) => setRedPlayerName(e.target.value)}
            />

            <a>Yellow player name:</a>
            <input
                value={yellowPlayerName}
                onChange={(e) => setYellowPlayerName(e.target.value)}
            />
            <button onClick={() => startGame(redPlayerName, yellowPlayerName)}>
                <a>Play!</a>
            </button>
        </div>
    )
};