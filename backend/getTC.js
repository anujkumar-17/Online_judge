const TestCase = require('./models/testcases');

const getTestCases = async (pid) => {
  const testCases = await TestCase.find({ pid });
  return testCases;
};

module.exports = { getTestCases };