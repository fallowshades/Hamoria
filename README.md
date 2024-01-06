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

#### setup all NO course pages context

AllCrud.jsx

- and AllDomain, AllTuple, AllPlace, AllItem

```js
const AllCrudContext = createContext()

const All[name] = () =>{

  return
  <All[name]Provider value= {{data}}>
...
    </All[name]Provider>
}
export const useAllCrudContext = () => useContext(AllCrudContext)
```

#### render ascending sorted NO courses

- create CRUD, Domain, Tuple, Place, Item

CrudContainer

- similarly DomainContainer, tupleContainer, PlaceContainer, ItemContainer

```js
import Crud from './Crud'
import Wrapper from '../../../assets/wrappers/courses/no/CrudContainer'

import { useAllAchievementsContext } from '../../../pages/AllAchievements'
import { useAllCrudContext } from '../../../pages/courses/no/AllCrud'
```

```js
const CrudContainer = () => {
  const { data } = useAllCrudContext()
  const { sortedCategorizedCrudData } = data

  if (sortedCategorizedCrudData === 0) {
    return (
      <Wrapper>
        <h2>No Crud to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="grid-template">
        {sortedCategorizedCrudData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((crud) => (
              <Crud key={crud._id} {...crud} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
```

crudController

```js
import {
  getCategoryQuery,
  getGroupByQuery,
  getSortByQuery,
} from '../sharedQueries/categorizedData.js'
```

```js
export const createCRUD = async (req, res) => {
  const sortedCategorizedCrudData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])

  res.status(StatusCodes.OK).json({ sortedCategorizedCrudData })
}
```

sharedQueries\categorizedData

```js
export const getSortByQuery = () => ({
  $sort: {
    _id: 1, // Sorting in ascending order based on the _id field (group ID)
  },
})
```
