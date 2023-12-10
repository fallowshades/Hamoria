import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { KeysToMapFormRows } from '../mappedItems'
const EditPrefix = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit prefix</h4>
        <div className="form-center"></div>
        <KeysToMapFormRows />
      </Form>
    </Wrapper>
  )
}
export default EditPrefix
