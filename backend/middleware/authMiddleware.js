const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if the request has an 'Authorization' header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // If the 'Authorization' header is missing, return an error
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach the user's email to the request object
    req.email = decoded.email;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an error
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;