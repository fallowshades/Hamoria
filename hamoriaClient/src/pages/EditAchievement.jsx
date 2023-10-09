import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData } from 'react-router-dom'
import { ACHIEVEMENT_STATUS, ACHIEVEMENT_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/achievements/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return redirect('/dashboard/all-achievements')
  }
}
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.patch(`/achievements/${params.id}`, data)
    toast.success('Achievement edited successfully')
    return redirect('/dashboard/all-achievements')
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

const EditAchievement = () => {
  const { achievement } = useLoaderData()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit achievement</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="description"
            defaultValue={achievement.description}
          />
          <FormRow
            type="text"
            name="points"
            defaultValue={achievement.points}
          />
          <FormRow
            type="text"
            labelText="achievement type"
            name="type"
            defaultValue={achievement.type}
          />

          <FormRowSelect
            name="status"
            labelText="achievement status"
            defaultValue={achievement.status}
            list={Object.values(ACHIEVEMENT_STATUS)}
          />
          <FormRowSelect
            name="achievementType"
            labelText="achievement type"
            defaultValue={achievement.type}
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

export default EditAchievement
