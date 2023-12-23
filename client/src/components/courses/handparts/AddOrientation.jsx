import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { SectionTitle } from '../../../components'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'

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
        try {
          await customFetch.post('/orientations', data)
          queryClient.invalidateQueries(['orientations'])
          toast.success('orientation added successfully')

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
            await customFetch.patch(`/orientations/${idPart}`, data)

            queryClient.invalidateQueries(['orientations'])
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

const AddOrientation = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add orientation" />
        <input name="form-id" hidden defaultValue="create" />
        <KeysToMapFormRows isOrientation />
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
export default AddOrientation
