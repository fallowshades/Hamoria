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

#### create reference (dynamically mappable data from future loads)

--mapped items are located elsewhere. access api router

App.js

```js

```

```js

```

## create transfer lifecycle

### loadable (for context to help map presentational data)

App.jsx

```js

```

Word controller

```js

```

- test in postman

#### All orders loader

- accumulate data
- export a searchable wrapper

AllWords

```js

```

```js

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
