import {
  HandOrientationContainer,
  SearchOrientationContainer,
} from '../../components/courses/handparts'
import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

import { useQuery } from '@tanstack/react-query'

const allOrientationsQuery = (params) => {
  const {
    search,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
    page,
  } = params
  return {
    queryKey: [
      'orientations',
      search ?? 'all',
      fingerdirection ?? 'all',
      fingerdirection2 ?? 'all',
      palmdirection ?? 'all',
      palmdirection2 ?? 'all',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/orientations', { params })

      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(), ////
    ])
    try {
      await queryClient.ensureQueryData(allOrientationsQuery(params))
      return {
        searchValues: { ...params },
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AllOrientationContext = createContext()

const AllOrientation = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allOrientationsQuery(searchValues))

  return (
    <AllOrientationContext.Provider value={{ data, searchValues }}>
      <SearchOrientationContainer />

      <HandOrientationContainer />
    </AllOrientationContext.Provider>
  )
}
export default AllOrientation

export const useAllOrientationContext = () => useContext(AllOrientationContext)
