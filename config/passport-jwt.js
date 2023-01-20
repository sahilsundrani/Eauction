import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user.js';

var JwtStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'pMCIQxeJlG5OeIrunZobBxFsDMLsquJK'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

export default passport