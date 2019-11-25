const validateSaveArgs = require("./validateArgs.js").validateSaveArgs;
const validateQueryArgs = require("./validateArgs.js").validateQueryArgs;
const saveBeverageTransaction = require("./saveTransactions")
  .saveBeverageTransaction;
const queryBeverageTransaction = require("./queryTransactons")
  .queryBeverageTransaction;

const pairArgs = function(args) {
  let pairs = [];
  for (let index = 0; index < args.length; index += 2) {
    pairs.push([args[index], args[index + 1]]);
  }
  return pairs;
};

const executeArgs = function(args, path, readFile, existFile, writeFile, date) {
  const operation = args[0];
  let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
  usage = usage + "node ./beverage.js --save --beverage beverageName";
  usage = usage + " --empId employeeId --qty quantity";
  const features = {
    "--save": { "--save": validateSaveArgs, true: saveBeverageTransaction },
    "--query": { "--query": validateQueryArgs, true: queryBeverageTransaction }
  };
  if (Object.keys(features).includes(operation)) {
    const pairedArgs = pairArgs(args.slice(1));
    if (pairedArgs.every(features[operation][operation])) {
      return features[operation][true](
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
exports.pairArgs = pairArgs;
