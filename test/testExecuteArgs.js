const executeArgs = require("../src/executeArgs.js").executeArgs;
const assert = require("assert");
const fs = require("fs");

let usage =
  "usage:\n\tnode ./beverage.js --query --empId employee Id --date date --beverage beveragename\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

describe("executeArgs", function() {
  it("should return recorded transaction for save option", function() {
    args = ["--save", "--beverage", "Orange", "--empId", "11111", "--qty", "1"];
    path = "./beverageTransactions.json";
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
    const fileSys = {
      readFile: readFile,
      writeFile: writeFile,
      existFile: existFile
    };
    let result =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,Orange,1,";
    result = result + "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    assert.strictEqual(executeArgs(args, path, fileSys, date), result);
  });

  it("should return past employee beverage details", function() {
    path = "./beverageTransactions.json";
    args = ["--query", "--empId", "10000"];
    let expected = "Employee ID,Beverage,Quantity,Date\n";
    expected =
      expected +
      "10000,Apple,1,2019-11-25T11:56:10.024Z\n10000,Apple,1,2019-11-26T06:29:59.482Z\nTotal:2 juices";
    const readFile = function(path, typeOfFile) {
      return '{"table":[{"employeeId":10000,"beverage":"Apple","quantity":1,"date":"2019-11-25T11:56:10.024Z"},{"employeeId":10000,"beverage":"Apple","quantity":1,"date":"2019-11-26T06:29:59.482Z"}]}';
    };
    const existFile = function(path) {
      return true;
    };

    const writeFile = function(path, writingContents, typeOfFile) {
      return "";
    };

    const date = function() {
      return "Mon Nov 25 2019 15:53:13 GMT+0530 (India Standard Time)";
    };
    const fileSys = {
      readFile: readFile,
      writeFile: writeFile,
      existFile: existFile
    };
    assert.strictEqual(executeArgs(args, path, fileSys, date), expected);
  });

  it("should return usage for invalid args", function() {
    const args = [
      "--save",
      "--beverage",
      "12345",
      "--empId",
      "Orange",
      "--qty",
      "1"
    ];
    assert.strictEqual(executeArgs(args, path), usage);
  });
});
