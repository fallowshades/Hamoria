import { useLoaderData } from 'react-router-dom'
import {
  PrefixContainer,
  FilterPrefix,
} from '../../components/courses/handparts'
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'
import { useContext, createContext } from 'react'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/prefixes')
    console.log(data)
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllPrefixContext = createContext()

const AllPrefix = () => {
  const { data } = useLoaderData()
  console.log(data)

  if (data)
    return (
      <AllPrefixContext.Provider value={{ data }}>
        <PrefixContainer />
        <FilterPrefix />
      </AllPrefixContext.Provider>
    )
  return <p>Loading...</p>
}
export const useAllPrefixContext = () => useContext(AllPrefixContext)
export default AllPrefix
