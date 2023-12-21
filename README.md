# v0.6.5

# Iteration3 layer 7

## Params -> send request

### (1) get all affect pipieline

#### 1. Get All Words - Server

word model

```js
const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    default: 'NaN',
  },
  subgroup: {
    type: String,
    required: true,
    default: 'NaN',
  },
  subsection: {
    type: String,
    required: true,
    default: NaN,
  },
})
```

wordController.js

```js
export const getAllWords = async (req, res) => {
  const { search, subgroup, subsection, sort } = req.query

  // Read data from the file
  const jsonWord = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockWordData.json', import.meta.url)
    )
  )
}
```

```js
// Local filtering based on the query parameters
const filteredWord = jsonWord.filter((row) => {
  return (
    (!search || new RegExp(search, 'i').test(row.word)) &&
    (!subgroup || new RegExp(subgroup, 'i').test(row.subgroup)) &&
    (!subsection || new RegExp(subsection, 'i').test(row.subsection))
  )
})
...
```

```js
// Local sorting based on the query parameter
const sortOptions = {
  'a-z': 'position',
  'z-a': '-position',
  ...
}

const sortKey = sortOptions[sort] || sortOptions['a-z']

const correlatedOperationData = filteredWord.sort((a, b) =>
  sortKey.startsWith('-')
    ? b[sortKey.slice(1)] - a[sortKey.slice(1)]
    : a[sortKey] - b[sortKey]
)
...
```

```js
// setup pagination
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page - 1) * limit

// Paginate the data
const paginatedData = correlatedOperationData.slice(skip, skip + limit)

// Add unique _id to each item
const packagedData = paginatedData.map((keyless) => ({
  ...keyless,
  _id: nanoid(),
}))
...
```

#### 2. Search Container

SearchWordContainer.jsx

```js
import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'

import { useAllWordContext } from '../../../pages/handparts/AllWord'
```

```js
return (
  <Wrapper>
    <Form className="form">
      <h5 className="form-title">search form</h5>
      <div className="form-center">
        {/* search position */}

        <FormRow type="search" name="search" defaultValue="a" />
        <FormRow name="subgroup" labelText="subgroup" />
        <FormRow name="subsection" labelText="subsection" />
        <FormRowSelect name="sort" defaultValue="a-z" list={['a-z', 'z-a']} />

        <Link to="/dashboard/word" className="btn form-btn delete-btn">
          Reset Search Values
        </Link>
        {/* TEMP!!!! */}
        <SubmitBtn formBtn />
      </div>
    </Form>
  </Wrapper>
)
```

#### 3. All Words Loader

All word (const loader)

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(), ////
])

return {
  data,
  params, ////////
}
```

#### 4. Submit Form Programmatically

constants.js

```js
export const WORD_SUBSECTION = {}
export const WORD_SUBGROUP = {}
```

searchWordContainer.jsx

```jsx
import { wordKeys } from '../../../../../utils/modelKeyConstants'
import { WORD_SUBGROUP, WORD_SUBSECTION } from '../../../../../utils/constants'
```

```jsx
const SearchWordContainer = () => {
  const { searchValues } = useAllWordContext()
  const { search, subgroup, subsection, sort } = searchValues
  const submit = useSubmit()
  return(
    ...
  )

}
```

```jsx
 return(
  <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="subgroup"
            name={wordKeys[1]}
            defaultValue={WORD_SUBGROUP.ACCUMULATION}
            list={['all', ...Object.values(WORD_SUBGROUP)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="subsection"
            name={wordKeys[2]}
            defaultValue={WORD_SUBSECTION.INTRO_1}
            list={['all', ...Object.values(WORD_SUBSECTION)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
 )
```

```jsx
     onChange={(e) => {
              submit(e.currentTarget.form)
            }}
```

AllWord.jsx

- forgot packaging of params

```jsx
 export const loader = async ({ request }) => {

return{
  ...
  searchValues: { ...params }, ////////
}
 }

const AllWord = () => {
    const { data, searchValues } = useLoaderData()
  return (
    <AllWordContext.Provider value={{ data, searchValues }}>
    ...
  )
}
```

### (2)Tool life cycle mounted

#### 5. ammend default value on formRowSelect

SearchWordContainer.jsx

- add attribute

```js
defaultValue = { subgroup }
```

SearchWordContainer.jsx

```js
defaultValue = { status } //forgot to set default values
 defaultValue={subsection}

        <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
```

## Pagination of response data

### (1)lots

#### 6. Pagination - Setup

- create PageBtnContainer

WordsContainer.jsx

```js

```

#### 7. Basic PageBtnContainer

```js

```

#### 8. Complex - PageBtnContainer

```js

```

#### 9. PageBtnContainer CSS (optional)

wrappers/PageBtnContainer.js

```js

```
