import { redirect } from 'react-router-dom'
import customFetch from '../../utils/customFetch'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/orientations/${params.id}`)
      queryClient.invalidateQueries(['orientations'])
      toast.success('orientation deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    return redirect('/dashboard/prefix')
  }
