#

## Support tree for object transfer to set

### object request/response session

#### 1.0 extra

```js
//dynamically generating components
import { nanoid } from 'nanoid'

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  { field: 'hand', identifier: nanoid() },
]
const orientationKeys = [
  { field1: 'orderid', identifier: nanoid() },
  { field2: 'fingerdirection', identifier: nanoid() },
  { field3: 'fingerdirection2', identifier: nanoid() },
  { field4: 'palmdirection', identifier: nanoid() },
  { field5: 'palmdirection2', identifier: nanoid() },
  ,
]
const signKeys = [
  { field1: 'active_hand', identifier: nanoid() },
  { field2: 'aktive_hand2', identifier: nanoid() },
  { field3: 'passive_hand2', identifier: nanoid() },
  { field4: 'singlehandform', identifier: nanoid() },
  { field5: 'transform', identifier: nanoid() },
]
const wordKeys = [
  { field1: 'word', identifier: nanoid() },
  { field2: 'subgroup', identifier: nanoid() },
  { field3: 'subsection', identifier: nanoid() },
  { field4: 'prefixid', identifier: nanoid() },
]
const referenceKeys = [
  { field1: 'position', identifier: nanoid() },
  { field2: 'bodycontact', identifier: nanoid() },
  { field3: 'touchtype', identifier: nanoid() },
  { field4: 'faceexpression', identifier: nanoid() },
  { field5: 'link', identifier: nanoid() },
]

export { prefixKeys, orientationKeys, signKeys, wordKeys, referenceKeys }
```

#### 1. AddAchievement - Structure

components/FooterAddPrefix.jsx

```js
//Dynamically render keys frontend and backend
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow, SectionTitle } from '../../../components'
import { prefixKeys } from '../../../../../utils/modelKeyConstants'
//network submission
import { Toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
const FooterAddPrefix = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form"></Form>
      <SectionTitle text="add prefix" />
      {prefixKeys.map((constant) => {
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
export default FooterAddPrefix
```

PrefixContainer

```js
import FooterAddPrefix from './FooterAddPrefix'
const PrefixContainer = () => {
  return (
    <>
      <div>PrefixContainer</div>
      <FooterAddPrefix />
    </>
  )
}
export default PrefixContainer
```

#### 2. (extend) dynamicly maped formRow select

```js
import * as constants from './constants'
const { HAND_VARIANTS, ORIENTATION, TOUCH_TYPE, FACE_EXPRESSION } = constants

const prefixKeys = [
  { field: 'Connectionid', identifier: nanoid() },
  { field: 'position', identifier: nanoid() },
  {
    field: 'hand',
    identifier: nanoid(),
    list: HAND_VARIANTS,
    default: HAND_VARIANTS.A,
  },
]

const orientationKeys = [
  {
    field: 'orderid',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'fingerdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'fingerdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  {
    field: 'palmdirection2',
    identifier: nanoid(),
    list: ORIENTATION,
    default: ORIENTATION.FORWARD,
  },
  ,
]

const referenceKeys = [
  { field: 'position', identifier: nanoid() },
  {
    field: 'bodycontact',
    identifier: nanoid(),
  },
  {
    field: 'touchtype',
    identifier: nanoid(),
    list: TOUCH_TYPE,
    default: TOUCH_TYPE.NULL,
  },
  {
    field: 'faceexpression',
    identifier: nanoid(),
    list: FACE_EXPRESSION,
    default: FACE_EXPRESSION.NULL,
  },
  { field: 'link', identifier: nanoid() },
]
```

FooterAddPrefix.jsx

```js
import { FormRow, SectionTitle, FormRowSelect } from '../../../components'
const FooterAddPrefix = () => {
  ...
  //console.log(constant.hasOwnProperty('default'))
  const renderDefault = constant
  console.log()
  if (!constant.hasOwnProperty('default')) {
    return (
      <FormRow key={constant.identifier} type="text" name={constant.field} />
    )
  } else {
    return (
      <FormRowSelect
        key={constant.identifier}
        type="text"
        name={constant.field}
        defaultValue={constant?.default}
        list={Object.values(constant?.list)}
      />
    )
  }
}
```
