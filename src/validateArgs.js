const isNumber = function(text) {
  return Number.isInteger(+text);
};

const validateSaveArgs = function(args) {
  if (args[0] == "--qty" || args[0] == "--empId") {
    return isNumber(args[1]);
  }
  if (args[0] == "--beverage") {
    return !isNumber(args[1]);
  }
  return false;
};

const validateQueryArgs = function(args) {
  return args[0] == "--empId" && isNumber(+args[1]);
};

exports.validateSaveArgs = validateSaveArgs;
exports.validateQueryArgs = validateQueryArgs;
exports.isNumber = isNumber;
