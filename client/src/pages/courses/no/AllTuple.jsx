import { TupleContainer } from '../../../components/courses/no'

import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/tuple')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllTuple = () => {
  const { data } = useLoaderData()
  return (
    <div>
      <TupleContainer />
    </div>
  )
}
export default AllTuple
