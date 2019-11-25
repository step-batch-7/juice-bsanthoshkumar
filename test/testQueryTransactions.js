const queryBeverageTransaction = require("../src/queryTransactons")
  .queryBeverageTransaction;
const assert = require("assert");
const fs = require("fs");

describe("queryBeverageTransactions", function() {
  it("should return employee past beverage details", function() {
    const path = "./beverageTransactions.json";
    const args = ["--empId", "10000"];
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    expected =
      expected + "10000,Apple,1,2019-11-25T11:56:10.024Z\nTotal:1 juices";
    const readFile = function(path, typeOfFile) {
      return fs.readFileSync(path, typeOfFile);
    };

    const existFile = function(path) {
      return fs.existsSync(path);
    };

    assert.strictEqual(
      queryBeverageTransaction(args, path, readFile, existFile),
      expected
    );
  });
});
