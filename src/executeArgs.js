const validateSaveArgs = require("./validateArgs.js").validateSaveArgs;
const validateQueryArgs = require("./validateArgs.js").validateQueryArgs;
const pairArgs = require("../src/validateArgs").pairArgs;
const saveBeverageTransaction = require("./saveTransactions")
  .saveBeverageTransaction;
const queryBeverageTransaction = require("./queryTransactons")
  .queryBeverageTransaction;

let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

const executeArgs = function(args, path, readFile, existFile, writeFile, date) {
  const operation = args[0];
  const features = {
    "--save": { "--save": validateSaveArgs, true: saveBeverageTransaction },
    "--query": { "--query": validateQueryArgs, true: queryBeverageTransaction }
  };
  if (Object.keys(features).includes(operation)) {
    const pairedArgs = pairArgs(args.slice(1));
    if (pairedArgs.every(features[operation][operation])) {
      return features[operation][true](
        usage,
        args.slice(1),
        path,
        readFile,
        existFile,
        writeFile,
        date
      );
    }
  }
  return usage;
};

exports.executeArgs = executeArgs;
module.exports.usage = usage;
