const fs = require("fs");

const queryTransaction = function(beverageTransactions, empId) {
  let oldTransactions = [];
  let juices = 0;
  for (index = 0; index < beverageTransactions.table.length; index++) {
    if (beverageTransactions["table"][index]["Employee ID"] == empId) {
      juices += beverageTransactions["table"][index]["Quantity"];
      transactionValues = Object.values(beverageTransactions["table"][index]);
      oldTransactions.push(transactionValues);
    }
  }
  juices = "Total:" + juices + " juices";
  return oldTransactions.join("\n") + "\n" + juices;
};

const queryBeverageTransaction = function(
  usage,
  args,
  path,
  readFile,
  existFile
) {
  let keys = ["Employee ID", "Beverage", "Quantity", "Date"];
  if (args.length != 1) {
    return usage;
  }
  if (!existFile(path)) {
    return "file not exists";
  }
  let beverageTransactions = JSON.parse(
    readFile(path, "utf8") || '{ "table": [] }'
  );
  return keys + "\n" + queryTransaction(beverageTransactions, args[0]);
};

exports.queryBeverageTransaction = queryBeverageTransaction;
