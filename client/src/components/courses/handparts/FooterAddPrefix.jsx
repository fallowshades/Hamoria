//Dynamically render keys frontend and backend
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../../../components'
//network submission
import { KeysToMapFormRows } from './mappedItems'
import customFetch from '../../../utils/customFetch'
import { useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'

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
      toast.success('prefix added successfully')
      try {
        await customFetch.post('/prefixes', data)
        return null
      } catch (error) {
        toast.error(error?.response?.data?.mst)
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

const FooterAddPrefix = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add prefix" />
        <input name="form-id" hidden defaultValue="create" />
        <KeysToMapFormRows />
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
export default FooterAddPrefix
