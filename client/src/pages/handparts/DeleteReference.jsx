import { redirect } from 'react-router-dom'
import customFetch from '../../utils/customFetch'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/references/${params.id}`)
      queryClient.invalidateQueries(['references'])
      toast.success('reference deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    return redirect('/dashboard/prefix')
  }
