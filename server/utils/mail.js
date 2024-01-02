const generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomPassword = function () {
  return Math.random().toString(36).slice(2);
};

module.exports = { generateRandomNumber, generateRandomPassword };
