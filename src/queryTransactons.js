const fs = require("fs");

const queryTransaction = function(beverageTransactions, empId) {
  let oldTransactions = [];
  let juices = 0;
  for (index = 0; index < beverageTransactions.table.length; index++) {
    if (beverageTransactions["table"][index]["Employee ID"] == empId) {
      juices += beverageTransactions["table"][index]["Quantity"];
      transactionValues = Object.values(beverageTransactions["table"][index]);
      oldTransactions.push("\n" + transactionValues);
    }
  }
  juices = "Total:" + juices + " juices";
  return oldTransactions + "\n" + juices;
};

const queryBeverageTransaction = function(args, path, readFile, existFile) {
  let keys = ["Employee ID", "Beverage", "Quantity", "Date"];
  if (!existFile(path)) {
    return "file not exists";
  }
  let beverageTransactions = JSON.parse(fs.readFileSync(path, "utf8"));
  return keys + queryTransaction(beverageTransactions, args[1]);
};

exports.queryBeverageTransaction = queryBeverageTransaction;
