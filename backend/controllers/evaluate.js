const { generateFile, executeCode } = require('../executeCpp');
const { getTestCases } = require('../getTC');

const evaluateCode = async (req, res) => {
  const { language, code, input } = req.body;
  const pID = req.query.pid; 

  try {
    const filePath = await generateFile(language, code);
    const testCases = await getTestCases(pID);

    let isAccepted = true;
    for (const testCase of testCases) {
      const output = await executeCode(filePath, testCase.input);
      if (output.trim() !== testCase.output.trim()) {
        isAccepted = false;
        break;
      }
    }

    res.status(200).json({ output, result: isAccepted ? 'accepted' : 'not accepted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { evaluateCode };