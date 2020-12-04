const passwords = require("./data.json");

console.log(
  passwords.reduce((acc, curr) => {
    const [min, max, char, password] = curr;
    const reg = new RegExp(char, "g");
    const matches = password.match(reg) || [];

    if (matches.length >= min && matches.length <= max) {
      return acc + 1;
    }

    return acc;
  }, 0)
);
