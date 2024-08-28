import passport from "passport";
import { Strategy } from "passport-local";
import User from "../model/User.js";

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user); // Store the entire user object or just the ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (user, done) => {
  try {
    const foundUser = await User.findById(user).select("-password"); // Retrieve user from database using the ID
    if (!foundUser) {
      return done(new Error("User not found")); // Handle user not found scenario
    }
    done(null, foundUser); // Pass user object to req.user
  } catch (error) {
    done(error); // Handle errors
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (!(await user.comparePassword(password))) {
        return done(null, false, { message: "Bad credentials" });
      }
      return done(null, user._id);
    } catch (error) {
      return done(error);
    }
  })
);
