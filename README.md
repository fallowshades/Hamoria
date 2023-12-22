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
const { data } = await customFetch.get('/words', { params })

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

#### 8. Complex - PageBtnContainer PICK context

wordController.jsx

```jsx
const totalWords = jsonWord.length
const numOfPages = Math.ceil(totalWords / limit)

res.status(StatusCodes.OK).json({
  words: packagedData,
  numOfPages,
  currentPage: page,
  totalWords,
})
```

AllWords.jsx

```jsx
const { data } = await customFetch.get('/words', { params })
```

WordContainer.jsx

```jsx
import HandButtonContainer from './HandButtonContainer'


  const { words, totalWords, numOfPages } = data

  return(
    ...
       <h5>
          {totalWords} word{words.length > 1 && 's'} found
        </h5>
      ...
      {numOfPages > 1 && <HandButtonContainer dataContext="allWords" />}
  )

```

HandButtonContainer.jsx

```js
import { useAllWordContext } from '../../../pages/handparts/AllWord'

const HandButtonContainer = ({ dataContext }) => {
  let numOfPages, currentPage
  switch (dataContext) {
    case 'allWords':
      ;({ numOfPages, currentPage } = useAllWordContext().data)
      break

    default:
      ;({ numOfPages, currentPage } = useAllReferenceContext()?.data || {})

      break
  }
  ..}
```

## optimization

### all words query

AllWord.jsx

```js
import { QueryClient, useQuery } from '@tanstack/react-query'

const allWordsQuery = (params) => {
  return {
    queryKey: ['words'],
    queryFn: async () => {
      const { data } = await customFetch.get('/words', { params })
      return data
    },
  }
}
```

```jsx
const AllWord = () => {
  const { data } = useQuery(allWordsQuery(searchValues))
}
```

- loader need invoke and only return relevant

```js
export const loader = (QueryClient = async ({ request }) => {
  await QueryClient.ensureQueryData(allWordsQuery(params))
  return {
    data,
    searchValues: { ...params },
  }
})
```

- prevent formRow default text --> optimal key

```js
const allWordsReQuery = (params) => {
  const { search, subgroup,subsection,page } =
    params

  return {
    queryKey: [
      'words',
      search ?? 'all',
      subgroup ?? 'all',
      subsection ?? 'all',
      page ?? 1,
    ],
    ...
  } }
```

### invalidate words

App.jsx

- actions cover create, update, delete

```js
  {
            path: 'word',
            element: <AllWord />,
            action: wordAction(queryClient),
            loader: wordLoader(queryClient),
          },
          { path: 'delete-word/:id', action: deleteWordAction(queryClient) },

```

/pages/DeleteWord.jsx

- async function => const action ()

```js
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/words/${params.id}`)
      queryClient.invalidateQueries(['words'])

...
    }}
```

components/../handparts/AddWord.jsx

- only the create action

```js
export const action = async ({ request }) => {
 ...
  switch (crudOperationPart) {
    case 'create':
      try {
        await customFetch.post('/words', data)
        queryClient.invalidateQueries(['words'])¨
      }}}
```

### edit and add words formRow to formRowSelect

EditWord.jsx

```js
import { FormRow, FormRowSelect } from '../../../../components'
import {
  WORD_SUBGROUP,
  WORD_SUBSECTION,
} from '../../../../../../utils/constants'
```

```js
 <FormRowSelect
            type="text"
            name="subgroup"
            defaultValue={WORD_SUBGROUP.ACCUMULATION}
            list={['all', ...Object.values(WORD_SUBGROUP)]}
          ></FormRowSelect>
          <FormRowSelect
            type="text"
            name="subsection"
            defaultValue={WORD_SUBSECTION.INTRO_1}
            list={['all', ...Object.values(WORD_SUBSECTION)]}
          ></FormRowSelect>
```

AddWord.jsx

```js
import { FormRow, FormRowSelect } from '../../../components'
import { WORD_SUBGROUP, WORD_SUBSECTION } from '../../../../../utils/constants'
```

```js
      <FormRowSelect
            type="text"
            name="subgroup"
            defaultValue={WORD_SUBGROUP.ACCUMULATION}
            list={['all', ...Object.values(WORD_SUBGROUP)]}
          ></FormRowSelect>
          <FormRowSelect
            type="text"
            name="subsection"
            defaultValue={WORD_SUBSECTION.INTRO_1}
            list={['all', ...Object.values(WORD_SUBSECTION)]}
          ></FormRowSelect>
```

#### edit words loader

App.jsx

```js
   action: wordAction(queryClient),
```

AddWord.jsx

- invalidate both create and update changes (later update particular)

```js

export const action =
  (queryClient) =>
  async ({ request }) => {

    ..

      switch (crudOperationPart) {
    case 'create':
await customFetch.patch(`/words/${idPart}`, data)
queryClient.invalidateQueries(['words'])

    case 'patch':
 ...

        if (mongooseObjectIdRegex.test(idPart)) {
          try {
            await customFetch.patch(`/words/${idPart}`, data)

            queryClient.invalidateQueries(['words'])
          }}}
          ...
```
