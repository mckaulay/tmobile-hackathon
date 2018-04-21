import REST from './restify'
import { Reservation } from '../models'

export default class Reservations extends REST {
  constructor () {
    super(Reservation)
  }
}
