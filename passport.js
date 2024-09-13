const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('./db');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await pool.query(query, [jwtPayload.id]);

      if (rows.length === 0) {
        return done(null, false);
      }

      const user = rows[0];
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;