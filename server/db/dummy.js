import mongoose from 'mongoose'
import config from 'config'

import { restDummies } from './models'

export default function () {
  const min = config.has('lorem-ipsum') ? config.get('lorem-ipsum') : 5 // default
  console.log(`SEED: Lorem Ipsum Mode enabled. Seeding up to ${min} documents each...`)
  //  Generate an object containing ObjectIds for dummy objects.
  const ids = {
    user: []
  }
  Object.keys(ids).forEach((key) => {
    for (let i = 0; i < min; i++) {
      ids[key].push(new mongoose.Types.ObjectId())
    }
  })
  let _id = new mongoose.Types.ObjectId()
  const developer = {
    _id,
    name: 'Ryan Keller',
    tmobileid: 'rykeller',
    email: 'rykeller@uw.edu'
  }
  //  Create dummies for all RESTful models
  restDummies.map((model) => model(min, ids, developer))
}
