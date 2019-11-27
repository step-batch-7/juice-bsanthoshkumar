const queryBeverageTransaction = require("../src/queryTransactons")
  .queryBeverageTransaction;
const assert = require("assert");
const fs = require("fs");

let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

describe("queryBeverageTransactions", function() {
  it("should return employee past beverage details", function() {
    const path = "./beverageTransactions.json";
    const args = ["10000"];
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    expected =
      expected + "10000,Apple,3,2019-11-25T11:56:10.024Z\nTotal:3 juices";
    const readFile = function(path, typeOfFile) {
      return '{"table":[{"Employee ID":10000,"Beverage":"Apple","Quantity":3,"Date":"2019-11-25T11:56:10.024Z"},{"Employee ID":11111,"Beverage":"Apple","Quantity":1,"Date":"2019-11-26T06:29:59.482Z"}]}';
    };
    const existFile = function(path) {
      return true;
    };

    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, readFile, existFile),
      expected
    );
  });
});
