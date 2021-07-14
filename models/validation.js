function charTypeChecker (value, text) {
  const validCharacters = /^[Α-Ωα-ωA-Za-z]+$/;
  if(!value.match(validCharacters)) {
    throw new Error(`Invalid characters inserted into ${text}`);
  }
};

function charLenghtChecker (value, min, max, text) {
  if(value.length < min || value.length > max) {
    throw new Error(`Invalid ${text} length of ${value.length} needs ${min} to ${max}`);
  }
};

function numberChecker(value, min, max, text) {
  if (!(min === null)) {
    if(value < min) {
      throw new Error(`Invalid ${text} minimum value, ${value} not in range`);
    }
  }
  if (!(max === null)) {
    if(value > max) {
      throw new Error(`Invalid ${text} maximum value, ${value} not in range`);
    }
  }
};

module.exports = { 
  charTypeChecker, 
  charLenghtChecker, 
  numberChecker 
};
