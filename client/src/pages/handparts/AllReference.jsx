import {
  ReferenceContainer,
  SearchReferenceContainer,
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

    const { data } = await customFetch.get('/references')
    console.log(data)
    return {
      data,
      searchValues: { ...params },
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllReferenceContext = createContext()

const AllReference = () => {
  const { data, searchValues } = useLoaderData()
  return (
    <AllReferenceContext.Provider value={{ data, searchValues }}>
      <SearchReferenceContainer />
      <ReferenceContainer />
    </AllReferenceContext.Provider>
  )
}

export const useAllReferenceContext = () => useContext(AllReferenceContext)

export default AllReference
