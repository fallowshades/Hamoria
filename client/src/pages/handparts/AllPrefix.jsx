import { useLoaderData } from 'react-router-dom'
import {
  PrefixContainer,
  SearchPrefixContainer,
} from '../../components/courses/handparts'
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'
import { useContext, createContext } from 'react'

import { useQuery } from '@tanstack/react-query'

const allPrefixesQuery = (params) => {
  const { position, hand, page } = params
  return {
    queryKey: ['prefixes', position ?? 'all', hand ?? 'all', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get('/prefixes', { params })

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
      await queryClient.ensureQueryData(allPrefixesQuery(params)) // console.log(data)
      return {
        searchValues: { ...params },
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AllPrefixContext = createContext()

const AllPrefix = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allPrefixesQuery(searchValues))

  if (data)
    return (
      <AllPrefixContext.Provider value={{ data, searchValues }}>
        <SearchPrefixContainer />
        <PrefixContainer />
      </AllPrefixContext.Provider>
    )
  return <p>Loading...</p>
}
export const useAllPrefixContext = () => useContext(AllPrefixContext)
export default AllPrefix
