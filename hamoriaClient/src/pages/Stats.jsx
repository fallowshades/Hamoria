import { ChartsContainer, StatsContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/achievements/stats')
    return response.data
  },
}

export const loader = async () => {
  return null
}

const Stats = () => {
  const { isLoading, isError, data } = useQuery(statsQuery)

  if (isLoading) return <h4>Loading...</h4>
  if (isError) return <h4>Error...</h4>

  const { defaultStats, monthlyApplications } = data
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}
export default Stats
