const fs = require("fs");

const saveTransaction = function(newTransaction, path, fileSys) {
  let beverageTransactions = { table: [] };
  if (!fileSys.existFile(path) || fileSys.readFile(path, "utf8") == "") {
    fileSys.writeFile(path, JSON.stringify(beverageTransactions), "utf8");
  }
  beverageTransactions = JSON.parse(fileSys.readFile(path, "utf8"));
  beverageTransactions.table.push(newTransaction);
  fileSys.writeFile(path, JSON.stringify(beverageTransactions), "utf8");
};

const saveBeverageTransaction = function(usage, args, path, fileSys, date) {
  if (args.includes(undefined)) {
    return usage;
  }
  const newTransaction = {
    employeeId: +args[0],
    beverage: args[1],
    quantity: +args[2],
    date: date()
  };
  const values = [
    newTransaction.employeeId,
    newTransaction.beverage,
    newTransaction.quantity,
    newTransaction.date
  ];
  saveTransaction(newTransaction, path, fileSys);
  return values;
};

exports.saveBeverageTransaction = saveBeverageTransaction;
exports.saveTransaction = saveTransaction;
