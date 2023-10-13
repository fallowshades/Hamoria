import { toast } from 'react-toastify'
import { AchievementsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    const { data } = await customFetch.get('/achievements', { params })
    console.log(params)
    return {
      data,
      searchValues: { ...params },
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AllAchievementsContext = createContext()

const AllAchievement = () => {
  const { data, searchValues } = useLoaderData()

  return (
    <AllAchievementsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <AchievementsContainer />
    </AllAchievementsContext.Provider>
  )
}
export default AllAchievement

export const useAllAchievementsContext = () =>
  useContext(AllAchievementsContext)
