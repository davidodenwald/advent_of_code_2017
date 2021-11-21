#!/usr/bin/env zx

const part1 = (data) => {
    let inTrash = false;
    let depth = 0;
    let score = 0;
    for (var i = 0; i < data.length; i++) {
        switch (data.charAt(i)) {
            case "{":
                if (!inTrash) {
                    depth++;
                }
                break;
            case "}":
                if (!inTrash) {
                    score += depth;
                    depth--;
                }
                break;
            case "<":
                inTrash = true;
                break;
            case ">":
                inTrash = false;
                break;
            case "!":
                i++;
                break;
            default:
                break;
        }
    }
    return score;
};

const part2 = (data) => {
    let inTrash = false;
    let garbage = 0;
    for (var i = 0; i < data.length; i++) {
        switch (data.charAt(i)) {
            case "<":
                if (inTrash) {
                    garbage++;
                } else {
                    inTrash = true;
                }
                break;
            case ">":
                inTrash = false;
                break;
            case "!":
                i++;
                break;
            default:
                if (inTrash) {
                    garbage++;
                }
                break;
        }
    }
    return garbage;
};

const content = String(await fs.readFile("input.txt"));

console.log(part1(content));
console.log(part2(content));
