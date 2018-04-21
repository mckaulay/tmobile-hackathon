// https://github.com/sahat/hackathon-starter
import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'

const BuildingSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
})
BuildingSchema.plugin(autoref, [
  'rooms.building'
])
const Building = mongoose.model('Building', BuildingSchema)
export default Building

/* *****
FAKE DATA GENERATOR: Building
******/
const dummyBuildings = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Building.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Building schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Building({
          _id: ids.building[i],
          slug: faker.internet.userName(),
          name: faker.internet.domainName(),
          rooms: [ids.room[i], ids.room[i]]
        })
      }
      //  Create will push our fakes into the DB.
      Building.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Building (${fakes.length})`) }
      })
    }
  })
}
export { dummyBuildings }
