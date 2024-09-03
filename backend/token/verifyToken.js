import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.body.token; // Extract the token from req.body

    if (!token) {
      return res.status(401).json({
        msg: "No token found, please relogin",
        success: false,
        login: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized, invalid token",
        success: false,
        msg: "Bad Auth",
        login: false,
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      msg: "Error in token verification",
    });
  }
};

// Middleware to verify the token
export const verifyTokenFromQuery = (req, res, next) => {
  try {
    // Get the token from query parameters
    const token = req.query.token;
    // console.log(token, "Token");

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "No token provided",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Unauthorized, invalid token",
        });
      }
      req.userId = decoded.userId; // Attach the decoded userId to the request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};
