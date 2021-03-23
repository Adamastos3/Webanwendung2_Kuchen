const LocalStrategy = require('passport-local').Strategy
const md5 = require('md5');


function initialize(passport, getUser, getUserById) {
  //console.log("pi1");
  const authenticateUser = async (name, password, done) => {
    //console.log(name);
    //console.log(typeof name);
    //console.log("pi2");
    const user = getUser(name)
   // console.log(user);
    if (user == null) {
      return done(null, false);
    }

    try {
      if (md5(password)== user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize