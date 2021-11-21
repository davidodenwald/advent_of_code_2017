#!/usr/bin/env zx

const parseRules = (data) => {
    return data.split("\n").map((line) => {
        const [id, ...pipes] = line.match(/\d+/g);
        return { id, pipes };
    });
};

const collect = (rule, rules, group) => {
    if (group.has(rule.id)) {
        return;
    }
    group.add(rule.id);
    rule.pipes.forEach((pipe) => {
        collect(
            rules.find((r) => r.id === pipe),
            rules,
            group
        );
    });
};

const part1 = (rules) => {
    const group = new Set();
    collect(
        rules.find((rule) => rule.id === "0"),
        rules,
        group
    );
    return group.size;
};

const part2 = (rules) => {
    const groups = new Set();
    rules.forEach((rule) => {
        const group = new Set();
        collect(rule, rules, group);
        groups.add(JSON.stringify([...group].sort()));
    });
    return groups.size;
};

const content = String(await fs.readFile("input.txt"));

console.log(part1(parseRules(content)));
console.log(part2(parseRules(content)));
