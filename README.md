# v0.6.0

## Support tree for object transfer to set

### object request/response session

#### 1.0 extra

```js
//dynamically generating components
import { nanoid } from 'nanoid'

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  { field: 'hand', identifier: nanoid() },
]
const orientationKeys = [
  { field1: 'orderid', identifier: nanoid() },
  { field2: 'fingerdirection', identifier: nanoid() },
  { field3: 'fingerdirection2', identifier: nanoid() },
  { field4: 'palmdirection', identifier: nanoid() },
  { field5: 'palmdirection2', identifier: nanoid() },
  ,
]
const signKeys = [
  { field1: 'active_hand', identifier: nanoid() },
  { field2: 'aktive_hand2', identifier: nanoid() },
  { field3: 'passive_hand2', identifier: nanoid() },
  { field4: 'singlehandform', identifier: nanoid() },
  { field5: 'transform', identifier: nanoid() },
]
const wordKeys = [
  { field1: 'word', identifier: nanoid() },
  { field2: 'subgroup', identifier: nanoid() },
  { field3: 'subsection', identifier: nanoid() },
  { field4: 'prefixid', identifier: nanoid() },
]
const referenceKeys = [
  { field1: 'position', identifier: nanoid() },
  { field2: 'bodycontact', identifier: nanoid() },
  { field3: 'touchtype', identifier: nanoid() },
  { field4: 'faceexpression', identifier: nanoid() },
  { field5: 'link', identifier: nanoid() },
]

export { prefixKeys, orientationKeys, signKeys, wordKeys, referenceKeys }
```

#### 1. AddAchievement - Structure

components/FooterAddPrefix.jsx

```js
//Dynamically render keys frontend and backend
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow, SectionTitle } from '../../../components'
import { prefixKeys } from '../../../../../utils/modelKeyConstants'
//network submission
import { Toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
const FooterAddPrefix = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form"></Form>
      <SectionTitle text="add prefix" />
      {prefixKeys.map((constant) => {
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
export default FooterAddPrefix
```

PrefixContainer

```js
import FooterAddPrefix from './FooterAddPrefix'
const PrefixContainer = () => {
  return (
    <>
      <div>PrefixContainer</div>
      <FooterAddPrefix />
    </>
  )
}
export default PrefixContainer
```

#### 2. (extend) dynamicly maped formRow select

```js
import * as constants from './constants'
const { HAND_VARIANTS, ORIENTATION, TOUCH_TYPE, FACE_EXPRESSION } = constants

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  {
    field: 'hand',
    identifier: nanoid(),
    list: HAND_VARIANTS,
    default: HAND_VARIANTS.A,
  },
]

const orientationKeys = [
  {
    field: 'orderid',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'fingerdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'fingerdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  ,
]

const referenceKeys = [
  { field: 'position', identifier: nanoid() },
  {
    field: 'bodycontact',
    identifier: nanoid(),
  },
  {
    field: 'touchtype',
    identifier: nanoid(),
    list: TOUCH_TYPE,
    default: TOUCH_TYPE.NULL,
  },
  {
    field: 'faceexpression',
    identifier: nanoid(),
    list: FACE_EXPRESSION,
    default: FACE_EXPRESSION.NULL,
  },
  { field: 'link', identifier: nanoid() },
]
```

FooterAddPrefix.jsx

```js
import { FormRow, SectionTitle, FormRowSelect } from '../../../components'
const FooterAddPrefix = () => {
  ...
  //console.log(constant.hasOwnProperty('default'))
  const renderDefault = constant
  console.log()
  if (!constant.hasOwnProperty('default')) {
    return (
      <FormRow key={constant.identifier} type="text" name={constant.field} />
    )
  } else {
    return (
      <FormRowSelect
        key={constant.identifier}
        type="text"
        name={constant.field}
        defaultValue={constant?.default}
        list={Object.values(constant?.list)}
      />
    )
  }
}
```

#### Add prefix

```js
import { toast } from 'react-toastify'
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  toast.success('prefix added successfully')
  try {
    await customFetch.post('/prefixes', data)
    return null
  } catch (error) {
    toast.error(error?.response?.data?.mst)
    return error
  }
}
```

## create transfer lifecycle

### context to help map presentational data

#### setup all prefix context

```js
import { useLoaderData } from 'react-router-dom'

const AllPrefixContext = createContext()
const AllPrefix = () => {
  const { data } = useLoaderData()
  return (
    <AllPrefixContext.Provider value={{ data }}>
      <PrefixContainer />
      <FilterPrefix />
    </AllPrefixContext.Provider>
  )
}
export const useAllPrefixContext = () => useContext(AllPrefixContext)
```

#### moc database call from controller

