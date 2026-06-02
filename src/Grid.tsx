import { useState } from "react";

function GridCell() {
    const [cellState, setCellState] = useState<number>(0);
    const backgroundColor = cellState == 0 ? undefined :
        cellState == 1 ? "red" :
        cellState == 2 ? "blue" : undefined;
    const text = cellState == 0 ? "" :
        cellState == 1 ? "X" :
        cellState == 2 ? "O" : ""

    return (
        <div
            className="grid_cell"
            onClick={() => setCellState((cellState + 1) % 3) }
            style={{backgroundColor}}
        >
            <a className="grid_cell_text">{text}</a>
        </div>
    )
}

function GridRow() {
    return (
        <div className="grid_row">
            <GridCell />
            <GridCell />
            <GridCell />
            <GridCell />
            <GridCell />
            <GridCell />
            <GridCell />
        </div>
    )
}

export function Grid() {
    return (
        <div className="grid">
            <GridRow />
            <GridRow />
            <GridRow />
            <GridRow />
            <GridRow />
            <GridRow />
        </div>
    )
}