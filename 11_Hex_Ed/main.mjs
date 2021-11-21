#!/usr/bin/env zx

const moves = {
    n: [2, 0],
    ne: [1, 1],
    se: [-1, 1],
    s: [-2, 0],
    sw: [-1, -1],
    nw: [1, -1],
};

const part1 = (steps) => {
    const pos = [0, 0];

    steps.forEach((step) => {
        const move = moves[step];
        pos[0] += move[0];
        pos[1] += move[1];
    });
    pos[0] = Math.abs(pos[0]);
    pos[1] = Math.abs(pos[1]);

    if (pos[0] - pos[1] > 0) {
        return Math.floor((pos[0] - pos[1]) / 2) + pos[1];
    }
    return pos[1];
};

const part2 = (steps) => {
    const pos = [0, 0];
    let max = 0;

    steps.forEach((step) => {
        const move = moves[step];
        pos[0] += move[0];
        pos[1] += move[1];

        const posY = Math.abs(pos[0]);
        const posX = Math.abs(pos[1]);
        const tmpMax = posY - posX > 0 ? Math.floor((posY - posX) / 2) + posX : posX;
        if (tmpMax > max) {
            max = tmpMax;
        }
    });

    return max;
};

const content = String(await fs.readFile("input.txt"));

console.log(part1(content.split(",")));
console.log(part2(content.split(",")));
