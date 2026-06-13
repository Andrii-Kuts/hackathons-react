import type { CellState, GameState } from "./logic"

function GridCell({ cellState, onClick }: { cellState: CellState, onClick: () => void}) {
    const backgroundColor = cellState == "red" ? "red" :
        cellState == "yellow" ? "yellow" :
        undefined;
    const text = cellState == "red" ? "X" :
        cellState == "yellow" ? "O" : 
        "";
    return (
        <div
            className="grid_cell"
            style={{backgroundColor}}
            onClick={() => onClick()}
        >
            <a className="grid_cell_text">{text}</a>
        </div>
    )
}

// Passing entire game state where you don't need it = BAD
// fix it later
function GridRow({ row, gameState, onUpdate }: { row: number, gameState: GameState, onUpdate: () => void }) {
    const columns = [0, 1, 2, 3, 4, 5, 6];
    return (
        <div className="grid_row">
            {columns.map(column => (
                <GridCell
                    cellState={gameState.getCell(row, column)}
                    onClick={() => {
                        gameState.placePiece(column, gameState.getCurrentPlayer());
                        onUpdate();
                    }}
                />
            ))}
        </div>
    )
}

export function Grid({ gameState, onUpdate }: { gameState: GameState, onUpdate: () => void }) {
    const rows = [0, 1, 2, 3, 4, 5];
    return (
        <div className="grid">
            {rows.map(row => (
                <GridRow row={row} gameState={gameState} onUpdate={onUpdate} />
            ))}
        </div>
    )
}