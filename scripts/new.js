#!/usr/bin/env node
const fs = require("fs");
const { exec } = require("child_process");
const mkdirp = require("mkdirp");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const isYear = require("../utils/isYear");

const now = new Date();

let defaultYear;
if (now.getMonth() < 11) {
  defaultYear = now.getFullYear() - 1;
} else {
  defaultYear = now.getFullYear();
}

let defaultDay;
if (now.getMonth() === 11 && now.getDate() < 26) {
  defaultDay = now.getDate();
} else {
  defaultDay = undefined;
}

let command = "$0";
if (!defaultDay) {
  command += " <day>";
} else {
  command += " [day]";
}
command += " [year]";

const {
  argv: { year, day },
} = yargs(hideBin(process.argv))
  .command(command, "Create a new day", (config) => {
    config

      .positional("day", {
        type: "number",
        describe: "Specify the day",
        default: defaultDay,
        demandOption: true,
        coerce: (arg) => {
          if (arg > 25) {
            throw new Error("Day cannot upper than 25");
          }

          return arg;
        },
      })
      .positional("year", {
        type: "number",
        describe: "Specify the year",
        default: defaultYear,
        coerce: (arg) => {
          if (!isYear(arg)) {
            throw new Error("Bad year format");
          }

          return arg;
        },
      });
  })
  .strictCommands();

(async function main() {
  const rootPath = `${__dirname}/..`;
  const puzzlePath = `${rootPath}/${year}/day${day}`;

  await mkdirp(puzzlePath);

  const files = [
    [`${puzzlePath}/puzzle.js`, "module.exports = [];\n"],
    [`${puzzlePath}/input.txt`, ""],
  ];

  files.forEach(([path, content]) => {
    if (!fs.existsSync(`${path}`)) {
      fs.writeFileSync(path, content);
    }
    exec(`code ${path}`);
  });
})();
