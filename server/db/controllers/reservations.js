import REST from './rest'
import { Reservation } from '../models'

export default class Reservations extends REST {
  constructor () {
    super(Reservation, '_id')
  }
}
