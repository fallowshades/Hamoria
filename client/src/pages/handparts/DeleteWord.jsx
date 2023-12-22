import { redirect } from 'react-router-dom'
import customFetch from '../../utils/customFetch'
import { toast } from 'react-toastify'
import { QueryClient } from '@tanstack/react-query'

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/words/${params.id}`)
      queryClient.invalidateQueries(['words'])
      toast.success('word deleted successfully')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
    return redirect('/dashboard/prefix')
  }
