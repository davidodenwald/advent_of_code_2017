#!/usr/bin/env zx

const suffix = [17, 31, 73, 47, 23];

const part1 = (lengths) => {
    let list = [...Array(256).keys()];
    let skip = 0;
    let pos = 0;

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
    return list[0] * list[1];
};

const chunk = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
};

const part2 = (bytes) => {
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

const content = String(await fs.readFile("input.txt"));

console.log(part1(content.split(",").map((e) => parseInt(e))));
console.log(part2(content));
