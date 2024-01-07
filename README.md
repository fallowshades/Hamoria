# v0.7.1

## queriable static data

### data from NO curriculum

#### data in all courses in curriculum

AllCrud.jsx

- and AllDomain, AllTuple, AllPlace, AllItem
- just change route address

```js
import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/crud')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
```

All[Course-name]

```js
const AllCrud = () => {
  const { data } = useLoaderData()
}
```

#### setup all NO course pages context

AllCrud.jsx

- and AllDomain, AllTuple, AllPlace, AllItem

```js
const AllCrudContext = createContext()

const All[name] = () =>{

  return
  <All[name]Provider value= {{data}}>
...
    </All[name]Provider>
}
export const useAllCrudContext = () => useContext(AllCrudContext)
```

#### render ascending sorted NO courses

- create CRUD, Domain, Tuple, Place, Item

CrudContainer

- similarly DomainContainer, tupleContainer, PlaceContainer, ItemContainer

```js
import Crud from './Crud'
import Wrapper from '../../../assets/wrappers/courses/no/CrudContainer'

import { useAllAchievementsContext } from '../../../pages/AllAchievements'
import { useAllCrudContext } from '../../../pages/courses/no/AllCrud'
```

```js
const CrudContainer = () => {
  const { data } = useAllCrudContext()
  const { sortedCategorizedCrudData } = data

  if (sortedCategorizedCrudData === 0) {
    return (
      <Wrapper>
        <h2>No Crud to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="grid-template">
        {sortedCategorizedCrudData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((crud) => (
              <Crud key={crud._id} {...crud} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
```

crudController

```js
import {
  getCategoryQuery,
  getGroupByQuery,
  getSortByQuery,
} from '../sharedQueries/categorizedData.js'
```

```js
export const createCRUD = async (req, res) => {
  const sortedCategorizedCrudData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])

  res.status(StatusCodes.OK).json({ sortedCategorizedCrudData })
}
```

sharedQueries\categorizedData

```js
export const getSortByQuery = () => ({
  $sort: {
    _id: 1, // Sorting in ascending order based on the _id field (group ID)
  },
})
```

#### custom order

sharedQueries\categorizedData.js

```js
export const customOrder = (categorizedData, queryObject) => {
  const subsectionOrder = {}
  queryObject.subsection.forEach((subsection, index) => {
    subsectionOrder[subsection] = index
  })

  // Custom sorting logic
  categorizedData.sort((a, b) => {
    const orderA = subsectionOrder[a._id]
    const orderB = subsectionOrder[b._id]

    if (orderA < orderB) return -1
    if (orderA > orderB) return 1
    return 0
  })
  return categorizedData
}
```

domainRelController.js

- also tupleRelController, placeController, itemController
- (not trivial as crudController w non alphabetic order)

```js
import {
  getCategoryQuery,
  getGroupByQuery,
  getSortByQuery,
  customOrder,
} from '../sharedQueries/categorizedData.js'
```

```js
export const getAllDomain = async (req, res) => {
  let categorizedDomainData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])

  categorizedDomainData = customOrder(categorizedDomainData, queryObject)

  res.status(StatusCodes.OK).json({ categorizedDomainData })
}
```

#### prep

Crud.jsx

- also in Domain.jsx, Tuple.jsx, Place.jsx and Item.jsx

```js
const Crud = ({ word, subgroup }) => {
  return (
    <div>
      {' '}
      <p style={{ whiteSpace: 'pre' }}>
        {`word: ${word} \t subgroup: ${subgroup} `}
      </p>
    </div>
  )
}
```

### data to be mixed

#### set up route and test postman

```js
import 'express-async-errors'

export const createExample = async (req, res) => {
  res.send('create example')
}

export const getAllExample = async (req, res) => {
  res.send('get All example')
}

export const getExample = async (req, res) => {
  res.send('get example')
}

export const updateExample = async (req, res) => {
  res.send('update example')
}

export const deleteExample = async (req, res) => {
  res.send('delete example')
}
```

exampleRouter.js

