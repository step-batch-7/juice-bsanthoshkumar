const isNumber = function(text) {
  return Number.isInteger(+text) && +text > 0;
};

const validateSaveArgs = function(args) {
  const options = {
    "--qty": isNumber,
    "--empId": isNumber,
    "--beverage": isNaN
  };
  const isKey = ["--qty", "--empId", "--beverage"].includes(args[0]);
  return isKey && options[args[0]](args[1]);
};

const validateQueryArgs = function(args) {
  const options = {
    "--date": function() {
      return true;
    },
    "--empId": isNumber,
    "--beverage": isNaN
  };
  const isKey = ["--date", "--empId", "--beverage"].includes(args[0]);
  return isKey && options[args[0]](args[1]);
};

const pairArgs = function(args) {
  let pairs = [];
  for (let index = 0; index < args.length; index += 2) {
    pairs.push([args[index], args[index + 1]]);
  }
  return pairs;
};

const getSaveValues = function(optionValues, optionPair) {
  const index = { "--empId": 0, "--beverage": 1, "--qty": 2 };
  const option = optionPair[0];
  let value = optionPair[1];
  optionValues[index[option]] = value;
  return optionValues;
};

const getQueryValues = function(optionValues, optionPair) {
  const index = { "--empId": 0, "--beverage": 1, "--date": 2 };
  const option = optionPair[0];
  let value = optionPair[1];
  optionValues[index[option]] = value;
  return optionValues;
};

const getValidArgs = function(args) {
  let argumentPairs = [];
  const option = args[0];
  const features = {
    "--save": [validateSaveArgs, getSaveValues],
    "--query": [validateQueryArgs, getQueryValues]
  };
  const isKey = ["--save", "--query"].includes(option);
  argumentPairs = pairArgs(args.slice(1));
  isValidPairs = isKey && argumentPairs.every(features[option][0]);
  return isValidPairs && argumentPairs.reduce(features[option][1], []);
};

exports.validateSaveArgs = validateSaveArgs;
exports.validateQueryArgs = validateQueryArgs;
exports.isNumber = isNumber;
exports.pairArgs = pairArgs;
exports.getSaveValues = getSaveValues;
exports.getValidArgs = getValidArgs;
exports.getQueryValues = getQueryValues;
