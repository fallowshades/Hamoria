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

- accumulate data
- export a searchable wrapper

AllReferences

```js
import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/references')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
```

```js
const AllReferenceContext = createContext

const AllReference = () => {
  const { data } = useLoaderData()
  return (
    <AllReferenceContext.Provider value={data}>
      <SearchReferenceContainer />
      <ReferenceContainer />
    </AllReferenceContext.Provider>
  )
}

export const useAllOrientationContext = () => useContext(AllReferenceContext)
```

### render Reference

#### ReferenceContainer css

ReferenceContainer.js

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
  .references {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
   @media (min-width: 765px) {
    .references {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  @media (min-width: 1120px) {
    .references {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
`
export default Wrapper
```

#### map Reference

- ! possible misstakes in AllContext

  - invoce const AllReferenceContext = createContext()
  - pass object <AllReferenceContext.Provider value={{ data }}>

  -put items on grid

ReferenceContainer.jsx

```js
import { useAllReferenceContext } from '../../../pages/handparts/AllReference'
import { Reference } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/ReferenceContainer'
```

```js
const { data } = useAllReferenceContext()
const { references } = data

if (references == 0) {
  return (
    <Wrapper>
      <h2>No references found</h2>
    </Wrapper>
  )
}
```

```js
return (
  <div className="references">
    {references.map((reference) => {
      return <Reference key={reference._id} {...reference} />
    })}
  </div>
)
```

Reference

```JS
const Reference = () => {
  return <div>Reference</div>
}
export default Reference
```

#### Reference component

-- aware import svg variable or component

Reference.jsx

```js
              text={'face expression: ' + (faceexpression ?? '')}
            />
          </div>

          <div>
            <SignInfo
              icon={<FaLocationArrow />}
              text={'touchtype: ' + (touchtype ?? '')}
            />
            <SignInfo
              icon={<FaLocationArrow />}
              text={'bodyContact: ' + (bodycontact ?? '')}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Reference
```

#### section title upgrade

SectionTitle

```js
const SectionTitle = ({ text, AddclassName, link }) => {
  const combinedClassName = `text-3xl font-medium tracking-wider capitalize ${
    AddclassName || ''
  }`
  return (
    <div className="border-b border-base-300 pb-5">
      {link ? (
        <a className={`${combinedClassName} underline`} href={text}>
          {text}
        </a>
      ) : (
        <h2 className={combinedClassName}>{text}</h2>
      )}
    </div>
  )
}
```

## Dynamic updates

### edit Reference

EditReference.jsx

```js
import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'

const EditReference = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit reference</h4>
        <div className="form-center"></div>
        <div>
          <KeysToMapFormRows mapKey="reference" />
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditReference
```

Reference.jsx

```js
import { EditReference } from '../mappedItems'
import { Form } from 'react-router-dom'
```

```js
<footer className="actions">
  <EditReference />
  <Form>
    <button type="submit" className="btn delete-btn">
      Delete
    </button>
  </Form>
</footer>
```

#### EditReference setup

#### more to work with

### Reference action setup. (btn w identiry)

### Delete reference

#### fix routing to page

#### fix cpy misstake (name method)

```

```
