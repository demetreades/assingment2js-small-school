function properCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};


module.exports = { properCase };
