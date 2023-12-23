import { useLoaderData } from 'react-router-dom'
import {
  PrefixContainer,
  SearchPrefixContainer,
} from '../../components/courses/handparts'
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'
import { useContext, createContext } from 'react'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(), ////
  ])
  try {
    const { data } = await customFetch.get('/prefixes', { params })
    // console.log(data)
    return {
      data,
      searchValues: { ...params },
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllPrefixContext = createContext()

const AllPrefix = () => {
  const { data, searchValues } = useLoaderData()
  console.log(data)

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
