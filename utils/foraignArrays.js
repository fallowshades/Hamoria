import mongoose from 'mongoose'
import { ORIENTATION, HAND_VARIANTS } from '../utils/constants.js'

export const singleHandOrientation = mongoose.Schema({
  orderid: { type: String },
  fingerdirection: {
    type: String,
    enum: Object.values(ORIENTATION),
    default: ORIENTATION.NULL,
  },
  fingerdirection2: {
    type: String,
    enum: Object.values(ORIENTATION),
    default: ORIENTATION.NULL,
  },
  palmdirection: {
    type: String,
    enum: Object.values(ORIENTATION),
    default: ORIENTATION.NULL,
  },
  palmdirection2: {
    type: String,
    enum: Object.values(ORIENTATION),
    default: ORIENTATION.NULL,
  },

  orientation: {
    type: mongoose.Schema.ObjectId,
    ref: 'orientation',
    required: true,
  },
})

export const singleHandPrefix = mongoose.Schema({
  orderid: {
    type: String,
  },
  position: { type: String, required: true },
  hand: { type: String, enum: [HAND_VARIANTS], required: true },
  prefix: {
    type: mongoose.Schema.ObjectId,
    ref: 'prefix',
    required: true,
  },
})

export const singleHandForm = mongoose.Schema({
  orderId: String,
  active_hand: String,
  aktive_hand2: String,
  passive_hand2: String,
  singlehandform: String,
})

export const references = mongoose.Schema({
  orderid: String,
  position: String,
  bodyContact: String,
  touch: String,
  faceexpression: String,
  Link: String,
})
