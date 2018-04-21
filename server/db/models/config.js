import mongoose from 'mongoose'
// import faker from 'faker'

const ConfigSchema = new mongoose.Schema({
  enums: {
    //  Basic arrays
    categories: {
      type: Array,
      default: ['A', 'B', 'C']
    },
    organizations: {
      type: Object,
      default: {'Org A': '000', 'Org B': '111', 'Org C': '222'}
      //  NOTE: Use Object.keys(orgs).map(key => ...) to iterate
    }
  }
})
const Config = mongoose.model('Config', ConfigSchema)
export default Config

/* *****
FAKE DATA GENERATOR: Contact
***** */
//  NOTE: Min should = 1
const dummyConfigs = (min, ids) => {
  //  Check the db for existing data satisfying min required
  Config.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Config schema: ${err}`)
    } else if (count < 1) {
      let fake = new Config({})
      Config.create(fake, (error) => {
        if (!error) { console.log(`SEED: Created fake Config scheme`) }
      })
    }
  })
}

export { dummyConfigs }
