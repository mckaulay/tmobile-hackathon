/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
*/
export function loadModels () {
  //  Auth and User data
  require('./config')
  require('./user')
  require('./building')
  require('./room')
  require('./reservation')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummyConfigs } from './config'
import User, { dummyUsers } from './user'
import Building, { dummyBuildings } from './building'
import Room, { dummyRooms } from './room'
import Reservation, { dummyReservations } from './reservation'

export { Config, User, Building, Room, Reservation }
export default { Config, User, Building, Room, Reservation }
export const restDummies = [ dummyConfigs, dummyUsers, dummyBuildings, dummyRooms, dummyReservations ]
