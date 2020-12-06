const fs = require("fs");
const _ = require("lodash");
const chalk = require("chalk");
const isYear = require("../utils/isYear");

const args = process.argv.slice(2);

console.log("");

const rootPath = `${__dirname}/..`;

try {
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

  let answers;

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    answers = require(`${rootPath}/${puzzlePath}`);
  } catch (err) {
    console.log(err);
  }

  if (!_.isArray(answers)) {
    throw new Error(`\`${puzzlePath}\` must export an array`);
  }

  if (!answers.length) {
    throw new Error(`No answer provided`);
  }

  console.log(chalk.cyan("Answer 1:"), answers[0]);

  if (answers.length > 1) {
    console.log(chalk.cyan("Answer 2:"), answers[1]);
  }
} catch (err) {
  console.log(chalk.red(err.message));
}

console.log("");
