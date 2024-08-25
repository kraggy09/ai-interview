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
