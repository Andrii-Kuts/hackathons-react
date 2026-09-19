import React from "react";

import styles from "./Leaderboard.module.css";
import type { PlayerStatistics } from "../rating/playerStatistics";

const HeaderRow: React.FC = () => {
    return (
        <div className={styles.leaderboard__header_row}>
            <span className={styles.leaderboard__row__rank}>
                <a className={styles.leaderboard__header_row__text}>#</a>
            </span>
            <span className={styles.leaderboard__row__username}>
                <a className={styles.leaderboard__header_row__text}>Name</a>
            </span>
            <span className={styles.leaderboard__row__wins}>
                <a className={styles.leaderboard__header_row__text}>W</a>
            </span>
            <span className={styles.leaderboard__row__draws}>
                <a className={styles.leaderboard__header_row__text}>D</a>
            </span>
            <span className={styles.leaderboard__row__losses}>
                <a className={styles.leaderboard__header_row__text}>L</a>
            </span>
            <span className={styles.leaderboard__row__win_percentage}>
                <a className={styles.leaderboard__header_row__text}>W/L</a>
            </span>
            <span className={styles.leaderboard__row__elo}>
                <a className={styles.leaderboard__header_row__text}>Elo</a>
            </span>
        </div>
    )
}

const Row: React.FC<{
    rank: number;
    username: string;
    wins: number;
    draws: number;
    losses: number;
    elo: number | null;
}> = ({
    rank,
    username,
    wins,
    draws,
    losses,
    elo,
}) => {
    const winPercentage = wins + losses == 0 ? "0%" :
        `${Math.round(wins / (wins + losses) * 100)}%`;
    const eloText = elo ? Math.round(elo).toString() : "";
    return (
        <div className={styles.leaderboard__row}>
            <span className={styles.leaderboard__row__rank}>
                <a>{rank}</a>
            </span>
            <span className={styles.leaderboard__row__username}>
                <a>{username}</a>
            </span>
            <span className={styles.leaderboard__row__wins}>
                <a className={styles.leaderboard__row__wins__text}>{wins}</a>
            </span>
            <span className={styles.leaderboard__row__draws}>
                <a className={styles.leaderboard__row__draws__text}>{draws}</a>
            </span>
            <span className={styles.leaderboard__row__losses}>
                <a className={styles.leaderboard__row__losses__text}>{losses}</a>
            </span>
            <span className={styles.leaderboard__row__win_percentage}>
                <a>{winPercentage}</a>
            </span>
            <span className={styles.leaderboard__row__elo}>
                <a className={styles.leaderboard__row__elo__text}>{eloText}</a>
            </span>
        </div>
    )
}

function compareStatistics(a: PlayerStatistics, b: PlayerStatistics) {
    if(a.wins != b.wins)
        return b.wins - a.wins;
    if(a.losses != b.losses)
        return a.losses - b.losses;
    return b.username.localeCompare(a.username);
}

export const Leaderboard: React.FC<{
    ratings: PlayerStatistics[]
}> = ({
    ratings
}) => {
    ratings = ratings.sort((a, b) => compareStatistics(a, b));
    return (
        <div className={styles.leaderboard}>
            <HeaderRow />
            {ratings.map((playerStatistics, index) => (
                <Row
                    rank={index+1}
                    username={playerStatistics.username}
                    wins={playerStatistics.wins}
                    draws={playerStatistics.draws}
                    losses={playerStatistics.losses}
                    elo={playerStatistics.rating?.mean ?? null}
                />
            ))}
        </div>
    )
};