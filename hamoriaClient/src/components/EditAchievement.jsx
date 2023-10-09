import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData } from 'react-router-dom'
import { ACHIEVEMENT_STATUS, ACHIEVEMENT_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/achievement/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return redirect('/dashboard/all-achievement')
  }
}
export const action = async () => {
  return null
}

const EditAchievement = () => {
  const params = useParams()
  console.log(params)
  const { achievement } = useLoaderData()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return <h1>EditAchievement Page</h1>
}
export default EditAchievement
