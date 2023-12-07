const User = require("../models/users.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email });
  const registerdUser = await User.register(newUser, password);
  req.logIn(registerdUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Registered");
    return res.redirect("/listings");
  });
};

// module.exports.renderLoginForm = (req, res) => {
//   // res.render("users/login.ejs");
//   res.redirect("/listings");
// };

module.exports.login = (req, res) => {
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out");
    res.redirect("/listings");
  });
};
