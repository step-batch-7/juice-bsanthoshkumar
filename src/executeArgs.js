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
    "--save": [saveBeverageTransaction, getSavePattern],
    "--query": [queryBeverageTransaction, getQueryPattern],
    false: [usage, usage]
  };
  const validArgs =
    ["--save", "--query"].includes(option) && getValidArgs(args);
  const isValid = validArgs && option;
  const result = features[isValid][0](usage, validArgs, path, fileSys, date);
  const isUsage = result == usage && result();
  return isUsage || features[isValid][1](result);
};

const getSavePattern = function(values) {
  const keys = ["Employee ID", "Beverage", "Quantity", "Date"];
  values[3] = values[3].toJSON();
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
  const keys = ["Employee ID", " Beverage", " Quantity", " Date"];
  let juices = oldTransactions.reduce(totalJuicesCount, 0);
  oldTransactions = oldTransactions.map(getValues);
  juiceCountSuffix = juices == 1 ? "Juice" : "Juices";
  juices = `Total: ${juices} ${juiceCountSuffix}`;
  return `${keys}\n${oldTransactions.join("\n")}\n${juices}`;
};

exports.executeArgs = executeArgs;
