import {
  WordContainer,
  SearchWordContainer,
} from '../../components/courses/handparts'

import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(), ////
    ])
    const { data } = await customFetch.get('/words', { params })
    return {
      data,
      searchValues: { ...params }, ////////
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllWordContext = createContext()

const AllWord = () => {
  const { data, searchValues } = useLoaderData()
  return (
    <AllWordContext.Provider value={{ data, searchValues }}>
      <SearchWordContainer />
      <WordContainer />
    </AllWordContext.Provider>
  )
}
export default AllWord

export const useAllWordContext = () => useContext(AllWordContext)
