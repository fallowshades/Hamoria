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
    const { data } = await customFetch.get('/references')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllReferenceContext = createContext

const AllReference = () => {
  const { data } = useLoaderData()
  return (
    <AllReferenceContext.Provider value={data}>
      <SearchReferenceContainer />
      <ReferenceContainer />
    </AllReferenceContext.Provider>
  )
}

export const useAllOrientationContext = () => useContext(AllReferenceContext)

export default AllReference
