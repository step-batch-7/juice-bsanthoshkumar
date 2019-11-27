const isNumber = function(text) {
  return Number.isInteger(+text);
};

const validateSaveArgs = function(args) {
  if (args[0] == "--qty" || args[0] == "--empId") {
    return isNumber(args[1]) && +args[1] > 0;
  }
  if (args[0] == "--beverage") {
    return !isNumber(args[1]);
  }
  return false;
};

const validateQueryArgs = function(args) {
  return args[0] == "--empId" && isNumber(+args[1]);
};

const pairArgs = function(args) {
  let pairs = [];
  for (let index = 0; index < args.length; index += 2) {
    pairs.push([args[index], args[index + 1]]);
  }
  return pairs;
};

const getOptionValues = function(optionValues, optionPair) {
  const index = { "--empId": 0, "--beverage": 1, "--qty": 2 };
  const option = optionPair[0];
  let value = optionPair[1];
  optionValues[index[option]] = value;
  return optionValues;
};

const getValidArgs = function(args) {
  let argumentPairs = [];
  let options = { "--save": validateSaveArgs, "--query": validateQueryArgs };
  argumentPairs = pairArgs(args.slice(1));
  if (argumentPairs.every(options[args[0]])) {
    return argumentPairs.reduce(getOptionValues, []);
  }
  return false;
};

exports.validateSaveArgs = validateSaveArgs;
exports.validateQueryArgs = validateQueryArgs;
exports.isNumber = isNumber;
exports.pairArgs = pairArgs;
exports.getOptionValues = getOptionValues;
exports.getValidArgs = getValidArgs;
