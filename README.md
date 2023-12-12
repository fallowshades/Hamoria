# v0.6.1

## Support tree for object transfer

### object request/response session

#### note have keys to identify fields

#### AddReference- Structure

- Mapping (when)
- network form identity (who)
- existence (when)

```js
import {
  prefixKeys,
  orientationKeys,
  referenceKeys,
} from '../../../../../../utils/modelKeyConstants'

const KeysToMapFormRows = ({ isOrientation, mapKey }) => {
  if (mapKey) {
    mappedKeys = referenceKeys
  }
}
```

AddReference.jsx

```js
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
//mapping
import { KeysToMapFormRows } from './mappedItems'

const AddReference = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add reference" />
        <KeysToMapFormRows mapKey="reference" />
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default AddReference
```

Reference container

```js
return (
  <>
    <div>ReferenceContainer</div>
    <AddReference />
  </>
)
```

#### note dynamically map formRow select aswell

### create Reference

## create transfer lifecycle

### context to help map presentational data

### loadable

#### All orders loader

### render Reference

#### ReferenceContainer css

#### map Reference

#### Reference component

#### Reference of one or two hands

## Dynamic updates

### edit Reference

#### EditReference setup

#### more to work with

### Reference action setup. (btn w identiry)

### Delete reference

#### fix routing to page

#### fix cpy misstake (name method)

```

```
