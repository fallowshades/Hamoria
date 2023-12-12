import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'

import { useNavigation } from 'react-router-dom'

const EditReference = ({ _id }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const identifyAction = `patch ${_id}`

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit reference</h4>
        <div className="form-center"></div>
        <div>
          <input name="form-id" hidden defaultValue={identifyAction} />
          <KeysToMapFormRows mapKey="reference" />
        </div>
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
export default EditReference
