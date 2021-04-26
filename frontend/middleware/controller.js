function isAuth(req, res, next) {
  if (req.session.isAuth) {
    console.log(req.session.username);
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuth;
