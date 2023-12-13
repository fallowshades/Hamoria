import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow } from '../../../../components'

const EditWord = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit prefix</h4>
        <div className="form-center">
          <FormRow type="text" name="word"></FormRow>
          <FormRow type="text" name="subgroup"></FormRow>
          <FormRow type="text" name="subsection"></FormRow>
          <FormRow type="text" name="prefixid"></FormRow>
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditWord
