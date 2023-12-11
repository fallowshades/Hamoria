# v0.6.1

## Support tree for object transfer

### object request/response session

#### note have keys to identify fields

#### AddOrientation - Structure

AddOrientation.jsx

```js
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'

const AddOrientation = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form"></Form>
      <SectionTitle text="add prefix" />
      {orientationKeys.map((constant) => {
        return (
          <FormRow
            key={constant.identifier}
            type="text"
            name={constant.field}
          />
        )
      })}
      <button
        type="submit"
        className="btn btn-block form-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting...' : 'submit'}
      </button>
    </Wrapper>
  )
}
export default AddOrientation
```

HandOrientationContainer.jsx

```js
import AddOrientation from './AddOrientation'

const HandOrientationContainer = () => {
  return <div>HandOrientationContainer</div>
  return (
    <>
      <div>HandOrientationContainer</div>
      <AddOrientation />
    </>
  )
}
```

#### note dynamically map formRow select aswell

### create orientation

App.jsx

```js
import { action as orientationAction } from './components/courses/handparts/AddOrientation'
 {
            path: 'orientation',
            element: <AllOrientation />,
            action: orientationAction,
          },
```

KeysToMapFormRowws.jsx

```js
import {
  prefixKeys,
  orientationKeys,
} from '../../../../../../utils/modelKeyConstants'
```

KeysToMapFormRows.jsx

```js
const KeysToMapFormRows = ({ isOrientation }) => {
  {
    let mappedKeys = isOrientation ? orientationKeys : prefixKeys

    return (
      <>

        {mappedKeys.map((constant) => {
          ...

        })})
        </>
        }}

```

-- but the forms in form...
--update request

AddOrientation.jsx

```js
import { KeysToMapFormRows } from './mappedItems'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  toast.success('orientation added successfully')
  try {
    await customFetch.post('/orientations', data)
    return null
  } catch (error) {
    toast.error(error?.response?.data?.mst)
    return error
  }
}

const AddOrientation = () => {
  return (
    <Form method="post" className="form">
      <SectionTitle text="add orientation" />

      <KeysToMapFormRows isOrientation />
      <button
        type="submit"
        className="btn btn-block form-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting...' : 'submit'}
      </button>
    </Form>
  )
}
```

## create transfer lifecycle

### context to help map presentational data

### loadable

App.jsx

```js

import { loader as orientationLoader } from './pages/handparts/AllOrientation'

 loader: orientationLoader,
```

orientationController.js

```js
import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'

export const getAllOrientations = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockOrientationData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ orientations: packagedData })
}
```

#### All orders loader

```js
import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/orientations')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllOrientationContext = createContext()

const AllOrientation = () => {
  const { data } = useLoaderData()
  return (
    <AllOrientationContext.Provider value={{ data }}>
      <FilterOrientation />

      <HandOrientationContainer />
    </AllOrientationContext.Provider>
  )
}
export default AllOrientation

export const useAllOrientationContext = () => useContext(AllOrientationContext)
```
