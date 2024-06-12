const { modelQ } = require('./models/questions');
const { modelTC } = require('./models/testcases');

const fetchProblemStatement = async (pid) => {
  try {
    const question = await modelQ.findOne({ pid: pid });
    console.log(pid);
    return question ? question.statement : null;
  } catch (error) {
    console.error('Error fetching problem statement:', error);
    throw error;
  }
};

const fetchTestCases = async (pid) => {
  try {
    const testCases = await modelTC.find({ pid: pid });
    return testCases.map((testCase, index) => ({
      id: index + 1,
      input: Array.isArray(testCase.input) ? testCase.input.join('\n') : testCase.input,
      expectedOutput: Array.isArray(testCase.output) ? testCase.output.join('\n') : testCase.output,
    }));
  } catch (error) {
    console.error('Error fetching test cases:', error);
    throw error;
  }
};
module.exports = {
  fetchProblemStatement,
  fetchTestCases,
};