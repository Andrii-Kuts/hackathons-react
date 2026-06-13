export type PieceColor = "red" | "yellow";
export type CellState = PieceColor | "empty";

function oppositeColor(player: PieceColor) {
    return player == "red" ? "yellow" : "red";
}

export class GameState {
    private board: CellState[][];
    private currentPlayer: PieceColor;

    constructor() {
        this.board = [];
        for(let row = 0; row < 6; row++) {
            this.board[row] = [];
            for(let column = 0; column < 7; column++) {
                this.board[row][column] = "empty";
            }
        }
        this.currentPlayer = "red";
    }

    placePiece(column: number, color: PieceColor): boolean {
        for(let row = 5; row >= 0; row--) {
            if(this.board[row][column] == "empty") {
                this.board[row][column] = color;
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
};