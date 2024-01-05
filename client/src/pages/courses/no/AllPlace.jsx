import { PlaceContainer } from '../../../components/courses/no'

import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/place')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AllPlaceContext = createContext()
const AllPlace = () => {
  const { data } = useLoaderData()
  return (
    <AllPlaceContext.Provider value={{ data }}>
      <div>
        <PlaceContainer />
      </div>
    </AllPlaceContext.Provider>
  )
}
export const useAllPlaceContext = () => useContext(AllPlaceContext)
export default AllPlace
