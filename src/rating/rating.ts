export type PlayerStatistics = {
    username: string,
    wins: number,
    losses: number,
};

const playerData: PlayerStatistics[] = loadPlayerData();

function dummyData(): PlayerStatistics[] {
    return [{
        username: "Alice",
        wins: 51,
        losses: 1
    }, {
        username: "Bob",
        wins: 10,
        losses: 30
    }, {
        username: "Charlie",
        wins: 1,
        losses: 2
    }, {
        username: "Denny",
        wins: 0,
        losses: 99
    }, {
        username: "Grzegorz Brzęczyszczykiewicz",
        wins: 0,
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
    console.log(json);
    localStorage.setItem("player_data", json);
}

function createPlayerStatistics(player: string): number {
    playerData.push({
        username: player,
        wins: 0,
        losses: 0,
    });
    return playerData.length-1;
}

function recordVictory(player: string) {
    let i = playerData.findIndex((value) => value.username === player);
    if(i == -1) {
       i = createPlayerStatistics(player);
    }
    playerData[i].wins++;
    savePlayerData();
}

export function recordGame(
    redPlayer: string,
    yellowPlayer: string,
    outcome: number
) {
    if(outcome == 0)
        recordVictory(redPlayer);
    else if(outcome == 1)
        recordVictory(yellowPlayer);
}

export function getRatings() {
    return playerData;
}