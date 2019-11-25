const fs = require("fs");
const executeArgs = require("./src/executeArgs.js").executeArgs;

const main = function(args) {
  const path = "./beverageTransactions.json";
  const readFile = fs.readFileSync;
  const writeFile = fs.writeFileSync;
  const existFile = fs.existsSync;
  console.log(
    executeArgs(args.slice(2), path, readFile, existFile, writeFile, date)
  );
};

const date = function() {
  return new Date();
};

main(process.argv);

exports.date = date;
