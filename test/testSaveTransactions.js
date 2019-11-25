const saveBeverageTransaction = require("../src/saveTransactions")
  .saveBeverageTransaction;
const assert = require("assert");
const fs = require("fs");

describe("saveBeverageTransactions", function() {
  it("should return transaction recorded message", function() {
    const path = "./beverageTransactions.json";
    const args = ["--beverage", "Apple", "--empId", "12345", "--qty", "1"];
    let expected = "Transaction Recorded \nEmployee ID,Beverage,Quantity,Date";
    expected =
      expected +
      "\n12345,Apple,1,Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    const readFile = function(path, typeOfFile) {
      return fs.readFileSync(path, typeOfFile);
    };

    const writeFile = function(path, writingContents, typeOfFile) {
      return "";
    };

    const existFile = function(path) {
      return fs.existsSync(path);
    };

    const date = function() {
      return "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    };
    assert.strictEqual(
      saveBeverageTransaction(args, path, readFile, existFile, writeFile, date),
      expected
    );
  });
});
