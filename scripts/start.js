/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const chalk = require("chalk");
const prettyDuration = require("pretty-ms");
const { isFunction, upperFirst } = require("lodash");
const isYear = require("../utils/isYear");

const rootPath = `${__dirname}/..`;

class ConfigurationError extends Error {}

function run(part, input, partNumber) {
  let message;

  let duration = Date.now();
  const answer = part(input);
  duration = Date.now() - duration;
  duration = prettyDuration(duration);

  if (!Number.isInteger(answer)) {
    message = chalk.red(
      `\`part${partNumber}\` must return a integer (received: ${answer})`
    );
  } else {
    message = `${chalk.yellow(answer)} ${chalk.gray(`(${duration})`)}`;
  }

  console.log(chalk.cyan(`Part ${partNumber}:`), message);
  console.log(chalk.green(`---`));
  console.log();
}

try {
  const folders = fs.readdirSync(rootPath);
  const years = folders.filter((name) => isYear(name)).sort();

  let year = years[years.length - 1];
  let day = new Date().getDate();
  let tag = "";

  process.argv.slice(2).forEach((arg) => {
    if (isYear(arg)) {
      year = arg;
      return;
    }

    if (/^[0-9]{1,2}$/.test(arg)) {
      day = arg;
      return;
    }

    tag = new RegExp(arg.replace("*", ".*"));
  });

  if (!day) {
    throw new ConfigurationError("Please provide a day");
  }

  if (!years.includes(year)) {
    throw new ConfigurationError(`Year ${year} not found`);
  }

  const title = `Running ${year}, day ${day}`;

  console.log("");
  console.log(chalk.bold(title));
  console.log(chalk.bold("~".repeat(title.length)));
  console.log();

  const puzzlePath = `${year}/day${day}`;

  if (!fs.existsSync(`${rootPath}/${puzzlePath}/puzzle.js`)) {
    throw new ConfigurationError(`File \`${puzzlePath}/puzzle.js\` not found`);
  }
  if (!fs.existsSync(`${rootPath}/${puzzlePath}/input.txt`)) {
    throw new ConfigurationError(`File \`${puzzlePath}/input.txt\` not found`);
  }

  const {
    part1,
    part2,
    processInput = (input) => input,
  } = require(`${rootPath}/${puzzlePath}/puzzle.js`);

  if (part1 === null) {
    throw new ConfigurationError("You must export a `part1` function");
  } else if (!isFunction(part1)) {
    throw new ConfigurationError("`part1` must be a function");
  }
  if (part2 === null) {
    throw new ConfigurationError("You must export a `part2` function");
  } else if (!isFunction(part2)) {
    throw new ConfigurationError("`part2` must be a function");
  }

  let hasExamples = false;

  fs.readdirSync(`${rootPath}/${puzzlePath}`).forEach((file) => {
    const match = /^(example.*?)-part(\d)-(\d+)\.txt$/.exec(file);

    if (match) {
      const [, name] = match;

      if (tag && !tag.test(name)) return;

      const partNumber = Number(match[2]);
      const expected = Number(match[3]);
      const input = processInput(
        fs.readFileSync(`${rootPath}/${puzzlePath}/${file}`).toString().trim()
      );

      const result = partNumber === 1 ? part1(input) : part2(input);

      let message = upperFirst(`${name}: `);

      if (result === expected) {
        message = `${chalk.greenBright("✔")} ${message}`;
        message += `${result}`;
      } else {
        message = `${chalk.redBright("✘")} ${message}`;
        message += `${result} (expected: ${expected})`;
      }

      console.log(`${message} ${chalk.grey(`(part ${partNumber})`)}`);

      hasExamples = true;
    }
  });

  if (hasExamples) {
    console.log();
    console.log();
  }

  const getInput = () =>
    processInput(
      fs.readFileSync(`${rootPath}/${puzzlePath}/input.txt`).toString().trim()
    );

  if (!tag || tag.test("part1")) {
    run(part1, getInput(), 1);
  }
  if (!tag || tag.test("part2")) {
    run(part2, getInput(), 2);
  }
} catch (err) {
  if (err instanceof ConfigurationError) {
    console.log(chalk.red(err.message));
  } else {
    throw err;
  }
}

console.log("");
