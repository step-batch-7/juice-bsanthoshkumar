const isNumber = require("../src/validateArgs").isNumber;
const validateSaveArgs = require("../src/validateArgs").validateSaveArgs;
const validateQueryArgs = require("../src/validateArgs").validateQueryArgs;
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
});

describe("validateQueryArgs", function() {
  it("should return true for valid employee Id args", function() {
    assert.strictEqual(validateQueryArgs(["--empId", 12345]), true);
  });
  it("should return false for invalid employee Id args", function() {
    assert.strictEqual(validateQueryArgs(["--empId", "a1234"]), false);
  });
});