```js
import { Router } from 'express'

import {
  createExample,
  getAllExample,
  getExample,
  updateExample,
  deleteExample,
} from '../controllers/exampleController.js'

const router = Router()

router.route('/').post(createExample).get(getAllExample)

router.route('/:id').get(getExample).patch(updateExample).delete(deleteExample)

export default router
```

server.js

```js
import exampleRouter from './routes/exampleRouter.js'
app.use('/api/v1/examples', exampleRouter)
```

#### example model

exampleModel.js

```js
import mongoose from 'mongoose'

const ExampleSchema = new mongoose.Schema({
  ordning: {
    type: String,
  },
  categori: {
    type: String,
  },
  text: {
    type: String,
  },
  kommentar: {
    type: String,
  },
  länk: {
    type: String,
  },
  url: {
    type: String,
  },
  diskussion: {
    type: String,
  },
  transkription: {
    type: String,
  },
  kommenteratranscription: {
    type: String,
  },
})

export default mongoose.model('example', ExampleSchema)
```

#### CRUD on exampleController

exampleController

```js
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import Example from '../models/exampleModel.js'

export const createExample = async (req, res) => {
  const example = await Example.create(req.body)
  res.status(StatusCodes.CREATED).json({ example })
}

export const getAllExample = async (req, res) => {
  const example = await Example.find({})
  res.status(StatusCodes.OK).json({ example })
}

export const getExample = async (req, res) => {
  const { id } = req.params
  const example = await Example.findById(id)
  res.status(StatusCodes.OK).json({ example })
}

export const updateExample = async (req, res) => {
  const example = await Example.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(StatusCodes.OK).json({ example })
}

export const deleteExample = async (req, res) => {
  const example = await Example.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ example })
}
```

validateExampleMiddleware.js

```js
import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
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

export const validateExampleInput = withValidationErrors([
  body('ordning').notEmpty().withMessage('ordning is required'),
  body('text').notEmpty().withMessage('text is required'),
  body('subsection').notEmpty().withMessage('subsection is required'),
])

import mongoose from 'mongoose'
import { param } from 'express-validator'
import Example from '../models/exampleModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const example = await Example.findById(value)
    if (!example) throw new NotFoundError(`no example with id : ${value}`)
  }),
])
```

exampleRouter.js

```js
import {
  validateExampleInput,
  validateIdParam,
} from '../middleware/validateExampleMiddleware.js'

router.route('/').post(validateExampleInput, createExample).get(getAllExample)

router
  .route('/:id')
  .get(validateIdParam, getExample)
  .patch(validateExampleInput, updateExample)
  .delete(validateIdParam, deleteExample)
```

#### populate examples to DB

```js
import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Example from './models/exampleModel.js'

try {
  await mongoose.connect(process.env.MONGO_URL)

  const jsonExamples = JSON.parse(
    await readFile(
      new URL('./utils/mockWhat/courses/domainMocData.json', import.meta.url)
    )
  )

  await Example.deleteMany({})
  await Example.create(jsonExamples)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
```

#### non modular group queries

exampleModel

```js
 const ExampleSchema = new mongoose.Schema({

 subsection: {
    type: String,
    required: true,
  },
 }
```

domainRelController

```js
import Example from '../../models/exampleModel.js'

export const getAllDomain = async (req, res) => {
  ...

  let categorizedExampleData = await Example.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])
  categorizedExampleData = customOrder(categorizedExampleData, queryObject)

  console.log({ categorizedExampleData, categorizedDomainData })
  res
    .status(StatusCodes.OK)
    .json({ categorizedExampleData, categorizedDomainData })
}
```

#### refracture concurrent categorized data

domainRelController.js

```js
import { getCategorizedData } from '../sharedQueries/categorizedData.js'
import Word from '../../models/wordModel.js'
import Example from '../../models/exampleModel.js'
```

```js
export const getAllDomain = async (req, res) => {
  const [categorizedDomainData, categorizedExampleData] = await Promise.all([
    getCategorizedData(Word, queryObject),
    getCategorizedData(Example, queryObject),
  ])
  categorizedExampleData = customOrder(categorizedExampleData, queryObject)
}
```

sharedQueries\categorizedData.js

```js
export const getCategorizedData = async (model, queryObject) => {
  let categorizedData = await model.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])

  return customOrder(categorizedData, queryObject)
}
```
