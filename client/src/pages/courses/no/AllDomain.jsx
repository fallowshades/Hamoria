import { DomainContainer } from '../../../components/courses/no'

import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/domain')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AllDomainContext = createContext()
const AllDomain = () => {
  const { data } = useLoaderData()
  return (
    <AllDomainContext.Provider value={{ data }}>
      <div>
        <DomainContainer />
      </div>
    </AllDomainContext.Provider>
  )
}
export const useAllDomainContext = () => useContext(AllDomainContext)
export default AllDomain
