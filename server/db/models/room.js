// https://github.com/sahat/hackathon-starter
import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  occupied: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
})
RoomSchema.plugin(autoref, [
  'building.rooms',
  'reservations.room'
])
const Room = mongoose.model('Room', RoomSchema)
export default Room

/* *****
FAKE DATA GENERATOR: Room
******/
const dummyRooms = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Room.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Room schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Room({
          _id: ids.room[i],
          name: faker.company.bsNoun(),
          building: ids.building[i],
          occupied: faker.random.boolean(),
          user: ids.user[i],
          reservations: [ids.reservation[i], ids.reservation[i]]
        })
      }
      //  Create will push our fakes into the DB.
      Room.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Room (${fakes.length})`) }
      })
    }
  })
}
export { dummyRooms }
