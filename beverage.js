const fs = require("fs");
const executeArgs = require("./src/executeArgs.js").executeArgs;
const { timeStamp, getDataStorePath } = require("./src/config");

const date = function() {
  return new Date();
};

const main = function(args) {
  const path = getDataStorePath(process.env);
  const fileSys = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existFile: fs.existsSync
  };
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  console.log(executeArgs(args.slice(2), path, fileSys, timeStampWithEnv));
};

main(process.argv);

exports.date = date;
