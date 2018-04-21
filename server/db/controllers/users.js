import REST from './restify'
import { User } from '../models'

export default class Users extends REST {
  constructor () {
    super(User)
  }
  /**
   * POST /logout
   */
  // logout (req, res) {
  //   req.logout()
  //   res.sendStatus(200)
  // }
}
