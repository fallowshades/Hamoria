# v0.6.7

## crud prefix controll

### remove local ctrl setup / make localRead dynamic

mockWhat/localRead/orientationUtil

```js
import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'
export const readLocalFile = async (relative_path) => {
  const jsonData = JSON.parse(
    await readFile(new URL(relative_path, import.meta.url))
  )

  const packedData = jsonData.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })
  return packedData
}
```

### postman testing local to remote prefix crud

prefixController.js

```js
import Prefix from '../models/prefixModel.js'
```

```js
export const createPrefix = async (req, res) => {
  const {
    orderid,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
  } = req.body
  const prefix = await Prefix.create(req.body)
  res.status(StatusCodes.OK).json({ prefix })
}
```

```js
export const getAllPrefixes = async (req, res) => {
  const prefix = await Prefix.find({})

  res.status(StatusCodes.OK).json({ prefixes: prefix })
}
```

```js
export const getSinglePrefix = async (req, res) => {
  const { id } = req.params
  const prefix = await Prefix.findById(id)
  if (!prefix) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'no prefix with id' })
  }
  res.status(StatusCodes.OK).json({ prefix })
}
```

```js
export const updatePrefix = async (req, res) => {
  const { id } = req.params

  const updatedPrefix = await Prefix.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedPrefix) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ updatedPrefix })
}
```

```js
export const deletePrefix = async (req, res) => {
  const { id } = req.params
  const removedPrefix = await Prefix.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ removedPrefix })
}
```

## validation

### setup array of possible validation and middleware

prefixMiddleware.js

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

### validate create Prefix

constants.js

```js
export const PREFIX_POSITION = {
  BODY: 'body',
  CHEEK: 'cheek',
  CHIN: 'chin',
  EAR: 'ear',
  EYE: 'eye',
  FACE: 'face',
  FOREHEAD: 'forehead',
  HAND: 'hand',
  MOUTH: 'mouth',
  NOSE: 'nose',
  THROUGHT: 'throught',
}
```

validatePrefixMiddleware.js

```js
import { PREFIX_POSITION, HAND_VARIANTS } from '../utils/constants.js'

export const validatePrefixInput = withValidationErrors([
  body('position')
    .isIn(Object.values(PREFIX_POSITION))
    .withMessage('invalid position value'),
  body('hand')
    .isIn(Object.values(HAND_VARIANTS))
    .withMessage('invalid hand value'),
])
```

prefixRouter.js

```js
import { validatePrefixInput } from '../middleware/validatePrefixMiddleware.js'

router.route('/').post(validatePrefixInput, createPrefix).get(getAllPrefixs)

router.route('/:id').patch(validatePrefixInput, updatePrefix)
```

### validate id param prefix

prefixController

validatePrefixRouter.js

```js
import {
  validatePrefixInput,
  validateIdParam,
} from '../middleware/validatePrefixMiddleware.js'

router
  .route('/:id')
  .get(validateIdParam, getSinglePrefix)
  .delete(validateIdParam, deletePrefix)
```

validatePrefixMiddleware.js

```js
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    if (errorMessages[0].startsWith('no prefix')) {
      throw new NotFoundError(errorMessages)
    }
    throw new BadRequestError(errorMessages)
  }
}
```

```js
import mongoose from 'mongoose'
import { param } from 'express-validator'
import Prefix from '../models/prefixModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const prefix = await Prefix.findById(value)
    if (!prefix) throw new NotFoundError(`no prefix with id : ${value}`)
  }),
])
```

#### get all prefix - server

prefixController.jsx

```js
export const getAllPrefixs = async (req, res) => {
  const { position, hand, sort } = req.body

  const queryObject = {}

  if (position && position !== 'all') {
    queryObject.position = position
  }
  if (hand && hand !== 'all') {
    queryObject.hand = hand
  }

  const sortOptions = {
    'a-z': 'hand',
    'z-a': '-hand',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const prefix = await Prefix.find({}).sort(sortKey).skip(skip).limit(limit)

  const totalPrefixes = await Prefix.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalPrefixes / limit)

  res.status(StatusCodes.OK).json({
    totalPrefixes,
    numOfPages,
    currentPage: page,
    prefixes: prefix,
  })
}
```

PrefixModel.jsx

```js

```

#### all prefix loader

AllPrefix.jsx

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(), ////
])
```

```js
const { data } = await customFetch.get('/prefixes', { params })
return {
  data,
  searchValues: { ...params },
}
```

```js

