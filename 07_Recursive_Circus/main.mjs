#!/usr/bin/env zx

const ruleRegex = /\w+/g;

const parseRules = (data) => {
    const nodes = [];
    data.split("\n").forEach((line) => {
        const matches = line.match(ruleRegex);
        nodes.push({
            name: matches[0],
            weight: parseInt(matches[1]),
            children: matches.slice(2),
        });
    });
    nodes.forEach((node) => {
        node.children = node.children.map((name) => nodes.find((n) => n.name === name));
    });
    return nodes;
};

const part1 = (nodes) => {
    nodes.forEach((node) => {
        node.children.forEach((child) => {
            child.parent = node;
        });
    });
    return nodes.find((r) => !r.parent);
};

const checkBalanced = (node) => {
    if (node.children.find((e) => !e.accumulatedWeigth) || node.accumulatedWeigth) {
        return;
    }

    const weights = {};
    node.children.forEach((e) => {
        weights[e.accumulatedWeigth]
            ? weights[e.accumulatedWeigth]++
            : (weights[e.accumulatedWeigth] = 1);
    });
    const oddWeight = Object.entries(weights).find(([_, num]) => num === 1);
    const odd = node.children.find((e) => e.accumulatedWeigth === parseInt(oddWeight));
    const regular = node.children.find((e) => e.accumulatedWeigth !== parseInt(oddWeight));

    if (odd) {
        console.log(odd.weight - (odd.accumulatedWeigth - regular.accumulatedWeigth));
        process.exit(0);
    }

    node.accumulatedWeigth =
        node.children.reduce((acc, c) => acc + c.accumulatedWeigth, 0) + node.weight;
    if (node.parent) {
        checkBalanced(node.parent);
    }
};

const part2 = (nodes) => {
    nodes
        .filter((node) => !node.children.length)
        .forEach((node) => {
            node.accumulatedWeigth = node.weight;
        });
    nodes
        .filter((node) => !node.children.length)
        .forEach((node) => {
            checkBalanced(node.parent);
        });
};

let content = String(await fs.readFile("input.txt"));
const nodes = parseRules(content);
console.log(part1(nodes).name);
part2(nodes);
