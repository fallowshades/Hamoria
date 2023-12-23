# v0.6.6

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

### setup array of possible validation and middleware

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

### validate create orientation

validateOrientationeMiddleware.js

```js
import { ORIENTATION } from '../utils/constants.js'

export const validateOrientationInput = withValidationErrors([
  body('fingerdirection')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid fingerdirection value'),
  body('fingerdirection2')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid fingerdirection2 value'),
  body('palmdirection')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid palmdirection value'),
  body('palmdirection2')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid palmdirection2 value'),
])
```

orientationRouter.js

```js
import { validateOrientationInput } from '../middleware/validateOrientationMiddleware.js'

router
  .route('/')
  .post(validateOrientationInput, createOrientation)
  .get(getAllOrientations)

router.route('/:id').patch(validateOrientationInput, updateOrientation)
```

### validate id param orientation

orientationController

validateOrientationRouter.js

```js
import {
  validateOrientationInput,
  validateIdParam,
} from '../middleware/validateOrientationMiddleware.js'

router
  .route('/:id')
  .get(validateIdParam, getSingleOrientation)
  .delete(validateIdParam, deleteOrientation)
```

validateOrientationMiddleware.js

```js
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    if (errorMessages[0].startsWith('no reference')) {
      throw new NotFoundError(errorMessages)
    }
    throw new BadRequestError(errorMessages)
  }
}
```

```js
import mongoose from 'mongoose'
import { param } from 'express-validator'
import Orientation from '../models/orientationModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const orientation = await Orientation.findById(value)
    if (!orientation)
      throw new NotFoundError(`no orientation with id : ${value}`)
  }),
])
```

#### get all orientation - server

orientationController.jsx

```js
export const getAllOrientations = async (req, res) => {
  const {
    orderid,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
    sort,
  } = req.body

  const queryObject = {}

  if (fingerdirection && fingerdirection !== 'all') {
    queryObject.fingerdirection = fingerdirection
  }
  if (fingerdirection2 && fingerdirection2 !== 'all') {
    queryObject.fingerdirection2 = fingerdirection2
  }
  if (palmdirection && palmdirection !== 'all') {
    queryObject.palmdirection = palmdirection
  }
  if (palmdirection2 && palmdirection2 !== 'all') {
    queryObject.palmdirection2 = palmdirection2
  }

  const sortOptions = {
    'a-z': 'fingerdirection',
    'z-a': '-fingerdirection',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const orienetation = await Orientation.find({})
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalOrientations = await Orientation.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalOrientations / limit)

  res.status(StatusCodes.OK).json({
    totalOrientations,
    numOfPages,
    currentPage: page,
    orientations: orienetation,
  })
}
```

OrientationModel.jsx

```js

```

#### all orientation loader

AllOrientation.jsx

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(), ////
])
```

```js
const { data } = await customFetch.get('/orientations', { params })
return {
  data,
  searchValues: { ...params },
}
```

```js

const AllOrientation = () => {

  const { data, searchValues } = useLoaderData()

  return (

    <AllOrientationContext.Provider value={{ data, searchValues }}>
  )}
```

#### submit form programmatically

SearchOrientationContainer.jsx

```js
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { useAllOrientationContext } from '../../../pages/handparts/AllOrientation'
import { Form, useSubmit, Link } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'
import { FormRowSelect } from '../../../components'
const SearchOrientationContainer = () => {
  const { searchValues } = useAllOrientationContext()
  const { search, status, type, sort } = searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <KeysToMapFormRows isOrientation event={submit} />
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
export default SearchOrientationContainer
```

KeysToMapFormRow.jsx

```jsx
const KeysToMapFormRows = ({ isOrientation, mapKey, event }) => {


  {mappedKeys.map((constant) => {
if (!constant.hasOwnProperty('default')) {
            if (constant.field == 'orderid') {
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

- small fixes (Allorientation.jsx,index.js)
- FilterOrientation --> SearchOrientationContaine

#### complex pagination container add context

HandButtonContainer.jsx

- index all contexts

```jsx
import {
  useAllReferenceContext,
  useAllWordContext,
  useAllOrientationContext,
} from '../../../pages/handparts'
```

- switch case which context

```js
  case 'allOrientation':
      ;({ numOfPages, currentPage } = useAllOrientationContext().data)
      break
```

- bug interior point is null

```js
<div className="btn-container">{numOfPages > 30 && renderPageButtons()}</div>
```

## optimization

### all orientation query

AllOrientation.jsx

-take dependencies and do for us

```js
import { useQuery } from '@tanstack/react-query'

const allOrientationsQuery = (params) => {
  return {
    queryKey: ['orientations'],
    queryFn: async () => {
      const { data } = await customFetch.get('/orientations', { params })

      return data
    },
  }
}

const AllOrientation = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allOrientationsQuery(searchValues))
}
```

- loader need invoke and only return relevant

```js
try {
  await queryClient.ensureQueryData(allOrientationsQuery(params))
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
const allOrientationsQuery = (params) => {
  const {
    search,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
    page,
  } = params
  return {
    queryKey: [
      'orientations',
      search ?? 'all',
      fingerdirection ?? 'all',
      fingerdirection2 ?? 'all',
      palmdirection ?? 'all',
      palmdirection2 ?? 'all',
      page ?? 1,
    ],
    ...}}
```

### invalidate orientation

App.jsx

```js
    {
            path: 'orientation',
            element: <AllOrientation />,
            action: orientationAction(queryClient),
            loader: orientationLoader(queryClient),
          },
          {
            path: 'delete-orientation/:id',
            action: deleteOrientationAction(queryClient),
          },
```

/pages/DeleteOrientation.jsx

```js
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/orientations/${params.id}`)
      queryClient.invalidateQueries(['orientations'])
      toast.success('orientation deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    return redirect('/dashboard/prefix')
  }
```

components/../handparts/AddOrientation.jsx

- invalidate both edit and add cases

```js
export const action =
  (queryClient) =>
  async ({ request }) => {

    switch (crudOperationPart) {
      case 'create':
        try {
          await customFetch.post('/orientations', data)
          queryClient.invalidateQueries(['orientations'])
          toast.success('orientation added successfully')


        }}

         case 'patch':
        //const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
        const mongooseObjectIdRegex = /^[0-9a-fA-F]{24$/

        if (mongooseObjectIdRegex.test(idPart)) {
          try {
            await customFetch.patch(`/orientations/${idPart}`, data)

      if (nanoidRegex.test(idPart)) {
        toast.success(`${idPart}`)
            queryClient.invalidateQueries(['orientations'])
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

AddOrientation.js

```js
     <Link to="/dashboard/orientation" className="btn form-btn delete-btn">
```
