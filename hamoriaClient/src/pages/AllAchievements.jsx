import { toast } from 'react-toastify'
import { AchievementsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/achievements')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllAchievement = () => {
  const { data } = useLoaderData()

  return (
    <>
      <SearchContainer />
      <AchievementsContainer />
    </>
  )
}
export default AllAchievement
