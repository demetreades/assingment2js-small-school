function charTypeChecker (value, text) {
  const validCharacters = /^[Α-Ωα-ωA-Za-z]+$/;
  if(!value.match(validCharacters)) {
    throw new Error(`Invalid characters "${value}" inserted into ${text}`);
  }
};

function numTypeChecker(value, text) {
  if(isNaN(value)) {
    throw new Error(`Invalid ${text} value of ${value} not a number`);
  }
};
  
function rangeChecker(value, min, max, text) {
  if (min !== null && value < min) {
    throw new Error(`Invalid ${text} value of ${value} precedes minimum range of ${min}`);
  }
  
  if (max !== null && value > max) {
    throw new Error(`Invalid ${text} value of ${value} exceeds maximum range of ${max}`);
  }
};


module.exports = { 
  charTypeChecker, 
  numTypeChecker, 
  rangeChecker,
};
