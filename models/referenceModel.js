import mongoose from 'mongoose'
import { TOUCH_TYPE, FACE_EXPRESSION } from '../utils/constants.js'

const ReferenceSchema = new mongoose.Schema({
  orderid: String,
  position: {
    type: String,
  },
  bodycontact: {
    type: String,
  },
  touchtype: {
    type: String,
    enum: [TOUCH_TYPE],
    default: TOUCH_TYPE.NULL,
  },
  faceexpression: {
    type: String,
    enum: [FACE_EXPRESSION],
    default: FACE_EXPRESSION.NULL,
  },
  link: {
    type: String,
    required: true,
  },
})

export default mongoose.model('reference', ReferenceSchema)
