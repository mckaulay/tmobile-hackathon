import REST from './restify'
import { Room } from '../models'

export default class Rooms extends REST {
  constructor () {
    super(Room)
  }
}
