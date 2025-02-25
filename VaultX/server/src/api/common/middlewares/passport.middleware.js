import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

import {User, Wallet} from '../models/index.js';
import {ApiError} from '../utils/index.js';

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser(async (id, next) => {
  try {
    const user = await User.findById(id);
    if (user) {
      next(null, user);
    } else {
      next(new ApiError(404, 'User does not exist'), null);
    }
  } catch (error) {
    next(new ApiError(500, `Error while deserializing user: ${error}`), null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, next) => {
      try {
        const user = await User.findOne({email: profile._json.email});
        if (user) {
          if (user.signInType !== 'Google') {
            const signInType = user.signInType.split('-').join(' ');

            return next(
              new ApiError(
                400,
                `You have registered using ${signInType}. Please use ${signInType} as the signin option.`
              ),
              null
            );
          } else {
            return next(null, user);
          }
        }

        const newUser = await User.create({
          name: profile._json.name,
          email: profile._json.email,
          password: profile._json.sub,
          avatar: profile._json.picture,
          signInType: 'Google',
        });

        await Wallet.create({
          userId: newUser._id,
          balance: Math.random() * 999 + 1,
        });

        if (newUser) return next(null, newUser);
        else
          return next(
            new ApiError(500, 'Error while registering the user'),
            null
          );
      } catch (error) {
        return next(
          new ApiError(500, `Error during Google authentication: ${error}`),
          null
        );
      }
    }
  )
);

export {passport};
