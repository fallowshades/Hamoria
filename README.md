# v0.6.1

## Support tree for object transfer

### object request/response session

#### note have keys to identify fields

#### AddReference- Structure

- Mapping (when)
- network form identity (who)
- existence (when)

```js
import {
  prefixKeys,
  orientationKeys,
  referenceKeys,
} from '../../../../../../utils/modelKeyConstants'

const KeysToMapFormRows = ({ isOrientation, mapKey }) => {
  if (mapKey) {
    mappedKeys = referenceKeys
  }
}
```

AddReference.jsx

```js
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
//mapping
import { KeysToMapFormRows } from './mappedItems'

const AddReference = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add reference" />
        <KeysToMapFormRows mapKey="reference" />
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default AddReference
```

Reference container

```js
return (
  <>
    <div>ReferenceContainer</div>
    <AddReference />
  </>
)
```

#### create reference (dynamically mappable data from future loads)

--mapped items are located elsewhere. access api router

App.js

```js
import { action as referenceAction } from './components/courses/handparts/AddReference'
          {
            path: 'reference',
            element: <AllReference />,
            action: referenceAction,
          },
```

```js
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  toast.success('reference added successfully')
  try {
    await customFetch.post('/references', data)
    return null
  } catch (error) {
    toast.error(error?.response?.data?.mst)
    return error
  }
}
```

## create transfer lifecycle

### loadable (for context to help map presentational data)

App.jsx

```js
import { loader as ReferenceLoader } from './pages/handparts/AllReference'

 loader: ReferenceLoader,
```

Reference controller

```js
export const getAllReferences = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockReferenceData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ references: packagedData })
}
```

- test in postman

#### All orders loader

### render Reference

#### ReferenceContainer css

#### map Reference

#### Reference component

#### Reference of one or two hands

## Dynamic updates

### edit Reference

#### EditReference setup

#### more to work with

### Reference action setup. (btn w identiry)

### Delete reference

#### fix routing to page

#### fix cpy misstake (name method)

```

```
