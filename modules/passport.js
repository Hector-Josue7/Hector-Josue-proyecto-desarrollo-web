const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/user'); 

passport.use(new LocalStrategy({
  usernameField: 'correo'
}, async (correo, pass, done) => {
  // Match Email's User
  const user = await User.findOne({correo: correo});
  if (!user) {
    return done(null, false, { message: 'Not User found.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(pass);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
  //done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


