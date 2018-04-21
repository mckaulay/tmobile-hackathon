// import passport from 'passport'
import config from 'config'
import db from '../db'
const version = config.get('version')
const controllers = db.controllers

//  GENERATE ROUTES
export default (app) => {
  console.log('REST: Initializing rest API routes')
  /*
  RESTful API
  */
  app.use(`/${version}/configs`, new controllers.Configs().api())
  app.use(`/${version}/buildings`, new controllers.Buildings().api())
  app.use(`/${version}/rooms`, new controllers.Rooms().api())
  app.use(`/${version}/reservations`, new controllers.Reservations().api())
  console.log(`REST: API live for all ${Object.keys(controllers).length - 1} core models.`)

  // USER PROFILE ROUTES
  console.log('USER: Initializing User REST routes and auth endpoints')
  const Users = new controllers.Users()
  app.use(`/${version}/users`, Users.api())
  app.delete('/sessions', Users.logout)
  console.log(`REST: API live for Users.`)
}
