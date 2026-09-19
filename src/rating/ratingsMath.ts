const TIME_INACTIVE = 25200;
const MAX_DEVIATION = 350;
const AVG_DEVIATION = 50;
const C = Math.sqrt((MAX_DEVIATION * MAX_DEVIATION - AVG_DEVIATION * AVG_DEVIATION) / TIME_INACTIVE);
const Q = Math.log(10) / 400;
const AVG_MEAN = 1000;

export type Rating = {
    mean: number;
    deviation: number;
    lastUpdate: number;
}

export type RatingDelta = {
    mean: number;
    deviation: number;
}

export function newRating(currentTime: number): Rating {
    return {
        mean: AVG_MEAN,
        deviation: MAX_DEVIATION,
        lastUpdate: currentTime,
    };
}

export function updateDeviation(rating: Rating, currentTime: number): Rating {
    const t = currentTime - rating.lastUpdate;
    const newDeviation = Math.min(Math.sqrt(rating.deviation * rating.deviation + C*C*t), MAX_DEVIATION);
    return {
        mean: rating.mean,
        deviation: newDeviation,
        lastUpdate: currentTime,
    } as Rating;
}

function gFunction(deviation: number) {
    const x = (3*Q*Q*deviation*deviation) / (Math.PI*Math.PI);
    return 1 / (1 + Math.sqrt(1 + x));
}

/**
 * Calculates expected result of the game between two players.
 * 0 means rating1 always loses, 1 means they always win
 * @param rating1 rating of our player
 * @param rating2 rating of our opponent
 * @returns value between 0 and 1 (inclusive)
 */
export function expectedResult(rating1: Rating, rating2: Rating) {
    const x = gFunction(rating2.deviation) * (rating1.mean - rating2.mean) / -400;
    return 1 / (1 + Math.pow(10, x));
}

export function calculateRatingDelta(rating1: Rating, rating2: Rating, result: number): RatingDelta {
    const e = expectedResult(rating1, rating2);
    const g = gFunction(rating2.deviation);
    const d2 = 1 / (Q*Q*g*g*e*(1-e));
    const coef = 1 / ((1 / (rating1.deviation * rating1.deviation)) + (1 / d2));
    return {
        mean: Q * coef * g * (result - e),
        deviation: Math.sqrt(coef) - rating1.deviation
    }
}

export function applyDelta(rating: Rating, delta: RatingDelta): Rating {
    return {
        mean: rating.mean + delta.mean,
        deviation: rating.deviation + delta.deviation,
        lastUpdate: rating.lastUpdate
    };
}
 
