//dynamically generating components
import { nanoid } from 'nanoid'

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  { field: 'hand', identifier: nanoid() },
]
const orientationKeys = [
  { field1: 'orderid', identifier: nanoid() },
  { field2: 'fingerdirection', identifier: nanoid() },
  { field3: 'fingerdirection2', identifier: nanoid() },
  { field4: 'palmdirection', identifier: nanoid() },
  { field5: 'palmdirection2', identifier: nanoid() },
  ,
]
const signKeys = [
  { field1: 'active_hand', identifier: nanoid() },
  { field2: 'aktive_hand2', identifier: nanoid() },
  { field3: 'passive_hand2', identifier: nanoid() },
  { field4: 'singlehandform', identifier: nanoid() },
  { field5: 'transform', identifier: nanoid() },
]
const wordKeys = [
  { field1: 'word', identifier: nanoid() },
  { field2: 'subgroup', identifier: nanoid() },
  { field3: 'subsection', identifier: nanoid() },
  { field4: 'prefixid', identifier: nanoid() },
]
const referenceKeys = [
  { field1: 'position', identifier: nanoid() },
  { field2: 'bodycontact', identifier: nanoid() },
  { field3: 'touchtype', identifier: nanoid() },
  { field4: 'faceexpression', identifier: nanoid() },
  { field5: 'link', identifier: nanoid() },
]

export { prefixKeys, orientationKeys, signKeys, wordKeys, referenceKeys }
