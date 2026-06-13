import type { CellState, GameState } from "./logic"

function GridCell({
    cellState,
    isOnWinningLine,
    onClick
}: {
    cellState: CellState,
    isOnWinningLine: boolean,
    onClick: () => void
}) {
    const backgroundColor = cellState == "red" ? "var(--red)" :
        cellState == "yellow" ? "var(--yellow)" :
        undefined;
    const className = isOnWinningLine ? "winning_cell" : "grid_cell";
    return (
        <div
            className={className}
            style={{backgroundColor}}
            onClick={() => onClick()}
        >
            <a className="grid_cell_text"></a>
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
                    isOnWinningLine={gameState.isOnWinningLine(row, column)}
                    onClick={() => {
                        gameState.placePiece(column, gameState.getCurrentPlayer());
                        onUpdate();
                    }}
                />
            ))}
        </div>
    )
}

function ColumnLabels() {
    const columns = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="column_labels">
            {columns.map(column => (
                <a className="column_label">{column}</a>
            ))}
        </div>
    )
}

export function Grid({ gameState, onUpdate }: { gameState: GameState, onUpdate: () => void }) {
    const rows = [0, 1, 2, 3, 4, 5];
    return (
        <div>
            <div className="grid">
                {rows.map(row => (
                    <GridRow row={row} gameState={gameState} onUpdate={onUpdate} />
                ))}
            </div>
            <ColumnLabels/>
        </div>
    )
}