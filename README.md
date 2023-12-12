# v0.6.3

## Support tree for object transfer

### object request/response session

#### note have keys to identify fields

#### AddWord- Structure

- Mapping (when)
- network form identity (who)
- existence (when)

```js

```

AddWord.jsx

```js
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, FormRow } from 'react-router-dom'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'

const AddWord = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Word</h4>
        <div className="form-center">
          <FormRow type="text" name="word"></FormRow>
          <FormRow type="text" name="subgroup"></FormRow>
          <FormRow type="text" name="subsection"></FormRow>
          <FormRow type="text" name="prefixid"></FormRow>
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}
export default AddWord
```

Wordcontainer.jsx

```js

```

-- FormRow and FormRowSelect already collected Object.values

#### create word (dynamically mappable data from future loads)

--mapped items are located elsewhere. access api router

App.js

```js
import { action as wordAction } from './components/courses/handparts/AddWord'
   {
            path: 'word',
            element: <AllWord />,
            action: wordAction,
          },
```

AddWord.jsx

```js
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/words', data)
    toast.success('word added successfully')
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
```

WordContainer.jsx

```js
import AddWord from './AddWord'

return <AddWord />
```

## create transfer lifecycle

### loadable (for context to help map presentational data)

App.jsx

```js

```

Word controller

```js
export const getAllWords = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockWordData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ orientations: packagedData })
}
```

- test in postman

#### All orders loader

- accumulate data
- export a searchable wrapper

AllWords

```js
import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/words')
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
const AllWordContext = createContext()

const AllWord = () => {
  const { data } = useLoaderData()
  return (
    <AllWordContext.Provider value={{ data }}>
      <SearchWordContainer />
      <WordContainer />
    </AllWordContext.Provider>
  )
}
export default AllWord

export const useAllWordContext = () => useContext(AllWordContext)
```

### render Reference

#### WordContainer css

WordContainer.js

```js

```

#### map Reference

-put items on grid

WordContainer.jsx

```js

```

```js

```

```js

```

Word.jsx

```JS

```

#### Reference component

-- aware import svg variable or component

Word.jsx

```js

```

## Dynamic updates

### edit Reference

#### EditReference setup
