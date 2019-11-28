const fs = require("fs");

const getTransactionsOnEmpId = function(empId) {
  return function(transaction) {
    return transaction.employeeId == +empId;
  };
};

const getTransactionsOnBeverage = function(beverage) {
  return function(transaction) {
    return transaction.beverage == beverage;
  };
};

const getTransactionsOnDate = function(date) {
  return function(transaction) {
    return transaction.date.slice(0, 10) == date;
  };
};

const queryTransaction = function(beverageTransactions, args) {
  let oldTransactions = beverageTransactions.table;
  let isEmpIdDefined =
    args[0] && oldTransactions.filter(getTransactionsOnEmpId(args[0]));
  oldTransactions = isEmpIdDefined || oldTransactions;

  let isBeverageDefined =
    args[1] && oldTransactions.filter(getTransactionsOnBeverage(args[1]));
  oldTransactions = isBeverageDefined || oldTransactions;

  let isDateDefined =
    args[2] && oldTransactions.filter(getTransactionsOnDate(args[2]));
  return oldTransactions;
};

const queryBeverageTransaction = function(usage, args, path, fileSys) {
  if (!fileSys.existFile(path)) {
    return "file not exists";
  }
  let beverageTransactions = JSON.parse(
    fileSys.readFile(path, "utf8") || '{ "table": [] }'
  );
  let oldTransactions = queryTransaction(beverageTransactions, args);
  return oldTransactions;
};

exports.queryBeverageTransaction = queryBeverageTransaction;
