const fs = require("fs");

const saveTransaction = function(
  newTransaction,
  path,
  readFile,
  writeFile,
  existFile
) {
  let beverageTransactions = { table: [] };
  if (!existFile(path)) {
    writeFile(path, JSON.stringify(beverageTransactions), "utf8");
  }
  beverageTransactions = JSON.parse(readFile(path, "utf8"));
  beverageTransactions.table.push(newTransaction);
  writeFile(path, JSON.stringify(beverageTransactions), "utf8");
};

const saveBeverageTransaction = function(
  args,
  path,
  readFile,
  writeFile,
  existFile,
  date
) {
  const newTransaction = {
    "Employee ID": +args[3],
    Beverage: args[1],
    Quantity: +args[5],
    time: date()
  };
  const keys = Object.keys(newTransaction);
  const values = Object.values(newTransaction);
  const result = "Transaction Recorded \n" + keys + "\n" + values;
  saveTransaction(newTransaction, path, readFile, writeFile, existFile);
  return result;
};

exports.saveBeverageTransaction = saveBeverageTransaction;
exports.saveTransaction = saveTransaction;
