import {
  ReferenceContainer,
  SearchReferenceContainer,
} from '../../components/courses/handparts'

import { useContext, createContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'
import { useQuery } from '@tanstack/react-query'
import { referenceKeys } from '../../../../utils/modelKeyConstants'
const allReferenceQuery = (params) => {
  const { search, position, bodycontact, touchtype, faceexpression, page } =
    params

  return {
    queryKey: [
      'references',
      search ?? 'all',
      position ?? 'all',
      bodycontact ?? 'all',
      touchtype ?? 'all',
      faceexpression ?? 'all',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/references', { params })
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

      await queryClient.ensureQueryData(allReferenceQuery(params))
      return {
        searchValues: { ...params },
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AllReferenceContext = createContext()

const AllReference = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allReferenceQuery(searchValues))
  return (
    <AllReferenceContext.Provider value={{ data, searchValues }}>
      <SearchReferenceContainer />
      <ReferenceContainer />
    </AllReferenceContext.Provider>
  )
}

export const useAllReferenceContext = () => useContext(AllReferenceContext)

export default AllReference
