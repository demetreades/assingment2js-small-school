const isValidCharacters = (value, text) => {
  const validCharacters = /^[Α-Ωα-ωA-Za-z]+$/;
  if (!value.match(validCharacters)) {
    throw new Error(`Invalid characters: ${value} inserted into ${text}`);
  }
};

const isEmpty = (value, text) => {
  if (value === '' || value === undefined || value === null) {
    throw new Error(`Invalid ${text} value: ${value} cannot be empty`);
  }
};

const isNumber = (value, text) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    // typeof value !== 'number';
    throw new Error(`Invalid ${text} value: ${value} not a number`);
  }
};

const isString = (value, text) => {
  if (typeof value !== 'string') {
    throw new Error(`Invalid ${text} value: ${value} not a string`);
  }
};

const isInRange = (value, min, max, text) => {
  if (min !== null && value < min) {
    throw new Error(
      `Invalid ${text} value of ${value} precedes minimum range of ${min}`
    );
  }

  if (max !== null && value > max) {
    throw new Error(
      `Invalid ${text} value of ${value} exceeds maximum range of ${max}`
    );
  }
};

module.exports = {
  isValidCharacters,
  isNumber,
  isString,
  isInRange,
  isEmpty,
};
