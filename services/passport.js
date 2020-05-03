const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// Create a user model object based on the
// profile returned by Passport.js
const createUserModel = (profile, idType) => {
    var user = new User({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        facebookId: null
    });

    switch (idType) {
        case "googleId":
            user.googleId = profile.id;
            break;
        case "facebookId":
            user.facebookId = profile.id;
            break;
        default:
            break;
    }

    if (profile.photos.length) {
        user.pic = profile.photos[0].value;
    }
    return user
}

// Serialize User into Cookie Session
passport.serializeUser((user, done) => {
    done(null, user.id); // .id refers to the automatically generated id by mongoDB
});

passport.deserializeUser((id, done) => { // id is the token
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Facebook Strategy
passport.use(
    new FacebookStrategy({
        clientID: keys.facebookAppID,
        clientSecret: keys.facebookAppSecret,
        callbackURL: "/auth/facebook/callback/",
        profileFields: ['id', 'name', 'email', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
        for (var index = 0; index < profile.emails.length; index++) {
            const existingUser = await User.findOne({ email: profile.emails[index].value });

            if (existingUser) {
                // already have a record with given profile id
                // done function: done (ERROR, Mongoose Instance)
                if (!existingUser.facebookId) {
                    existingUser.facebookId = profile.id;
                    existingUser.save();
                }
                return done(null, existingUser);
            }
        }

        const user = createUserModel(profile, "facebookId").save();
        done(null, user);
    }
));

// GoogleStrategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback/",
        profileFields: ['id', 'name', 'email', 'photos']
        },
        async (accessToken, refreshToken, profile, done) => {
            for (var index = 0; index < profile.emails.length; index++) {
                const existingUser = await User.findOne({ email: profile.emails[index].value });

                if (existingUser) {
                    // already have a record with given profile id
                    // done function: done (ERROR, Mongoose Instance)
                    if (!existingUser.googleId) {
                        existingUser.googleId = profile.id;
                        existingUser.save();
                    }
                    return done(null, existingUser);
                }
            }
            const user = createUserModel(profile, "googleId").save(); // a mongoose instance gets returned after saving (then passed in to user)
            done(null, user);
        }
));