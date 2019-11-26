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

exports.validateSaveArgs = validateSaveArgs;
exports.validateQueryArgs = validateQueryArgs;
exports.isNumber = isNumber;
exports.pairArgs = pairArgs;
