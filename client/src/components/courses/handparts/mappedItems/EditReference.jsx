import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'

const EditReference = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit reference</h4>
        <div className="form-center"></div>
        <div>
          <KeysToMapFormRows mapKey="reference" />
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditReference
