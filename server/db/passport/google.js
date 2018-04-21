import User from '../models/user'

const serializeUser = (req, accessToken, refreshToken, profile, done) => {
  //  Use the JSON returned by Google
  profile = profile._json
  //  Select relevant fields
  profile = {
    name: profile.displayName,
    email: profile.emails[0].value,
    // Simulate a tmobileid by splitting the e-mail address. Genius!
    tmobileid: profile.emails[0].value.split('@')[0],
    //  The following are part of our OAuth strat, don't show in shib production
    tmobile: profile.id,
    tokens: { kind: 'google', accessToken }
  }
  //  CASE: User is logged in
  if (req.user) {
    // Check if there is an existing account with a provider id.
    return User.findOne({ tmobileid: profile.tmobileid }, (findOneErr, existingUser) => {
      // If there is, return an error message. (Account merging not supported)
      if (existingUser) {
        // console.log('Logged in, existingUser by tmobileid', existingUser)
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' })
      }
      // Else link new OAuth account with currently logged-in user.
      return User.findById(req.user.id, (findByIdErr, user) => {
        Object.assign(user, profile)
        user.save((err) => {
          done(err, user, { message: 'Google account has been linked.' })
        })
      })
    })
  }
  // CASE: User is NOT logged in
  // Check if it's a returning user.
  return User
    .findOne({ tmobileid: profile.tmobileid })
    //  Returning users have their authZ with the STF populated.
    .populate('stf')
    .exec((findByGoogleIdErr, existingUser) => {
    // If returning user, sign in and we are done.
      if (existingUser) {
      // console.log('existingUser by tmobileid', existingUser)
        return done(null, existingUser)
      }
    // Else check if there is an existing account with user's tmobileid.
      return User.findOne({ tmobileid: profile.tmobileid }, (findByEmailErr, existingEmailUser) => {
      // If there is, return an error message.
        if (existingEmailUser) {
          return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' })
        }
      // Else create a new account.
        const user = new User()
        Object.assign(user, profile)
        return user.save((err) => {
          done(err, user)
        })
      })
    })
}

const deserializeUser = (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
}

export default { serializeUser, deserializeUser }
/* eslint-enable no-param-reassign */
