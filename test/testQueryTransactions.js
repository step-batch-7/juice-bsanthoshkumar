const queryBeverageTransaction = require("../src/queryTransactons")
  .queryBeverageTransaction;
const assert = require("assert");
const fs = require("fs");

let usage = "usage:\n\tnode ./beverage.js --query --empId employee Id\n\t";
usage =
  usage +
  "node ./beverage.js --save --beverage beverageName --empId employeeId --qty quantity";

describe("queryBeverageTransactions", function() {
  it("should return employee past beverage details based on employee Id", function() {
    const path = "./beverageTransactions.json";
    const args = ["10000", ,];
    let expected = [
      {
        beverage: "Apple",
        date: "2019-11-25T11:56:10.024Z",
        employeeId: 10000,
        quantity: 3
      }
    ];
    const readFile = function(path, typeOfFile) {
      return '{"table":[{"employeeId":10000,"beverage":"Apple","quantity":3,"date":"2019-11-25T11:56:10.024Z"},{"employeeId":11111,"beverage":"Apple","quantity":1,"date":"2019-11-26T06:29:59.482Z"}]}';
    };
    const existFile = function(path) {
      return true;
    };
    const fileSys = {
      readFile: readFile,
      existFile: existFile
    };

    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, fileSys),
      expected
    );
  });
  it("should return employee past beverage details based on beverage", function() {
    const path = "./beverageTransactions.json";
    const args = [, "Apple"];
    let expected = [
      {
        beverage: "Apple",
        date: "2019-11-25T11:56:10.024Z",
        employeeId: 10000,
        quantity: 3
      },
      {
        beverage: "Apple",
        date: "2019-11-26T06:29:59.482Z",
        employeeId: 11111,
        quantity: 1
      }
    ];
    const readFile = function(path, typeOfFile) {
      return '{"table":[{"employeeId":10000,"beverage":"Apple","quantity":3,"date":"2019-11-25T11:56:10.024Z"},{"employeeId":11111,"beverage":"Apple","quantity":1,"date":"2019-11-26T06:29:59.482Z"}]}';
    };
    const existFile = function(path) {
      return true;
    };
    const fileSys = {
      readFile: readFile,
      existFile: existFile
    };

    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, fileSys),
      expected
    );
  });

  it("should return employee past beverage details based on date", function() {
    const path = "./beverageTransactions.json";
    const args = [, , "2019-11-25"];
    let expected = [
      {
        beverage: "Apple",
        date: "2019-11-25T11:56:10.024Z",
        employeeId: 10000,
        quantity: 3
      }
    ];
    const readFile = function(path, typeOfFile) {
      return '{"table":[{"employeeId":10000,"beverage":"Apple","quantity":3,"date":"2019-11-25T11:56:10.024Z"},{"employeeId":11111,"beverage":"Apple","quantity":1,"date":"2019-11-26T06:29:59.482Z"}]}';
    };
    const existFile = function(path) {
      return true;
    };
    const fileSys = {
      readFile: readFile,
      existFile: existFile
    };

    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, fileSys),
      expected
    );
  });
  it("should return file not exists message for non existing file", function() {
    const path = "./beverageTransactions.json";
    const args = ["10000", ,];
    let expected = [];
    const readFile = function(path, typeOfFile) {
      throw "file not exists";
    };
    const existFile = function(path) {
      return false;
    };
    const fileSys = {
      readFile: readFile,
      existFile: existFile
    };
    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, fileSys),
      expected
    );
  });

  it("should return 0 juices for non existing employee details", function() {
    const path = "./beverageTransactions.json";
    const args = ["10000", ,];
    let expected = [];
    const readFile = function(path, typeOfFile) {
      return "";
    };
    const existFile = function(path) {
      return true;
    };
    const fileSys = {
      readFile: readFile,
      existFile: existFile
    };
    assert.deepStrictEqual(
      queryBeverageTransaction(usage, args, path, fileSys),
      expected
    );
  });
});
