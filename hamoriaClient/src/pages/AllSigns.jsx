import { Filters, SignsContainer, PaginationContainer } from '../components'
import { convenientFetch } from '../utils/corsFetch'

const url = '/products'
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  const response = await convenientFetch(url)
  console.log(response)
  const products = response.data.data
  const meta = response.data.meta
  return { products, meta, params }
}

const AllSigns = () => {
  return (
    <>
      <Filters />
      <SignsContainer />
      <PaginationContainer />
    </>
  )
}
export default AllSigns
