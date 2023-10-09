import { FormRow } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { ACHIEVEMENT_STATUS, ACHIEVEMENT_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import FormRowSelect from '../components/FormRowSelect'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/achievements', data)
    toast.success('achievement added successfully')
    return redirect('all-achievements')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AddAchievement = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add achievement</h4>
        <div className="form-center">
          <FormRow type="text" name="description" />
          <FormRow type="text" name="points" />
          <FormRow
            type="text"
            labelText="achievement user attachment"
            name="createdBy"
            defaultValue={user._id}
          />
          <div className="form-row">
            <FormRowSelect
              labelText="achievement  status"
              name="status"
              defaultValue={ACHIEVEMENT_STATUS.INACTIVE}
              list={Object.values(ACHIEVEMENT_STATUS)}
            />
          </div>
          <FormRowSelect
            name="type"
            labelText="achievement type"
            defaultValue={ACHIEVEMENT_TYPE.EXPLORATION}
            list={Object.values(ACHIEVEMENT_TYPE)}
          />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddAchievement
