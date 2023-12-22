# v0.6.4

## crud orientation controll

### postman testing local to remote orientation crud

orientationController.js

- refracutre mockWhat/localRead/orientationUtil

```js
import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'
export const readLocalFile = async () => {
  const jsonOrientation = JSON.parse(
    await readFile(new URL('../mockOrientationData.json', import.meta.url))
  )

  const packedData = jsonOrientation.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })
  return packedData
}
```

```js
import Orientation from '../models/orientationModel.js'
import { readLocalFile } from '../utils/mockWhat/localRead.js/orientationUtil.js'
```

```js
export const createOrientation = async (req, res) => {
  const {
    orderid,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
  } = req.body
  const orientation = await Orientation.create(req.body)
  res.status(StatusCodes.OK).json({ orientation })
}
```

```js
export const getAllOrientations = async (req, res) => {
  //const packagedData = await readLocalFile()
  const orienetation = await Orientation.find({})

  res.status(StatusCodes.OK).json({ orientations: orienetation })
}
```

```js
export const getSingleOrientation = async (req, res) => {
  const { id } = req.params
  const orientation = await Orientation.findById(id)
  if (!orientation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'no orientation with id' })
  }
  res.status(StatusCodes.OK).json({ orientation })
}
```

```js
export const updateOrientation = async (req, res) => {
  const { id } = req.params

  const updatedOrientation = await Orientation.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedOrientation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ updatedOrientation })
}
```

```js
export const deleteOrientation = async (req, res) => {
  const { id } = req.params
  const removedOrientation = await Orientation.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ removedOrientation })
}
```

## validation

### setup array of possible validation and middleware setup

orientationMiddleware.js

```js
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}
```

### validate create reference

validateOrientationeMiddleware.js

```js

```

orientationRouter.js

```js

```

### validate ip param reference

orientationController

- fix mistake

```js

```

validateOrientationRouter.js

```js

```

#### get all orientation - server

orientationController.jsx

```js

```

OrientationModel.jsx

```js

```

#### all orientation loader

AllOrientation.jsx

```js

```

```js

```

```js

```

#### submit form programmatically

SearchOrientationContainer.jsx

```js

```

#### debounce refracture

```js

```

/utils/utillity

```js

```

orientationController

```js

```

SearchOrientationContainer.jsx

```js

```

```js

```

#### pagination setup

HandButtonContainer.jsx

```js

```

OrientationContainer.jsx

```js

```

#### complex pagination container add context

HandButtonContainer.jsx

```jsx

```

```js

```

## optimization

### all orientation query

AllOrientation.jsx

-take dependencies and do for us

```js

```

- loader need invoke and only return relevant

```js

```

- prevent formRow default text --> optimal key

```js

```

### invalidate orientation

App.jsx

```js

```

/pages/DeleteOrientation.jsx

```js

```

components/../handparts/AddOrientation.jsx

```js

```

### edit orientation fix FormRowSelect and query

utils\modelKeyConstants.js

```js

```

AddOrientation.jsx

```js

```

#### edit orientation loader

App.jsx

```js

```

AddOrientation

```js

```
