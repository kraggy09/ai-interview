import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../model/User.js";

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    }, 
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user doesn't exist, create a new user
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
        }

        return done(null, user._id);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// No need to reimplement serializeUser and deserializeUser,
// since they are already set up in your `localStrategy.js`
