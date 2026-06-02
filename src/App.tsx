import { Grid } from "./Grid";

export function App() {
    return (
        <div className="app">
            <h1>Connect 4</h1>
            <Grid />
            <a className="player_move_text">Red's move</a>
        </div>
    );
}