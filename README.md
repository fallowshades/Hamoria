# v0.6.3

# Iteration3 layer 7

## Params -> send request

### (1) get all affect pipieline

#### 1. Get All Achievements - Server

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

const sortKey = sortOptions[sort] || sortOptions.newest

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

#### 3. All Achievements Loader

#### 4. Submit Form Programmatically

### (2)Tool life cycle mounted

#### 5. Debounce

```js

```

## Pagination of response data

### (1)lots

#### 6. Pagination - Setup

- create PageBtnContainer

AchievementsContainer.jsx

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
