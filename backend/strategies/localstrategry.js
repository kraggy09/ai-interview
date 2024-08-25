import passport from "passport";
import { Strategy } from "passport-local";
import User from "../model/User.js";

// Serialize user into the session
passport.serializeUser((user, done) => {
  console.log("Serializing User");
  console.log(user._id);

  done(null, user); // Store the entire user object or just the ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (user, done) => {
  console.log("Deserializing User");
  console.log(user);

  try {
    const foundUser = await User.findById(user._id); // Retrieve user from database using the ID
    if (!foundUser) {
      return done(new Error("User not found")); // Handle user not found scenario
    }
    done(null, foundUser); // Pass user object to req.user
  } catch (error) {
    done(error); // Handle errors
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    console.log(`Username: ${username}`);
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        throw new Error("User not found");
      }
      if (!(await user.comparePassword(password))) {
        throw new Error("Bad credentials");
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
