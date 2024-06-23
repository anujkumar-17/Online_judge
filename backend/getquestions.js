// const { Question } = require('./models/questions');
// const { modelTC } = require('./models/testcases');

// const fetchProblemStatement = async (pid) => {
//   try {
//     const question = await Question.findOne({ pid: pid });
//     console.log(pid);
//     return question ? question.statement : null;
//   } catch (error) {
//     console.error('Error fetching problem statement:', error);
//     throw error;
//   }
// };

// const fetchTestCases = async (pid) => {
//   try {
//     const testCases = await modelTC.find({ pid: pid });
//     return testCases.map((testCase, index) => ({
//       id: index + 1,
//       input: Array.isArray(testCase.input) ? testCase.input.join('\n') : testCase.input,
//       expectedOutput: Array.isArray(testCase.output) ? testCase.output.join('\n') : testCase.output,
//     }));
//   } catch (error) {
//     console.error('Error fetching test cases:', error);
//     throw error;
//   }
// };
// module.exports = {
//   fetchProblemStatement,
//   fetchTestCases,
// };

const { Question } = require('./models/questions');
const { modelTC } = require('./models/testcases');

const fetchProblemDetails = async (pid) => {
  try {
    const question = await Question.findOne({ pid: pid });
    if (!question) {
      return null;
    }
    return {
      statement: question.statement,
      sampleInput: question.sampleInput,
      sampleOutput: question.sampleOutput,
      tags: question.tags,
      difficulty: question.difficulty,
    };
  } catch (error) {
    console.error('Error fetching problem details:', error);
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
  fetchProblemDetails,
  fetchTestCases,
};
