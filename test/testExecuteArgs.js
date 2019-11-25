const executeArgs = require("../src/executeArgs.js").executeArgs;
const pairArgs = require("../src/executeArgs").pairArgs;
const assert = require("assert");
const fs = require("fs");

describe("executeArgs", function() {
  it("should return recorded transaction for save option", function() {
    args = ["--save", "--beverage", "Orange", "--empId", "11111", "--qty", "1"];
    path = "./beverageTransactions.json";
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
    let result =
      "Transaction Recorded \nEmployee ID,Beverage,Quantity,Date\n11111,Orange,1,";
    result = result + "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    assert.strictEqual(
      executeArgs(args, path, readFile, existFile, writeFile, date),
      result
    );
  });

  it("should return past employee beverage details", function() {
    path = "./beverageTransactions.json";
    args = ["--query", "--empId", "10000"];
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    expected =
      expected + "10000,Apple,1,2019-11-25T11:56:10.024Z\nTotal:1 juices";
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
      executeArgs(args, path, readFile, existFile, writeFile, date),
      expected
    );
  });
});
