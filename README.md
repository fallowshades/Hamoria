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

### render Orientation

#### OrientationContainer css

```js
@ -0,0 +1,31 @@
import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .orientations {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
   @media (min-width: 765px) {
    .orientations {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  @media (min-width: 1120px) {
    .orientations {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
`
export default Wrapper
```

#### map orientations

```js
import { useAllOrientationContext } from '../../../pages/handparts/AllOrientation'
import { Orientation } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/OrientationContainer'
```

```js
  const { data } = useAllOrientationContext()

  const { orientations } = data

  if (orientations.length == 0) {
    return (
      <Wrapper>
        <h2>No orientations found</h2>
      </Wrapper>
    )
  }

  return (
    ...
       <div className="orientations">
        {orientations.map((orientation) => {
          return <Orientation key={orientation._id} {...orientation} />
        })}
      </div>

  )
```

Orientation

```JS
const Orientation = () => {
  return <div>Orientation</div>
}
export default Orientation
```

#### Orientation component

index.js

```js
export { svgCrossProductr } from './corssProductSvg'
```

Orientation.jsx

```jsx
const SignInfo = ({ icon, text }) => {

if(text){
  return()
}
}
```

#### Orientation of one or two hands

```js
import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgCrossProductr } from '../../../common'
```

```js
const Orientation = ({
  orderid,
  fingerdirection,
  fingerdirection2,
  palmdirection,
  palmdirection2,
}) => {
  return (
    <Wrapper>
      <SectionTitle text={orderid + ' orientation'} AddclassName="text-black" />
      <div className="content">
        <div className="content-center">
          <div>
            <h4>hand one</h4>
            <SignInfo icon={svgCrossProductr} text={fingerdirection} />
            <SignInfo icon={svgCrossProductr} text={palmdirection} />
          </div>
          {fingerdirection2 && (
            <div>
              <h4>hand two</h4>
              <SignInfo icon={svgCrossProductr} text={palmdirection2} />
              <SignInfo icon={svgCrossProductr} text={fingerdirection2} />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
```
