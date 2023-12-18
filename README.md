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

#### pagination setup

HandButtonContainer.jsx

```js
const HandButtonContainer = () => {
  return <div>HandButtonContainer</div>
}
export default HandButtonContainer
```

ReferenceContainer.jsx

```js
import HandButtonContainer from './HandButtonContainer'

const ReferenceContainer = () => {
  console.log(data)
  const { references, totalReferences, numOfPages } = data

 return (
    <>
      <AddReference />

      <h5>
        {totalReferences} reference{references.length > 1 && 's'} found
      </h5>
      ...

         {numOfPages > 1 && <HandButtonContainer />}
 )
}
```

#### basic pageBnContainer

App.jsx

- unnecessary name change
- had to update links also

```js
    path: 'references',
```

HandButtonContainer.jsx

```jsx
import { useLocation, useNavigate } from 'react-router-dom'
```

```jsx
const { search, pathname } = useLocation()
const navigate = useNavigate()
const handlePageChange = (pageNumber) => {
  const searchParams = new URLSearchParams(search)
  searchParams.set('page', pageNumber)
  navigate(`${pathname}?${searchParams.toString()}`)
}
```

-boundary points

```jsx

return(
    <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage + 1
          if (prevPage < numOfPages) prevPage = numOfPages
          handlePageChange(prevPage)
        }}
      >
      ...
       onClick={() => handlePageChange(pageNumber)}

      ...


<button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1
          handlePageChange(nextPage)
        }}
      >
        next
        <FaHandPointRight />
      </button>
)
```

AllReference.jsx

- fix include param

```js
const { data } = await customFetch.get('/references', { params })
```

#### complex pagination container

HandButtonContainer.jsx

```jsx
const addPageButton = ({ pageNumber, activeClass }) => {
  return (
    <button
      className={`btn page-btn ${activeClass && 'active'}`}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  )
}

const renderPageButtons = () => {
  const pageButtons = []

  // Add the first page button
  pageButtons.push(
    addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
  )
  // Add the dots before the current page if there are more than 3 pages
  if (currentPage > 3) {
    pageButtons.push(
      <span className="page-btn dots" key="dots-1">
        ....
      </span>
    )
  }
  // one before current page
  if (currentPage !== 1 && currentPage !== 2) {
    pageButtons.push(
      addPageButton({ pageNumber: currentPage - 1, activeClass: false })
    )
  }

  // Add the current page button
  if (currentPage !== 1 && currentPage !== numOfPages) {
    pageButtons.push(
      addPageButton({ pageNumber: currentPage, activeClass: true })
    )
  }

  // one after current page
  if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
    pageButtons.push(
      addPageButton({ pageNumber: currentPage + 1, activeClass: false })
    )
  }
  if (currentPage < numOfPages - 2) {
    pageButtons.push(
      <span className=" page-btn dots" key="dots+1">
        ....
      </span>
    )
  }

  // Add the last page button
  pageButtons.push(
    addPageButton({
      pageNumber: numOfPages,
      activeClass: currentPage === numOfPages,
    })
  )

  return pageButtons
}
```

```js
const HandButtonContainer{
  return(
    <div className="btn-container">{renderPageButtons()}</div>
)
}
```

## optimization

### all reference query

AllReference.jsx

-take dependencies and do for us

```js
import { QueryClient, useQuery } from '@tanstack/react-query'

const allReferenceQuery = (params) => {
  return {
    queryKey: ['references'],
    queryFn: async () => {
      const { data } = await customFetch.get('/references', { params })
      return data
    },
  }
}
```

- loader need invoke and only return relevant

```js
export const loader = (QueryClient = async ({ request }) => {
  await QueryClient.ensureQueryData(allReferenceQuery(params))
  return {
    data,
    searchValues: { ...params },
  }
})
```

- prevent formRow default text --> optimal key

```js
const allReferenceQuery = (params) => {
  const { search, position, bodycontact, touchtype, faceexpression, page } =
    params

  return {
    queryKey: [
      'references',
      search ?? 'all',
      position ?? 'all',
      bodycontact ?? 'all',
      touchtype ?? 'all',
      faceexpression ?? 'all',
      page ?? 1,
    ],
    ...
  } }
```

### invalidate references

App.jsx

- actions cover create, update, delete

```js
 {
            path: 'references',
            element: <AllReference />,
            action: referenceAction(queryClient),
            loader: ReferenceLoader(queryClient),
          },
          {
            path: 'delete-reference/:id',
            action: deleteReferenceAction(queryClient),
          }
```

/pages/DeleteReference.jsx

- async function => const action ()

```js
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/references/${params.id}`)
      queryClient.invalidateQueries(['references'])

...
    }}
```

components/../handparts/AddReference.jsx

- only the create action

```js
export const action = async ({ request }) => {
 ...
  switch (crudOperationPart) {
    case 'create':
      try {
        await customFetch.post('/references', data)
        queryClient.invalidateQueries(['references'])¨
      }}}
```

### edit reference fix FormRowSelect and query

utils\modelKeyConstants.js

- Fix add and edit constants --> dynamically use FormRowSelect

```js
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
```

AddReference.jsx

```js
switch(){
    case 'patch':

      if (mongooseObjectIdRegex.test(idPart)) {
  try {
    await customFetch.patch(`/references/${idPart}`, data)
    toast.success(`${idPart}`)
    return null
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

}

```

#### edit reference loader

```js

```
