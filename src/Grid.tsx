import type { CSSProperties } from "react";
import type { GameState, Piece } from "./logic"

function GridPiece({
    piece,
    winningLineIndex,
}: {
    piece: Piece,
    winningLineIndex: number | null,
}) {
    const className = "piece piece_drop_in" +
        (piece.color == "red" ? " piece_red" : " piece_yellow") +
        (winningLineIndex != null ? " piece_winning" : "");
    return (
        <div
            key={`${piece.row}:${piece.column}`}
            className={className}
            style={{
               '--index': winningLineIndex != null ? winningLineIndex : undefined
            } as CSSProperties}
        >
            <a className="grid_cell_text"></a>
        </div>
    )
}

function GridCell({
    piece,
    winningLineIndex,
    onClick
}: {
    piece: Piece | null,
    winningLineIndex: number | null,
    onClick: () => void
}) {
    return (
        <div
            className="grid_cell"
            onClick={() => onClick()}
        >
            {piece && (
                <GridPiece piece={piece} winningLineIndex={winningLineIndex} />
            )}
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
                    piece={gameState.getPiece(row, column)}
                    winningLineIndex={gameState.getWinningLineIndex(row, column)}
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