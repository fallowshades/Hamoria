//dynamically generating components
import { nanoid } from 'nanoid'

import * as constants from './constants'
const { HAND_VARIANTS, ORIENTATION, TOUCH_TYPE, FACE_EXPRESSION } = constants

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  {
    field: 'hand',
    identifier: nanoid(),
    list: HAND_VARIANTS,
    default: HAND_VARIANTS.A,
  },
]
const orientationKeys = [
  {
    field: 'orderid',
    identifier: nanoid(),
  },
  {
    field: 'fingerdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'fingerdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  ,
]
const signKeys = [
  { field: 'active_hand', identifier: nanoid() },
  { field: 'aktive_hand2', identifier: nanoid() },
  { field: 'passive_hand2', identifier: nanoid() },
  { field: 'singlehandform', identifier: nanoid() },
  { field: 'transform', identifier: nanoid() },
]
const wordKeys = [
  { field: 'word', identifier: nanoid() },
  { field: 'subgroup', identifier: nanoid() },
  { field: 'subsection', identifier: nanoid() },
  { field: 'prefixid', identifier: nanoid() },
]
const referenceKeys = [
  {
    field: 'position',
    identifier: nanoid(),
    list: constants.POSITION,
    default: constants.POSITION.ARM,
  },
  {
    field: 'bodycontact',
    identifier: nanoid(),
    list: constants.POSITION,
    default: constants.POSITION.ARM,
  },
  {
    field: 'touchtype',
    identifier: nanoid(),
    list: TOUCH_TYPE,
    default: TOUCH_TYPE.NULL,
  },
  {
    field: 'faceexpression',
    identifier: nanoid(),
    list: FACE_EXPRESSION,
    default: FACE_EXPRESSION.NULL,
  },
  { field: 'link', identifier: nanoid() },
]

export { prefixKeys, orientationKeys, signKeys, wordKeys, referenceKeys }
