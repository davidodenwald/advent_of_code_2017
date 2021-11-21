#!/usr/bin/env zx

const suffix = [17, 31, 73, 47, 23];

const chunk = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
};

const knotHash = (bytes) => {
    const lengths = bytes
        .split("")
        .map((e) => e.charCodeAt())
        .concat(suffix);

    let list = [...Array(256).keys()];
    let skip = 0;
    let pos = 0;

    for (let round = 0; round < 64; round++) {
        lengths.forEach((l) => {
            let newList = Array(256);
            for (let i = 0; i < Math.max(pos + l, list.length); i++) {
                if (i < pos || i >= pos + l) {
                    newList[i] = list[i];
                } else {
                    newList[i % list.length] = list[(2 * pos + l - i - 1) % list.length];
                }
            }
            pos = (pos + l + skip) % list.length;
            skip++;
            list = [...newList];
        });
    }
    return chunk(list, 16)
        .map((chunk) => chunk.reduce((a, v) => a ^ v, 0))
        .map((n) => n.toString(16))
        .map((hex) => (hex.length < 2 ? "0" + hex : hex))
        .join("");
};

const part1 = (key) => {
    let used = 0;
    for (let i = 0; i < 128; i++) {
        const hash = knotHash(`${key}-${i}`);
        for (let k = 0; k < hash.length; k++) {
            const bin = parseInt(hash.charAt(k), 16).toString(2);
            used += bin.split("0").join("").length;
        }
    }
    return used;
};

const markFields = (posMap, grid, y, x, id) => {
    const key = `${y}:${x}`;
    if (grid[y][x] !== "1" || key in posMap) {
        return;
    }

    posMap[key] = id;

    [
        [-1, 0], // top
        [0, 1], // right
        [1, 0], // bottom
        [0, -1], // left
    ].forEach(([offY, offX]) => {
        const tmpY = y + offY;
        const tmpX = x + offX;

        // bounds check
        if (tmpY < 0 || tmpY >= grid.length || tmpX < 0 || tmpX >= grid.length) {
            return;
        }
        markFields(posMap, grid, tmpY, tmpX, id);
    });
};

const part2 = (key) => {
    const posMap = {};
    const grid = [];
    for (let i = 0; i < 128; i++) {
        const hash = knotHash(`${key}-${i}`);
        const binHash = [];
        for (let k = 0; k < hash.length; k++) {
            binHash.push(parseInt(hash.charAt(k), 16).toString(2).padStart(4, "0"));
        }
        grid.push(binHash.join(""));
    }

    let groupId = 1;
    for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
            if (grid[y][x] === "0") {
                continue;
            }
            if (`${y}:${x}` in posMap) {
                continue;
            }
            markFields(posMap, grid, y, x, groupId);
            groupId++;
        }
    }
    return groupId - 1;
};

const key = "oundnydw";

console.log(part1(key));
console.log(part2(key));
