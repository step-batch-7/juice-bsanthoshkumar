const saveBeverageTransaction = require("../src/saveTransactions")
  .saveBeverageTransaction;
const assert = require("assert");
const fs = require("fs");

let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

describe("saveBeverageTransactions", function() {
  it("should return transaction recorded message", function() {
    const path = "./beverageTransactions.json";
    const args = ["12345", "Apple", "1"];
    let expected = "Transaction Recorded \nEmployee ID,Beverage,Quantity,Date";
    expected =
      expected +
      "\n12345,Apple,1,Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    const readFile = function(path, typeOfFile) {
      return '{"table" : []}';
    };

    const writeFile = function(path, writingContents, typeOfFile) {
      return "";
    };

    const existFile = function(path) {
      return true;
    };

    const date = function() {
      return "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    };
    assert.strictEqual(
      saveBeverageTransaction(
        usage,
        args,
        path,
        readFile,
        existFile,
        writeFile,
        date
      ),
      expected
    );
  });

  it("should return transaction recorded message for non existing file", function() {
    const path = "./beverageTransactions.json";
    const args = ["12345", "Apple", "1"];
    let expected = "Transaction Recorded \nEmployee ID,Beverage,Quantity,Date";
    expected =
      expected +
      "\n12345,Apple,1,Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    const readFile = function(path, typeOfFile) {
      return '{"table" : []}';
    };

    const writeFile = function(path, writingContents, typeOfFile) {
      return "";
    };

    const existFile = function(path) {
      return false;
    };

    const date = function() {
      return "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    };
    assert.strictEqual(
      saveBeverageTransaction(
        usage,
        args,
        path,
        readFile,
        existFile,
        writeFile,
        date
      ),
      expected
    );
  });

  it("should return usage for invalid args", function() {
    const args = ["Apple", "1"];
    assert.strictEqual(saveBeverageTransaction(usage, args), usage);
  });
});
