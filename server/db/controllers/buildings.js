import REST from './restify'
import { Building } from '../models'

export default class Buildings extends REST {
  constructor () {
    super(Building)
  }
}
