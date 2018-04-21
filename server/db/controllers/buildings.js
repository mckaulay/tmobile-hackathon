import REST from './rest'
import { Building } from '../models'

export default class Buildings extends REST {
  constructor () {
    super(Building, '_id')
  }
}
