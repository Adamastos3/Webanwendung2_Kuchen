function isAuth(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

function isAuthAdmin(req, res, next) {
  if (req.session.authenticated && req.session.rolle == 1) {
    next();
  } else {
    res.redirect("/login");
  }
}

function isAuthMitarbeiter(req, res, next) {
  if (req.session.authenticated && req.session.rolle < 3) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = { isAuth, isAuthAdmin, isAuthMitarbeiter };
