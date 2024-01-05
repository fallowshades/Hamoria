import { CrudContainer } from '../../../components/courses/no'
import { toast } from 'react-dom'
import customFetch from '../../../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('courses/no/crud')

    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllCrudContext = createContext()

const AllCrud = () => {
  const { data } = useLoaderData()

  return (
    <AllCrudContext.Provider value={{ data }}>
      <div>
        <CrudContainer />
      </div>
    </AllCrudContext.Provider>
  )
}
export const useAllCrudContext = () => useContext(AllCrudContext)
export default AllCrud
