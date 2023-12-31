import warmSpringColors from "./palettes/warmSpring";
import coolSummerColors from "./palettes/coolSummer";
import warmAutumnColors from "./palettes/warmAutumn";
import coolWinterColors from "./palettes/coolWinter";
import type { Color } from "./types"

const MATCH_DISTANCE = 450;

type Pair = [Color, Color]

export function generatePairs(): Pair[] {
    const autumnSpring = compareSeasons(warmAutumnColors, warmSpringColors);
    const autumnSummer = compareSeasons(warmAutumnColors, coolSummerColors);
    const autumnWinter = compareSeasons(warmAutumnColors, coolWinterColors);
    const springSummer = compareSeasons(warmSpringColors, coolSummerColors);
    const springWinter = compareSeasons(warmSpringColors, coolWinterColors);
    const summerWinter = compareSeasons(coolSummerColors, coolWinterColors);

    return autumnSpring
        .concat(autumnSummer)
        .concat(autumnWinter)
        .concat(springSummer)
        .concat(springWinter)
        .concat(summerWinter)
}

function compareSeasons(seasonA: Color[], seasonB: Color[]): Pair[] {
    let seasonMatches: Pair[] = []
    seasonA.map(color => {
        const colorMatches = compareColors(color, seasonB)
        if (colorMatches.length > 0) {
           seasonMatches = seasonMatches.concat(colorMatches)
        }
    })
    return seasonMatches;
}

function compareColors(seasonAColor: Color, seasonB: Color[]): Pair[] {
    const matches = seasonB.filter(color => detectMatch(color, seasonAColor))
    return matches.map(seasonBColor => [seasonAColor, seasonBColor]);
}

function detectMatch(colorA: Color, colorB: Color): boolean {
    const a = hexToRgb(colorA.hex)
    const b = hexToRgb(colorB.hex)

    return colorDistance(a, b) < MATCH_DISTANCE
}

type Rgb = {
    red: number,
    green: number,
    blue: number,
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex: string): Rgb {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      red: parseInt(result![1], 16),
      green: parseInt(result![2], 16),
      blue: parseInt(result![3], 16)
    };
}

function colorDistance(a: Rgb, b: Rgb) {
    return ((a.red - b.red) ** 2 + 
        (a.green - b.green) ** 2 +
        (a.blue - b.blue) ** 2) / 3 
}