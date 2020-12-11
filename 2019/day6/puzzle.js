const fs = require("fs");

const map = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(")"));

function getTree() {
  const tree = [];
  const indexes = {};

  for (let i = 0; i < map.length; i += 1) {
    const [parent, child] = map[i];

    if (!(parent in indexes)) {
      tree.push([null, parent]);
      indexes[parent] = tree.length - 1;
    }
    if (!(child in indexes)) {
      tree.push([null, child]);
      indexes[child] = tree.length - 1;
    }

    const parentIndex = indexes[parent];

    tree[indexes[child]][0] = parentIndex;
  }

  return tree;
}

function getAnswer1() {
  const tree = getTree();

  let orbits = 0;
  for (let i = 0; i < tree.length; i += 1) {
    const [current] = tree[i];

    let parent = current;
    while (parent !== null) {
      orbits += 1;
      [parent] = tree[parent];
    }
  }

  return orbits;
}

const answer1 = getAnswer1();

module.exports = [answer1];
