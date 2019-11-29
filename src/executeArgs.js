const getValidArgs = require("./validateArgs.js").getValidArgs;
const saveBeverageTransaction = require("./saveTransactions")
  .saveBeverageTransaction;
const queryBeverageTransaction = require("./queryTransactons")
  .queryBeverageTransaction;

const usage = function() {
  let usage =
    "usage:\n\tnode ./beverage.js --query --empId employee Id --date date --beverage beveragename\n\t";
  usage =
    usage +
    "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";
  return usage;
};

const executeArgs = function(args, path, fileSys, date) {
  const option = args[0];
  const features = {
    "--save": { operation: saveBeverageTransaction, msg: getSavePattern },
    "--query": { operation: queryBeverageTransaction, msg: getQueryPattern },
    false: { operation: usage, msg: usage }
  };
  const validArgs =
    ["--save", "--query"].includes(option) && getValidArgs(args);
  const isValid = validArgs && true;
  const result = features[isValid && option]["operation"](
    usage,
    validArgs,
    path,
    fileSys,
    date
  );
  return features[isValid && option]["msg"](result);
};

const getSavePattern = function(values) {
  const keys = ["Employee ID", "Beverage", "Quantity", "Date"];
  return `Transaction Recorded:\n${keys}\n${values}`;
};

const totalJuicesCount = function(juicesCount, transaction) {
  juicesCount += transaction["quantity"];
  return juicesCount;
};

const getValues = function(transaction) {
  return [
    transaction.employeeId,
    transaction.beverage,
    transaction.quantity,
    transaction.date
  ].join(",");
};

const getQueryPattern = function(oldTransactions) {
  const keys = ["Employee ID", "Beverage", "Quantity", "Date"];
  let juices = oldTransactions.reduce(totalJuicesCount, 0);
  oldTransactions = oldTransactions.map(getValues);
  juices = "Total:" + juices + " juices";
  return `${keys}\n${oldTransactions.join("\n")}\n${juices}`;
};

exports.executeArgs = executeArgs;
