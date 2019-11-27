const isNumber = require("../src/validateArgs").isNumber;
const validateSaveArgs = require("../src/validateArgs").validateSaveArgs;
const validateQueryArgs = require("../src/validateArgs").validateQueryArgs;
const pairArgs = require("../src/validateArgs").pairArgs;
const getOptionValues = require("../src/validateArgs").getOptionValues;
const getValidArgs = require("../src/validateArgs").getValidArgs;
const assert = require("assert");

describe("isNumber", function() {
  it("should return true for integers", function() {
    assert.strictEqual(isNumber(10), true);
  });
  it("should return false for strings", function() {
    assert.strictEqual(isNumber("a"), false);
  });
});

describe("validateSaveArgs", function() {
  it("should return true for valid quantity args", function() {
    assert.strictEqual(validateSaveArgs(["--qty", 2]), true);
  });
  it("should return true for valid employee Id args", function() {
    assert.strictEqual(validateSaveArgs(["--empId", 12345]), true);
  });
  it("should return true for valid beverage args", function() {
    assert.strictEqual(validateSaveArgs(["--beverage", "Orange"]), true);
  });
  it("should return false for invalid quantity args", function() {
    assert.strictEqual(validateSaveArgs(["--qty", "a"]), false);
  });
  it("should return false for invalid employee Id args", function() {
    assert.strictEqual(validateSaveArgs(["--empId", "a1234"]), false);
  });
  it("should return false for invalid beverage args", function() {
    assert.strictEqual(validateSaveArgs(["--beverage", 10]), false);
  });
  it("should return false invalid args", function() {
    assert.strictEqual(validateSaveArgs(["--add", "Apple"]), false);
  });
});

describe("validateQueryArgs", function() {
  it("should return true for valid employee Id args", function() {
    assert.strictEqual(validateQueryArgs(["--empId", 12345]), true);
  });
  it("should return false for invalid employee Id args", function() {
    assert.strictEqual(validateQueryArgs(["--empId", "a1234"]), false);
  });
});

describe("pairArgs", function() {
  it("should return pairs of given args", function() {
    const args = ["--beverage", "Orange", "--empId", "12345", "--qty", "1"];
    const expected = [
      ["--beverage", "Orange"],
      ["--empId", "12345"],
      ["--qty", "1"]
    ];
    assert.deepStrictEqual(pairArgs(args), expected);
  });
});

describe("getOptionValues", function() {
  it("should return only values of every option", function() {
    const args = [
      ["--beverage", "Orange"],
      ["--empId", "12345"],
      ["--qty", "1"]
    ];
    const expected = ["12345", "Orange", "1"];
    assert.deepStrictEqual(args.reduce(getOptionValues, []), expected);
  });
});

describe("getValidArgs", function() {
  it("should return valid values for given save args", function() {
    const args = [
      "--save",
      "--beverage",
      "Orange",
      "--empId",
      "12345",
      "--qty",
      "1"
    ];
    const expected = ["12345", "Orange", "1"];
    assert.deepStrictEqual(getValidArgs(args), expected);
  });

  it("should return valid values for given query args", function() {
    const args = ["--query", "--empId", "12345"];
    const expected = ["12345"];
    assert.deepStrictEqual(getValidArgs(args), expected);
  });

  it("should return false for invalid args", function() {
    const args = ["--beverage", "Orange", "--empId", "12345", "--qty", "1"];
    assert.strictEqual(getValidArgs(args), false);
  });
});
