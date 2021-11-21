#!/usr/bin/env zx

const insRegex = /-?\w+/g;
const checkRegex = /[<>=!]{1,2} -?\d+/;

const parseInstructions = (data) => {
    const ins = [];
    data.split("\n").forEach((line) => {
        const matches = line.match(insRegex);
        const [check] = line.match(checkRegex);

        ins.push({
            register: matches[0],
            action: matches[1],
            value: parseInt(matches[2]),
            checkRegister: matches[4],
            check,
        });
    });
    return ins;
};

const part1 = (instructions) => {
    const registers = {};
    Object.entries(instructions)
        .map(([_, { register }]) => register)
        .forEach((register) => (registers[register] = 0));

    instructions.forEach((instruction) => {
        let result = false;
        eval(`result = registers["${instruction.checkRegister}"] ${instruction.check}`);
        if (result) {
            if (instruction.action === "inc") {
                registers[instruction.register] += instruction.value;
            }
            if (instruction.action === "dec") {
                registers[instruction.register] -= instruction.value;
            }
        }
    });
    return Math.max(...Object.values(registers));
};

const part2 = (instructions) => {
    const registers = {};
    Object.entries(instructions)
        .map(([_, { register }]) => register)
        .forEach((register) => (registers[register] = 0));

    let max = 0;
    instructions.forEach((instruction) => {
        let result = false;
        eval(`result = registers["${instruction.checkRegister}"] ${instruction.check}`);
        if (result) {
            if (instruction.action === "inc") {
                registers[instruction.register] += instruction.value;
            }
            if (instruction.action === "dec") {
                registers[instruction.register] -= instruction.value;
            }
        }
        const tmpMax = Math.max(...Object.values(registers));
        if (tmpMax > max) {
            max = tmpMax;
        }
    });
    return max;
};

let content = String(await fs.readFile("input.txt"));

const ins = parseInstructions(content);
console.log(part1(ins));
console.log(part2(ins));
