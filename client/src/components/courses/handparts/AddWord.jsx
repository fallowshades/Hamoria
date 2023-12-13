import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { Form, useNavigation, redirect } from 'react-router-dom'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const formId = formData.get('form-id')

  const parts = formId.split(/\s+/)
  // The first part will be 'edit'
  const crudOperationPart = parts[0]
  // The remaining part will be everything after 'edit'
  const idPart = parts.slice(1).join(' ')

  switch (crudOperationPart) {
    case 'create':
      try {
        await customFetch.post('/words', data)
        toast.success('word added successfully')
        return null
      } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
      }
    case 'patch':
      const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
      const mongooseObjectIdRegex = /^[0-9a-fA-F]{24}$/

      if (nanoidRegex.test(idPart)) {
        toast.success(`${idPart}`)
        return null
      }
      toast.error('sad developer')
      return null

    default:
      toast.success('default')
      return null
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
          <input name="form-id" hidden defaultValue="create" />
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
