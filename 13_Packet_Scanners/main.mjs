#!/usr/bin/env zx

const parseScanners = (data) => {
    return data.split("\n").map((e) => {
        const [depth, range] = e.split(": ");
        return { depth: parseInt(depth), range: parseInt(range) };
    });
};

const part1 = (scanners) => {
    let severity = 0;
    for (let i = 0; i <= Math.max(...scanners.flatMap((e) => e.depth)); i++) {
        const scanner = scanners.find((e) => e.depth === i);
        if (scanner) {
            if (i % ((scanner.range - 1) * 2) === 0) {
                severity += scanner.depth * scanner.range;
            }
        }
    }
    return severity;
};

const part2 = (scanners) => {
    let maxDepth = Math.max(...scanners.flatMap((e) => e.depth));
    for (let start = 0; ; start++) {
        let cought = false;
        for (let i = 0; i <= maxDepth && !cought; i++) {
            const scanner = scanners.find((e) => e.depth === i);
            if (scanner) {
                if ((i + start) % ((scanner.range - 1) * 2) === 0) {
                    cought = true;
                    // console.log(`delay ${start} -> cought at ${i}`);
                }
            }
            if (i == maxDepth && !cought) {
                return start;
            }
        }
    }
};

const example = `0: 3
1: 2
4: 4
6: 4`;

const content = String(await fs.readFile("input.txt"));

console.log(part1(parseScanners(content)));
console.log(part2(parseScanners(content)));
