import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { Form, useNavigation, redirect } from 'react-router-dom'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/words', data)
    toast.success('word added successfully')
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

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
