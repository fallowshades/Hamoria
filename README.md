# v0.6.5

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

##