prefixController.js

```js
import { readFile } from 'fs/promises'
import dotenv from 'dotenv'

export const getAllPrefixes = async (req, res) => {
  res.send('get all prefixes')
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockPrefixData.json', import.meta.url)
    )
  )
  res.send(jsonPrefix)
}
```

#### all prefix loader structure

App.jsx

```js
import { loader as prefixLoader } from './pages/handparts/AllPrefix'

loader: prefixLoader,

```

```js
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'
import { useContext, createContext } from 'react'
export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/prefixes')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
```

#### in order to render moc data

prefixController.js

```js
import { nanoid } from 'nanoid'

export const createPrefix = async (req, res) => {
  ...

  res
    .status(StatusCodes.OK)
    .json({ data: { _id: nanoid(), prefixes: jsonPrefix } })
}
```

#### render prefix

Prefix.Jsx

```js
const Prefix = () => {
  return <div>Prefix</div>
}
export default Prefix
```

PrefixContainer.jsx

````js
import FooterAddPrefix from './FooterAddPrefix'
import Prefix from './mappedItems/Prefix'
import { useAllPrefixContext } from '../../../pages/handparts/AllPrefix'
const PrefixContainer = () => {
  const { data } = useAllPrefixContext()
  if (!data) {
    return <h2>No prefixes found</h2>
  }
  const { prefixes } = data.data
  if (prefixes.length == 0) {
    return (
      <Wrapper>
        <h2>No Prefixes to display...</h2>
      </Wrapper>
    )
  }
  return (
    <>
      <div>
        <div>to be toggle</div>
        <FooterAddPrefix />
        <div className="prefixes">
          {prefixes.map((prefix) => {
            return <Prefix key={prefix._id} {...prefixes}></Prefix>
          })}
        </div>
      </div>
    </>
  )
}
    ```
````

#### fixes

links.jsx

```js
export const links = [
  { text: 'add Achievement', path: '.', icon: <FaWpforms /> },
  { text: 'add Achievement', path: 'add-achievement', icon: <FaWpforms /> },
]
```

AddAchievement

```js
return redirect('/dashboard/all-achievements')
```

#### prefix container css

```js
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
  .prefixes {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
   @media (min-width: 765px) {
    .prefixes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  @media (min-width: 1120px) {
    .prefixes {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
`
export default Wrapper
```

## understandable

### understandable

#### mapping of svg for each prefix with added id

.gitignore

```gitignore
public/assets/images/parts/*
src/components/common/*

```

--must add id since data is not from database

prefixController

```js
const packagedData = jsonPrefix.map((keyless) => {
  return { ...keyless, _id: nanoid() }
})
res.status(StatusCodes.OK).json({ prefixes: packagedData })
```

-- fixed wierd {data: {data:jsonData}}

PrefixContainer.jsx

```jsx
const { prefixes } = data

prefixes.map((prefix) => {
  return <Prefix key={prefix._id} {...prefix}></Prefix>
})
```

#### prefix css

```js
import styled from 'styled-components'
const Wrapper = styled.div`
  background: white;
  // background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .polygon-hover {
    fill: rgba(0, 47, 95, 0.2);
  }
`
export default Wrapper
```

#### prefix component

Prefix

```js
import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle, AchievementInfo } from '../../../../components'
import SignInfo from './SignInfo'
import { svgTeenBoyBody, svgAdultManBody } from '../../../common'
const Prefix = ({ position, hand }) => {
  return (
    <Wrapper>
      <SectionTitle text="Prefix" AddclassName="text-black" />
      <div className="content">
        <div className="content-center">
          <SignInfo icon={svgAdultManBody} text={position} />
          <SignInfo icon={svgTeenBoyBody} text={hand} />
        </div>
      </div>
    </Wrapper>
  )
}
```

-- the card is the same regardless theme

SectionTitle.jsx

```jsx
const SectionTitle = ({ text, AddclassName }) => {
  const combinedClassName = `text-3xl font-medium tracking-wider capitalize ${
    AddclassName || ''
  }`
  return (
    <div className="border-b border-base-300 pb-5">
      <h2 className={combinedClassName}>{text}</h2>
    </div>
  )
}
```

#### SignInfo and css

```js
import Wrapper from '../../../../assets/wrappers/handparts/SignInfo'
const SignInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="sign-icon">{icon}</span>
      <span className="sign-text">{text}</span>
    </Wrapper>
  )
}
export default SignInfo
```

```js
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .sign-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .sign-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    color: black;
  }
`

export default Wrapper
```

#### common

---reminder the svg is in .gitignore

## Dynamic updates

### edit achievement setup

#### refracture key rendered formrows

-create KeysToMapFormRows

KeysToMapFormRows.jsx

```js
import { prefixKeys } from '../../../../../../utils/modelKeyConstants'
import { FormRow, FormRowSelect } from '../../..'

const KeysToMapFormRows = () => {
  {
    console.log(prefixKeys)
    return (
      <>
        {prefixKeys.map((constant) => {
          console.log()
          if (!constant.hasOwnProperty('default')) {
            return (
              <FormRow
                key={constant.identifier}
                type="text"
                name={constant.field}
              />
            )
          } else {
            return (
              <FormRowSelect
                key={constant.identifier}
                type="text"
                name={constant.field}
                defaultValue={constant?.default}
                list={Object.values(constant?.list)}
              />
            )
          }
        })}
      </>
    )
  }
}
export default KeysToMapFormRows
```

index.js

```js
export { default as KeysToMapFormRows } from './KeysToMapFormRows'
```

handparts/FooterAddPrefix.jsx

```js
import { KeysToMapFormRows } from './mappedItems'

const FooterAddPrefix = () => {
...
  return(
    ...
<KeysToMapFormRows />

  )
}

```

components\courses\handparts\mappedItems\EditPrefix.jsx

```js
import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'
const EditPrefix = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit prefix</h4>
        <div className="form-center"></div>
        <KeysToMapFormRows />
      </Form>
    </Wrapper>
  )
}
export default EditPrefix
```

#### connect editPrefix to container on each item

Prefix.jsx

```js
import { EditPrefix } from '../mappedItems'
import { Form } from 'react-router-dom'

const Prefix = ({ Connectionid, position, hand }) => {
  return (
    ...
     <footer className="actions">
        <EditPrefix />
        <Form>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>


  )}
```

#### vissible dynamic changes

prefixController.js

```js
export const getSinglePrefix = async (req, res) => {
  res.send('get single prefix')
  const testItem = {
    Connectionid: req.noRead ? '1' : req.value,
    position: 'mouth',
    hand: 'j',
  }
  res.status(StatusCodes.OK).json({ prefix: testItem })
}
export const updatePrefix = async (req, res) => {
  res.send('update prefix')
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}
export const deletePrefix = async (req, res) => {
  res.send('delete prefix')
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}
```

### set switch case need identify id each submit

- remove logs in AllPrefix, Prefix container and keys to map formRows

Prefix.jsx

```js
const Prefix = ({ _id, Connectionid, position, hand }) => {
  return(
    ...
    <EditPrefix _id={_id} />
    ...
  )
}
```

mappedItems\EditPrefix.jsx

```js

import { useLoaderData } from 'react-router-dom'
import { useNavigation, redirect } from 'react-router-dom'
import customFetch from '../../../../utils/customFetch'

const EditPrefix = ({ _id }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const identifyAction = `patch ${_id}`
  return (
   <input name="form-id" hidden defaultValue={identifyAction} />

...

    <button
          type="submit"
          className="btn btn-block form-btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>

    )
}
```

#### refracture action to switch case

FooterAddPrefix.jsx

```js
export const action = async ({ request }) => {
  const formId = formData.get('form-id')

  const parts = formId.split(/\s+/)
  // The first part will be 'edit'
  const crudOperationPart = parts[0]
  // The remaining part will be everything after 'edit'
  const idPart = parts.slice(1).join(' ')
  switch (crudOperationPart) {
    case 'create':
      toast.success('prefix added successfully')
      try {
        await customFetch.post('/prefixes', data)
        return null
      } catch (error) {
        toast.error(error?.response?.data?.mst)
        return error
      }
    case 'patch':
      const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
      const mongooseObjectIdRegex = /^[0-9a-fA-F]{24}$/

      if (nanoidRegex.test(idPart)) {
        toast.success(`${idPart}`)
        return null
      }
      toast.error('sad developer')
      return null

    default:
      toast.success('default')
      return null
  }
}
```

```js
return <input name="form-id" hidden defaultValue="create" />
```

### Delete Prefix

App.jsx

```js
import { action as deletePrefixAction } from './pages/handparts/DeletePrefix'

    {
            path: 'delete-prefix/:id',
            action: deletePrefixAction,
          },
```

pages/handparts/deletePrefix

```js
import { redirect } from 'react-router-dom'
import customFetch from '../../utils/customFetch'
import { toast } from 'react-toastify'

export async function action({ params }) {
  try {
    await customFetch.delete(`/prefixes/${params.id}`)
    toast.success('Prefix deleted successfully')
  } catch (error) {
    toast.error(error.response.data.msg)
  }
  return redirect('/dashboard/prefix')
}
```

Prefix.jsx

```js
 <Form method="post" action={`../delete-prefix/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
```
