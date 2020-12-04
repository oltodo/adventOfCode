const fs = require("fs");
const _ = require("lodash");
const chalk = require("chalk");
const args = process.argv.slice(2);

console.log("");

const rootPath = __dirname + "/..";

try {
  function isYear(value) {
    return /^[0-9]{4}$/.test(value);
  }

  const folders = fs.readdirSync(rootPath);
  const years = folders.filter((name) => isYear(name)).sort();

  let year = years[years.length - 1];
  let day = new Date().getDate();

  args.forEach((arg) => {
    if (isYear(arg)) {
      year = arg;
      return;
    }

    if (/^[0-9]$/.test(arg)) {
      day = arg;
      return;
    }
  });

  if (!day) {
    throw new Error("Please provide a day");
  }

  if (!years.includes(year)) {
    throw new Error(`Year ${year} not found`);
  }

  const puzzlePath = `${year}/day${day}/puzzle.js`;

  if (!fs.existsSync(`${rootPath}/${puzzlePath}`)) {
    throw new Error(`File \`${puzzlePath}\` not found`);
  }

  const anwsers = require(`${rootPath}/${puzzlePath}`);

  if (!_.isArray(anwsers)) {
    throw new Error(`\`${puzzlePath}\` must export an array`);
  }

  if (!anwsers.length) {
    throw new Error(`No answer provided`);
  }

  console.log(chalk.cyan("Answer 1:"), anwsers[0]);

  if (anwsers.length > 1) {
    console.log(chalk.cyan("Answer 2:"), anwsers[1]);
  }
} catch (err) {
  console.log(chalk.red(err.message));
}

console.log("");
