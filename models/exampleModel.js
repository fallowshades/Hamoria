import mongoose from 'mongoose'

const ExampleSchema = new mongoose.Schema({
  ordning: {
    type: String,
  },
  categori: {
    type: String,
  },
  text: {
    type: String,
  },
  kommentar: {
    type: String,
  },
  länk: {
    type: String,
  },
  url: {
    type: String,
  },
  diskussion: {
    type: String,
  },
  transkription: {
    type: String,
  },
  kommenteratranscription: {
    type: String,
  },
})

export default mongoose.model('example', ExampleSchema)
