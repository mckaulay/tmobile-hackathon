import REST from './rest'
import { Room } from '../models'

export default class Rooms extends REST {
  constructor () {
    super(Room, '_id')
  }
}
