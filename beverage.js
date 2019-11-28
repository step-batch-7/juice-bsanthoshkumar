const fs = require("fs");
const executeArgs = require("./src/executeArgs.js").executeArgs;

const date = function() {
  return new Date();
};

const main = function(args) {
  const path = "./beverageTransactions.json";
  const fileSys = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existFile: fs.existsSync
  };
  console.log(executeArgs(args.slice(2), path, fileSys, date));
};

main(process.argv);

exports.date = date;
