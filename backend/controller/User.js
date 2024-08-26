import User from "../model/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Started the work");

  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      msg: "User already exists! Please login",
      success: false,
    });
  }

  user = await User.create({
    name,
    email,
    password,
  });
  return res.status(200).json({
    msg: "User registered successfully",
    success: true,
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send("Invalid credentials");
  }
};

export const getUser = async (req, res) => {
  console.log("Session Id", req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err, "error");
      return res.status(404).json({ success: false, msg: "Unauthorised" });
    }
    console.log("Inside session store");
    console.log(sessionData);
    if (!sessionData) {
      return res.status(401).json({
        msg: "You are unauthorised",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "You are authorised",
      success: true,
      sessionData,
    });
  });
};
