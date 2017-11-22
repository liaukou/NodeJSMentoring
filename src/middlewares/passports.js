const passport = require('passport');

const { findUser, findUserById } = require('../utils/users');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
    new LocalStrategy({
        session: false
    }, function (username, password, done) {

        const user = findUser(username, password);

        if (!user) {
            done(null, false);
        }

        done(null, user);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: '141487309752227',
        clientSecret: '7e65503abffbd093580198d7895eb495',
        callbackURL: 'http://localhost:8084/passport/facebook/callback',
    }, function(accessToken, refreshToken, profile, done) {

        const user = findUserById(profile.id);

        if (!user) {
            done(null, false);
        }

        done(null, user);
    })
);

module.exports = passport;