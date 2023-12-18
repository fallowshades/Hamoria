import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
//mapping
import { KeysToMapFormRows } from './mappedItems'

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
        await customFetch.post('/references', data)
        queryClient.invalidateQueries(['references'])
        toast.success('reference added successfully')

        return null
      } catch (error) {
        toast.error(error?.response?.data?.mst)
        return error
      }
    case 'patch':
      const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
      const mongooseObjectIdRegex = /^[0-9a-fA-F]{24}$/

      if (mongooseObjectIdRegex.test(idPart)) {
        try {
          await customFetch.patch(`/references/${idPart}`, data)
          toast.success(`${idPart}`)
          return redirect('/dashboard/references')
        } catch (error) {
          toast.error(error.response.data.msg)
          return error
        }
      }
      toast.error('sad developer')
      return null

    default:
      toast.success('default')
      return null
  }
}

const AddReference = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add reference" />
        <input name="form-id" hidden defaultValue="create" />
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
