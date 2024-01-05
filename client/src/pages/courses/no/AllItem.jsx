import { ItemContainer } from '../../../components/courses/no'

import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/item')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllItem = () => {
  const { data } = useLoaderData()
  return (
    <div>
      <ItemContainer />
    </div>
  )
}
export default AllItem
