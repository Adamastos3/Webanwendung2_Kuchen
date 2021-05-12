function isAuth(req, res, next) {
  console.log("isAuth");
  //console.log(req.isAuthenticated());
  console.log(req.session.authenticated);
  console.log(req.session);
  if (req.session.authenticated) {
    console.log("id " + req.session.username);
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuth;
