function isAuth(req, res, next) {
  if (req.session.isAuth) {
    console.log("id " + req.session.username);
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuth;