const AllPrefix = () => {

  const { data, searchValues } = useLoaderData()

  return (

    <AllPrefixContext.Provider value={{ data, searchValues }}>
  )}
```

#### submit form programmatically

SearchPrefixContainer.jsx

```js
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { useAllPrefixContext } from '../../../pages/handparts/AllPrefix'
import { Form, useSubmit, Link } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'
import { FormRowSelect } from '../../../components'
const SearchPrefixContainer = () => {
  const { searchValues } = useAllPrefixContext()
  const { search, status, type, sort } = searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <KeysToMapFormRows event={submit} />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <Link
            to="/dashboard/all-achievements"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchPrefixContainer
```

KeysToMapFormRow.jsx

- noticed have different names

```jsx
const KeysToMapFormRows = ({mapKey, event }) => {


  {mappedKeys.map((constant) => {
if (!constant.hasOwnProperty('default')) {
            if (constant.field == 'orderid' || constant.field == 'Connectionid') {
              return null
            }
            ...}



  })

}  else {
            return (
              <FormRowSelect
                key={constant.identifier}
                type="text"
                name={constant.field}
                defaultValue={constant?.default}
                list={Object.values(constant?.list)}
                onChange={(e) => {
                  if (event) {
                    event(e.currentTarget.form)
                  }
                }}
              />
            )
}
}
```

#### complex pagination container add context

HandButtonContainer.jsx

- index all contexts

```jsx
import {
  useAllReferenceContext,
  useAllWordContext,
  useAllOrientationContext,
  useAllPrefixContext,
} from '../../../pages/handparts'
```

- switch case which context

```js
  case 'allPrefix':
      ;({ numOfPages, currentPage } = useAllPrefixContext().data)
      break
```

- bug interior point is null

```js
<div className="btn-container">{numOfPages > 30 && renderPageButtons()}</div>
```

## optimization

### all prefix query

AllPrefix.jsx

-take dependencies and do for us

```js
import { useQuery } from '@tanstack/react-query'

const allPrefixesQuery = (params) => {
  return {
    queryKey: ['prefixes'],
    queryFn: async () => {
      const { data } = await customFetch.get('/prefixes', { params })

      return data
    },
  }
}

const AlllPrefix = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allPrefixesQuery(searchValues))
}
```

- loader need invoke and only return relevant

```js
try {
  await queryClient.ensureQueryData(alllPrefixesQuery(params))
  return {
    searchValues: { ...params },
  }
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error
}
```

- prevent formRow default text --> optimal key

```js
const alllPrefixesQuery = (params) => {
  const {
    search,
    position,
    hand,
    page,
  } = params
  return {
    queryKey: [
      'prefixes',
      search ?? 'all',
      fingerdirection ?? 'all',
      fingerdirection2 ?? 'all',
      palmdirection ?? 'all',
      palmdirection2 ?? 'all',
      page ?? 1,
    ],
    ...}}
```

### invalidate Prefix

App.jsx

```js
    {
            path: 'prefix',
            element: <AllPrefix />,
            action: prefixAction(queryClient),
            loader: prefixLoader(queryClient),
          },
          {
            path: 'delete-prefix/:id',
            action: deletePrefixAction(queryClient),
          },
```

/pages/DeletePrefix.jsx

```js
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/prefixes/${params.id}`)
      queryClient.invalidateQueries(['prefixes'])
      toast.success('prefix deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    return redirect('/dashboard/prefix')
  }
```

components/../handparts/AddPrefix.jsx

- invalidate both edit and add cases

```js
export const action =
  (queryClient) =>
  async ({ request }) => {

    switch (crudOperationPart) {
      case 'create':
        try {
          await customFetch.post('/prefixes', data)
          queryClient.invalidateQueries(['prefixes'])
          toast.success('prefix added successfully')


        }}

         case 'patch':
        //const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
        const mongooseObjectIdRegex = /^[0-9a-fA-F]{24$/

        if (mongooseObjectIdRegex.test(idPart)) {
          try {
            await customFetch.patch(`/prefixes/${idPart}`, data)

      if (nanoidRegex.test(idPart)) {
        toast.success(`${idPart}`)
            queryClient.invalidateQueries(['prefixes'])
            toast.success(`${idPart}`)
            return null
          } catch (error) {
            toast.error(error.response.data.msg)
            return error
          }
        }
        toast.error('sad developer')
        return null
      }
  }
```

### Fix link

AddPrefix.js

```js
     <Link to="/dashboard/prefix" className="btn form-btn delete-btn">
```
