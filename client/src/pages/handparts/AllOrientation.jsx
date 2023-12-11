import {
  HandOrientationContainer,
  FilterOrientation,
} from '../../components/courses/handparts'
import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/orientations')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllOrientationContext = createContext()

const AllOrientation = () => {
  const { data } = useLoaderData()
  return (
    <AllOrientationContext.Provider value={{ data }}>
      <FilterOrientation />

      <HandOrientationContainer />
    </AllOrientationContext.Provider>
  )
}
export default AllOrientation

export const useAllOrientationContext = () => useContext(AllOrientationContext)
