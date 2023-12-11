import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow, SectionTitle } from '../../../components'
import { orientationKeys } from '../../../../../utils/modelKeyConstants'
//network submission
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import { useNavigation, redirect } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  toast.success('orientation added successfully')
  try {
    await customFetch.post('/orientations', data)
    return null
  } catch (error) {
    toast.error(error?.response?.data?.mst)
    return error
  }
}

const AddOrientation = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add orientation" />

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
