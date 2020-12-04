const passwords = require("./data.json");

const answer = passwords.reduce((acc, curr) => {
  const [index1, index2, char, password] = curr;

  const charAt1 = password[index1 - 1];
  const charAt2 = password[index2 - 1];

  if (charAt1 !== char && charAt2 !== char) {
    return acc;
  }
  if (charAt1 === char && charAt2 === char) {
    return acc;
  }

  return acc + 1;
}, 0);

console.log(answer);
