export type PieceColor = "red" | "yellow";
export type CellState = PieceColor | "empty";
export type GameStatus = "active" | "yellowWon" | "redWon" | "draw";
type WinningLine = {
    cells: {
        row: number,
        column: number,
    }[]
};

function oppositeColor(player: PieceColor) {
    return player == "red" ? "yellow" : "red";
}

export type Piece = {
    color: PieceColor;
    row: number,
    column: number,
}

export class GameState {
    private board: CellState[][];
    private pieces: (Piece | null)[][];
    private currentPlayer: PieceColor;
    private gameStatus: GameStatus;
    private winningLine: WinningLine | null;

    constructor() {
        this.board = [];
        this.pieces = [];
        for(let row = 0; row < 6; row++) {
            this.board[row] = [];
            this.pieces[row] = [];
            for(let column = 0; column < 7; column++) {
                this.board[row][column] = "empty";
                this.pieces[row][column] = null;
            }
        }
        this.currentPlayer = "red";
        this.gameStatus = "active";
        this.winningLine = null;
    }

    private DX = [0, 1, 1, 1];
    private DY = [1, 1, 0, -1];

    private getLineCells(startRow: number, startColumn: number, direction: number) {
        const result = []
        for(let i = 0; i <= 3; i++) {
            const row = startRow + this.DX[direction] * i;
            const column = startColumn + this.DY[direction] * i;
            if(row < 0 || row >= 6 || column < 0 || column >= 7)
                return [];
            if(this.board[row][column] != this.board[startRow][startColumn])
                return [];
            result.push({ row, column });
        }
        return result;
    }

    private checkLine(startRow: number, startColumn: number, direction: number) {
        if(this.board[startRow][startColumn] == "empty")
            return false;
        const cells = this.getLineCells(startRow, startColumn, direction);
        if(cells.length == 0)
            return false;
        for(const { row, column } of cells) {
            if(this.board[row][column] != this.board[startRow][startColumn])
                return false;
        }
        return this.board[startRow][startColumn];
    }

    checkVictory(lastRow: number, lastColumn: number):
        false | { victor: PieceColor, winningLine: WinningLine }
    {
        for(let row = 0; row <= 5; row++) {
            for(let col = 0; col <= 6; col++) {
                for(let r = 0; r < 4; r++) {
                    const result = this.checkLine(row, col, r);
                    if(!result)
                        continue;

                    const victor = this.board[row][col] as PieceColor;
                    const cells = this.getLineCells(row, col, r);
                    const winningLine = { cells };
                    if(
                        winningLine.cells[0].row != lastRow ||
                        winningLine.cells[0].column != lastColumn
                    ) {
                        winningLine.cells.reverse()
                    }
                    return { victor, winningLine };
                }
            }
        }
        return false;
    }

    checkDraw() {
        for(let row = 0; row <= 5; row++) {
            for(let col = 0; col <= 6; col++) {
                if(this.board[row][col] == "empty")
                    return false;
            }
        }
        return true;
    }

    private setPiece(row: number, column: number, color: PieceColor) {
        this.board[row][column] = color;
        const victoryStatus = this.checkVictory(row, column);
        if(victoryStatus != false) {
            const victor = victoryStatus.victor;
            this.gameStatus = victor == "red" ? "redWon" : "yellowWon";
            this.winningLine = victoryStatus.winningLine;
            console.log(this.winningLine);
            return;
        }
        const isDraw = this.checkDraw();
        if(isDraw) {
            this.gameStatus = "draw";
            return;
        }
    }

    placePiece(column: number, color: PieceColor): boolean {
        if(this.gameStatus != "active")
            return false;
        for(let row = 5; row >= 0; row--) {
            if(this.board[row][column] == "empty") {
                this.pieces[row][column] = { color, row, column };
                this.setPiece(row, column, color);
                this.currentPlayer = oppositeColor(this.currentPlayer);
                return true;
            }
        }
        return false;
    }

    getCell(row: number, column: number): CellState {
        return this.board[row][column];
    }

    getBoard(): CellState[][] {
        return this.board;
    }  
    
    getCurrentPlayer(): PieceColor {
        return this.currentPlayer;
    }

    getGameStatus(): GameStatus {
        return this.gameStatus;
    }

    getWinningLineIndex(row: number, column: number): number | null {
        if(this.winningLine == null)
            return null;
        for(let i = 0; i < this.winningLine.cells.length; i++) {
            const cell = this.winningLine.cells[i]
            if(cell.row == row && cell.column == column)
                return i;
        }
        return null;
    }

    getPiece(row: number, column: number): Piece | null {
        return this.pieces[row][column];
    }
 };