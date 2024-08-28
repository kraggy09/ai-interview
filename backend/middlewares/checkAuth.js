const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      msg: "You are not authenticated! Please relogin.",
    });
  }
  next();
};

export { checkAuth };
