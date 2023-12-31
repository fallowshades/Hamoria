//Dynamically render keys frontend and backend
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../..'
//network submission
import { KeysToMapFormRows } from './mappedItems'
import customFetch from '../../../utils/customFetch'
import { useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ request }) => {
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
          queryClient.invalidateQueries(['prefixes'])
          return null
        } catch (error) {
          toast.error(error?.response?.data?.mst)
          return error
        }
      case 'patch':
        //const nanoidRegex = /^[a-zA-Z0-9_-]{21}$/
        const mongooseObjectIdRegex = /^[0-9a-fA-F]{24}$/

        if (mongooseObjectIdRegex.test(idPart)) {
          try {
            await customFetch.patch(`/prefixes/${idPart}`, data)

            queryClient.invalidateQueries(['prefixes'])
            toast.success(`${idPart}`)
            return null
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
