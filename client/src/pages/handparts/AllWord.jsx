import {
  WordContainer,
  SearchWordContainer,
} from '../../components/courses/handparts'

import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

import { QueryClient, useQuery } from '@tanstack/react-query'
const allWordsQuery = (params) => {
  const { search, subgroup, subsection, page } = params

  return {
    queryKey: [
      'words',
      search ?? 'all',
      subgroup ?? 'all',
      subsection ?? 'all',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/words', { params })
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(), ////
      ])
      await queryClient.ensureQueryData(allWordsQuery(params))
      return {
        searchValues: { ...params }, ////////
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AllWordContext = createContext()

const AllWord = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allWordsQuery(searchValues))
  return (
    <AllWordContext.Provider value={{ data, searchValues }}>
      <SearchWordContainer />
      <WordContainer />
    </AllWordContext.Provider>
  )
}
export default AllWord

export const useAllWordContext = () => useContext(AllWordContext)
