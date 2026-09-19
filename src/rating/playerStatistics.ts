import type { Rating } from "./ratingsMath";

export type PlayerStatistics = {
    username: string,
    wins: number,
    draws: number,
    losses: number,
    rating: Rating | null,
};

const playerData: PlayerStatistics[] = loadPlayerData();

function dummyData(): PlayerStatistics[] {
    return [{
        username: "Alice",
        wins: 51,
        draws: 3,
        losses: 1
    }, {
        username: "Bob",
        wins: 10,
        draws: 2,
        losses: 30
    }, {
        username: "Charlie",
        wins: 1,
        draws: 10,
        losses: 2
    }, {
        username: "Denny",
        wins: 0,
        draws: 0,
        losses: 99
    }, {
        username: "Grzegorz Brzęczyszczykiewicz",
        wins: 0,
        draws: 999,
        losses: 0,
    }] as PlayerStatistics[]
}

function loadPlayerData(): PlayerStatistics[] {
    const json = localStorage.getItem("player_data");
    if(json == undefined)
        return dummyData();
    return JSON.parse(json) as PlayerStatistics[];
}

function savePlayerData() {
    const json = JSON.stringify([...playerData.values()]);
    localStorage.setItem("player_data", json);
}

function createPlayerStatistics(player: string): number {
    playerData.push({
        username: player,
        wins: 0,
        draws: 0,
        losses: 0,
        rating: null,
    });
    return playerData.length-1;
}

function getPlayerIndex(player: string) {
    let i = playerData.findIndex((value) => value.username === player);
    if(i == -1)
       i = createPlayerStatistics(player);
    return i;
}

export function recordVictory(player: string) {
    const i = getPlayerIndex(player);
    playerData[i].wins++;
    savePlayerData();
}

export function recordDraw(player: string) {
    const i = getPlayerIndex(player);
    playerData[i].draws++;
    savePlayerData();
}

export function recordLoss(player: string) {
    const i = getPlayerIndex(player);
    playerData[i].losses++;
    savePlayerData();
}

export function getRatings() {
    return playerData;
}

export function getRating(player: string): Rating | null{
    return playerData[getPlayerIndex(player)].rating;
}

export function setRating(player: string, rating: Rating) {
    playerData[getPlayerIndex(player)].rating = rating;
    savePlayerData();
}