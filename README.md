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
  .words {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .words {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`
export default Wrapper
```

#### map Reference

-put items on grid

WordContainer.jsx

```js
import { useAllWordContext } from '../../../pages/handparts/AllWord'
import { Word } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/WordContainer'
```

```js
const WordContainer = () => {
  const { data } = useAllWordContext()
  const { words } = data

  if (words.length == 0) {
    return (
      <Wrapper>
        <h2>No words found</h2>
      </Wrapper>
    )
  }
  return (
    <div className="words">
      <AddWord />
      {words.map((word) => {
        return <Word key={word._id} {...word} />
      })}
    </div>
  )
}
export default WordContainer
```

mappedItems/index.js

```js
export { default as Word } from './Word'
```

Word.jsx

```JS
const Word = () => {
  return <div>Word</div>
}
export default Word
```

#### Reference component

-- aware import svg variable or component

Word.jsx

```js
import Wrapper from '../../../../assets/wrappers/handparts/Word'
import SignInfo from './SignInfo'
import { FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { Form } from 'react-router-dom'
const Word = ({ word, subgroup, subsection, prefixid }) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{word.charAt(0)}</div>
        <div className="info">
          <h5>{word}</h5>
          <p>{prefixid}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <SignInfo icon={<FaLocationArrow />} text={subgroup} />
          <SignInfo icon={<FaCalendarAlt />} text={subsection} />
        </div>

        <footer className="actions">
          <Link className="btn edit-btn">Edit</Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}
```

#### words css

Word.js

```

```

--misstake

WordContainer.js

```js
<Wrapper>
  <div className="words">
    <AddWord />
    {words.map((word) => {
      return <Word key={word._id} {...word} />
    })}
  </div>
</Wrapper>
```

## Dynamic updates

### edit Reference

#### EditReference setup

EditWord.jsx

```js
import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow } from '../../../../components'

const EditWord = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit prefix</h4>
        <div className="form-center">
          <FormRow type="text" name="word"></FormRow>
          <FormRow type="text" name="subgroup"></FormRow>
          <FormRow type="text" name="subsection"></FormRow>
          <FormRow type="text" name="prefixid"></FormRow>
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditWord
```

Word.jsx

```js
import { EditWord } from '../mappedItems'
import { useState } from 'react'
```

```js
<div className="content-center">
  {isEdit ? (
    <div>
      <EditWord />
    </div>
  ) : (
    <div>
      {' '}
      <SignInfo icon={<FaLocationArrow />} text={subgroup} />
      <SignInfo icon={<FaCalendarAlt />} text={subsection} />
    </div>
  )}
</div>
```

```js
<footer className="actions">
  <Link className="btn edit-btn">Edit</Link>
  <button
    className="btn edit-btn"
    onClick={() => {
      setIsEdit(!isEdit)
    }}
  >
    {isEdit ? 'word' : ' Edit'}
  </button>
  ...
</footer>
```
