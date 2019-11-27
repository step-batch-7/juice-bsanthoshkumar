const getValidArgs = require("./validateArgs.js").getValidArgs;
const saveBeverageTransaction = require("./saveTransactions")
  .saveBeverageTransaction;
const queryBeverageTransaction = require("./queryTransactons")
  .queryBeverageTransaction;

let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

const executeArgs = function(args, path, readFile, existFile, writeFile, date) {
  const features = {
    "--save": saveBeverageTransaction,
    "--query": queryBeverageTransaction
  };
  const validArgs = getValidArgs(args);
  if (validArgs) {
    return features[args[0]](
      usage,
      validArgs,
      path,
      readFile,
      existFile,
      writeFile,
      date
    );
  }
  return usage;
};

exports.executeArgs = executeArgs;
