const fs = require("fs");

const saveTransaction = function(
  newTransaction,
  path,
  readFile,
  existFile,
  writeFile
) {
  let beverageTransactions = { table: [] };
  if (!existFile(path) || readFile(path, "utf8") == "") {
    writeFile(path, JSON.stringify(beverageTransactions), "utf8");
  }
  beverageTransactions = JSON.parse(readFile(path, "utf8"));
  beverageTransactions.table.push(newTransaction);
  writeFile(path, JSON.stringify(beverageTransactions), "utf8");
};

const saveBeverageTransaction = function(
  usage,
  args,
  path,
  readFile,
  existFile,
  writeFile,
  date
) {
  if (args.length != 3) {
    return usage;
  }
  const newTransaction = {
    "Employee ID": +args[0],
    Beverage: args[1],
    Quantity: +args[2],
    Date: date()
  };
  const keys = Object.keys(newTransaction);
  const values = Object.values(newTransaction);
  const result = "Transaction Recorded \n" + keys + "\n" + values;
  saveTransaction(newTransaction, path, readFile, existFile, writeFile);
  return result;
};

exports.saveBeverageTransaction = saveBeverageTransaction;
exports.saveTransaction = saveTransaction;
