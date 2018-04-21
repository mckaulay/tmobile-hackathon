// https://github.com/sahat/hackathon-starter
import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'

const ReservationSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  duration: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  present: Boolean
})
ReservationSchema.plugin(autoref, [
  'user.reservations',
  'room.reservations'
])
const Reservation = mongoose.model('Reservation', ReservationSchema)
export default Reservation

/* *****
FAKE DATA GENERATOR: Reservation
******/
const dummyReservations = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Reservation.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Reservation schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Reservation({
          _id: ids.reservation[i],
          time: i % 2 === 0 ? faker.date.past() : faker.date.future(),
          duration: faker.random.number(),
          user: ids.user[i],
          room: ids.room[i],
          present: faker.random.boolean()
        })
      }
      //  Create will push our fakes into the DB.
      Reservation.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Reservation (${fakes.length})`) }
      })
    }
  })
}
export { dummyReservations }
