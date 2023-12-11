import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'

import { useLoaderData } from 'react-router-dom'
import { useNavigation, redirect } from 'react-router-dom'
import customFetch from '../../../../utils/customFetch'

const EditPrefix = ({ _id }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const identifyAction = `patch ${_id}`
  return (
    <Wrapper>
      <Form method="post" className="form">
        <input name="form-id" hidden defaultValue={identifyAction} />

        <h4 className="form-title">edit prefix</h4>
        <div className="form-center"></div>
        <KeysToMapFormRows />
        <button
          type="submit"
          className="btn btn-block form-btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default EditPrefix
