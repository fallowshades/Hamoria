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
const AllAchievementsContext = createContext()

const AllAchievement = () => {
  const { data } = useLoaderData()

  return (
    <AllAchievementsContext.Provider value={{ data }}>
      <SearchContainer />
      <AchievementsContainer />
    </AllAchievementsContext.Provider>
  )
}
export default AllAchievement

export const useAllAchievementsContext = () =>
  useContext(AllAchievementsContext)
