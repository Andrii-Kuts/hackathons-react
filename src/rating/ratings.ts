import { getRating, setRating } from "./playerStatistics";
import { applyDelta, calculateRatingDelta, newRating, updateDeviation } from "./ratingsMath";

const RATING_PERIOD = 1000 * 60 * 10;

let currentTime = loadCurrentTime();
tickCurrentTime();

function loadCurrentTime() {
    const s = localStorage.getItem("rating_current_time");
    if(s == undefined)
        return 0;
    return Number.parseInt(s);
}

function saveCurrentTime() {
    localStorage.setItem("rating_current_time", currentTime.toString());
}

function tickCurrentTime() {
    setTimeout(() => {
        currentTime++;
        saveCurrentTime();
        tickCurrentTime();
    }, RATING_PERIOD);
}

export function updateRatings(player1: string, player2: string, result: number) {
    let rating1 = updateDeviation(getRating(player1) ?? newRating(currentTime), currentTime);
    let rating2 = updateDeviation(getRating(player2) ?? newRating(currentTime), currentTime);
    console.log(player1, rating1);
    console.log(player2, rating2);
    const delta1 = calculateRatingDelta(rating1, rating2, result);
    const delta2 = calculateRatingDelta(rating2, rating1, 1-result);
    console.log({
        player1,
        player2,
        result,
        delta1,
        delta2,
    });
    rating1 = applyDelta(rating1, delta1);
    rating2 = applyDelta(rating2, delta2);
    setRating(player1, rating1);
    setRating(player2, rating2);
}