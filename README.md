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

### (2)Tool life cycle mounted

#### 5. Debounce

utils/utils.jsx

```js
export const debounce = (onChange) => {
  let timeout
  return (e) => {
    const form = e.currentTarget.form
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChange(form)
    }, 2000)
  }
}
```

SearchWordContainer.jsx

- add attribute

```js
import { debounce } from '../../../utils/utils'

     onChange={debounce((form) => {
              submit(form)
            })}

             <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
```

SearchWordContainer.jsx

```js
defaultValue = { status } //forgot to set default values
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
