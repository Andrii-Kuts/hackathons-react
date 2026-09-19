import type React from "react";
import { Leaderboard } from "./Leaderboard";

import styles from "./Leaderboard.module.css";
import { getRatings } from "../rating/playerStatistics";

export const LeaderboardPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Leaderboard ratings={getRatings()} />
        </div>
    )
}