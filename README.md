### check sign

#### 6. Setup Constants

utils/constants.js

```js
export const SIGN_CATEGORY = {
  WORK: 'inactive',
  EAT: 'activated',
  SLEEP: 'complete',
}

export const SIGN_COMPANY = {
  STANDARD: 'ikea',
  FRIEND: 'liddy',
  COMPETITOR: 'marcos',
}
```

models/SignModel.js

```js
import mongoose from 'mongoose'
import { SIGN_COMPANY, SIGN_CATEGORY } from '../utils/constants.js'
const SignSchema = new mongoose.Schema(

   category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },

  },
  { timestamps: true }
)
```

#### 7. Validate Create Sign

validationMiddleware.js

```js
import { SIGN_COMPANY, SIGN_CATEGORY } from '../utils/constants.js'

export const validateSignInput = withValidationErrors([
  body('description').notEmpty().withMessage('description is required'),
  body('completion_status')
    .isIn(Object.values(SIGN_CATEGORY))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(SIGN_COMPANY))
    .withMessage('invalid job type'),
])
```

```js
import { validateSignInput } from '../middleware/validationMiddleware.js'

router.route('/').get(getAllSigns).post(validateSignInput, createSign)

router
  .route('/:id')
  .get(getSign)
  .delete(deleteSign)
  .patch(validateSign, updateSign)
```

- create Sign request

```json
{
  "company": "coding addict",
  "position": "backend-end",
  "jobStatus": "pending",
  "jobType": "full-time",
  "jobLocation": "florida"
}
```

#### 8. Validate ID Parameter

validationMiddleware.js

```js
import mongoose from 'mongoose'
import { param } from 'express-validator'

export const validateIdParam = withValidationErrors([
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('invalid MongoDB id'),
])
```

```js
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const sign = await Sign.findById(value)
    if (!sign) throw new NotFoundError(`no sign with id : ${value}`)
  }),
])
```

```js
import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { SIGN_COMPANY, SIGN_CATEGORY } from '../utils/constants.js'
import mongoose from 'mongoose'
import Sign from '../models/signModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no sign')) {
          throw new NotFoundError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}
```

signRouter.js

```js
import {
  validateSignInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

router
  .route('/:id')
  .get(validateIdParam, getSign)
  .delete(validateIdParam, deleteSign)
```

- remove NotFoundError from getJob, updateJob, deleteJob controllers

#### 9. Clean DB
