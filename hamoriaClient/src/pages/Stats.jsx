import { ChartsContainer, StatsContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const loader = async () => {
  return null
}

const Stats = () => {
  const response = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/achievements/stats'),
  })
  console.log(response)
  if (response.isLoading) {
    return <h1>Loading...</h1>
  }
  return <h1>react query</h1>

  const { defaultStats, monthlyApplications } = useLoaderData()
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
