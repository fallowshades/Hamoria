# v0.7.0

## queriable static data

### data from NO curriculum

#### data in all courses in curriculum

AllCrud.jsx

- and AllDomain, AllTuple, AllPlace, AllItem
- just change route address

```js
import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/crud')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
```

All[Course-name]

```js
const AllCrud = () => {
  const { data } = useLoaderData()
}
```
