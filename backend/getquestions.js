const { modelQ } = require('./models/questions');

const fetchProblemStatement = async (pid) => {
  try {
    const question = await modelQ.findOne({pid:pid}); 
    console.log(pid);
    return question ? question.statement : null;
  } catch (error) {
    console.error('Error fetching problem statement:', error);
    throw error;
  }
};

module.exports = {
  fetchProblemStatement,
};
