# v0.6.1

## Support tree for object transfer

### object request/response session

#### note have keys to identify fields

#### AddOrientation - Structure

AddOrientation.jsx

```js
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'

const AddOrientation = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form"></Form>
      <SectionTitle text="add prefix" />
      {orientationKeys.map((constant) => {
        return (
          <FormRow
            key={constant.identifier}
            type="text"
            name={constant.field}
          />
        )
      })}
      <button
        type="submit"
        className="btn btn-block form-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting...' : 'submit'}
      </button>
    </Wrapper>
  )
}
export default AddOrientation
```

HandOrientationContainer.jsx

```js
import AddOrientation from './AddOrientation'

const HandOrientationContainer = () => {
  return <div>HandOrientationContainer</div>
  return (
    <>
      <div>HandOrientationContainer</div>
      <AddOrientation />
    </>
  )
}
```
