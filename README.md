# populate moc v0.5.6

## populate before crud ^^

### populate orientation and prefix

#### orientation

create utils\mockOrientationData.json (later move to mocData folder)

populateOrientation.js

```js
import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Orientation from './models/orientationModel.js'
dotenv.config()
try {
  await mongoose.connect(process.env.MONGO_URL)
  const jsonOrientation = JSON.parse(
    await readFile(new URL('./utils/mockOrientationData.json', import.meta.url))
  )
  const manyOrientation = jsonOrientation.map((orientation) => {
    return { ...orientation }
  })
  //await Orientation.deleteMany()
  //await Orientation.create(manyOrientation)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
```

#### convenient match id for populate

OrientationModel, prefixModel, wordModel create id

```js
{ orderid: {
    type: String,
  },}
```

#### constants considerations

constats string should be lowarcase because convertion tools

crea mockWhat folder

.gitignore

```txt
/utils/mockWhat/*
```

### populate word and sign

#### prepare sign aswell as word foraign nested data props

create utils\foraignArrays.js

signModel.js

```js
import {
  singleHandOrientation,
  singleHandPrefix,
} from '../utils/foraignArrays.js'
```

utils\foraignArrays.js

```js
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

export const singleHandForm = mongoose.Schema({})
```

#### populate word

populateword.js

```js
import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Prefix from './models/prefixModel.js'

import Word from './models/wordModel.js'

dotenv.config()
console.log('start')
try {
  await mongoose.connect(process.env.MONGO_URL)

  const prefixes = await Prefix.find({})
  // console.log(prefixes)

  const jsonWord = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/mockWord150Data.json', import.meta.url)
    )
  )

  const updatedWords = jsonWord.map((word) => {
    if (
      word.prefix_id &&
      prefixes.some((prefix) => prefix.Connectionid === word.prefix_id)
    ) {
      const connection = prefixes.find(
        (prefix) => prefix.Connectionid == word.prefix_id
      )
      console.log({ connection })
      return {
        ...word,
        prefixid: {
          connection_id: connection.Connectionid,
          position: connection.position,
          hand: connection.hand,
        },
      }
    }
    return { ...word }
  })

  await Word.deleteMany()
  await Word.create(jsonPrefix)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
```

### uh the nested parts

signModel.js

```js
   orderid: [singleHandOrientation],
```

... list goes on
