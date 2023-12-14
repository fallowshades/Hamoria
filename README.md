# v0.6.4

## crud referenc controll

### postman testing

referenceController.js

```js
import Reference from '../models/referenceModel.js'
import { STATUS_CODES } from 'http'
```

```js
export const createReference = async (req, res) => {
  const { bodycontact, touchType, faceexpression, link } = req.body
  const reference = await Reference.create(req.body)
  res.status(StatusCodes.OK).json({ reference })
}
```

```js
export const getAllReferences = async (req, res) => {
  const reference = await Reference.find({})

  res.status(StatusCodes.OK).json({ reference })

  /**const jsonPrefix = JSON.parse(
   * }
   */
}
```

```js
export const getSingleReference = async (req, res) => {
  res.send('get single reference')
  const { id } = req.params
  const reference = await Reference.findById(id)
  if (!reference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'no reference with id' })
  }
  res.status(StatusCodes.OK).json({ reference })
}
```

```js
export const updateReference = async (req, res) => {
  const { id } = req.params

  const updatedReference = await Reference.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedReference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ reference: updatedReference })
}
```

```js
export const deleteReference = async (req, res) => {
  const { id } = req.params
  const removedReference = await Reference.findByIdAndUpdate(id)

  if (!removedReference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ reference: removedReference })
}
```

## validation

### constant and middleware setup

referenceMiddleware.js

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

referenceModel

```js
import { TOUCH_TYPE, FACE_EXPRESSION, POSITION } from '../utils/constants.js'

const ReferenceSchema = new mongoose.Schema({
  orderid: String,
  position: {
    type: String,
    enum: [TOUCH_TYPE],
    default: POSITION.NAN,
  },
  bodycontact: {
    type: String,
    enum: [TOUCH_TYPE],
    default: POSITION.NAN,
  },
  ...
})
```

utils\constants.js

```js
export const POSITION = {
  SHOULDER: 'shoulder',
  CHEST: 'chest',
  HAND: 'hand',
  BACKHAND: 'backhand',
  FINGERS: 'fingers',
  PALM: 'palm',
  HEAD: 'head',
  STOMACHCHEST: 'stomach chest',
  FACE: 'face',
  SHOULDERCHEST: 'shoulder chest',
  CHESTHEAD: 'chest head',
  CHESTSHOULDER: 'chest shoulder',
  ARM: 'arm',
  NULL: 'null',
  NAN: 'NaN',
}
```

### validate create reference

validateReferenceMiddleware.js

```js
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { POSITION, TOUCH_TYPE, FACE_EXPRESSION } from '../utils/constants.js'

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

export const validateReferenceInput = withValidationErrors([
  body('position')
    .isIn(Object.values(POSITION))
    .withMessage('invalid position value'),
  body('bodycontact')
    .isIn(Object.values(POSITION))
    .withMessage('invalid bodycontact value'),
  body('touchtype')
    .isIn(Object.values(TOUCH_TYPE))
    .withMessage('invalid touch type'),
  body('faceexpression')
    .isIn(Object.values(FACE_EXPRESSION))
    .withMessage('invalid face expression'),
])
```

referenceRouter.js

```js
import { validateReferenceInput } from '../middleware/validateReferenceMiddleware.js'


router
  .route('/')
  .post(validateReferenceInput, createReference)
  .get(getAllReferences)


    .route('/:id')
    -
  .patch(validateReferenceInput, updateReference)
```

### validate ip param reference

referenceController

- fix mistake

```js
res.status(StatusCodes.OK).json({ references: reference })
```

validateReferenceRouter.js

```js
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
const withValidationErrors = (validateValues) => {
...
if (errorMessages[0].startsWith('no reference')) {
  throw new NotFoundError(errorMessages)
}
}
```

```js
import mongoose from 'mongoose'
import { param } from 'express-validator'
import { Reference } from '../client/src/components/courses/handparts/mappedItems/index.js'

import Reference from '../models/referenceModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const reference = await Reference.findById(value)
    isValidId(!achievement)
    throw new NotFoundError(`no reference with id : ${value}`)
  }),
])
```

#### get all references - server

referenceController.jsx

```js
export const getAllReferences = async (req, res) => {
  const { position, bodycontact, touchtype, faceexpression, link, sort } =
    req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (position && position !== 'all') {
    queryObject.position = position
  }
  if (bodycontact && bodycontact !== 'all') {
    queryObject.bodycontact = bodycontact
  }
  if (touchtype && touchtype !== 'all') {
    queryObject.touchtype = touchtype
  }
  if (faceexpression && faceexpression !== 'all') {
    queryObject.faceexpression = faceexpression
  }

  const sortOptions = {
    'a-z': 'faceexpression',
    'z-a': '-faceexpression',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const reference = await Reference.find({})
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalReferences = await Reference.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalReferences / limit)

  res.status(StatusCodes.OK).json({ references: reference })
  res.status(StatusCodes.OK).json({
    totalReferences,
    numOfPages,
    currentPage: page,
    references: reference,
  })
}
```

ReferenceModel.jsx

```js
 link: {
    type: String,
    required: true,
    default: 'Nan'
  },
```

#### all references loader

AllReference.jsx

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(), ////
])
```

```js
return {
  data,
  searchValues: { ...params },
}
```

```js
const AllReference = () => {

  const { data, searchValues } = useLoaderData()
  return (

    <AllReferenceContext.Provider value={{ data, searchValues }}>
  )
}
```

#### submit form programmatically

SearchReferenceContainer.jsx

```js
const SearchReferenceContainer = () => {
  const { searchValues } = useAllReferenceContext()
  const { search, status, type, sort } = searchValues

  const submit = useSubmit()

  return (
      onChange={(e) => {
              submit(e.currentTarget.form)
            }}

        onChange={(e) => {
              submit(e.currentTarget.form)
            }}

      ...
  )
}
```

#### debounce refracture

```js

  const { searchValues } = useAllAchievementsContext()
  const { search, status, type, sort } = searchValues

   defaultValue={search}
   defaultValue={status}
   ...
```

/utils/utillity

```js
export const debounce = (onChange) => {
  let timeout
  return (e) => {
    const form = e.currentTarget.form
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChange(form), 2000
    })
  }
}
```

referenceController

```js
const {
  search,
  position,
  bodycontact,
  touchtype,
  faceexpression,
  //link,
  sort,
} = req.query

const queryObject = {}
if (search) {
  queryObject.$or = [{ link: { $regex: search, $options: 'i' } }]
}
```

SearcchReferenceContainer.jsx

```js

import { debounce } from '../../../utils/utillity'

const SearchReferenceContainer = () => {
  const { searchValues } = useAllReferenceContext()

  const { search, position, bodycontact, touchtype, faceexpression, sort } =
    searchValues
```

````js
return(
          <FormRow>
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
            <FormRowSelect>
             defaultValue={position}
             ...

)```
````
