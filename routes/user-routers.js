const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('/signup');
});

/*router.get("/", middlewares.paginaInicio, function (req, res) {
  res.render('index');
});
 */


router.post('/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
  }
  if(errors.length > 0){
    res.render('/signup', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.');
      res.redirect('/signup');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/signin');
    }
  }
});

router.get('/signin', (req, res) => {
  res.render('/signin');
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/signin');
});

module.exports = router;
