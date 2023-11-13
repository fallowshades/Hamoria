import Wrapper from '../assets/wrappers/FeatureHome'
import { Hero, FeaturedSigns } from '../components'

import { convenientFetch } from '../utils/corsFetch'
const url = 'products?featured=true'

export const loader = async () => {
  const response = await convenientFetch(url)
  const products = response.data.data
  return { products }

  return null
}
const FeatureHome = () => {
  return (
    <Wrapper>
      <Hero />
      <FeaturedSigns />
    </Wrapper>
  )
}
export default FeatureHome
