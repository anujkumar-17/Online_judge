const fs = require('fs');
const path = require('path');

const testcasesDir = path.join(__dirname, './testcases');

if (!fs.existsSync(testcasesDir)) {
  fs.mkdirSync(testcasesDir, { recursive: true });
}

const saveTestCase = async (testCase) => {
  const testCasePath = path.join(testcasesDir, `${testCase.id}.json`);
  await fs.promises.writeFile(testCasePath, JSON.stringify(testCase));
};

module.exports = {
  saveTestCase,
};
